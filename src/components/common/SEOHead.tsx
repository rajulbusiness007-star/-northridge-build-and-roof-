import React, { useEffect, useState } from 'react';
import { RoofingService } from '../../data/servicesData';
import { BusinessConfig } from '../../data/businessConfig';
import { Search, Code2, Eye, CheckCircle2, Copy, Check, ExternalLink } from 'lucide-react';

interface SEOHeadProps {
  business: BusinessConfig;
  service?: RoofingService | null;
  pageTitle?: string;
  pageDescription?: string;
  showInspector?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  business,
  service,
  pageTitle,
  pageDescription,
  showInspector = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);

  const title = service
    ? service.seo.metaTitle
    : pageTitle || `${business.name} | Commercial & Residential Roofing`;

  const description = service
    ? service.seo.metaDescription
    : pageDescription || business.tagline;

  const canonicalUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${service ? `?service=${service.seo.canonicalSlug}` : window.location.pathname}`
    : 'https://apexcrestroofing.com';

  // Construct Service-Specific Schema.org JSON-LD
  const serviceJsonLd = service
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            '@id': `${canonicalUrl}#service`,
            name: service.title,
            serviceType: service.seo.schemaServiceType,
            description: service.seo.metaDescription,
            category: service.category,
            provider: {
              '@type': 'RoofingContractor',
              name: business.name,
              telephone: business.phoneDisplay,
              email: business.email,
              url: window.location.origin,
              address: {
                '@type': 'PostalAddress',
                streetAddress: business.address.street,
                addressLocality: business.address.city,
                addressRegion: business.address.state,
                postalCode: business.address.zip,
                addressCountry: 'US',
              },
              license: business.credentials.licenseNumber,
              hasCredential: business.credentials.certifications,
            },
            areaServed: business.serviceArea.cities.map((city) => ({
              '@type': 'City',
              name: city,
              containedInPlace: {
                '@type': 'AdministrativeArea',
                name: 'Texas',
              },
            })),
            audience: {
              '@type': 'Audience',
              audienceType: service.seo.serviceAudience,
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: `${service.title} Materials & Options`,
              itemListElement: service.materialsSupported.map((mat, i) => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Product',
                  name: mat,
                },
                position: i + 1,
              })),
            },
            offers: {
              '@type': 'Offer',
              price: '0.00',
              priceCurrency: 'USD',
              description: 'Complimentary On-Site Inspection & Written Itemized Estimate',
              availability: 'https://schema.org/InStock',
              validFrom: new Date().toISOString().split('T')[0],
            },
            termsOfService: service.warrantyInfo,
          },
          ...(service.faqs && service.faqs.length > 0
            ? [
                {
                  '@type': 'FAQPage',
                  '@id': `${canonicalUrl}#faq`,
                  mainEntity: service.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.q,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: faq.a,
                    },
                  })),
                },
              ]
            : []),
        ],
      }
    : null;

  // Dynamically update document head tags
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. OpenGraph Tags
    const setMetaTag = (prop: string, val: string) => {
      let tag = document.querySelector(`meta[property="${prop}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', prop);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', val);
    };

    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:url', canonicalUrl);

    // 4. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. Injected JSON-LD Schema
    const existingScript = document.getElementById('service-json-ld');
    if (existingScript) existingScript.remove();

    if (serviceJsonLd) {
      const script = document.createElement('script');
      script.id = 'service-json-ld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(serviceJsonLd, null, 2);
      document.head.appendChild(script);
    }

    return () => {
      const currentScript = document.getElementById('service-json-ld');
      if (currentScript) currentScript.remove();
    };
  }, [title, description, canonicalUrl, serviceJsonLd]);

  const copySchemaToClipboard = () => {
    if (!serviceJsonLd) return;
    navigator.clipboard.writeText(JSON.stringify(serviceJsonLd, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Live SEO Meta Badge & Inspection Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="font-semibold text-white">Active Service SEO Metadata &amp; Schema</span>
            <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-orange-400">
              {service ? service.seo.schemaServiceType : 'General Site Schema'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setInspectorOpen(!inspectorOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium text-[11px] transition-colors cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-orange-400" />
            <span>{inspectorOpen ? 'Hide Schema Code' : 'Inspect JSON-LD & SERP'}</span>
          </button>
        </div>

        {/* Live SERP Snippet Preview */}
        <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1 font-sans">
          <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
            <span>https://apexcrestroofing.com › services › {service?.seo.canonicalSlug || ''}</span>
          </div>
          <div className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
            {title}
          </div>
          <div className="text-xs text-slate-300 leading-relaxed">
            {description}
          </div>
        </div>

        {/* Expandable JSON-LD Code Box */}
        {inspectorOpen && (
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                Schema.org JSON-LD (Service + OfferCatalog + FAQPage)
              </span>
              <button
                type="button"
                onClick={copySchemaToClipboard}
                className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white px-2 py-0.5 bg-slate-800 rounded transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied JSON-LD' : 'Copy Schema'}</span>
              </button>
            </div>
            <pre className="p-3 bg-black/60 rounded-lg text-[10px] font-mono text-emerald-400 overflow-x-auto max-h-64 select-all">
              {JSON.stringify(serviceJsonLd, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </>
  );
};

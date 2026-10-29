import React, { useState, useEffect, useMemo } from 'react';
import { 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Layers, 
  HelpCircle,
  FileCheck,
  Phone,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Filter,
  Sparkles
} from 'lucide-react';
import { roofingServices, RoofingService } from '../../data/servicesData';
import { BusinessConfig } from '../../data/businessConfig';
import { SEOHead } from '../common/SEOHead';
import { FAQSchema } from '../common/FAQSchema';

interface ServicesPageProps {
  business: BusinessConfig;
  initialServiceId?: string;
  onSelectQuote: (serviceName: string) => void;
  onBookInspection: () => void;
  onServiceChange?: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  business,
  initialServiceId,
  onSelectQuote,
  onBookInspection,
  onServiceChange,
}) => {
  const [selectedService, setSelectedService] = useState<RoofingService>(
    roofingServices.find(s => s.id === initialServiceId) || roofingServices[0]
  );
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'residential' | 'commercial' | 'emergency' | 'specialty'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (initialServiceId) {
      const match = roofingServices.find(s => s.id === initialServiceId);
      if (match) setSelectedService(match);
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (onServiceChange && selectedService) {
      onServiceChange(selectedService.id);
    }
  }, [selectedService, onServiceChange]);

  // Real-time multi-field service filtering
  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return roofingServices.filter(s => {
      // Category filter check
      if (categoryFilter !== 'all' && s.category !== categoryFilter) {
        return false;
      }
      // Text query check
      if (!q) return true;

      const titleMatch = s.title.toLowerCase().includes(q);
      const taglineMatch = s.tagline.toLowerCase().includes(q);
      const descMatch = s.description.toLowerCase().includes(q);
      const categoryMatch = s.category.toLowerCase().includes(q);
      const materialsMatch = s.materialsSupported.some(m => m.toLowerCase().includes(q));
      const keywordsMatch = s.seo.keywords.some(k => k.toLowerCase().includes(q));
      const faqMatch = s.faqs.some(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));

      return titleMatch || taglineMatch || descMatch || categoryMatch || materialsMatch || keywordsMatch || faqMatch;
    });
  }, [searchQuery, categoryFilter]);

  // Auto-switch selected service to first result if current selection is filtered out
  useEffect(() => {
    if (filteredList.length > 0 && !filteredList.some(s => s.id === selectedService.id)) {
      setSelectedService(filteredList[0]);
    }
  }, [filteredList, selectedService.id]);

  // Quick query chips for common customer roofing searches
  const quickSearchTags = [
    'Hail Damage',
    'Emergency Tarp',
    'Standing Seam Metal',
    'TPO Flat Roof',
    'Seamless Gutters',
    'Drone Inspection',
    'Class 4 Impact'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Page Header with Real-Time Search Bar */}
      <div className="max-w-4xl">
        <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">
          Master Workmanship Catalog
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Roofing Services &amp; Structural Solutions
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          From precise residential shingle repairs and architectural standing seam metal to single-ply commercial TPO flat roofs—each service backed by manufacturer certifications and code-exceeding standards.
        </p>

        {/* Real-Time Services Search Bar */}
        <div className="mt-8 space-y-3">
          <div className="relative max-w-2xl">
            <label htmlFor="service-search-input" className="sr-only">
              Search roofing services, materials, or damage types
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="service-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, materials, or issues (e.g. shingle, leak, flat roof, hail, TPO)..."
              className="w-full pl-10 pr-10 py-3 text-sm bg-white border border-slate-200 rounded-xl shadow-xs placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Query Suggestion Tags */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span className="font-medium text-slate-600">Quick Searches:</span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? 'bg-orange-100 text-orange-800 border-orange-300 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Category Filters & Result Counter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Services' },
                { id: 'residential', label: 'Residential Roofing' },
                { id: 'commercial', label: 'Commercial Systems' },
                { id: 'emergency', label: 'Storm & Emergency' },
                { id: 'specialty', label: 'Audits & Specialty' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryFilter(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    categoryFilter === cat.id
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span>Showing {filteredList.length} of {roofingServices.length}</span>
              {(searchQuery || categoryFilter !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                  }}
                  className="text-orange-600 hover:text-orange-700 font-medium underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Interactive View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Service Selector List with In-column Search Counter */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">
            <span>Programs ({filteredList.length})</span>
            {searchQuery && (
              <span className="text-[11px] text-orange-600 lowercase font-normal">
                "{searchQuery}"
              </span>
            )}
          </div>

          {filteredList.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <div className="text-sm font-semibold text-slate-800">
                No matching services found
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                We couldn't find any services matching <span className="font-mono text-slate-700">"{searchQuery}"</span>. Try a different keyword or reset filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Clear Search &amp; View All
              </button>
            </div>
          ) : (
            <div className="space-y-1.5 max-h-[720px] overflow-y-auto pr-1">
              {filteredList.map((svc) => {
                const isSelected = selectedService.id === svc.id;
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => {
                      setSelectedService(svc);
                      setActiveFaq(null);
                      setFaqSearchQuery('');
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${isSelected ? 'text-orange-950' : 'text-slate-900'}`}>
                        {svc.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {svc.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {svc.tagline}
                    </p>
                    {searchQuery && (
                      <div className="text-[10px] text-orange-700 font-mono flex items-center gap-1 mt-0.5">
                        <Sparkles className="w-3 h-3" />
                        <span>Matched in specs</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="p-4 bg-slate-900 rounded-2xl text-white mt-4 text-xs space-y-3">
            <div className="font-semibold text-orange-400">Need Immediate Help?</div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              If your roof is leaking actively, do not wait. Call our 24/7 emergency storm dispatch hotline now.
            </p>
            <a
              href={business.phone}
              className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="font-mono">Call {business.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Deep Service Detail Dossier */}
        <div className="lg:col-span-8 space-y-6">
          {/* Service Specific SEO Metadata & Schema Injector */}
          <SEOHead business={business} service={selectedService} />

          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-8">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded">
                CATEGORY: {selectedService.category.toUpperCase()}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Typical Turnaround: {selectedService.turnaroundTime}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {selectedService.title}
            </h2>
            <p className="text-sm font-medium text-orange-900/80 mt-1">
              {selectedService.tagline}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mt-4">
              {selectedService.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Engineering Standards &amp; Inclusions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {selectedService.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-800 leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Installation Process */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Execution Procedure
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedService.processSteps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-xs text-slate-900">{step.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-7">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs: Materials & Warranty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <div className="text-slate-500 font-medium mb-1">Supported Materials &amp; Brands</div>
              <div className="font-semibold text-slate-900">
                {selectedService.materialsSupported.join(' · ')}
              </div>
            </div>
            <div>
              <div className="text-slate-500 font-medium mb-1">Warranty Guarantee</div>
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{selectedService.warrantyInfo}</span>
              </div>
            </div>
          </div>

          {/* Service Specific FAQs with Real-Time FAQ Search Bar */}
          {selectedService.faqs.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
                  <span>{selectedService.title} Technical FAQs</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  {selectedService.faqs.length} Verified Answers
                </span>
              </div>

              {/* Service FAQ Search Bar */}
              <div className="relative">
                <label htmlFor="service-faq-search" className="sr-only">
                  Search FAQs for {selectedService.title}
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <input
                  id="service-faq-search"
                  type="text"
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  placeholder={`Search ${selectedService.title} FAQs (e.g. warranty, cost, timeline, hail)...`}
                  className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
                {faqSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setFaqSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    title="Clear FAQ search"
                    aria-label="Clear FAQ search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filtered FAQs List */}
              {(() => {
                const q = faqSearchQuery.trim().toLowerCase();
                const matchedFaqs = selectedService.faqs.filter(
                  f => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
                );

                if (matchedFaqs.length === 0) {
                  return (
                    <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center space-y-2">
                      <p className="text-xs text-slate-500">
                        No service FAQs match <span className="font-mono text-slate-700">"{faqSearchQuery}"</span>.
                      </p>
                      <button
                        type="button"
                        onClick={() => setFaqSearchQuery('')}
                        className="text-xs font-semibold text-orange-600 hover:text-orange-700 cursor-pointer"
                      >
                        Reset FAQ Search
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="space-y-2">
                    {matchedFaqs.map((faq, i) => {
                      const isOpen = Boolean(faqSearchQuery.trim()) || activeFaq === i;
                      return (
                        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setActiveFaq(isOpen && !faqSearchQuery.trim() ? null : i)}
                            className="w-full p-3.5 text-left text-xs font-semibold text-slate-800 flex justify-between items-center bg-white hover:bg-slate-50"
                          >
                            <span className="pr-2">{faq.q}</span>
                            {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-orange-600 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                          </button>
                          {isOpen && (
                            <div className="px-3.5 pb-3.5 pt-2 text-xs text-slate-600 border-t border-slate-100 bg-slate-50 leading-relaxed">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Dynamic Service FAQPage Schema */}
              <FAQSchema
                faqs={selectedService.faqs}
                pageContext={selectedService.title}
                schemaId="service-faq-json-ld"
                showInspectorBadge={true}
              />
            </div>
          )}

          {/* Direct Service CTAs */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onSelectQuote(selectedService.title)}
              className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Quote for {selectedService.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onBookInspection}
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Book On-Site Inspection
            </button>
          </div>

          {/* Targeted Local SEO Keywords */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
            <span className="font-semibold text-slate-700">Targeted Local Queries:</span>
            {selectedService.seo.keywords.map((kw, i) => (
              <span key={i} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                #{kw}
              </span>
            ))}
          </div>
          </div>
        </div>

      </div>
    </div>
  );
};

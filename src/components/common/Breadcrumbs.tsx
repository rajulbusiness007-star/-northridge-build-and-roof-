import React, { useEffect } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { roofingServices } from '../../data/servicesData';

interface BreadcrumbsProps {
  currentTab: string;
  selectedServiceId?: string;
  onNavigate: (tab: string, serviceId?: string) => void;
}

interface Crumb {
  label: string;
  tab?: string;
  serviceId?: string;
  isActive?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentTab,
  selectedServiceId,
  onNavigate,
}) => {
  if (currentTab === 'home') return null;

  const crumbs: Crumb[] = [{ label: 'Home', tab: 'home' }];

  switch (currentTab) {
    case 'services': {
      crumbs.push({ label: 'Services', tab: 'services' });
      if (selectedServiceId) {
        const match = roofingServices.find((s) => s.id === selectedServiceId);
        if (match) {
          crumbs.push({ label: match.title, isActive: true });
        } else {
          crumbs[crumbs.length - 1].isActive = true;
          delete crumbs[crumbs.length - 1].tab;
        }
      } else {
        crumbs[crumbs.length - 1].isActive = true;
        delete crumbs[crumbs.length - 1].tab;
      }
      break;
    }
    case 'projects':
      crumbs.push({ label: 'Completed Projects', isActive: true });
      break;
    case 'reviews':
      crumbs.push({ label: 'Client Reviews & Ratings', isActive: true });
      break;
    case 'tools':
      crumbs.push({ label: 'Customer Tools & Estimators', isActive: true });
      break;
    case 'service-areas':
      crumbs.push({ label: 'Service Areas & Territory', isActive: true });
      break;
    case 'about':
      crumbs.push({ label: 'About Us & Credentials', isActive: true });
      break;
    case 'financing':
      crumbs.push({ label: 'Roofing Financing', isActive: true });
      break;
    case 'blog':
      crumbs.push({ label: 'Roofing Guides & Blog', isActive: true });
      break;
    case 'quote':
      crumbs.push({ label: 'Request an Estimate', isActive: true });
      break;
    default:
      crumbs.push({ label: currentTab, isActive: true });
  }

  useEffect(() => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://northridgebuildroof.com';
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: `${baseUrl}/${crumb.tab ? (crumb.tab === 'home' ? '' : crumb.tab) : currentTab}`,
      })),
    };

    const scriptId = 'breadcrumb-json-ld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(breadcrumbSchema, null, 2);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [currentTab, selectedServiceId]);

  return (
    <div className="bg-slate-100/70 border-b border-slate-200/80 py-2.5 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 font-medium">
            {crumbs.map((crumb, idx) => {
              const isLast = idx === crumbs.length - 1;
              const isFirst = idx === 0;

              return (
                <li key={idx} className="flex items-center gap-1.5 min-w-0">
                  {idx > 0 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                  )}

                  {isLast ? (
                    <span
                      aria-current="page"
                      className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-xs md:max-w-md"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigate(crumb.tab || 'home', crumb.serviceId)}
                      className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer shrink-0 truncate max-w-[120px] sm:max-w-none"
                    >
                      {isFirst && <Home className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                      <span>{crumb.label}</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

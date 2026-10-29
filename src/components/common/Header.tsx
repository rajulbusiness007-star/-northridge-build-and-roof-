import React, { useState } from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import { BusinessConfig } from '../../data/businessConfig';

interface HeaderProps {
  business: BusinessConfig;
  currentTab: string;
  onNavigate: (tab: string, serviceId?: string) => void;
  onOpenAdminModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  business,
  currentTab,
  onNavigate,
  onOpenAdminModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'roofing', label: 'Roofing' },
    { id: 'outdoor', label: 'Outdoor' },
    { id: 'construction', label: 'Construction' },
    { id: 'projects', label: 'Projects' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
    { id: 'quote', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    if (id === 'roofing') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('roofing-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (id === 'outdoor') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('outdoor-services-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (id === 'construction') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('construction-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (id === 'projects') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('recent-projects-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (id === 'reviews') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('reviews-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (id === 'faq') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('faq-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (id === 'quote') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('start-project-form');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-7">
              <path d="M18 4L34 28H22L18 20L14 28H2L18 4Z" fill="#16222f" />
              <path d="M30 10L46 32H34L30 25L26 32H16L30 10Z" fill="#c86438" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-wider text-[#16222f] uppercase leading-none">
              NORTHRIDGE
            </span>
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-slate-500 uppercase leading-tight mt-1">
              BUILD &amp; ROOF
            </span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-700">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer text-sm font-semibold tracking-wide ${
                  isActive
                    ? 'text-[#c86438]'
                    : 'hover:text-[#c86438]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <a
            href={business.phone}
            className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-[#c86438]" />
            <span className="font-mono">{business.phoneDisplay}</span>
          </a>

          <button
            onClick={() => handleLinkClick('quote')}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#c86438] hover:bg-[#b3532b] rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <span>GET A QUOTE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {onOpenAdminModal && (
            <button
              onClick={onOpenAdminModal}
              title="Business Settings & Leads Portal"
              className="text-[11px] text-slate-400 hover:text-slate-700 border border-slate-300 rounded px-2.5 py-1.5 transition-colors whitespace-nowrap cursor-pointer hover:border-slate-500"
            >
              Portal
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleLinkClick('quote')}
            className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#c86438] rounded-md shadow-xs"
          >
            Quote
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-5 pt-4 pb-6 space-y-4 shadow-xl">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left py-2.5 px-3 text-sm font-semibold rounded-md ${
                  currentTab === link.id
                    ? 'bg-[#c86438]/10 text-[#c86438]'
                    : 'text-slate-700 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { onNavigate('tools'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2.5 px-3 text-sm font-semibold text-slate-600 hover:bg-stone-50 rounded-md"
            >
              Interactive Roof Estimator
            </button>
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            <button
              onClick={() => handleLinkClick('quote')}
              className="w-full py-3 bg-[#c86438] hover:bg-[#b3532b] text-white font-bold uppercase tracking-wider text-xs rounded-md text-center shadow-sm"
            >
              GET A FREE QUOTE
            </button>
            <a
              href={business.phone}
              className="w-full py-2.5 bg-slate-100 text-slate-800 font-semibold text-xs rounded-md flex items-center justify-center gap-2 font-mono"
            >
              <Phone className="w-4 h-4 text-[#c86438]" />
              <span>Call {business.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

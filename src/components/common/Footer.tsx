import React from 'react';
import { Phone, Mail, MapPin, Clock, Shield, CheckCircle, Facebook, Instagram, Youtube } from 'lucide-react';
import { BusinessConfig } from '../../data/businessConfig';

interface FooterProps {
  business: BusinessConfig;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ business, onNavigate }) => {
  return (
    <footer className="bg-[#0f1721] text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-6">
                  <path d="M18 4L34 28H22L18 20L14 28H2L18 4Z" fill="#e2e8f0" fillOpacity="0.9" />
                  <path d="M30 10L46 32H34L30 25L26 32H16L30 10Z" fill="#c86438" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-black tracking-wider text-white uppercase block leading-none">
                  NORTHRIDGE
                </span>
                <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase block mt-1">
                  BUILD &amp; ROOF
                </span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm text-xs">
              Reliable exterior work for homes and businesses. High-performance roofing, custom outdoor living additions, and premium residential construction engineered to exceed code.
            </p>

            <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#c86438] shrink-0" />
                <span>{business.credentials.licenseTitle}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{business.credentials.insuranceCoverage}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{business.credentials.workmanshipWarranty}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-white font-bold mb-3 tracking-wider text-xs uppercase text-terracotta">
              Core Services
            </div>
            <ul className="space-y-2">
              {[
                { id: 'services', label: 'Roof Replacement' },
                { id: 'services', label: 'Precision Roof Repair' },
                { id: 'services', label: 'Standing Seam Metal' },
                { id: 'services', label: 'Storm & Hail Restoration' },
                { id: 'home', label: 'Tree Removal & Care' },
                { id: 'home', label: 'Custom Decks & Pergolas' },
                { id: 'home', label: 'Exterior Renovations' },
              ].map((s, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(s.id)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-bold mb-3 tracking-wider text-xs uppercase text-terracotta">
              Interactive Tools
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-white transition-colors cursor-pointer">
                  Instant Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-white transition-colors cursor-pointer">
                  Book 21-Pt Inspection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-white transition-colors cursor-pointer">
                  Storm Damage Checklist
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors cursor-pointer">
                  Recent Projects Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-white transition-colors flex items-center gap-1 text-[#c86438] cursor-pointer">
                  <span>★ Verified Reviews</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('financing')} className="hover:text-white transition-colors cursor-pointer">
                  0% APR Financing Plans
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold mb-3 tracking-wider text-xs uppercase text-terracotta">
              Direct Contact
            </div>
            <div className="space-y-3">
              <a
                href={business.phone}
                className="flex items-start gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#c86438] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white font-mono">{business.phoneDisplay}</div>
                  <div className="text-[11px] text-slate-400">Direct Office &amp; Estimating</div>
                </div>
              </a>

              <a
                href={`mailto:${business.email}`}
                className="flex items-start gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="break-all">{business.email}</span>
              </a>

              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{business.address.full}</span>
              </div>

              <div className="flex items-start gap-2 text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div className="text-[11px] space-y-0.5">
                  <div>{business.workingHours.weekdays}</div>
                  <div className="text-[#c86438] font-medium">{business.workingHours.emergency}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-4">
                <path d="M18 4L34 28H22L18 20L14 28H2L18 4Z" fill="#e2e8f0" fillOpacity="0.9" />
                <path d="M30 10L46 32H34L30 25L26 32H16L30 10Z" fill="#c86438" />
              </svg>
            </div>
            <span className="text-sm font-black tracking-wider text-white uppercase">
              NORTHRIDGE <span className="text-slate-400 font-semibold text-xs tracking-widest">BUILD &amp; ROOF</span>
            </span>
          </div>

          <div className="text-xs font-semibold tracking-widest text-slate-300 uppercase">
            ROOFING <span className="text-[#c86438]">•</span> BUILDING <span className="text-[#c86438]">•</span> OUTDOOR
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#facebook" aria-label="Facebook" className="hover:text-white transition-colors p-1">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#instagram" aria-label="Instagram" className="hover:text-white transition-colors p-1">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#youtube" aria-label="YouTube" className="hover:text-white transition-colors p-1">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800/60 text-[11px] text-center text-slate-400">
          &copy; {new Date().getFullYear()} Northridge Build &amp; Roof / {business.name}. Licensed &amp; Insured Texas Contractor. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

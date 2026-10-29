import React from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { BusinessConfig } from '../../data/businessConfig';

interface MobileStickyBarProps {
  business: BusinessConfig;
  onOpenQuote: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ business, onOpenQuote }) => {
  return (
    <aside
      aria-label="Quick contact actions"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 no-print shadow-xl"
      style={{ maxHeight: '60px' }}
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href={business.phone}
          className="flex-1 h-10 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-semibold border border-slate-700 transition-colors shrink-0"
        >
          <Phone className="w-3.5 h-3.5 text-[#e05d26] shrink-0" />
          <span className="truncate whitespace-nowrap">Call {business.phoneDisplay}</span>
        </a>

        <button
          type="button"
          onClick={onOpenQuote}
          className="flex-1 h-10 px-3 bg-[#e05d26] hover:bg-[#c94d1b] text-white rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors shrink-0 cursor-pointer shadow-sm"
        >
          <CalendarCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate whitespace-nowrap">Free Estimate</span>
        </button>
      </div>
    </aside>
  );
};

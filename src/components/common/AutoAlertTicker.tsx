import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Phone, ArrowRight, X, ShieldAlert, Sparkles } from 'lucide-react';
import { BusinessConfig } from '../../data/businessConfig';

interface AutoAlertTickerProps {
  business: BusinessConfig;
  onBookInspection: () => void;
  onOpenEstimator: () => void;
}

interface AlertItem {
  id: string;
  tag: string;
  title: string;
  ctaText: string;
  actionType: 'inspection' | 'call' | 'estimator';
}

export const AutoAlertTicker: React.FC<AutoAlertTickerProps> = ({
  business,
  onBookInspection,
  onOpenEstimator,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const alerts: AlertItem[] = [
    {
      id: 'alert-storm',
      tag: 'STORM DISPATCH ACTIVE',
      title: 'Severe Hail & Wind Alert: Free 21-point insurance audit teams actively dispatched across DFW.',
      ctaText: 'Claim Free Audit',
      actionType: 'inspection',
    },
    {
      id: 'alert-emergency',
      tag: '24/7 RAPID TARPING',
      title: 'Active ceiling or roof leak? Our emergency water intrusion crew responds within 2 hours.',
      ctaText: `Call ${business.phoneDisplay}`,
      actionType: 'call',
    },
    {
      id: 'alert-pricing',
      tag: 'INSTANT BUDGET TOOL',
      title: 'Planning a replacement? Calculate an accurate itemized estimate range in under 60 seconds.',
      ctaText: 'Open Cost Estimator',
      actionType: 'estimator',
    },
  ];

  useEffect(() => {
    if (isPaused || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % alerts.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, isVisible, alerts.length]);

  if (!isVisible) return null;

  const current = alerts[currentIndex];

  const handleAction = () => {
    if (current.actionType === 'inspection') onBookInspection();
    if (current.actionType === 'estimator') onOpenEstimator();
    if (current.actionType === 'call') window.location.href = business.phone;
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-orange-600 text-white text-xs py-2 px-4 shadow-sm border-b border-orange-700 relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Animated Slide Content */}
        <div className="flex-1 flex items-center gap-2.5 overflow-hidden">
          <span className="font-mono text-[10px] font-extrabold uppercase bg-orange-950/40 text-orange-100 px-2 py-0.5 rounded border border-orange-400/30 shrink-0">
            {current.tag}
          </span>

          <div
            key={current.id}
            className="truncate transition-all duration-500 ease-out animate-fadeIn flex-1"
          >
            <span className="font-medium text-white">{current.title}</span>
          </div>

          <button
            type="button"
            onClick={handleAction}
            className="hidden sm:inline-flex items-center gap-1 font-bold text-[11px] bg-white text-orange-700 hover:bg-orange-50 px-2.5 py-1 rounded-md transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            <span>{current.ctaText}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Controls & Indicators */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex gap-1">
            {alerts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all cursor-pointer ${
                  i === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-orange-300/60'
                }`}
                aria-label={`Go to alert ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss alert ticker"
            className="p-1 hover:bg-orange-700 rounded text-orange-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

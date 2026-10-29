import React, { useState } from 'react';
import { Calculator, Calendar, ShieldAlert, Layers, ClipboardCheck } from 'lucide-react';
import { RoofEstimator } from '../tools/RoofEstimator';
import { InspectionScheduler } from '../tools/InspectionScheduler';
import { StormChecklist } from '../tools/StormChecklist';
import { MaterialComparison } from '../tools/MaterialComparison';
import { MaintenanceChecklist } from '../tools/MaintenanceChecklist';

interface ToolsPageProps {
  initialTool?: string;
  onSendEstimateToQuote: (estData: any) => void;
  onBookInspectionRequested: () => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({
  initialTool = 'estimator',
  onSendEstimateToQuote,
  onBookInspectionRequested,
}) => {
  const [activeTool, setActiveTool] = useState<string>(initialTool);

  const tools = [
    { id: 'estimator', label: 'Cost Estimator', icon: Calculator },
    { id: 'inspection', label: 'Book Inspection', icon: Calendar },
    { id: 'storm', label: 'Storm Checklist', icon: ShieldAlert },
    { id: 'comparison', label: 'Material Matrix', icon: Layers },
    { id: 'maintenance', label: 'Seasonal Care', icon: ClipboardCheck },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="max-w-3xl">
        <div className="text-xs font-semibold text-[#e05d26] uppercase tracking-wider mb-2">
          Diagnostic &amp; Planning Utilities
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Customer Roofing Tools &amp; Estimators
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          Interactive calculators, damage checklists, and material comparisons designed to help you make informed, confident decisions for your property.
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {tools.map((t) => {
            const Icon = t.icon;
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTool(t.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#e05d26]' : 'text-slate-500'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        {activeTool === 'estimator' && (
          <RoofEstimator onSendToQuote={onSendEstimateToQuote} />
        )}
        {activeTool === 'inspection' && (
          <InspectionScheduler />
        )}
        {activeTool === 'storm' && (
          <StormChecklist onScheduleInspection={() => setActiveTool('inspection')} />
        )}
        {activeTool === 'comparison' && (
          <MaterialComparison />
        )}
        {activeTool === 'maintenance' && (
          <MaintenanceChecklist onBookTuneup={() => setActiveTool('inspection')} />
        )}
      </div>
    </div>
  );
};

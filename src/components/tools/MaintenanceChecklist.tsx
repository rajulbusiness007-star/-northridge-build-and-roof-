import React, { useState } from 'react';
import { ClipboardCheck, Printer, CheckSquare, Square, Calendar, ArrowRight, Shield } from 'lucide-react';

export const MaintenanceChecklist: React.FC<{ onBookTuneup?: () => void }> = ({ onBookTuneup }) => {
  const [activeSeason, setActiveSeason] = useState<'spring' | 'summer' | 'fall' | 'winter'>('spring');
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>({});

  const seasonalTasks = {
    spring: [
      { id: 'sp-1', task: 'Ground-level roof shingle visual check', detail: 'Scan eaves and ridges with binoculars for shingles loosened by winter freezes.' },
      { id: 'sp-2', task: 'Check attic insulation for water stains', detail: 'Examine plywood decking beneath chimney and plumbing vent penetrations.' },
      { id: 'sp-3', task: 'Clear winter debris from roof valleys', detail: 'Leaves and twigs collect in slope valleys, creating dams that push water under shingles.' },
      { id: 'sp-4', task: 'Verify gutter downspout discharge', detail: 'Run garden hose through gutters to ensure water discharges 6+ feet away from foundation.' }
    ],
    summer: [
      { id: 'su-1', task: 'Post-thunderstorm hail inspection', detail: 'After severe storms, inspect soft metal vents and AC condenser fins for hail dimples.' },
      { id: 'su-2', task: 'Check attic soffit and ridge vent airflow', detail: 'Ensure insulation does not block soffit vents to prevent extreme summer attic heat buildup.' },
      { id: 'su-3', task: 'Inspect sealants around plumbing pipe boots', detail: 'Summer heat bakes rubber boot collars; check for drying, cracks, and splitting.' },
      { id: 'su-4', task: 'Trim overhanging tree limbs', detail: 'Cut branches back at least 6 to 8 feet from the roof surface to prevent storm impact and squirrels.' }
    ],
    fall: [
      { id: 'fa-1', task: 'Comprehensive gutter and downspout cleaning', detail: 'Remove all autumn leaf fall to prevent gutter overflowing and winter ice dam formation.' },
      { id: 'fa-2', task: 'Inspect chimney mortar cap and flashing', detail: 'Ensure step flashing and counter flashing caulking is intact against masonry.' },
      { id: 'fa-3', task: 'Check for animal nesting under roof overhangs', detail: 'Look for bird nests or raccoons attempting attic entry prior to winter.' },
      { id: 'fa-4', task: 'Ensure downspout ground elbows are securely fastened', detail: 'Re-tighten sheet metal screws so snow and wind do not dislodge extensions.' }
    ],
    winter: [
      { id: 'wi-1', task: 'Monitor roof edges for ice dam formation', detail: 'Thick icicles along gutter edges indicate insufficient attic insulation causing heat loss.' },
      { id: 'wi-2', task: 'Check top-floor ceilings after major snow thaw', detail: 'Look for drywall discoloration where ice dams may have backed up under shingles.' },
      { id: 'wi-3', task: 'Safely observe snow drift accumulation', detail: 'On low-slope roofs, monitor excessive drift accumulation around parapets.' },
      { id: 'wi-4', task: 'Keep professional emergency roofer contact handy', detail: 'Have Apex Crest Roofing hotline saved for 24/7 winter emergency tarping.' }
    ]
  };

  const currentTasks = seasonalTasks[activeSeason];
  const toggle = (id: string) => {
    setCheckedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = currentTasks.filter(t => checkedTasks[t.id]).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 bg-slate-900 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">Seasonal Roof Maintenance Checklist</h3>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors cursor-pointer no-print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Current Season</span>
          </button>
        </div>
        <p className="text-slate-300 text-sm max-w-2xl">
          Ground-level preventative observations designed to protect your home year-round. Complete these tasks or schedule our professional semi-annual roof maintenance tune-up.
        </p>

        {/* Season Selector Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { id: 'spring', label: 'Spring Wake-Up' },
            { id: 'summer', label: 'Summer Storm Season' },
            { id: 'fall', label: 'Autumn Gutter Prep' },
            { id: 'winter', label: 'Winter Freeze Check' },
          ].map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSeason(s.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeSeason === s.id
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-4 text-xs font-medium text-slate-600">
          <span>{completedCount} of {currentTasks.length} tasks completed</span>
          <span className="font-mono">{Math.round((completedCount / currentTasks.length) * 100)}% Complete</span>
        </div>

        <div className="space-y-3">
          {currentTasks.map((t) => {
            const isDone = !!checkedTasks[t.id];
            return (
              <div
                key={t.id}
                onClick={() => toggle(t.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isDone
                    ? 'border-emerald-300 bg-emerald-50/50 text-slate-900'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-emerald-600">
                  {isDone ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-400" />}
                </div>
                <div>
                  <div className={`font-semibold text-sm ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {t.task}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">{t.detail}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Prefer a professional tune-up? Includes 100% written health certification.</span>
          </div>
          <button
            type="button"
            onClick={onBookTuneup}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all shadow cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Book Professional Roof Tune-Up</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

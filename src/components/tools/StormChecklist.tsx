import React, { useState } from 'react';
import { AlertTriangle, CheckSquare, Square, ShieldAlert, ArrowRight, Printer, Info } from 'lucide-react';

interface StormChecklistProps {
  onScheduleInspection?: () => void;
}

export const StormChecklist: React.FC<StormChecklistProps> = ({ onScheduleInspection }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const checklistItems = [
    {
      id: 'missing_shingles',
      severity: 'high',
      title: 'Missing, Lifted, or Creased Shingles',
      description: 'Shingles torn off, tabs flapping in high wind, or horizontal crease marks across shingle faces visible from the yard.',
      groundCheckTip: 'Look from the sidewalk or driveway with binoculars. Never climb on the roof.'
    },
    {
      id: 'granules_downspout',
      severity: 'medium',
      title: 'Heavy Granule Accumulation in Downspouts',
      description: 'Dark gravel-like mineral granules washing out of downspouts or collecting in gutter discharge trays.',
      groundCheckTip: 'Inspect the ground directly beneath downspout splash blocks after rain.'
    },
    {
      id: 'dented_metal_gutters',
      severity: 'high',
      title: 'Dents on Soft Metal, Gutters, or AC Fins',
      description: 'Small circular dings on aluminum gutters, downspouts, metal roof vents, mailbox tops, or AC condenser coils.',
      groundCheckTip: 'Soft metals reveal hail impact size (dents > 1 inch signal high probability of roof shingle bruising).'
    },
    {
      id: 'interior_ceiling_stains',
      severity: 'critical',
      title: 'Interior Ceiling Stains or Peeling Paint',
      description: 'Brownish water circles, drywall sagging, or damp yellow discoloration on ceilings or top-floor corners.',
      groundCheckTip: 'Check top-floor bedroom closets and ceilings adjacent to exterior walls.'
    },
    {
      id: 'attic_daylight_drips',
      severity: 'critical',
      title: 'Attic Moisture, Damp Insulation, or Daylight',
      description: 'Pins of daylight visible through roof plywood, damp fiberglass insulation, or wet rafters after rain.',
      groundCheckTip: 'Safely inspect attic with a flashlight from attic stairs without stepping off walking boards.'
    },
    {
      id: 'tree_branch_impact',
      severity: 'high',
      title: 'Tree Limb Scrapes or Debris Piles',
      description: 'Branches fallen directly on roof valleys, scuffed granules, or dislodged plumbing vents.',
      groundCheckTip: 'Check valleys where roof slopes meet, as debris traps water and causes overflow.'
    }
  ];

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedCount = Object.values(checkedItems).filter(Boolean).length;

  const getRiskAssessment = () => {
    if (selectedCount === 0) {
      return {
        level: 'Normal',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        action: 'No acute storm damage observed from ground level. Keep up with annual seasonal inspections.',
      };
    } else if (selectedCount <= 2) {
      return {
        level: 'Moderate Storm Damage Detected',
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        action: 'Isolated damage signs detected. A certified 21-point physical roof inspection is strongly recommended before next rainfall.',
      };
    } else {
      return {
        level: 'Severe Storm Damage / Water Intrusion Risk',
        badge: 'bg-red-100 text-red-800 border-red-200',
        action: 'High likelihood of active substrate moisture and insurance-claimable loss. Immediate emergency assessment and tarping recommended.',
      };
    }
  };

  const risk = getRiskAssessment();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 bg-slate-900 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">Interactive Storm Damage Assessment</h3>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors cursor-pointer no-print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Checklist</span>
          </button>
        </div>
        <p className="text-slate-300 text-sm max-w-3xl">
          Conduct a safe, ground-level assessment after severe hail or high-wind storms. Check off any indicators you observe from ground level.
        </p>

        {/* Safety Warning */}
        <div className="mt-4 p-3 rounded-xl bg-orange-950/70 border border-orange-500/40 text-xs text-orange-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <span>
            <strong>Safety Advisory:</strong> Never climb onto a potentially damaged, steep, or wet roof. Shingles may be loose and hail-weakened decking can puncture. All observations should be made from ground level with binoculars or from safe interior attic access.
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Checklist Items */}
        <div className="lg:col-span-8 space-y-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Ground-Level Indicators ({selectedCount} of {checklistItems.length} checked)
          </div>

          {checklistItems.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isChecked
                    ? 'border-orange-500 bg-orange-50/50 text-slate-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/60 text-slate-700'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-orange-600">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">{item.title}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                        item.severity === 'critical'
                          ? 'border-red-200 text-red-700 bg-red-50'
                          : item.severity === 'high'
                          ? 'border-amber-200 text-amber-700 bg-amber-50'
                          : 'border-slate-200 text-slate-600 bg-white'
                      }`}
                    >
                      {item.severity} indicator
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  <div className="text-[11px] text-slate-500 font-medium pt-1">
                    Tip: {item.groundCheckTip}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-time Assessment Summary */}
        <div className="lg:col-span-4 bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
              Damage Summary
            </div>
            <div className="text-2xl font-bold font-mono tracking-tight mb-2">
              {selectedCount} Signs Found
            </div>
            <div className={`p-3 rounded-lg border text-xs font-semibold mb-4 ${risk.badge}`}>
              {risk.level}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {risk.action}
            </p>

            <div className="p-3 bg-slate-800 rounded-lg text-[11px] text-slate-400 space-y-1.5 border border-slate-700/60">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-orange-400" />
                <span>Disclaimer</span>
              </div>
              <p>
                This self-checklist is an observational guideline for ground-level safety and does not constitute a forensic engineering inspection or guarantee of damage detection.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <button
              type="button"
              onClick={onScheduleInspection}
              className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Certified Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-center text-[11px] text-slate-400">
              Includes comprehensive insurance documentation report
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

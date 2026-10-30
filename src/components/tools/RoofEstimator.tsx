import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

interface RoofEstimatorProps {
  onSendToQuote?: (estimateData: {
    sqft: number;
    pitch: string;
    material: string;
    tearOff: string;
    totalMin: number;
    totalMax: number;
  }) => void;
}

export const RoofEstimator: React.FC<RoofEstimatorProps> = ({ onSendToQuote }) => {
  const [sqft, setSqft] = useState<number>(2400);
  const [pitch, setPitch] = useState<'flat' | 'low' | 'medium' | 'steep'>('medium');
  const [material, setMaterial] = useState<'shingle_standard' | 'shingle_class4' | 'metal_standing' | 'tpo_flat'>('shingle_class4');
  const [tearOff, setTearOff] = useState<'one_layer' | 'two_layers' | 'none'>('one_layer');
  const [stories, setStories] = useState<1 | 2 | 3>(1);
  const [includeGutters, setIncludeGutters] = useState<boolean>(true);
  const [includeSyntheticUnderlayment, setIncludeSyntheticUnderlayment] = useState<boolean>(true);

  // Pitch multipliers (surface area expansion from flat footprint)
  const pitchMultipliers = {
    flat: 1.02,
    low: 1.08,     // 4/12 pitch
    medium: 1.20,  // 6/12 - 8/12 pitch
    steep: 1.38,   // 9/12+ pitch
  };

  // Cost per roofing square (100 sq ft) for material + skilled installation
  const materialCostsPerSquare = {
    shingle_standard: { min: 420, max: 490, name: 'Architectural Shingles (30-Year)' },
    shingle_class4: { min: 520, max: 610, name: 'Class 4 Impact Shingles (Hail Rated)' },
    metal_standing: { min: 920, max: 1180, name: 'Standing Seam Metal (24-Gauge)' },
    tpo_flat: { min: 550, max: 680, name: 'Commercial TPO Membrane (60-mil)' },
  };

  // Tear-off per square
  const tearOffCosts = {
    none: { min: 0, max: 0 },
    one_layer: { min: 50, max: 65 },
    two_layers: { min: 95, max: 125 },
  };

  // Stories multiplier
  const storyMultiplier = stories === 1 ? 1.0 : stories === 2 ? 1.12 : 1.25;

  // Actual roof surface area in squares (1 square = 100 sq ft)
  const effectiveAreaSqft = Math.round(sqft * pitchMultipliers[pitch]);
  const roofingSquares = effectiveAreaSqft / 100;

  // Base materials & labor
  const baseMatMin = roofingSquares * materialCostsPerSquare[material].min * storyMultiplier;
  const baseMatMax = roofingSquares * materialCostsPerSquare[material].max * storyMultiplier;

  // Tear off & disposal
  const tearMin = roofingSquares * tearOffCosts[tearOff].min;
  const tearMax = roofingSquares * tearOffCosts[tearOff].max;

  // Extras
  const underlaymentCost = includeSyntheticUnderlayment ? roofingSquares * 32 : 0;
  // Estimated gutter perimeter ~ sqrt(sqft)*3.5
  const estimatedGutterFeet = Math.round(Math.sqrt(sqft) * 3.2);
  const gutterCost = includeGutters ? estimatedGutterFeet * 16 : 0;

  const totalMin = Math.round(baseMatMin + tearMin + underlaymentCost + gutterCost);
  const totalMax = Math.round(baseMatMax + tearMax + underlaymentCost + gutterCost);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-900 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-6 h-6 text-orange-500" />
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">Interactive Roofing Cost Estimator</h3>
        </div>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Configure real roof parameters below to calculate an immediate preliminary budget range based on verified local Texas labor and material indices.
        </p>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Square footage slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-800">
                Approximate Home / Building Size
              </label>
              <span className="font-mono text-base font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded">
                {sqft.toLocaleString()} sq ft ({roofingSquares.toFixed(1)} squares)
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="6500"
              step="100"
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
              <span>1,000 sq ft</span>
              <span>2,500 sq ft (Avg)</span>
              <span>6,500+ sq ft</span>
            </div>
          </div>

          {/* Roof Pitch */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Roof Pitch &amp; Complexity
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'flat', label: 'Flat / Low Slope', sub: '< 2/12 pitch' },
                { id: 'low', label: 'Walkable Slope', sub: '4/12 pitch' },
                { id: 'medium', label: 'Standard Gable', sub: '6/12 – 8/12' },
                { id: 'steep', label: 'Steep / Turrets', sub: '9/12+ pitch' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPitch(item.id as any)}
                  className={`p-3 text-left rounded-xl border transition-all text-xs ${
                    pitch === item.id
                      ? 'border-orange-600 bg-orange-50/60 text-slate-900 ring-1 ring-orange-600'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-semibold">{item.label}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Desired Roofing Material
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'shingle_standard', name: 'Architectural Shingle', desc: 'GAF/CertainTeed 30-Year Dimensional' },
                { id: 'shingle_class4', name: 'Class 4 Impact Shingle', desc: 'Hail resistant, up to 28% insurance discounts' },
                { id: 'metal_standing', name: 'Standing Seam Metal', desc: '24-gauge Galvalume steel, 50+ yr life' },
                { id: 'tpo_flat', name: 'Commercial TPO Membrane', desc: '60-mil reflective white flat roof' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMaterial(item.id as any)}
                  className={`p-3 text-left rounded-xl border transition-all text-xs ${
                    material === item.id
                      ? 'border-orange-600 bg-orange-50/60 text-slate-900 ring-1 ring-orange-600'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tear Off & Stories in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Existing Roof Tear-Off
              </label>
              <select
                value={tearOff}
                onChange={(e) => setTearOff(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="one_layer">1 Layer of Shingles (Standard)</option>
                <option value="two_layers">2 Layers (Double Tear-Off)</option>
                <option value="none">New Construction (No Tear-Off)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Building Height / Stories
              </label>
              <div className="flex gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setStories(num as any)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-all ${
                      stories === num
                        ? 'border-orange-600 bg-orange-50/60 text-slate-900 ring-1 ring-orange-600'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {num} {num === 1 ? 'Story' : num === 3 ? '3+ Stories' : 'Stories'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add-ons Checkboxes */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={includeSyntheticUnderlayment}
                onChange={(e) => setIncludeSyntheticUnderlayment(e.target.checked)}
                className="accent-orange-600 w-4 h-4 rounded"
              />
              <span>High-Performance Synthetic Underlayment &amp; Ice Barrier</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={includeGutters}
                onChange={(e) => setIncludeGutters(e.target.checked)}
                className="accent-orange-600 w-4 h-4 rounded"
              />
              <span>Seamless 6" Aluminum Gutters Replacement</span>
            </label>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 bg-slate-900 rounded-xl p-6 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-semibold tracking-wide text-orange-400">
                PRELIMINARY ESTIMATE RANGE
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {roofingSquares.toFixed(1)} Squares
              </span>
            </div>

            <div className="my-6">
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight font-mono text-white">
                ${totalMin.toLocaleString()} – ${totalMax.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Includes complete labor, materials, permits &amp; disposal</span>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs text-slate-300 py-4 border-t border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Material:</span>
                <span className="font-medium text-white">{materialCostsPerSquare[material].name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Surface Adjustment:</span>
                <span className="font-mono text-white">~{effectiveAreaSqft.toLocaleString()} actual sq ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tear-Off &amp; Dumpster:</span>
                <span className="font-mono text-white">${tearMin.toLocaleString()} – ${tearMax.toLocaleString()}</span>
              </div>
              {includeGutters && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Seamless Gutters (~{estimatedGutterFeet} LF):</span>
                  <span className="font-mono text-white">${gutterCost.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>
                <strong>Non-Binding Estimate:</strong> Official project pricing requires an on-site physical walk to verify deck wood condition, chimney crickets, and local building code setbacks.
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <button
              type="button"
              onClick={() => {
                if (onSendToQuote) {
                  onSendToQuote({
                    sqft,
                    pitch,
                    material: materialCostsPerSquare[material].name,
                    tearOff,
                    totalMin,
                    totalMax,
                  });
                }
              }}
              className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Transfer Estimate to Free Quote Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Free · No Obligation · Zero Spam</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Layers, ShieldCheck, Check, X, HelpCircle } from 'lucide-react';

export const MaterialComparison: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'budget' | 'longevity' | 'hail'>('all');

  const materials = [
    {
      name: 'Architectural Shingles (GAF/CertainTeed)',
      category: 'Residential Asphalt',
      lifespan: '25 – 35 Years',
      costPerSquare: '$420 – $490',
      windRating: '130 mph',
      impactRating: 'Class 3 / Class 4 available',
      fireRating: 'Class A (Highest)',
      maintenance: 'Low',
      sriEnergy: 'Moderate (Solar Reflective available)',
      bestFor: 'Best overall value for standard residential homes with rich dimensional curb appeal.',
      pros: ['Cost-effective', 'Fast 1-day installation', 'Huge color selection', 'Easy point repair'],
      cons: ['Shorter lifespan than metal', 'Vulnerable to extreme hail over 1.75"'],
      isRecommended: true,
    },
    {
      name: 'Standing Seam Metal (24-Gauge Galvalume)',
      category: 'Lifetime Specialty',
      lifespan: '50 – 70+ Years',
      costPerSquare: '$920 – $1,180',
      windRating: '140+ mph',
      impactRating: 'Class 4 (Highest)',
      fireRating: 'Class A (Non-combustible)',
      maintenance: 'Ultra-Low',
      sriEnergy: 'High (Kynar 500 cool roof)',
      bestFor: 'Luxury modern homes, steep gables, and homeowners wanting their last roof ever.',
      pros: ['Zero exposed fasteners', 'Saves up to 25% on AC bills', 'Immune to rot and mold', 'Increases resale value'],
      cons: ['Higher initial upfront investment', 'Requires specialized craftsmen'],
      isRecommended: false,
    },
    {
      name: 'Commercial Single-Ply TPO (60-mil)',
      category: 'Flat & Low Slope',
      lifespan: '25 – 30 Years',
      costPerSquare: '$550 – $680',
      windRating: '120 mph',
      impactRating: 'Class 4 available with fleece back',
      fireRating: 'Class A',
      maintenance: 'Low',
      sriEnergy: 'Ultra-High (White reflective Energy Star)',
      bestFor: 'Offices, retail plazas, flat roofs, and modern residential low-slope additions.',
      pros: ['Heat-welded waterproof seams', 'Ponding water resistant', 'Massive summer heat rejection', 'Recyclable'],
      cons: ['Requires strict slope drainage', 'Must be installed by certified flat roof crews'],
      isRecommended: false,
    },
    {
      name: 'Traditional 3-Tab Asphalt Shingles',
      category: 'Economy Residential',
      lifespan: '15 – 20 Years',
      costPerSquare: '$340 – $390',
      windRating: '60 – 70 mph',
      impactRating: 'Class 1 / Class 2',
      fireRating: 'Class A',
      maintenance: 'Medium-High',
      sriEnergy: 'Basic',
      bestFor: 'Rental units or immediate budget-constrained emergency replacements.',
      pros: ['Lowest initial material cost', 'Lightweight'],
      cons: ['Blows off in storms above 60 mph', 'Prone to cracking & curling', 'Lacks 3D depth'],
      isRecommended: false,
    },
  ];

  const filteredMaterials = materials.filter(m => {
    if (selectedFilter === 'budget') return m.costPerSquare.includes('$340') || m.costPerSquare.includes('$420');
    if (selectedFilter === 'longevity') return m.lifespan.includes('50') || m.lifespan.includes('35');
    if (selectedFilter === 'hail') return m.impactRating.includes('Class 4');
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 bg-slate-900 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">Roofing Material Comparison Matrix</h3>
          </div>
          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-xl">
            {[
              { id: 'all', label: 'All Systems' },
              { id: 'budget', label: 'Best Budget' },
              { id: 'hail', label: 'Hail & Wind Resistant' },
              { id: 'longevity', label: '50+ Year Longevity' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <p className="text-slate-300 text-sm max-w-3xl">
          Compare lifespan, realistic cost per square (100 sq ft installed), wind resistance, and energy efficiency. Note: performance and longevity depend on proper attic ventilation, installation quality, and local climate.
        </p>
      </div>

      <div className="p-6 md:p-8 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
              <th className="py-3 px-4">Roofing Material</th>
              <th className="py-3 px-4">Expected Lifespan</th>
              <th className="py-3 px-4">Avg Cost / Square</th>
              <th className="py-3 px-4">Wind Rating</th>
              <th className="py-3 px-4">Hail Impact</th>
              <th className="py-3 px-4">Fire Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
            {filteredMaterials.map((m) => (
              <tr key={m.name} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-4 font-semibold text-slate-900">
                  <div className="flex items-center gap-2">
                    <span>{m.name}</span>
                    {m.isRecommended && (
                      <span className="text-[10px] font-mono uppercase bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-bold">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal mt-0.5">{m.category}</div>
                </td>
                <td className="py-4 px-4 font-mono font-medium">{m.lifespan}</td>
                <td className="py-4 px-4 font-mono font-bold text-slate-900">{m.costPerSquare}</td>
                <td className="py-4 px-4 font-mono text-emerald-700 font-semibold">{m.windRating}</td>
                <td className="py-4 px-4">{m.impactRating}</td>
                <td className="py-4 px-4 font-medium text-slate-700">{m.fireRating}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Detailed pros & cons cards below table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
          {filteredMaterials.map((m) => (
            <div key={m.name} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="font-bold text-sm text-slate-900 mb-1">{m.name}</div>
              <p className="text-xs text-slate-600 mb-3">{m.bestFor}</p>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <div className="font-semibold text-emerald-800 flex items-center gap-1 mb-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Key Advantages</span>
                  </div>
                  <ul className="space-y-0.5 text-slate-600">
                    {m.pros.map(p => <li key={p}>· {p}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-slate-700 flex items-center gap-1 mb-1">
                    <X className="w-3.5 h-3.5 text-slate-400" />
                    <span>Considerations</span>
                  </div>
                  <ul className="space-y-0.5 text-slate-600">
                    {m.cons.map(c => <li key={c}>· {c}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

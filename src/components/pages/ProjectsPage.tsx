import React, { useState } from 'react';
import { Layers, MapPin, Calendar, Clock, CheckCircle2, ArrowRight, Eye } from 'lucide-react';
import { showcaseProjects, ProjectItem } from '../../data/projectsData';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { OptimizedImage } from '../common/OptimizedImage';

interface ProjectsPageProps {
  onRequestQuote: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onRequestQuote }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'commercial'>('all');
  const [activeMaterial, setActiveMaterial] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = showcaseProjects.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (activeMaterial !== 'all' && p.material !== activeMaterial) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="max-w-3xl">
        <div className="text-xs font-semibold text-[#e05d26] uppercase tracking-wider mb-2">
          Verified Portfolio
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Completed Roofing Projects &amp; Case Studies
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          Explore actual residential replacements, architectural standing seam metal installations, and commercial flat TPO projects across North Texas.
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-6">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['all', 'residential', 'commercial'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  activeCategory === cat ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Types' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {['all', 'Architectural Shingle', 'Standing Seam Metal', 'Commercial TPO'].map((mat) => (
              <button
                key={mat}
                type="button"
                onClick={() => setActiveMaterial(mat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeMaterial === mat ? 'bg-[#e05d26] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mat === 'all' ? 'All Materials' : mat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/9 bg-slate-950 overflow-hidden group">
                <OptimizedImage
                  src={proj.image}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-1 rounded">
                  {proj.material}
                </div>
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-1 rounded">
                  {proj.location}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{proj.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.scopeSummary}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Area</span>
                    <span className="font-semibold text-slate-900 font-mono">{proj.squareFootage.toLocaleString()} sq ft</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Turnaround</span>
                    <span className="font-semibold text-slate-900 font-mono">{proj.durationDays} Days</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Completed</span>
                    <span className="font-semibold text-slate-900 font-mono">{proj.completionYear}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-red-50/60 border border-red-100 rounded-xl">
                    <span className="font-bold text-red-800 block text-[11px] uppercase tracking-wider mb-0.5">Previous Condition</span>
                    <span className="text-slate-700 text-xs leading-relaxed">{proj.beforeDescription}</span>
                  </div>

                  <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                    <span className="font-bold text-emerald-800 block text-[11px] uppercase tracking-wider mb-0.5">Restored Solution</span>
                    <span className="text-slate-700 text-xs leading-relaxed">{proj.afterDescription}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedProject(proj)}
                className="text-xs font-semibold text-slate-800 hover:text-[#e05d26] flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-slate-500" />
                <span>View Full Case Study</span>
              </button>

              <button
                type="button"
                onClick={onRequestQuote}
                className="text-xs font-semibold text-[#e05d26] hover:underline cursor-pointer"
              >
                Estimate Similar Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono text-[#e05d26] font-bold uppercase">{selectedProject.material}</span>
                <h3 className="text-xl font-bold text-slate-900">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-900">
              <OptimizedImage
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                placeholder="blur"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="font-semibold text-slate-900 mb-1 text-sm">Detailed Project Scope</div>
                <p className="text-slate-600 leading-relaxed">{selectedProject.scopeSummary}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="font-semibold text-slate-900 text-xs">Architectural Inclusions</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.keyFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#e05d26] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onRequestQuote();
                }}
                className="px-5 py-2 bg-[#e05d26] hover:bg-[#c94d1b] text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Get Quote for this Roof Style
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

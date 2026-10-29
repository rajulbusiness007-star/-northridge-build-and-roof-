import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { blogArticles, BlogPost } from '../../data/blogData';

interface BlogPageProps {
  onScheduleInspection: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onScheduleInspection }) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="max-w-3xl">
        <div className="text-xs font-semibold text-[#e05d26] uppercase tracking-wider mb-2">
          Knowledge Base &amp; Education
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Roofing Guides &amp; Property Owner Resources
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          Expert trade guidance on post-storm insurance navigation, material lifespan comparisons, attic moisture prevention, and building envelope maintenance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogArticles.map((art) => (
          <article
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 hover:border-slate-300 transition-all cursor-pointer shadow-xs flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-[#e05d26]">{art.category}</span>
                <span aria-hidden="true">·</span>
                <span>{art.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>{art.readTime}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#e05d26] transition-colors leading-snug">
                {art.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {art.excerpt}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-1.5">
                <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1">
                  Key Insights:
                </div>
                {art.keyTakeaways.map((k, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e05d26] shrink-0 mt-0.5" />
                    <span>{k}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-[#e05d26]">
              <span>Read Full Analysis</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </article>
        ))}
      </div>

      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-[#e05d26]">{selectedArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {selectedArticle.title}
            </h2>

            <div className="bg-orange-50/70 p-4 rounded-xl border border-orange-100 space-y-1.5 text-xs">
              <div className="font-bold text-orange-950">Key Executive Takeaways</div>
              {selectedArticle.keyTakeaways.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2 text-orange-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e05d26] shrink-0 mt-0.5" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
              {selectedArticle.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Concerned about hail damage or roof aging on your home?
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedArticle(null);
                    onScheduleInspection();
                  }}
                  className="px-5 py-2 bg-[#e05d26] hover:bg-[#c94d1b] text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Book Certified Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

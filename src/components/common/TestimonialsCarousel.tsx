import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Pause, Play, ShieldCheck, Quote } from 'lucide-react';
import { BusinessConfig } from '../../data/businessConfig';

interface Testimonial {
  id: string;
  author: string;
  location: string;
  service: string;
  quote: string;
  rating: number;
  date: string;
  verified: boolean;
}

const verifiedTestimonials: Testimonial[] = [
  {
    id: 't-1',
    author: 'Marcus Vance',
    location: 'Frisco, TX',
    service: 'Class 4 Impact Shingle Replacement',
    quote: 'After the April hailstorm, two other roofers just gave quick ballpark numbers from the driveway. Apex Crest brought out an inspector who walked every inch, took 40 high-res photos, and met my State Farm adjuster on the roof. The installation took only 1.5 days and our yard was spotless.',
    rating: 5,
    date: 'Completed 2 weeks ago',
    verified: true,
  },
  {
    id: 't-2',
    author: 'Elena & David Rostova',
    location: 'Plano, TX',
    service: 'Standing Seam Metal Roof Upgrade',
    quote: 'We wanted a permanent metal roof for our modern home remodel. Their craftsmanship on the concealed clips, ridge lines, and chimney flashing is immaculate. It completely elevated our curb appeal and our summer electric bills dropped noticeably.',
    rating: 5,
    date: 'Completed 1 month ago',
    verified: true,
  },
  {
    id: 't-3',
    author: 'Robert Sterling',
    location: 'Dallas, TX',
    service: 'Commercial Flat TPO Membrane',
    quote: 'We manage a 28,000 sq ft office facility that had recurring ponding issues. Apex Crest installed tapered polyiso insulation and a 60-mil TPO system. Zero leaks through two heavy rainy seasons, completed over a weekend with no tenant disruption.',
    rating: 5,
    date: 'Completed August 2026',
    verified: true,
  },
  {
    id: 't-4',
    author: 'Christine Holloway',
    location: 'Southlake, TX',
    service: '21-Point Pre-Purchase Roof Audit',
    quote: 'During our home purchase option period, Apex Crest delivered a comprehensive 18-page drone and attic report within 20 hours. They identified hidden valley rot that the standard home inspector missed, saving us over $9,000 in closing credits.',
    rating: 5,
    date: 'Completed September 2026',
    verified: true,
  },
];

export const TestimonialsCarousel: React.FC<{ business: BusinessConfig }> = ({ business }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const DURATION = 6000; // 6 seconds per review
  const TICK = 60;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % verifiedTestimonials.length);
    setProgress(0);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + verifiedTestimonials.length) % verifiedTestimonials.length);
    setProgress(0);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextReview();
          return 0;
        }
        return prev + (TICK / DURATION) * 100;
      });
    }, TICK);

    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  const current = verifiedTestimonials[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-xs relative overflow-hidden space-y-6 select-none"
    >
      {/* Top Bar with rating badge and carousel controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-bold text-slate-900 text-xs font-mono">{business.social.rating} / 5.0</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-xs text-slate-500">{business.social.reviewCount} Verified Client Reviews</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevReview}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-orange-600" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={nextReview}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            aria-label="Next Review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Testimonial Content with smooth transition */}
      <div key={current.id} className="space-y-4 animate-fadeIn min-h-[140px] flex flex-col justify-between">
        <p className="text-sm md:text-base text-slate-700 leading-relaxed italic">
          "{current.quote}"
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs">
          <div>
            <div className="font-bold text-slate-900 text-sm">{current.author}</div>
            <div className="text-slate-500 text-[11px] mt-0.5 font-medium">
              {current.location} · {current.service}
            </div>
          </div>

          <div className="flex items-center gap-2 text-emerald-700 font-mono text-[11px] font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Customer ({current.date})</span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Slide Dots */}
      <div className="space-y-2 pt-2">
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-center gap-1.5">
          {verifiedTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                setProgress(0);
              }}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === currentIndex ? 'w-6 bg-orange-600' : 'w-2 bg-slate-200 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface ProjectSlide {
  id: string;
  image: string;
  title: string;
  tagline: string;
  location: string;
  material: string;
  specs: string;
  badge: string;
}

const projectSlides: ProjectSlide[] = [
  {
    id: 'slide-1',
    image: '/src/assets/images/hero_architectural_roof_1793269857845.jpg',
    title: 'Highland Park Luxury Residence',
    tagline: 'Dimensional Architectural Shingles with Custom Copper Valley Flashing',
    location: 'Highland Park, Dallas, TX',
    material: 'GAF Timberline HDZ · Charcoal Slate',
    specs: '130 mph Wind Rating · Lifetime Warranty · Class 4 Impact',
    badge: 'Residential Replacement',
  },
  {
    id: 'slide-2',
    image: '/src/assets/images/metal_roof_craftsmanship_1793269857705.jpg',
    title: 'Southlake Contemporary Estate',
    tagline: '24-Gauge Concealed Fastener Standing Seam Metal with Double Mechanical Locks',
    location: 'Southlake, TX',
    material: '24-Gauge Galvalume Steel · Matte Charcoal',
    specs: '50+ Year Lifespan · Class A Fire · Kynar 500 Cool Roof',
    badge: 'Lifetime Metal System',
  },
  {
    id: 'slide-3',
    image: '/src/assets/images/commercial_flat_roof_1793269857708.jpg',
    title: 'Legacy Corporate Office Campus',
    tagline: 'High-Solar-Reflectance TPO Membrane with Tapered Polyiso Drainage System',
    location: 'Plano, TX',
    material: '60-mil Single-Ply White TPO',
    specs: '25-Year NDL Warranty · Zero Ponding Water · Energy Star',
    badge: 'Commercial Flat TPO',
  },
  {
    id: 'slide-4',
    image: '/src/assets/images/roof_inspection_drone_1793269859117.jpg',
    title: 'Certified Haag Forensic Diagnostic Audit',
    tagline: 'Hands-on Physical Walk, Attic Moisture Scan & 4K Aerial Drone Diagnostics',
    location: 'Frisco, TX',
    material: '21-Point Certified Physical Inspection',
    specs: 'HAAG Certified · Insurance Approved Scope · 24-Hr Report',
    badge: 'Diagnostic Inspection',
  },
];

export const HeroShowcaseSlider: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const PROGRESS_TICK = 50;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % projectSlides.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + projectSlides.length) % projectSlides.length);
    setProgress(0);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
    setProgress(0);
  };

  // Auto-play timer loop with smooth progress
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (PROGRESS_TICK / SLIDE_DURATION) * 100;
      });
    }, PROGRESS_TICK);

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      nextSlide(); // swipe left -> next
    } else if (distance < -50) {
      prevSlide(); // swipe right -> prev
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const current = projectSlides[currentSlideIndex];

  return (
    <div
      role="region"
      aria-label="High-quality roofing projects carousel"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl aspect-4/3 lg:aspect-square bg-slate-950 select-none group"
    >
      {/* 1. Cross-Fade Images Layer */}
      {projectSlides.map((slide, index) => {
        const isActive = index === currentSlideIndex;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <OptimizedImage
              src={slide.image}
              alt={`${slide.title} - ${slide.material}`}
              fill
              priority={index === 0}
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Measured contrast scrim ensuring WCAG AA readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none" />
          </div>
        );
      })}

      {/* 2. Top Bar Pill: Project Badge & Controls */}
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between gap-2 pointer-events-auto">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/80 shadow-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span>{current.badge}</span>
        </span>

        {/* Prev / Play / Next Controls */}
        <div className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-full border border-slate-700/80 shadow-sm text-slate-300">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous project photo"
            className="p-1 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause auto-rotation' : 'Resume auto-rotation'}
            className="p-1 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-orange-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white" />
            )}
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next project photo"
            className="p-1 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Bottom Information Scrim & Manual Navigation Dots */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-5 md:p-6 text-white space-y-4">
        
        {/* Progress Countdown Bar */}
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Project Details */}
        <div className="space-y-1.5 pointer-events-none">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-mono">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{current.location}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-200">{current.material}</span>
          </div>

          <h3 className="font-extrabold text-base sm:text-lg text-white leading-tight">
            {current.title}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {current.tagline}
          </p>

          <div className="text-[11px] text-slate-400 font-mono pt-1">
            {current.specs}
          </div>
        </div>

        {/* 4. Prominent Manual Navigation Dots */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
          <div className="flex items-center gap-2" role="tablist" aria-label="Project slides">
            {projectSlides.map((s, idx) => {
              const isSelected = idx === currentSlideIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Jump to ${s.title}`}
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'w-8 bg-orange-500 shadow-md ring-2 ring-orange-500/30'
                      : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </div>

          <div className="font-mono text-xs font-semibold text-slate-400">
            0{currentSlideIndex + 1} <span className="text-slate-600">/</span> 0{projectSlides.length}
          </div>
        </div>

      </div>
    </div>
  );
};

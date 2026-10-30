import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeftRight, Play, Pause, RotateCcw } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage: string;
  title: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage = '/src/assets/images/roof_inspection_drone_1793269859117.jpg',
  afterImage,
  title,
  beforeLabel = 'Before: Aged & Hail Bruised',
  afterLabel = 'After: Class 4 Architectural Shingle',
  aspectRatio = 'aspect-16/9',
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [isAutoTransitioning, setIsAutoTransitioning] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const animDirectionRef = useRef<1 | -1>(1);

  // Auto-transition gentle sweeping motion until user takes over
  useEffect(() => {
    if (!isAutoTransitioning) return;

    const interval = setInterval(() => {
      setSliderPos((prev) => {
        let next = prev + animDirectionRef.current * 0.4;
        if (next >= 85) {
          animDirectionRef.current = -1;
          next = 85;
        } else if (next <= 15) {
          animDirectionRef.current = 1;
          next = 15;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isAutoTransitioning]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    setIsAutoTransitioning(false); // Pause auto-sweep on user touch/drag
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => {
    setIsAutoTransitioning(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="space-y-3 select-none">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold text-slate-800">{title}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutoTransitioning(!isAutoTransitioning)}
            className="flex items-center gap-1 text-[11px] font-medium text-orange-600 hover:text-orange-700 cursor-pointer"
          >
            {isAutoTransitioning ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pause Auto-Sweep</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Auto-Sweep Comparison</span>
              </>
            )}
          </button>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-[11px] text-slate-400">Drag or click to compare</span>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onClick={(e) => handleMove(e.clientX)}
        className={`relative ${aspectRatio} rounded-2xl overflow-hidden cursor-ew-resize border border-slate-200 bg-slate-900 shadow-sm`}
      >
        {/* Layer 1: After Image (Full width background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Layer 2: Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover filter contrast-90 brightness-95"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              maxWidth: 'none',
            }}
          />
        </div>

        {/* Divider Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-xl pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 text-white border-2 border-white flex items-center justify-center shadow-lg">
            <ChevronsLeftRight className="w-4 h-4 text-orange-400" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md pointer-events-none">
          {beforeLabel}
        </div>
        <div className="absolute top-3 right-3 bg-orange-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md pointer-events-none">
          {afterLabel}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef, useMemo } from 'react';

/**
 * Next.js-compatible Image Component
 * Provides responsive srcsets, WebP formatting, blur-up placeholders,
 * and automatic <head> preloading for high-priority hero images to maximize LCP scores.
 */

export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder' | 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  unoptimized?: boolean;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  className?: string;
  style?: React.CSSProperties;
  loader?: (props: { src: string; width: number; quality?: number }) => string;
}

// Next.js standard breakpoints & responsive widths
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const IMAGE_SIZES = [16, 32, 48, 64, 96, 128, 256, 384];
const ALL_SIZES = [...IMAGE_SIZES, ...DEVICE_SIZES].sort((a, b) => a - b);

/**
 * Generates an SVG shimmer data URL for blur-up placeholders
 */
export function generateShimmerPlaceholder(w = 800, h = 500): string {
  const svg = `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="roof-shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop stop-color="#0f172a" offset="0%" />
      <stop stop-color="#1e293b" offset="35%" />
      <stop stop-color="#334155" offset="50%" />
      <stop stop-color="#1e293b" offset="65%" />
      <stop stop-color="#0f172a" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#0f172a" />
  <rect id="shimmer-rect" width="${w}" height="${h}" fill="url(#roof-shimmer)" opacity="0.6"/>
  <animate xlink:href="#shimmer-rect" attributeName="x" from="-${w}" to="${w}" dur="1.6s" repeatCount="indefinite" />
</svg>`;

  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return `data:image/svg+xml;base64,${window.btoa(svg)}`;
  }
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Default URL loader that adapts remote CDNs (Unsplash, Cloudinary, Imgix)
 * or local image sources to WebP format and specific widths.
 */
export function defaultImageLoader({
  src,
  width,
  quality = 80,
  format = 'webp',
}: {
  src: string;
  width: number;
  quality?: number;
  format?: string;
}): string {
  if (!src) return '';

  // 1. Unsplash URL handling (supports auto=format, fm=webp, q, w)
  if (src.includes('images.unsplash.com')) {
    const url = new URL(src, window?.location?.origin || 'https://apexcrestroofing.com');
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('auto', 'format');
    if (format === 'webp') {
      url.searchParams.set('fm', 'webp');
    }
    url.searchParams.set('fit', 'crop');
    return url.toString();
  }

  // 2. Cloudinary / Imgix or URL with width query
  if (src.includes('cloudinary.com') || src.includes('imgix.net')) {
    try {
      const url = new URL(src);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', quality.toString());
      if (format) url.searchParams.set('fm', format);
      return url.toString();
    } catch {
      return src;
    }
  }

  // 3. Local assets or relative paths in Vite
  // If query params are supported or standard asset path
  if (src.startsWith('/') || src.startsWith('./') || src.startsWith('http')) {
    // For local assets in dev/prod, append responsive hint query
    if (src.includes('?')) {
      return `${src}&w=${width}&q=${quality}&fmt=${format}`;
    }
    return `${src}?w=${width}&q=${quality}&fmt=${format}`;
  }

  return src;
}

/**
 * Builds responsive srcset strings for a specified format
 */
export function generateSrcSet({
  src,
  quality = 80,
  format = 'webp',
  loader = defaultImageLoader,
  unoptimized = false,
}: {
  src: string;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  loader?: (props: { src: string; width: number; quality?: number; format?: string }) => string;
  unoptimized?: boolean;
}): string {
  if (unoptimized || !src) return '';

  // Select appropriate width steps for responsive srcset
  const targetWidths = [384, 640, 750, 828, 1080, 1200, 1920, 2048];

  return targetWidths
    .map((w) => {
      const url = loader({ src, width: w, quality, format });
      return `${url} ${w}w`;
    })
    .join(', ');
}

// Global registry of preloaded images to avoid duplicate <link rel="preload"> tags in <head>
const preloadedHrefs = new Set<string>();

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  quality = 80,
  format = 'webp',
  placeholder = 'blur',
  blurDataURL,
  objectFit = 'cover',
  objectPosition = 'center',
  unoptimized = false,
  onLoad,
  onError,
  className = '',
  style,
  loader = defaultImageLoader,
  ...restProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Responsive sizes fallback: if fill is true, standard full viewport width
  const responsiveSizes = useMemo(() => {
    if (sizes) return sizes;
    if (fill) return '100vw';
    if (width && typeof width === 'number') {
      return `(max-width: ${width}px) 100vw, ${width}px`;
    }
    return '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw';
  }, [sizes, fill, width]);

  // Generate WebP and Fallback srcsets
  const srcSetWebp = useMemo(() => {
    if (unoptimized) return undefined;
    return generateSrcSet({ src, quality, format: 'webp', loader, unoptimized });
  }, [src, quality, loader, unoptimized]);

  const srcSetFallback = useMemo(() => {
    if (unoptimized) return undefined;
    return generateSrcSet({ src, quality, format: 'auto', loader, unoptimized });
  }, [src, quality, loader, unoptimized]);

  // Primary optimized source for baseline rendering
  const primaryOptimizedSrc = useMemo(() => {
    if (unoptimized) return src;
    const targetWidth = typeof width === 'number' ? width : 1200;
    return loader({ src, width: targetWidth, quality, format });
  }, [src, width, quality, format, loader, unoptimized]);

  // Blur-up placeholder data URL
  const defaultPlaceholderData = useMemo(() => {
    if (placeholder !== 'blur') return undefined;
    if (blurDataURL) return blurDataURL;
    return generateShimmerPlaceholder(
      typeof width === 'number' ? width : 800,
      typeof height === 'number' ? height : 500
    );
  }, [placeholder, blurDataURL, width, height]);

  // Preloading for High-Priority / Hero Images (LCP Optimization)
  useEffect(() => {
    if (!priority || typeof document === 'undefined' || !primaryOptimizedSrc) return;

    const preloadKey = `${primaryOptimizedSrc}-${srcSetWebp || ''}`;
    if (preloadedHrefs.has(preloadKey)) return;

    // Check if an existing link tag with this href already exists
    const existingLink = document.querySelector(`link[rel="preload"][as="image"][href="${primaryOptimizedSrc}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = primaryOptimizedSrc;
      if (srcSetWebp) {
        link.setAttribute('imagesrcset', srcSetWebp);
      }
      if (responsiveSizes) {
        link.setAttribute('imagesizes', responsiveSizes);
      }
      link.setAttribute('fetchpriority', 'high');
      link.setAttribute('data-lcp-priority', 'true');
      document.head.appendChild(link);
      preloadedHrefs.add(preloadKey);
    }
  }, [priority, primaryOptimizedSrc, srcSetWebp, responsiveSizes]);

  // Check if image is already cached/complete on initial mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [primaryOptimizedSrc]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (onError) onError(e);
  };

  // Base image styling based on 'fill' or dimensions
  const imageStyles: React.CSSProperties = {
    ...style,
    ...(fill
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit,
          objectPosition,
        }
      : {
          objectFit,
          objectPosition,
          maxWidth: '100%',
          height: height ? `${height}px` : 'auto',
          aspectRatio: width && height ? `${width} / ${height}` : undefined,
        }),
  };

  // Graceful fallback UI in case image fails to load
  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-slate-900 border border-slate-800 text-slate-400 p-4 text-center select-none overflow-hidden ${
          fill ? 'absolute inset-0 w-full h-full' : ''
        } ${className}`}
        style={{
          width: fill ? '100%' : width ? `${width}px` : '100%',
          height: fill ? '100%' : height ? `${height}px` : '240px',
        }}
      >
        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 22V12h6v10" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-slate-300 line-clamp-1">{alt || 'Roofing Project Asset'}</span>
        <span className="text-[10px] text-slate-500 font-mono mt-0.5">High-Resolution Architectural Imagery</span>
      </div>
    );
  }

  // Core picture and img markup
  return (
    <div
      className={`relative overflow-hidden ${fill ? 'absolute inset-0 w-full h-full' : 'inline-block'} ${className}`}
      style={fill ? undefined : { display: 'inline-block', position: 'relative' }}
    >
      {/* 1. Low-Quality Blur-Up Placeholder */}
      {placeholder === 'blur' && defaultPlaceholderData && !isLoaded && (
        <img
          src={defaultPlaceholderData}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none transition-opacity duration-500 ${
            fill ? 'absolute inset-0 w-full h-full' : 'w-full h-full'
          } ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{
            ...imageStyles,
            filter: 'blur(12px)',
            transform: 'scale(1.05)',
          }}
        />
      )}

      {/* 2. WebP Picture Element with Responsive srcset */}
      <picture className={fill ? 'contents' : undefined}>
        {/* Next.js technique: WebP format source */}
        {!unoptimized && srcSetWebp && (
          <source
            type="image/webp"
            srcSet={srcSetWebp}
            sizes={responsiveSizes}
          />
        )}

        {/* Fallback format source (JPEG/PNG) */}
        {!unoptimized && srcSetFallback && (
          <source
            type="image/jpeg"
            srcSet={srcSetFallback}
            sizes={responsiveSizes}
          />
        )}

        {/* Next.js Core <img> Element with LCP optimizations */}
        <img
          ref={imgRef}
          src={primaryOptimizedSrc}
          srcSet={srcSetWebp || srcSetFallback}
          sizes={responsiveSizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`transition-all duration-500 ease-out ${
            !isLoaded && placeholder === 'blur'
              ? 'opacity-0 scale-[1.02] filter blur-xs'
              : 'opacity-100 scale-100 filter-none'
          } ${fill ? 'w-full h-full' : ''}`}
          style={imageStyles}
          {...restProps}
        />
      </picture>
    </div>
  );
};

// Aliases for Next.js direct drop-in compatibility
export const Image = OptimizedImage;
export default OptimizedImage;

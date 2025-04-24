'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  objectFit = 'cover',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px'
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Placeholder URLs for fallback
  const fallbackImage = '/cryptocurrency.png'; // Using existing image as fallback
  
  // Generate blurDataURL for local images
  const placeholderColor = 'rgba(229, 231, 235, 0.5)'; // Light gray color

  return (
    <div 
      className={`overflow-hidden ${isLoading ? 'animate-pulse bg-slate-200 dark:bg-slate-800' : ''} ${className}`}
      style={{ position: 'relative' }}
    >
      <Image
        src={src || fallbackImage}
        alt={alt}
        width={width}
        height={height}
        className={`
          transition-opacity duration-300 ease-in-out
          object-${objectFit}
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        sizes={sizes}
        priority={priority}
        quality={80}
        placeholder="blur"
        blurDataURL={placeholderColor}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          // Fallback to placeholder on error
          const target = e.target as HTMLImageElement;
          if (target.src !== fallbackImage) {
            target.src = fallbackImage;
          }
        }}
      />
    </div>
  );
};

export default OptimizedImage;
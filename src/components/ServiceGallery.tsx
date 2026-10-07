'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ServiceGalleryProps {
  images: string[];
  name: string;
}

export function ServiceGallery({ images, name }: ServiceGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Hero Shot */}
      <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-sm">
        <Image
          src={images[activeImageIndex]}
          alt={`${name} preview ${activeImageIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails Picker */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border transition-all ${
                idx === activeImageIndex
                  ? 'border-zinc-950 ring-2 ring-zinc-950/10 scale-95'
                  : 'border-zinc-200/90 opacity-70 hover:opacity-100 hover:border-zinc-400'
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

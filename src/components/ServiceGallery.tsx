'use client';

import { useState } from 'react';
import Image from 'next/image';

export function ServiceGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="lg:sticky lg:top-28">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        {/* Keyed so each new photo fades in rather than snapping. */}
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${name}, photo ${active + 1} of ${images.length}`}
          fill
          preload={active === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="animate-[fade_300ms_ease] object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-pressed={i === active}
              className={`relative size-20 overflow-hidden bg-sand outline-offset-2 transition-opacity ${i === active ? 'outline-2 outline-ink' : 'opacity-60 hover:opacity-100'}`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

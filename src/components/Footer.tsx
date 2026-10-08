'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MARKETS, SUPPORTED_MARKETS } from '@/lib/markets';
import { CATEGORIES } from '@/lib/services-data';
import type { MarketCode } from '@/lib/types';

export function Footer({ market }: { market: MarketCode }) {
  const [joined, setJoined] = useState(false);
  const heading = 'eyebrow mb-4 text-ink/60';

  return (
    <footer className="overflow-hidden bg-lime text-ink">
      <div className="wrap pt-14 pb-8 sm:pt-20">
        <p aria-hidden className="display text-[clamp(4.5rem,21vw,19rem)] leading-[0.78] tracking-[-0.06em]">
          Branda
        </p>

        <div className="mt-10 grid gap-10 border-t border-ink pt-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">Join our newsletter</h2>
            <p className="mt-2 max-w-sm text-sm">New products, deals and recent work. One email a month.</p>
            {joined ? (
              <p className="mt-5 font-semibold" role="status">You’re on the list.</p>
            ) : (
              <form
                className="mt-5 flex max-w-md"
                onSubmit={(e) => {
                  e.preventDefault();
                  setJoined(true);
                }}
              >
                <label htmlFor="newsletter" className="sr-only">Email address</label>
                <input id="newsletter" type="email" required placeholder="you@company.com" className="field flex-1 border-ink/30" />
                <button aria-label="Subscribe" className="btn btn-dark px-5">
                  <ArrowRight className="size-5" />
                </button>
              </form>
            )}
          </div>

          <nav aria-label="Services">
            <h2 className={heading}>Services</h2>
            <ul className="space-y-2">
              {Object.entries(CATEGORIES).map(([slug, c]) => (
                <li key={slug}>
                  <Link href={`/${market}/services?category=${slug}`} className="hover:underline">{c.label} by Branda</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Markets">
            <h2 className={heading}>Markets</h2>
            <ul className="space-y-2">
              {SUPPORTED_MARKETS.map((code) => (
                <li key={code}>
                  <Link href={`/${code}`} hrefLang={MARKETS[code].locale} className="hover:underline">
                    {MARKETS[code].name} <span className="text-ink/60">· {MARKETS[code].currency}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ink/20 pt-6 text-xs sm:flex-row sm:justify-between">
          <p>© 2026 Branda. One powerhouse. Every branding solution.</p>
          <p>Prices shown in {MARKETS[market].currency}, tax added at checkout.</p>
        </div>
      </div>
    </footer>
  );
}

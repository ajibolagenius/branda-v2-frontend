import Link from 'next/link';
import { ShieldCheck, Clock, Award, Globe } from 'lucide-react';
import { MarketCode } from '@/lib/types';
import { getMarketConfig } from '@/lib/markets';

interface FooterProps {
  market: MarketCode;
}

export function Footer({ market }: FooterProps) {
  const config = getMarketConfig(market);

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-colors">
      {/* Guarantees Bar */}
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                <ShieldCheck className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
              </div>
              <div>
                <h4 className="text-xs font-semibold">100% Attention to Detail</h4>
                <p className="text-[11px] text-zinc-500">Every vector, stitch, and finish strictly QA-verified.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                <Clock className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
              </div>
              <div>
                <h4 className="text-xs font-semibold">Guaranteed Turnarounds</h4>
                <p className="text-[11px] text-zinc-500">Reliable production schedules backed by express SLAs.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                <Award className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
              </div>
              <div>
                <h4 className="text-xs font-semibold">Direct Production Pricing</h4>
                <p className="text-[11px] text-zinc-500">Cut out broker markups with ecosystem manufacturing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950 text-white font-bold text-xs dark:bg-white dark:text-zinc-950">
                B
              </div>
              <span className="font-extrabold tracking-tight text-sm">BRANDA V2</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Branda is the complete branding ecosystem for modern enterprises. Connecting physical craftsmanship, workspace architecture, and digital commerce.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <Globe className="h-3 w-3" />
              <span>Fulfillment Region: <strong>{config.name}</strong> ({config.currency})</span>
            </div>
          </div>

          {/* Pillars */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Ecosystem Pillars
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`/${market}?category=create`} className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
                  Create by Branda (Identity & 3D Packaging)
                </Link>
              </li>
              <li>
                <Link href={`/${market}?category=prints`} className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
                  Prints by Branda (Luxury Cards & Apparel)
                </Link>
              </li>
              <li>
                <Link href={`/${market}?category=gifts`} className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
                  Gifts by Branda (Executive Onboarding & Swag)
                </Link>
              </li>
              <li>
                <Link href={`/${market}?category=studio`} className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
                  Studio by Branda (Workspace & Signage)
                </Link>
              </li>
              <li>
                <Link href={`/${market}?category=digital`} className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
                  Digital by Branda (Web & Design Tokens)
                </Link>
              </li>
            </ul>
          </div>

          {/* Enterprise Social Proof */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Trusted By 500+ Brands
            </h5>
            <p className="text-xs text-zinc-500 mb-3 leading-relaxed">
              Proud partner to leading high-growth brands and corporations across Africa and globally:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
              <span className="rounded bg-zinc-200/60 px-2 py-0.5 dark:bg-zinc-800">GTCO</span>
              <span className="rounded bg-zinc-200/60 px-2 py-0.5 dark:bg-zinc-800">Dangote</span>
              <span className="rounded bg-zinc-200/60 px-2 py-0.5 dark:bg-zinc-800">Truecaller</span>
              <span className="rounded bg-zinc-200/60 px-2 py-0.5 dark:bg-zinc-800">Autochek</span>
              <span className="rounded bg-zinc-200/60 px-2 py-0.5 dark:bg-zinc-800">Reliance</span>
            </div>
          </div>

          {/* Markets & Coverage */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Global Subfolder Network
            </h5>
            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/ng" className="hover:underline">🇳🇬 Nigeria (/ng) — West Africa Hub</Link>
              </li>
              <li>
                <Link href="/us" className="hover:underline">🇺🇸 United States (/us) — North America</Link>
              </li>
              <li>
                <Link href="/uk" className="hover:underline">🇬🇧 United Kingdom (/uk) — Europe</Link>
              </li>
              <li>
                <Link href="/ca" className="hover:underline">🇨🇦 Canada (/ca) — Pan-Canadian</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 border-t border-zinc-200 pt-6 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400">
          <div>© {new Date().getFullYear()} Branda Technologies Inc. All rights reserved.</div>
          <div className="mt-2 sm:mt-0 font-mono">
            One Powerhouse. Every Branding Solution.
          </div>
        </div>
      </div>
    </footer>
  );
}

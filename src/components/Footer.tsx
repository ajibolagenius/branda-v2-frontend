'use client';

import Link from 'next/link';
import { ShieldCheck, Clock, Award, Globe, ArrowRight } from 'lucide-react';
import { MarketCode } from '@/lib/types';
import { getMarketConfig } from '@/lib/markets';

interface FooterProps {
  market: MarketCode;
}

export function Footer({ market }: FooterProps) {
  const config = getMarketConfig(market);

  return (
    <footer className="border-t border-[#e5dfd5] bg-[#fbfbf9] text-[#141513]">
      {/* 1. Giant Editorial Brand Logotype & Newsletter Banner (Directly from Reference Mockups 1 & 2) */}
      <div className="border-b border-[#e5dfd5] bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Giant Wordmark */}
          <div className="text-center mb-10">
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#141513] select-none">
              Branda
            </h2>
          </div>

          {/* Newsletter Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto rounded-3xl bg-[#eee9df] p-8 sm:p-10 border border-[#e5dfd5]">
            <div className="md:col-span-7">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950">
                Join our ecosystem newsletter
              </h3>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                Receive curated case studies, new material arrivals, private enterprise tier drops, and production updates in {config.name}.
              </p>
            </div>

            <div className="md:col-span-5">
              <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Drop Your Work Email Here"
                  className="w-full rounded-full border border-[#e5dfd5] bg-white py-3 pl-4 pr-12 text-xs text-zinc-900 outline-none focus:border-[#2a362a]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#2a362a] text-white hover:bg-[#1e261e] transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Three Trust Guarantees Bar */}
      <div className="border-b border-[#e5dfd5] bg-[#f7f4ee]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-[#e5dfd5] shadow-xs">
                <ShieldCheck className="h-5 w-5 text-[#2a362a]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">100% Attention to Detail</h4>
                <p className="text-[11px] text-zinc-600">Every vector, stitch, and finish strictly QA-verified.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-[#e5dfd5] shadow-xs">
                <Clock className="h-5 w-5 text-[#2a362a]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Guaranteed Turnarounds</h4>
                <p className="text-[11px] text-zinc-600">Reliable production schedules backed by express SLAs.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-[#e5dfd5] shadow-xs">
                <Award className="h-5 w-5 text-[#2a362a]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Direct Production Pricing</h4>
                <p className="text-[11px] text-zinc-600">Cut out broker markups with ecosystem manufacturing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2a362a] text-white font-black text-xs">
                B
              </div>
              <span className="font-black tracking-tight text-sm">BRANDA V2</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Branda is the complete branding ecosystem for modern enterprises. Connecting physical craftsmanship, workspace architecture, and digital commerce.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e5dfd5] bg-white px-2.5 py-1 text-[11px] text-zinc-700">
              <Globe className="h-3 w-3 text-[#2a362a]" />
              <span>Fulfillment Region: <strong>{config.name}</strong> ({config.currency})</span>
            </div>
          </div>

          {/* Pillars */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Ecosystem Pillars
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`/${market}?category=create`} className="text-zinc-600 hover:text-black hover:underline">
                  Create by Branda (Identity & 3D Packaging)
                </Link>
              </li>
              <li>
                <Link href={`/${market}?category=prints`} className="text-zinc-600 hover:text-black hover:underline">
                  Prints by Branda (Luxury Cards & Apparel)
                </Link>
              </li>
              <li>
                <Link href={`/${market}?category=gifts`} className="text-zinc-600 hover:text-black hover:underline">
                  Gifts by Branda (Executive Onboarding & Swag)
                </Link>
              </li>
              <li>
                <Link href={`/${market}?category=studio`} className="text-zinc-600 hover:text-black hover:underline">
                  Studio by Branda (Workspace & Signage)
                </Link>
              </li>
              <li>
                <Link href={`/${market}?category=digital`} className="text-zinc-600 hover:text-black hover:underline">
                  Digital by Branda (Web & Design Tokens)
                </Link>
              </li>
            </ul>
          </div>

          {/* Enterprise Social Proof */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Trusted By 500+ Brands
            </h5>
            <p className="text-xs text-zinc-600 mb-3 leading-relaxed">
              Proud partner to leading high-growth brands and corporations across Africa and globally:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono font-bold text-zinc-800">
              <span className="rounded bg-[#eee9df] px-2 py-0.5">GTCO</span>
              <span className="rounded bg-[#eee9df] px-2 py-0.5">Dangote</span>
              <span className="rounded bg-[#eee9df] px-2 py-0.5">Truecaller</span>
              <span className="rounded bg-[#eee9df] px-2 py-0.5">Autochek</span>
              <span className="rounded bg-[#eee9df] px-2 py-0.5">Reliance</span>
            </div>
          </div>

          {/* Markets & Coverage */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Global Subfolder Network
            </h5>
            <ul className="space-y-1.5 text-xs text-zinc-600">
              <li>
                <Link href="/ng" className="hover:underline hover:text-black">🇳🇬 Nigeria (/ng) — West Africa Hub</Link>
              </li>
              <li>
                <Link href="/us" className="hover:underline hover:text-black">🇺🇸 United States (/us) — North America</Link>
              </li>
              <li>
                <Link href="/uk" className="hover:underline hover:text-black">🇬🇧 United Kingdom (/uk) — Europe</Link>
              </li>
              <li>
                <Link href="/ca" className="hover:underline hover:text-black">🇨🇦 Canada (/ca) — Pan-Canadian</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 border-t border-[#e5dfd5] pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500">
          <div>© 2026 Branda Technologies Inc. All rights reserved.</div>
          <div className="mt-2 sm:mt-0 font-mono font-medium">
            One Powerhouse. Every Branding Solution.
          </div>
        </div>
      </div>
    </footer>
  );
}

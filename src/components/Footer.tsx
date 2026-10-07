'use client';

import Link from 'next/link';
import { ShieldCheck, Clock, Award, Globe, ArrowRight, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { MarketCode } from '@/lib/types';
import { getMarketConfig, formatCurrency } from '@/lib/markets';
import { useCartStore } from '@/lib/cart-store';

interface FooterProps {
  market: MarketCode;
}

export function Footer({ market }: FooterProps) {
  const config = getMarketConfig(market);
  const { openCart, items, getTotal } = useCartStore();

  const marketItemCount = items
    .filter((item) => item.market === market)
    .reduce((sum, item) => sum + item.quantity, 0);

  const total = getTotal(market);

  return (
    <>
      <footer className="border-t border-[#e6e1d6] bg-[#f8f6f0] text-[#111311] relative z-10">
        {/* 1. Colossal Brand Wordmark & Editorial Statement (Matching Reference Mockups 1 & 2) */}
        <div className="border-b border-[#e6e1d6] bg-[#eee9df] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="mx-auto max-w-7xl">
            {/* Giant Wordmark */}
            <div className="text-center">
              <h2 className="text-7xl sm:text-9xl md:text-[13rem] lg:text-[17rem] font-black tracking-tighter text-[#111311] leading-none select-none">
                Branda
              </h2>
              <p className="mt-4 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-zinc-700">
                The Unified Enterprise Branding & Production Ecosystem · Nigeria · USA · UK · Canada
              </p>
            </div>

            {/* Newsletter Box matching Reference Mockups 1 & 2 */}
            <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto rounded-3xl bg-white p-8 sm:p-12 border border-[#e6e1d6] shadow-xs">
              <div className="md:col-span-7">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-1">
                  Executive Dispatch
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950">
                  Join our ecosystem newsletter
                </h3>
                <p className="mt-1 text-xs text-zinc-600 leading-relaxed font-medium">
                  Receive curated case studies, new material arrivals, private enterprise tier drops, and production updates in {config.name}.
                </p>
              </div>

              <div className="md:col-span-5">
                <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
                  <input
                    type="email"
                    placeholder="Drop Your Work Email Here"
                    className="w-full rounded-full border border-[#e6e1d6] bg-[#f8f6f0] py-3.5 pl-5 pr-14 text-xs font-semibold text-zinc-900 outline-none focus:border-[#222b22] shadow-xs"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#222b22] text-white hover:bg-[#161c16] transition-colors cursor-pointer"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Three Bold Trust Guarantees Bar */}
        <div className="border-b border-[#e6e1d6] bg-[#f8f6f0]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex items-center gap-4 rounded-3xl border border-[#e6e1d6] bg-white p-6 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee9df] border border-[#e6e1d6]">
                  <ShieldCheck className="h-6 w-6 text-[#222b22]" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-950">100% Attention to Detail</h4>
                  <p className="text-[11px] text-zinc-600 mt-0.5">Every vector, stitch, deboss, and foil proof strictly verified.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-3xl border border-[#e6e1d6] bg-white p-6 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee9df] border border-[#e6e1d6]">
                  <Clock className="h-6 w-6 text-[#222b22]" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-950">Guaranteed Turnarounds</h4>
                  <p className="text-[11px] text-zinc-600 mt-0.5">Reliable production schedules backed by express SLAs.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-3xl border border-[#e6e1d6] bg-white p-6 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee9df] border border-[#e6e1d6]">
                  <Award className="h-6 w-6 text-[#222b22]" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-950">Direct Factory Pricing</h4>
                  <p className="text-[11px] text-zinc-600 mt-0.5">Cut out broker markups with ecosystem manufacturing hubs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Main Footer Directory & Social Proof */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#222b22] text-white font-black text-sm">
                  B
                </div>
                <span className="font-black tracking-tight text-lg text-zinc-950">BRANDA V2</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                Branda is the complete branding ecosystem for modern enterprises. Connecting physical craftsmanship, workspace architecture, and digital commerce.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e6e1d6] bg-white px-3 py-1.5 text-xs font-bold text-zinc-800 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Regional Hub: <strong>{config.name}</strong> ({config.currency})</span>
              </div>
            </div>

            {/* Pillars */}
            <div>
              <h5 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-4">
                Ecosystem Pillars
              </h5>
              <ul className="space-y-2.5 text-xs font-bold">
                <li>
                  <Link href={`/${market}?category=create`} className="text-zinc-700 hover:text-black hover:underline transition-colors">
                    Create by Branda (Identity & 3D Packaging)
                  </Link>
                </li>
                <li>
                  <Link href={`/${market}?category=prints`} className="text-zinc-700 hover:text-black hover:underline transition-colors">
                    Prints by Branda (Luxury Cards & Apparel)
                  </Link>
                </li>
                <li>
                  <Link href={`/${market}?category=gifts`} className="text-zinc-700 hover:text-black hover:underline transition-colors">
                    Gifts by Branda (Executive Onboarding & Swag)
                  </Link>
                </li>
                <li>
                  <Link href={`/${market}?category=studio`} className="text-zinc-700 hover:text-black hover:underline transition-colors">
                    Studio by Branda (Workspace & Signage)
                  </Link>
                </li>
                <li>
                  <Link href={`/${market}?category=digital`} className="text-zinc-700 hover:text-black hover:underline transition-colors">
                    Digital by Branda (Web & Design Tokens)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Enterprise Social Proof */}
            <div>
              <h5 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-4">
                Trusted By 500+ Brands
              </h5>
              <p className="text-xs text-zinc-600 mb-4 leading-relaxed font-medium">
                Proud partner to leading high-growth brands and enterprise corporations:
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono font-black text-zinc-900">
                <span className="rounded-xl border border-[#e6e1d6] bg-white px-2.5 py-1">GTCO</span>
                <span className="rounded-xl border border-[#e6e1d6] bg-white px-2.5 py-1">Dangote</span>
                <span className="rounded-xl border border-[#e6e1d6] bg-white px-2.5 py-1">Truecaller</span>
                <span className="rounded-xl border border-[#e6e1d6] bg-white px-2.5 py-1">Autochek</span>
                <span className="rounded-xl border border-[#e6e1d6] bg-white px-2.5 py-1">Reliance</span>
              </div>
            </div>

            {/* Global Markets & Coverage */}
            <div>
              <h5 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-4">
                Global Production Network
              </h5>
              <ul className="space-y-2 text-xs font-bold text-zinc-700">
                <li>
                  <Link href="/ng" className="hover:underline hover:text-black flex items-center gap-1.5">
                    <span>🇳🇬</span> <span>Nigeria (/ng) — Lagos Hub</span>
                  </Link>
                </li>
                <li>
                  <Link href="/us" className="hover:underline hover:text-black flex items-center gap-1.5">
                    <span>🇺🇸</span> <span>United States (/us) — Newark Hub</span>
                  </Link>
                </li>
                <li>
                  <Link href="/uk" className="hover:underline hover:text-black flex items-center gap-1.5">
                    <span>🇬🇧</span> <span>United Kingdom (/uk) — London Hub</span>
                  </Link>
                </li>
                <li>
                  <Link href="/ca" className="hover:underline hover:text-black flex items-center gap-1.5">
                    <span>🇨🇦</span> <span>Canada (/ca) — Toronto Hub</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal Strip */}
          <div className="mt-14 border-t border-[#e6e1d6] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-medium">
            <div>© 2026 Branda Technologies Inc. All rights reserved. 100% Commercial IP Rights Assigned.</div>
            <div className="mt-2 sm:mt-0 font-mono font-bold text-zinc-950 uppercase tracking-wider">
              One Powerhouse. Every Branding Solution.
            </div>
          </div>
        </div>
      </footer>

      {/* 4. Fixed Bottom Quick-Actions Bar (Permanent Fixed Footer Presence) */}
      <aside
        aria-label="Quick order dock"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e6e1d6] bg-[#f8f6f0]/95 backdrop-blur-md px-4 py-2.5 sm:py-3 shadow-lg"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Left: Active Fulfillment Market Indicator */}
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 hidden sm:inline">
              Fulfillment Active:
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-[#222b22] bg-[#eee9df] px-3 py-1 rounded-full border border-[#e6e1d6]">
              {config.flag} {config.name} ({config.symbol} {config.currency})
            </span>
          </div>

          {/* Center: Direct Link to Catalog */}
          <Link
            href={`/${market}`}
            className="text-xs font-black uppercase tracking-wider text-zinc-900 hover:text-black hidden md:inline-flex items-center gap-1.5"
          >
            <span>Explore 5 Pillars Catalog</span>
          </Link>

          {/* Right: Quick Bag Status & Trigger */}
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open order tray with ${marketItemCount} items`}
            className="flex items-center gap-2.5 rounded-full bg-[#222b22] px-4 sm:px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-xs hover:bg-[#161c16] transition-colors cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Order Tray</span>
            <span className="rounded-full bg-[#d9e855] px-2 py-0.5 text-[10px] font-black text-black">
              {marketItemCount}
            </span>
            {marketItemCount > 0 && (
              <span className="font-mono text-xs font-bold ml-1 text-white/90 hidden sm:inline">
                · {formatCurrency(total, market)}
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

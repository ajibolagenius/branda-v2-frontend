'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Form from 'next/form';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import { MARKETS, SUPPORTED_MARKETS, formatCurrency } from '@/lib/markets';
import { CATEGORIES } from '@/lib/services-data';
import type { MarketCode } from '@/lib/types';
import { CartButton } from './Cart';

export function Header({ market }: { market: MarketCode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchInput = useRef<HTMLInputElement>(null);
  const config = MARKETS[market];

  const links = [
    { label: 'All services', href: `/${market}/services` },
    ...Object.entries(CATEGORIES).map(([slug, c]) => ({ label: c.label, href: `/${market}/services?category=${slug}` })),
  ];

  // Same page, same filters, different market.
  const switchMarket = (code: string) => router.push(pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${code}`) + window.location.search);

  // Close the mobile menu popover after a link is followed.
  const closeOnLink = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as Element).closest('a')) e.currentTarget.hidePopover();
  };

  return (
    <>
      <p className="bg-sage px-4 py-2.5 text-center text-xs text-white sm:text-sm">
        Free delivery across {config.name} on orders over {formatCurrency(config.freeShippingFrom, market)}
      </p>

      <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm">
        <div className="wrap grid h-16 grid-cols-[1fr_auto] items-center gap-4 lg:h-20 lg:grid-cols-[1fr_auto_1fr]">
          <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="underline-offset-8 decoration-2 hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>

          <Link href={`/${market}`} className="display text-[28px] lg:justify-self-center lg:text-[34px]" aria-label="Branda home">
            Branda
          </Link>

          <div className="flex items-center justify-self-end gap-1.5 sm:gap-2.5">
            <label htmlFor="market" className="sr-only">Country and currency</label>
            <select
              id="market"
              value={market}
              onChange={(e) => switchMarket(e.target.value)}
              className="h-10 cursor-pointer border border-line bg-transparent px-2 text-sm font-medium hover:border-ink"
            >
              {SUPPORTED_MARKETS.map((code) => (
                <option key={code} value={code}>
                  {MARKETS[code].flag} {MARKETS[code].currency}
                </option>
              ))}
            </select>
            <button type="button" popoverTarget="site-search" aria-label="Search services" className="grid size-10 place-items-center hover:bg-sand">
              <Search className="size-5" />
            </button>
            <CartButton market={market} />
            <button type="button" popoverTarget="site-menu" aria-label="Open menu" className="grid size-10 place-items-center hover:bg-sand lg:hidden">
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-search"
        popover="auto"
        onToggle={(e) => e.newState === 'open' && searchInput.current?.focus()}
        className="pop inset-x-0 top-0 m-0 w-full max-w-none border-b border-line bg-cream"
      >
        <Form action={`/${market}/services`} onSubmit={(e) => e.currentTarget.closest<HTMLElement>('[popover]')?.hidePopover()} className="wrap flex gap-2 py-5">
          <label htmlFor="site-search-input" className="sr-only">Search services</label>
          <input
            ref={searchInput}
            id="site-search-input"
            name="search"
            type="search"
            required
            placeholder="Try “mugs”, “signage” or “website”"
            className="field flex-1"
          />
          <button className="btn btn-dark">Search</button>
        </Form>
      </div>

      <nav
        id="site-menu"
        popover="auto"
        aria-label="Mobile"
        onClick={closeOnLink}
        className="pop inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-cream p-6"
      >
        <div className="flex items-center justify-between">
          <span className="display text-[28px]">Branda</span>
          <button type="button" popoverTarget="site-menu" popoverTargetAction="hide" aria-label="Close menu" className="grid size-10 place-items-center hover:bg-sand">
            <X className="size-6" />
          </button>
        </div>
        <ul className="mt-10 space-y-1">
          {links.map((l, i) => (
            <li key={l.href} className="fade-up" style={{ '--i': i } as React.CSSProperties}>
              <Link href={l.href} className="display block py-2 text-5xl">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

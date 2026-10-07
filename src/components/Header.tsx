'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Sparkles } from 'lucide-react';
import { MarketCode } from '@/lib/types';
import { MarketSelector } from './MarketSelector';
import { useCartStore } from '@/lib/cart-store';

interface HeaderProps {
  market: MarketCode;
}

const CATEGORIES = [
  { slug: 'all', label: 'All Services' },
  { slug: 'digital', label: 'Digital' },
  { slug: 'gifts', label: 'Gifts' },
  { slug: 'create', label: 'Create' },
  { slug: 'studio', label: 'Studio' },
  { slug: 'prints', label: 'Prints' },
];

export function Header({ market }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { openCart, items } = useCartStore();

  const marketItemCount = items
    .filter((item) => item.market === market)
    .reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${market}?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchBarOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/90 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-8">
          <Link href={`/${market}`} className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-950 text-white font-bold text-sm tracking-wider shadow-sm group-hover:scale-105 transition-transform dark:bg-white dark:text-zinc-950">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-base text-zinc-950 dark:text-white leading-none">
                BRANDA
              </span>
              <span className="text-[9px] font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">
                Ecosystem V2
              </span>
            </div>
          </Link>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Ecosystem Categories">
            {CATEGORIES.map((cat) => {
              const href = cat.slug === 'all' ? `/${market}` : `/${market}?category=${cat.slug}`;
              const isListing = pathname === `/${market}`;
              return (
                <Link
                  key={cat.slug}
                  href={href}
                  className="rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                >
                  {cat.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Search, Market Selector, Cart Trigger */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <div className="relative">
            {searchBarOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search cards, packaging, web..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-48 sm:w-64 rounded-full border border-zinc-300 bg-zinc-50 px-3.5 py-1.5 text-xs text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setSearchBarOpen(false)}
                  className="ml-1 p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchBarOpen(true)}
                aria-label="Open search input"
                className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50/80 px-3 py-1.5 text-xs text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Search services...</span>
              </button>
            )}
          </div>

          {/* Region / Currency Switcher */}
          <MarketSelector currentMarket={market} />

          {/* Cart Trigger with live badge */}
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart with ${marketItemCount} items`}
            className="relative flex items-center justify-center rounded-full border border-zinc-200 bg-white p-2 text-zinc-800 shadow-sm hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            {marketItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-zinc-950 px-1 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-950">
                {marketItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950 space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 px-2 pb-1">
            Ecosystem Categories
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {CATEGORIES.map((cat) => {
              const href = cat.slug === 'all' ? `/${market}` : `/${market}?category=${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

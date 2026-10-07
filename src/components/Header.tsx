'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Search, X, Menu } from 'lucide-react';
import { MarketCode } from '@/lib/types';
import { MarketSelector } from './MarketSelector';
import { useCartStore } from '@/lib/cart-store';
import { getMarketConfig, formatCurrency } from '@/lib/markets';

interface HeaderProps {
  market: MarketCode;
}

export function Header({ market }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const pathname = usePathname();
  const router = useRouter();
  const { openCart, items } = useCartStore();
  const config = getMarketConfig(market);

  const marketItemCount = items
    .filter((item) => item.market === market)
    .reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${market}?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { label: 'Create', href: `/${market}?category=create` },
    { label: 'Prints', href: `/${market}?category=prints` },
    { label: 'Gifts', href: `/${market}?category=gifts` },
    { label: 'Studio', href: `/${market}?category=studio` },
    { label: 'Digital', href: `/${market}?category=digital` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[#e6e1d6] bg-[#f8f6f0]/95 backdrop-blur-md shadow-xs transition-all">
      {/* 1. Top Announcement Bar - Fixed with the Header */}
      <div className="bg-[#222b22] text-[#f8f6f0] text-center py-2.5 px-4 text-[11px] sm:text-xs font-bold uppercase tracking-widest border-b border-black/10">
        Complimentary express dispatch on orders over {formatCurrency(config.freeShippingThreshold, market)} across {config.name}.
      </div>

      {/* 2. Main Navbar - Big, Bold, Corporate */}
      <div className="mx-auto flex h-20 sm:h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Navigation Links - Bold Uppercase */}
        <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-950">
          <Link
            href={`/${market}`}
            className="hover:text-black transition-colors"
          >
            Catalog
          </Link>
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center Brand Wordmark - Big & Bold */}
        <Link href={`/${market}`} className="flex items-center gap-2 group">
          <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111311] group-hover:opacity-90 transition-opacity select-none">
            Branda
          </span>
        </Link>

        {/* Right Navigation & Utility Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden lg:flex items-center gap-8 text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-950 mr-2">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Input / Trigger */}
          {searchOpen ? (
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                suppressHydrationWarning
                className="w-40 sm:w-60 rounded-full border border-[#e6e1d6] bg-white px-4 py-2 text-xs font-semibold text-zinc-900 outline-none focus:border-[#222b22] shadow-xs"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="ml-1.5 text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search catalog"
              className="p-2.5 text-zinc-900 hover:text-black transition-colors cursor-pointer"
            >
              <Search className="h-5 w-5 stroke-[2.5]" />
            </button>
          )}

          {/* Region / Currency Selector */}
          <MarketSelector currentMarket={market} />

          {/* Circular Bag Button - Big, Bold, Direct match to Mockup 0 */}
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open orders with ${marketItemCount} items`}
            className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#222b22] text-white shadow-sm hover:bg-[#161c16] transition-colors cursor-pointer"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            {marketItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d9e855] px-1 text-[11px] font-black text-black shadow-xs">
                {marketItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-900 hover:text-black md:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 stroke-[2.5]" /> : <Menu className="h-6 w-6 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-[#e6e1d6] bg-[#f8f6f0] px-6 py-6 md:hidden shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-4">
            <Link
              href={`/${market}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-black uppercase tracking-wider text-zinc-950 py-1"
            >
              Catalog Overview
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-black uppercase tracking-wider text-zinc-700 hover:text-black py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

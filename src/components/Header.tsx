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
    <div className="w-full">
      {/* 1. Top Announcement Bar (Directly from Mockup 0) */}
      <div className="bg-[#4f5d4b] text-white text-center py-2 px-4 text-[11px] sm:text-xs font-semibold tracking-wide">
        Complimentary express dispatch on all orders over {formatCurrency(config.freeShippingThreshold, market)} across {config.name}.
      </div>

      {/* 2. Main Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#e6e1d6] bg-[#f8f6f0]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-zinc-900">
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

          {/* Center Brand Wordmark */}
          <Link href={`/${market}`} className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#111311]">
              Branda
            </span>
          </Link>

          {/* Right Navigation & Utility Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-zinc-900 mr-1">
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
                  className="w-36 sm:w-52 rounded-full border border-[#e6e1d6] bg-white px-3.5 py-1.5 text-xs text-zinc-900 outline-none focus:border-[#222b22]"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-1 text-zinc-400 hover:text-zinc-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search catalog"
                className="p-2 text-zinc-800 hover:text-black transition-colors"
              >
                <Search className="h-4.5 w-4.5" />
              </button>
            )}

            {/* Region / Currency Selector */}
            <MarketSelector currentMarket={market} />

            {/* Circular Bag Button (Directly matching Mockups 0, 1, 4) */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open orders with ${marketItemCount} items`}
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#222b22] text-white shadow-xs hover:bg-[#161c16] transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              {marketItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#d9e855] px-1 text-[10px] font-black text-black">
                  {marketItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-800 hover:text-black md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-[#e6e1d6] bg-white px-4 py-4 md:hidden">
            <nav className="flex flex-col space-y-3">
              <Link
                href={`/${market}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-zinc-900 py-1"
              >
                Catalog Overview
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-black py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

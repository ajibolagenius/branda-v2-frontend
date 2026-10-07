'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ArrowUpDown, RotateCcw } from 'lucide-react';
import { Category, MarketCode } from '@/lib/types';

interface CatalogFiltersProps {
  market: MarketCode;
  totalResults: number;
}

const CATEGORIES: { slug: Category | 'all'; label: string; icon: string }[] = [
  { slug: 'all', label: 'All Services', icon: '✦' },
  { slug: 'create', label: 'Create (Identity & 3D)', icon: '✏️' },
  { slug: 'prints', label: 'Prints (Cards & Apparel)', icon: '🖨️' },
  { slug: 'gifts', label: 'Gifts (Corporate & Swag)', icon: '🎁' },
  { slug: 'studio', label: 'Studio (Workspace & Murals)', icon: '🏢' },
  { slug: 'digital', label: 'Digital (Web & Portals)', icon: '💻' },
];

const INDUSTRIES = [
  'All Industries',
  'Technology & Startups',
  'Corporate & Finance',
  'Retail & E-commerce',
  'Hospitality & Events',
  'Personal Brands',
];

const URGENCIES = [
  'All Schedules',
  'Priority (24-48h)',
  'Express (3-5d)',
  'Standard (7-10d)',
];

const USE_CASES = [
  'All Use Cases',
  'Brand Launch',
  'Corporate Gifting',
  'Marketing Campaign',
  'Workspace Transformation',
];

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'turnaround', label: 'Fastest Turnaround' },
];

export function CatalogFilters({ market, totalResults }: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Current filter values from searchParams
  const currentCategory = (searchParams.get('category') as Category | 'all') || 'all';
  const currentIndustry = searchParams.get('industry') || 'all';
  const currentUrgency = searchParams.get('urgency') || 'all';
  const currentUseCase = searchParams.get('useCase') || 'all';
  const currentSort = searchParams.get('sortBy') || 'popularity';
  const currentSearch = searchParams.get('search') || '';

  // Ponytail: Lean query param updater using native URLSearchParams
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === 'all' || (key === 'industry' && value === 'All Industries') || (key === 'urgency' && value === 'All Schedules') || (key === 'useCase' && value === 'All Use Cases')) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    // Reset page to 1 when filters change
    params.delete('page');

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const clearAllFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(
    currentCategory !== 'all' ||
    (currentIndustry !== 'all' && currentIndustry !== 'All Industries') ||
    (currentUrgency !== 'all' && currentUrgency !== 'All Schedules') ||
    (currentUseCase !== 'all' && currentUseCase !== 'All Use Cases') ||
    currentSearch.trim() !== ''
  );

  return (
    <div className="space-y-4">
      {/* Category Pills (Horizontal Scroll on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = currentCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => updateQuery('category', cat.slug)}
              className={`flex-shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-[#2a362a] text-white shadow-xs scale-[1.02]'
                  : 'bg-[#eee9df] text-zinc-800 hover:bg-[#e4ded3]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Controls Bar: Search, Industry, Urgency, Use Case, Sort */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#e5dfd5] bg-[#fbfbf9] p-3 sm:p-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Smart Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search services, business cards, merchandise..."
              defaultValue={currentSearch}
              onChange={(e) => updateQuery('search', e.target.value)}
              className="w-full rounded-xl border border-[#e5dfd5] bg-white py-2 pl-9 pr-8 text-xs text-zinc-900 placeholder-zinc-400 outline-none focus:border-[#2a362a] transition-colors"
            />
            {currentSearch && (
              <button
                type="button"
                onClick={() => updateQuery('search', '')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Industry Filter */}
            <select
              value={currentIndustry}
              onChange={(e) => updateQuery('industry', e.target.value)}
              aria-label="Filter by industry"
              className="rounded-xl border border-[#e5dfd5] bg-white px-3 py-2 text-xs font-medium text-zinc-700 outline-none focus:border-[#2a362a] cursor-pointer"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind === 'All Industries' ? 'all' : ind}>
                  {ind}
                </option>
              ))}
            </select>

            {/* Urgency Filter */}
            <select
              value={currentUrgency}
              onChange={(e) => updateQuery('urgency', e.target.value)}
              aria-label="Filter by turnaround schedule"
              className="rounded-xl border border-[#e5dfd5] bg-white px-3 py-2 text-xs font-medium text-zinc-700 outline-none focus:border-[#2a362a] cursor-pointer"
            >
              {URGENCIES.map((urg) => (
                <option key={urg} value={urg === 'All Schedules' ? 'all' : urg}>
                  {urg}
                </option>
              ))}
            </select>

            {/* Use Case Filter */}
            <select
              value={currentUseCase}
              onChange={(e) => updateQuery('useCase', e.target.value)}
              aria-label="Filter by business use case"
              className="rounded-xl border border-[#e5dfd5] bg-white px-3 py-2 text-xs font-medium text-zinc-700 outline-none focus:border-[#2a362a] cursor-pointer"
            >
              {USE_CASES.map((uc) => (
                <option key={uc} value={uc === 'All Use Cases' ? 'all' : uc}>
                  {uc}
                </option>
              ))}
            </select>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
              <span className="text-[11px] font-medium text-zinc-400 hidden sm:inline">Sort:</span>
              <select
                value={currentSort}
                onChange={(e) => updateQuery('sortBy', e.target.value)}
                aria-label="Sort services"
                className="rounded-xl border border-[#e5dfd5] bg-white px-3 py-2 text-xs font-semibold text-zinc-900 outline-none focus:border-[#2a362a] cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Row & Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#e5dfd5] text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-900">
              {totalResults} {totalResults === 1 ? 'service' : 'services'} available
            </span>
            {hasActiveFilters && (
              <span className="text-zinc-500">matching your active filters</span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-[#eee9df] hover:text-zinc-900 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

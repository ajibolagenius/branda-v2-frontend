import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { ChevronLeft, ChevronRight, PackageSearch } from 'lucide-react';
import { isValidMarket, getMarketConfig } from '@/lib/markets';
import { MarketCode } from '@/lib/types';
import { SERVICES, filterServices } from '@/lib/services-data';
import { EcosystemHero } from '@/components/EcosystemHero';
import { CatalogFilters } from '@/components/CatalogFilters';
import { ServiceCard } from '@/components/ServiceCard';

interface MarketPageProps {
  params: Promise<{ market: string }>;
  searchParams: Promise<{
    category?: string;
    search?: string;
    industry?: string;
    urgency?: string;
    useCase?: string;
    sortBy?: string;
    page?: string;
  }>;
}

const ITEMS_PER_PAGE = 6;

export default async function MarketListingPage({ params, searchParams }: MarketPageProps) {
  const { market } = await params;
  const query = await searchParams;

  if (!isValidMarket(market)) {
    redirect('/ng');
  }

  const marketCode = market as MarketCode;
  const config = getMarketConfig(marketCode);

  // Filter services on the server
  let filteredServices = filterServices(SERVICES, {
    category: query.category,
    search: query.search,
    industry: query.industry,
    urgency: query.urgency,
    useCase: query.useCase,
    sortBy: query.sortBy,
  });

  // Localized price sorting
  if (query.sortBy === 'price-asc') {
    filteredServices.sort((a, b) => (a.basePrices[marketCode] || 0) - (b.basePrices[marketCode] || 0));
  } else if (query.sortBy === 'price-desc') {
    filteredServices.sort((a, b) => (b.basePrices[marketCode] || 0) - (a.basePrices[marketCode] || 0));
  }

  const totalResults = filteredServices.length;
  const currentPage = Math.max(1, parseInt(query.page || '1', 10));
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Helper to construct pagination URLs preserving current searchParams
  const getPageUrl = (pageNumber: number) => {
    const p = new URLSearchParams();
    if (query.category) p.set('category', query.category);
    if (query.search) p.set('search', query.search);
    if (query.industry) p.set('industry', query.industry);
    if (query.urgency) p.set('urgency', query.urgency);
    if (query.useCase) p.set('useCase', query.useCase);
    if (query.sortBy) p.set('sortBy', query.sortBy);
    if (pageNumber > 1) p.set('page', pageNumber.toString());

    const qs = p.toString();
    return qs ? `/${marketCode}?${qs}` : `/${marketCode}`;
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Localized Ecosystem Hero */}
      <EcosystemHero config={config} market={marketCode} />

      {/* Main Catalog Section (Directly matching 'Salad Works Exclusive' in Mockup 0) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111311]">
            Branda Exclusive Catalog
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600">
            Configure custom corporate branding assets with factory-direct fulfillment in {config.name}.
          </p>
        </div>

        {/* Filter Controls (Client component syncing to URL) */}
        <Suspense fallback={<div className="h-28 w-full animate-pulse rounded-3xl bg-[#eee9df]" />}>
          <CatalogFilters market={marketCode} totalResults={totalResults} />
        </Suspense>

        {/* Services Grid or Empty State */}
        {paginatedServices.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedServices.map((service) => (
              <ServiceCard key={service.id} service={service} market={marketCode} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#e6e1d6] bg-white py-16 px-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eee9df] text-zinc-500">
              <PackageSearch className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-bold text-zinc-950">
              No services match your active filters
            </h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-sm">
              Try broadening your search term or selecting &quot;All Services&quot;.
            </p>
            <Link
              href={`/${marketCode}`}
              className="mt-6 rounded-full bg-[#222b22] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#161c16] transition-colors"
            >
              Reset Filters
            </Link>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-between border-t border-[#e6e1d6] pt-6">
            <div className="text-xs text-zinc-500 font-medium">
              Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({totalResults} deliverables total)
            </div>

            <div className="flex items-center gap-2">
              {currentPage > 1 ? (
                <Link
                  href={getPageUrl(currentPage - 1)}
                  className="flex items-center gap-1 rounded-xl border border-[#e6e1d6] bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-[#eee9df] transition-colors"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Previous</span>
                </Link>
              ) : (
                <span className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-100/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-400 cursor-not-allowed">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Previous</span>
                </span>
              )}

              {currentPage < totalPages ? (
                <Link
                  href={getPageUrl(currentPage + 1)}
                  className="flex items-center gap-1 rounded-xl border border-[#e6e1d6] bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-[#eee9df] transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <span className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-100/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-400 cursor-not-allowed">
                  <span>Next</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

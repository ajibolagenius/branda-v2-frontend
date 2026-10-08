import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { alternates, getMarket } from '@/lib/markets';
import { CATEGORIES, queryCatalog } from '@/lib/services-data';
import type { CatalogQuery, Category } from '@/lib/types';
import { ServiceCard } from '@/components/ServiceCard';
import { CatalogFilters } from '@/components/CatalogFilters';

export const instant = false;

type Props = PageProps<'/[market]/services'>;

const KEYS = ['category', 'search', 'industry', 'urgency', 'useCase', 'sort', 'page'] as const;

async function readQuery(searchParams: Props['searchParams']): Promise<CatalogQuery> {
  const sp = await searchParams;
  return Object.fromEntries(KEYS.map((k) => [k, [sp[k]].flat()[0] || undefined]).filter(([, v]) => v));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const m = getMarket((await params).market);
  const { category } = await readQuery(searchParams);
  const cat = CATEGORIES[category as Category];
  // Category pages are indexable; every other filter canonicalises back to them.
  const path = `/services${cat ? `?category=${category}` : ''}`;
  return {
    title: cat ? `${cat.label} services in ${m.name}` : `All branding services in ${m.name}`,
    description: cat
      ? `${cat.blurb}. Order online and get it delivered anywhere in ${m.name}.`
      : `Logos, print, gifts, office branding and websites. Prices in ${m.currency}, delivered anywhere in ${m.name}.`,
    alternates: { canonical: `/${m.code}${path}`, languages: alternates(path) },
  };
}

export default async function ServicesPage({ params, searchParams }: Props) {
  const { code: market } = getMarket((await params).market);
  const query = await readQuery(searchParams);
  const { results, total, page, pages } = queryCatalog(market, query);
  const cat = CATEGORIES[query.category as Category];
  const base = `/${market}/services`;
  const filtered = Object.keys(query).some((k) => k !== 'page' && k !== 'sort');

  const href = (patch: CatalogQuery) => {
    const p = new URLSearchParams(Object.entries({ ...query, page: undefined, ...patch }).filter((e): e is [string, string] => Boolean(e[1])));
    return p.size ? `${base}?${p}` : base;
  };

  const chip = 'flex h-10 shrink-0 items-center border px-5 text-sm transition-colors';

  return (
    <div className="wrap py-10 sm:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href={`/${market}`} className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        {cat ? <Link href={base} className="hover:text-ink">Services</Link> : <span className="text-ink">Services</span>}
        {cat && <><span className="mx-2">/</span><span className="text-ink">{cat.label}</span></>}
      </nav>

      <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h1 className="display text-[clamp(3rem,9vw,7.5rem)]">{cat ? cat.label : 'All services'}</h1>
        <p className="text-muted sm:pb-3">
          {total} {total === 1 ? 'service' : 'services'}
          {query.search && <> for “{query.search}”</>}
        </p>
      </div>

      <nav aria-label="Filter by category" className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {[['', 'All'] as const, ...Object.entries(CATEGORIES).map(([k, c]) => [k, c.label] as const)].map(([slug, label]) => {
          const active = (query.category ?? '') === slug;
          return (
            <Link
              key={slug}
              href={href({ category: slug || undefined })}
              aria-current={active ? 'page' : undefined}
              className={`${chip} ${active ? 'border-sand-deep bg-sand font-semibold' : 'border-line hover:border-ink'}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4">
        <CatalogFilters query={query} />
      </div>

      {filtered && (
        <Link href={base} className="mt-4 inline-block text-sm underline underline-offset-4">Clear all filters</Link>
      )}

      {results.length ? (
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 transition-opacity md:grid-cols-3 md:gap-x-6 xl:grid-cols-4 [body:has([data-pending])_&]:opacity-50">
          {results.map((s) => (
            <li key={s.slug} className="reveal">
              <ServiceCard service={s} market={market} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 bg-sand px-6 py-20 text-center">
          <p className="display text-4xl">Nothing matches that.</p>
          <p className="mt-3 text-muted">Try fewer words, or clear a filter.</p>
          <Link href={base} className="btn btn-dark mt-8">Show all services</Link>
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-1">
          {page > 1 && (
            <Link href={href({ page: String(page - 1) })} className="grid size-11 place-items-center border border-line hover:border-ink" aria-label="Previous page">
              <ChevronLeft className="size-4" />
            </Link>
          )}
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={href({ page: n > 1 ? String(n) : undefined })}
              aria-current={n === page ? 'page' : undefined}
              className={`grid size-11 place-items-center border text-sm tabular-nums ${n === page ? 'border-forest bg-forest text-cream' : 'border-line hover:border-ink'}`}
            >
              {n}
            </Link>
          ))}
          {page < pages && (
            <Link href={href({ page: String(page + 1) })} className="grid size-11 place-items-center border border-line hover:border-ink" aria-label="Next page">
              <ChevronRight className="size-4" />
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

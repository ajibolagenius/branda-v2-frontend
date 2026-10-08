'use client';

import { useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { INDUSTRIES, SORTS, URGENCY, USE_CASES, type CatalogQuery } from '@/lib/services-data';

const SELECTS: { key: keyof CatalogQuery; label: string; all: string; options: Record<string, string> }[] = [
  { key: 'industry', label: 'Industry', all: 'Any industry', options: INDUSTRIES },
  { key: 'urgency', label: 'Turnaround', all: 'Any turnaround', options: URGENCY },
  { key: 'useCase', label: 'Use case', all: 'Any use case', options: USE_CASES },
  { key: 'sort', label: 'Sort by', all: 'Most popular', options: SORTS },
];

export function CatalogFilters({ query }: { query: CatalogQuery }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [values, setValues] = useState(query);
  const [synced, setSynced] = useState(query);

  // Back/forward, header search or "clear filters" bring a new query from the server: adopt it.
  if (synced !== query) {
    setSynced(query);
    setValues(query);
  }

  const apply = (next: CatalogQuery) => {
    setValues(next);
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) if (v && k !== 'page') params.set(k, v);
    startTransition(() => router.push(params.size ? `${pathname}?${params}` : pathname, { scroll: false }));
  };

  return (
    <form
      role="search"
      data-pending={pending || undefined}
      onSubmit={(e) => {
        e.preventDefault();
        apply({ ...values, search: values.search?.trim() });
      }}
      className="grid gap-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]"
    >
      <div className="flex">
        <label htmlFor="catalog-search" className="sr-only">Search services</label>
        <input
          id="catalog-search"
          type="search"
          value={values.search ?? ''}
          onChange={(e) => setValues({ ...values, search: e.target.value })}
          placeholder="Search, e.g. “gift box for clients”"
          className="field flex-1"
        />
        <button className="btn btn-dark px-5" aria-label="Search">
          <Search className="size-5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SELECTS.map(({ key, label, all, options }) => (
          <div key={key}>
            <label htmlFor={`f-${key}`} className="sr-only">{label}</label>
            <select
              id={`f-${key}`}
              value={values[key] ?? ''}
              onChange={(e) => apply({ ...values, [key]: e.target.value })}
              className="field cursor-pointer pr-8"
            >
              <option value="">{all}</option>
              {Object.entries(options).map(([value, text]) => (
                <option key={value} value={value}>{text}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </form>
  );
}

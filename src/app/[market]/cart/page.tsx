'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/cart-store';
import { formatCurrency, getMarket, orderSummary } from '@/lib/markets';
import { QtyStepper, SummaryLines } from '@/components/Cart';

export default function CartPage({ params }: PageProps<'/[market]/cart'>) {
  const { code: market } = getMarket(use(params).market);
  const { items, hydrated, setQuantity } = useCartStore();
  const summary = orderSummary(items, market);

  if (!hydrated) return <div className="wrap min-h-[60vh] py-16" aria-busy />;

  if (!summary.items.length) {
    return (
      <div className="wrap py-24 text-center sm:py-32">
        <h1 className="display text-[clamp(3rem,8vw,6.5rem)]">Your cart is empty.</h1>
        <p className="mt-4 text-muted">Everything you add shows up here, ready to check out.</p>
        <Link href={`/${market}/services`} className="btn btn-dark mt-10">Browse services</Link>
      </div>
    );
  }

  return (
    <div className="wrap py-10 sm:py-16">
      <h1 className="display text-[clamp(3rem,8vw,6.5rem)]">Cart <span className="text-ink/25">({summary.count})</span></h1>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
        <ul className="divide-y divide-line border-y border-line">
          {summary.items.map((item) => (
            <li key={item.id} className="flex gap-4 py-6 sm:gap-6">
              <Link href={`/${market}/services/${item.slug}`} className="relative size-24 shrink-0 bg-sand sm:size-32">
                <Image src={item.image} alt={item.name} fill sizes="128px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link href={`/${market}/services/${item.slug}`} className="text-lg font-semibold hover:underline">{item.name}</Link>
                    <p className="mt-1 text-sm text-muted">{Object.values(item.options).join(' · ')}</p>
                  </div>
                  <p className="shrink-0 text-right font-semibold tabular-nums">
                    {formatCurrency(item.unitPrice * item.quantity, market)}
                    {item.quantity > 1 && <span className="block text-xs font-normal text-muted">{formatCurrency(item.unitPrice, market)} each</span>}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <QtyStepper value={item.quantity} onChange={(n) => setQuantity(item.id, n)} label={item.name} />
                  <button type="button" onClick={() => setQuantity(item.id, 0)} className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="bg-white p-6 sm:p-8 lg:sticky lg:top-28">
          <h2 className="text-xl font-bold">Order summary</h2>
          <div className="mt-4">
            <SummaryLines market={market} summary={summary} />
          </div>
          <Link href={`/${market}/checkout`} className="btn btn-dark mt-6 w-full">Check out</Link>
          <Link href={`/${market}/services`} className="btn mt-2 w-full text-sm text-muted hover:text-ink">Keep shopping</Link>
        </aside>
      </div>
    </div>
  );
}

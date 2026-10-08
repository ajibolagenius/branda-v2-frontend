'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { MARKETS, formatCurrency, orderSummary } from '@/lib/markets';
import { defaultOptions, unitPrice } from '@/lib/services-data';
import type { MarketCode, Service } from '@/lib/types';

export function QtyStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  const box = 'grid size-9 place-items-center border border-ink/80 transition-colors hover:bg-sand';
  return (
    <div className="flex items-center" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" className={box} onClick={() => onChange(value - 1)} aria-label="Decrease quantity">
        <Minus className="size-3.5" />
      </button>
      <output className="grid h-9 min-w-10 place-items-center border-y border-ink/80 bg-sand px-2 text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </output>
      <button type="button" className={box} onClick={() => onChange(value + 1)} aria-label="Increase quantity">
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

export function SummaryLines({ market, summary }: { market: MarketCode; summary: ReturnType<typeof orderSummary> }) {
  const row = 'flex justify-between py-1.5 text-sm';
  return (
    <dl>
      <div className={row}><dt className="text-muted">Subtotal</dt><dd className="tabular-nums">{formatCurrency(summary.subtotal, market)}</dd></div>
      <div className={row}><dt className="text-muted">{MARKETS[market].taxLabel}</dt><dd className="tabular-nums">{formatCurrency(summary.tax, market)}</dd></div>
      <div className={row}>
        <dt className="text-muted">Delivery</dt>
        <dd className="tabular-nums">{summary.shipping ? formatCurrency(summary.shipping, market) : 'Free'}</dd>
      </div>
      <div className="mt-2 flex items-baseline justify-between border-t border-ink pt-3">
        <dt className="font-semibold">Total</dt>
        <dd className="text-2xl font-bold tabular-nums">{formatCurrency(summary.total, market)}</dd>
      </div>
      {summary.shipping > 0 && (
        <p className="mt-2 text-xs text-muted">Add {formatCurrency(summary.toFreeShipping, market)} more for free delivery.</p>
      )}
    </dl>
  );
}

export function QuickAdd({ service, market }: { service: Service; market: MarketCode }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <button
      type="button"
      aria-label={`Add ${service.name} to cart`}
      onClick={() =>
        addItem({
          slug: service.slug,
          name: service.name,
          image: service.images[0],
          market,
          options: defaultOptions(service),
          unitPrice: unitPrice(service, market),
          quantity: 1,
        })
      }
      className="grid size-8 shrink-0 place-items-center border border-ink/80 transition-[transform,background-color] duration-150 ease-out hover:bg-forest hover:text-cream active:scale-90"
    >
      <Plus className="size-4" />
    </button>
  );
}

export function CartButton({ market }: { market: MarketCode }) {
  const count = useCartStore((s) => orderSummary(s.items, market).count);
  const openCart = useCartStore((s) => s.openCart);
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
      className="relative grid size-11 place-items-center rounded-full bg-forest text-cream transition-transform duration-150 ease-out active:scale-95"
    >
      <ShoppingBag className="size-[18px]" />
      {count > 0 && (
        <span key={count} className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[11px] font-bold text-ink animate-[pop_300ms_var(--ease-out)]">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartDrawer({ market }: { market: MarketCode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { items, isOpen, closeCart, setQuantity } = useCartStore();
  const summary = orderSummary(items, market);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (isOpen && !dialog?.open) dialog?.showModal();
    if (!isOpen && dialog?.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="cart-title"
      className="drawer bg-cream p-0 text-ink"
      onClose={closeCart}
      onClick={(e) => e.target === e.currentTarget && closeCart()}
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 id="cart-title" className="text-xl font-bold">
            Your order <span className="text-muted">({summary.count})</span>
          </h2>
          <button type="button" onClick={closeCart} aria-label="Close cart" className="grid size-10 place-items-center hover:bg-sand">
            <X className="size-5" />
          </button>
        </header>

        {summary.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="display text-3xl">Nothing here yet.</p>
            <p className="text-sm text-muted">Pick a service and it will show up here.</p>
            <Link href={`/${market}/services`} onClick={closeCart} className="btn btn-dark mt-2">
              Browse services
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {summary.items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <div className="relative size-20 shrink-0 bg-sand">
                    <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex justify-between gap-3">
                      <Link href={`/${market}/services/${item.slug}`} onClick={closeCart} className="font-semibold leading-snug hover:underline">
                        {item.name}
                      </Link>
                      <span className="shrink-0 text-sm font-semibold tabular-nums">{formatCurrency(item.unitPrice * item.quantity, market)}</span>
                    </div>
                    <p className="text-xs text-muted">{Object.values(item.options).join(' · ')}</p>
                    <div className="flex items-center justify-between">
                      <QtyStepper value={item.quantity} onChange={(n) => setQuantity(item.id, n)} label={item.name} />
                      <button type="button" onClick={() => setQuantity(item.id, 0)} className="text-xs text-muted underline-offset-4 hover:text-ink hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="border-t border-line bg-white px-6 py-5">
              <SummaryLines market={market} summary={summary} />
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Link href={`/${market}/cart`} onClick={closeCart} className="btn btn-line px-4">View cart</Link>
                <Link href={`/${market}/checkout`} onClick={closeCart} className="btn btn-dark px-4">Check out</Link>
              </div>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}

'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { formatCurrency, getMarket, orderSummary } from '@/lib/markets';
import { SummaryLines } from '@/components/Cart';

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { name: 'company', label: 'Company (optional)', type: 'text', autoComplete: 'organization', optional: true },
  { name: 'address', label: 'Delivery address', type: 'text', autoComplete: 'street-address', wide: true },
  { name: 'city', label: 'City', type: 'text', autoComplete: 'address-level2' },
  { name: 'postcode', label: 'Postcode (optional)', type: 'text', autoComplete: 'postal-code', optional: true },
];

export default function CheckoutPage({ params }: PageProps<'/[market]/checkout'>) {
  const router = useRouter();
  const config = getMarket(use(params).market);
  const market = config.code;
  const { items, hydrated, clearMarket } = useCartStore();
  const summary = orderSummary(items, market);

  const payments = market === 'ng' ? ['Card', 'Bank transfer', 'Deposit now, balance on delivery'] : ['Card', 'Bank transfer', 'Invoice (net 14)'];

  if (!hydrated) return <div className="wrap min-h-[60vh] py-16" aria-busy />;

  if (!summary.items.length) {
    return (
      <div className="wrap py-24 text-center sm:py-32">
        <h1 className="display text-[clamp(3rem,8vw,6.5rem)]">Nothing to check out.</h1>
        <p className="mt-4 text-muted">Add a service to your cart first.</p>
        <Link href={`/${market}/services`} className="btn btn-dark mt-10">Browse services</Link>
      </div>
    );
  }

  const placeOrder = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const order = `BRD-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    clearMarket(market);
    router.replace(`/${market}/checkout/confirmation?order=${order}`);
  };

  return (
    <form onSubmit={placeOrder} className="wrap py-10 sm:py-16">
      <Link href={`/${market}/cart`} className="text-sm text-muted hover:text-ink">← Back to cart</Link>
      <h1 className="display mt-4 text-[clamp(3rem,8vw,6.5rem)]">Checkout</h1>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_420px] lg:gap-16">
        <div className="space-y-12">
          <fieldset>
            <legend className="text-2xl font-bold">1. Delivery details</legend>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.name} className={f.wide ? 'sm:col-span-2' : ''}>
                  <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium">{f.label}</label>
                  <input id={f.name} name={f.name} type={f.type} autoComplete={f.autoComplete} required={!f.optional} className="field" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="notes" className="mb-1.5 block text-sm font-medium">Notes for our team (optional)</label>
                <textarea id="notes" name="notes" rows={3} placeholder="Brand colours, logo files link, delivery instructions" className="field py-3" />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-2xl font-bold">2. Payment</legend>
            <p className="mt-2 text-sm text-muted">Demo checkout: no payment is taken. Your order goes straight to confirmation.</p>
            <div className="mt-6 grid gap-2">
              {payments.map((p, i) => (
                <label key={p} className="flex h-14 cursor-pointer items-center gap-3 border border-line bg-white px-4 transition-colors hover:border-ink has-checked:border-forest has-checked:bg-sand">
                  <input type="radio" name="payment" value={p} defaultChecked={i === 0} className="size-4 accent-forest" />
                  {p}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="bg-white p-6 sm:p-8 lg:sticky lg:top-28">
          <h2 className="text-xl font-bold">Your order</h2>
          <ul className="mt-4 divide-y divide-line">
            {summary.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <div className="relative size-14 shrink-0 bg-sand">
                  <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted">Qty {item.quantity} · {Object.values(item.options).join(' · ')}</p>
                </div>
                <p className="text-sm font-semibold tabular-nums">{formatCurrency(item.unitPrice * item.quantity, market)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-line pt-4">
            <SummaryLines market={market} summary={summary} />
          </div>
          <button className="btn btn-dark mt-6 w-full">Place order · {formatCurrency(summary.total, market)}</button>
          <p className="mt-3 text-center text-xs text-muted">Delivering to {config.name} in {config.currency}</p>
        </aside>
      </div>
    </form>
  );
}

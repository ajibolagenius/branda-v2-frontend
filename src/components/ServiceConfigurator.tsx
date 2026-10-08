'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { formatCurrency } from '@/lib/markets';
import { defaultOptions, unitPrice } from '@/lib/services-data';
import type { MarketCode, Service } from '@/lib/types';
import { QtyStepper } from './Cart';

export function ServiceConfigurator({ service, market }: { service: Service; market: MarketCode }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [options, setOptions] = useState(() => defaultOptions(service));
  const [quantity, setQuantity] = useState(1);

  const price = unitPrice(service, market, options);
  const listPrice = unitPrice({ ...service, discount: 0 }, market, options);

  const add = (open: boolean) =>
    addItem({ slug: service.slug, name: service.name, image: service.images[0], market, options, unitPrice: price, quantity }, open);

  return (
    <div className="space-y-8">
      {service.options.map((opt) => (
        <fieldset key={opt.name}>
          <legend className="eyebrow mb-3">{opt.name}</legend>
          <div className="flex flex-wrap gap-2">
            {opt.choices.map((c) => (
              <label
                key={c.label}
                className="flex h-11 cursor-pointer items-center gap-2 border border-line px-4 text-sm transition-colors hover:border-ink has-checked:border-forest has-checked:bg-forest has-checked:text-cream has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-forest"
              >
                <input
                  type="radio"
                  name={opt.name}
                  value={c.label}
                  checked={options[opt.name] === c.label}
                  onChange={() => setOptions({ ...options, [opt.name]: c.label })}
                  className="sr-only"
                />
                {c.label}
                {c.multiplier !== 1 && (
                  <span className="text-xs opacity-70">
                    {c.multiplier > 1 ? '+' : '−'}
                    {Math.round(Math.abs(c.multiplier - 1) * 100)}%
                  </span>
                )}
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="border-b-2 border-ink pb-4">
        <p className="flex items-baseline gap-3 tabular-nums">
          <span className="text-4xl font-bold">{formatCurrency(price * quantity, market)}</span>
          {service.discount && <s className="text-muted">{formatCurrency(listPrice * quantity, market)}</s>}
        </p>
        {quantity > 1 && <p className="mt-1 text-sm text-muted">{formatCurrency(price, market)} each</p>}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-medium">Quantity</span>
        <QtyStepper value={quantity} onChange={(n) => setQuantity(Math.max(1, n))} label={service.name} />
      </div>

      <div className="grid gap-3">
        <button type="button" onClick={() => add(true)} className="btn btn-line w-full">
          Add to cart
        </button>
        <button
          type="button"
          onClick={() => {
            add(false);
            router.push(`/${market}/checkout`);
          }}
          className="btn btn-dark w-full"
        >
          Order now
        </button>
      </div>
    </div>
  );
}

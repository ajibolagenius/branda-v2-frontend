'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Tag } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { isValidMarket, getMarketConfig, formatCurrency } from '@/lib/markets';
import { MarketCode } from '@/lib/types';

interface CartPageProps {
  params: Promise<{ market: string }>;
}

export default function CartPage({ params }: CartPageProps) {
  const { market } = use(params);

  const marketCode = (isValidMarket(market) ? market : 'ng') as MarketCode;
  const config = getMarketConfig(marketCode);

  const { items, updateQuantity, removeItem, getSubtotal, getTax, getTotal } = useCartStore();

  const marketItems = items.filter((item) => item.market === marketCode);
  const subtotal = getSubtotal(marketCode);
  const tax = getTax(marketCode);
  const total = getTotal(marketCode);

  if (marketItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eee9df] text-zinc-500">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-3xl sm:text-4xl font-black tracking-tight text-[#111311]">
          Your Cart is Empty
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
          Explore corporate deliverables across Create, Prints, Gifts, Studio, and Digital for {config.name}.
        </p>
        <div className="mt-8">
          <Link
            href={`/${marketCode}`}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#222b22] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#161c16] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Page Title */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href={`/${marketCode}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#222b22] hover:underline mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111311]">
            Shopping Cart ({marketItems.reduce((acc, i) => acc + i.quantity, 0)})
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-3xl border border-[#e6e1d6] bg-white p-6 sm:p-8 shadow-xs divide-y divide-[#e6e1d6]">
            {marketItems.map((item) => (
              <div key={item.cartItemId} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                {/* Thumbnail */}
                <Link
                  href={`/${marketCode}/services/${item.slug}`}
                  className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-[#e6e1d6] bg-[#eee9df]"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block rounded-md bg-[#eee9df] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#222b22] mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold uppercase tracking-wide text-zinc-950 hover:underline">
                        <Link href={`/${marketCode}/services/${item.slug}`}>{item.name}</Link>
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.cartItemId)}
                      aria-label={`Remove ${item.name}`}
                      className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Options */}
                  {Object.keys(item.selectedOptions).length > 0 && (
                    <div className="mt-2 text-xs text-zinc-500 space-y-0.5">
                      {Object.entries(item.selectedOptions).map(([key, val]) => (
                        <span key={key} className="inline-block mr-3 capitalize">
                          <strong className="font-semibold text-zinc-700">{key.replace('_', ' ')}:</strong> {val}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price & Stepper Row */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-2xl border border-[#e6e1d6] bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1.5 px-3 text-zinc-600 hover:text-black transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono text-xs font-bold text-zinc-950">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1.5 px-3 text-zinc-600 hover:text-black transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-base font-bold text-zinc-950">
                        {formatCurrency(item.unitPrice * item.quantity, marketCode)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-[11px] font-mono text-zinc-500">
                          {formatCurrency(item.unitPrice, marketCode)} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Guarantees */}
          <div className="flex items-center gap-3 rounded-2xl border border-[#e6e1d6] bg-[#eee9df] p-4 text-xs text-zinc-700">
            <ShieldCheck className="h-5 w-5 text-[#222b22] flex-shrink-0" />
            <span>
              All deliveries include uncompressed vector master assets, 3 QA revision cycles, and 100% full commercial IP rights assignment.
            </span>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-[#e6e1d6] bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-lg font-black tracking-tight text-zinc-950">
              Order Summary
            </h2>

            {/* Promo Code Input Simulator */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Promo Code"
                  defaultValue="BRANDA2026"
                  className="w-full rounded-2xl border border-[#e6e1d6] bg-white py-2.5 pl-9 pr-3 text-xs uppercase tracking-wider text-zinc-900 outline-none focus:border-[#222b22]"
                />
              </div>
              <button
                type="button"
                className="rounded-2xl border border-[#222b22] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#222b22] hover:bg-[#eee9df] transition-colors"
              >
                Apply
              </button>
            </div>

            {/* Calculation Breakdown */}
            <div className="space-y-3 text-xs border-t border-[#e6e1d6] pt-4">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-zinc-950">{formatCurrency(subtotal, marketCode)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>{config.taxLabel} ({Math.round(config.taxRate * 100)}%)</span>
                <span className="font-mono font-bold text-zinc-950">{formatCurrency(tax, marketCode)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Express Dispatch ({config.name})</span>
                <span className="font-mono font-bold text-emerald-700">
                  {subtotal >= config.freeShippingThreshold ? 'FREE' : formatCurrency(marketCode === 'ng' ? 5000 : 25, marketCode)}
                </span>
              </div>

              <div className="border-t border-[#e6e1d6] pt-3 flex justify-between text-base font-black text-zinc-950">
                <span>Order Total</span>
                <span className="font-mono text-2xl">{formatCurrency(total, marketCode)}</span>
              </div>
            </div>

            {/* Free Shipping Alert */}
            {subtotal >= config.freeShippingThreshold ? (
              <div className="rounded-2xl bg-[#222b22]/10 p-3 text-[11px] font-bold text-[#222b22]">
                ✓ Qualified for Free Express Dispatch in {config.name}
              </div>
            ) : (
              <div className="text-[11px] text-zinc-500">
                Add {formatCurrency(config.freeShippingThreshold - subtotal, marketCode)} more to unlock complimentary dispatch.
              </div>
            )}

            {/* Checkout CTA */}
            <Link
              href={`/${marketCode}/checkout`}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#222b22] py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#161c16] transition-colors"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

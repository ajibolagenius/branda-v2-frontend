'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { MarketCode } from '@/lib/types';
import { getMarketConfig, formatCurrency } from '@/lib/markets';

interface CartDrawerProps {
  market: MarketCode;
}

export function CartDrawer({ market }: CartDrawerProps) {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal, getTax, getTotal } = useCartStore();
  const config = getMarketConfig(market);

  const marketItems = items.filter((item) => item.market === market);
  const subtotal = getSubtotal(market);
  const tax = getTax(market);
  const total = getTotal(market);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-[#e6e1d6] bg-[#f8f6f0] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#e6e1d6] px-6 py-5 bg-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="h-5 w-5 text-[#222b22]" />
              <h2 id="cart-title" className="text-base font-black tracking-tight text-zinc-950">
                Your Orders ({marketItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close orders drawer"
              className="rounded-full p-2 text-zinc-500 hover:bg-[#eee9df] hover:text-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {marketItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eee9df] text-zinc-500">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-base font-bold text-zinc-950">Your cart is empty</h3>
                <p className="mt-1 text-xs text-zinc-500 max-w-xs">
                  Discover deliverables across Create, Prints, Gifts, Studio, and Digital for {config.name}.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-6 rounded-full bg-[#222b22] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#161c16] transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-[#e6e1d6]">
                {marketItems.map((item) => (
                  <li key={item.cartItemId} className="flex gap-4 py-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-[#e6e1d6] bg-[#eee9df]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/${market}/services/${item.slug}`}
                            onClick={closeCart}
                            className="text-xs font-bold uppercase tracking-wide text-zinc-950 hover:underline line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(item.cartItemId)}
                            aria-label={`Remove ${item.name}`}
                            className="text-zinc-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <span className="inline-block mt-0.5 rounded bg-[#eee9df] px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#222b22]">
                          {item.category}
                        </span>

                        {/* Selected Options */}
                        {Object.keys(item.selectedOptions).length > 0 && (
                          <div className="mt-1 text-[11px] text-zinc-500 space-y-0.5">
                            {Object.entries(item.selectedOptions).map(([key, value]) => (
                              <div key={key} className="capitalize">
                                <span className="text-zinc-400">{key.replace('_', ' ')}:</span> {value}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity Stepper */}
                        <div className="flex items-center rounded-2xl border border-[#e6e1d6] bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1.5 px-2.5 text-zinc-600 hover:text-black transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center font-mono text-xs font-bold text-zinc-950">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1.5 px-2.5 text-zinc-600 hover:text-black transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-mono text-xs font-bold text-zinc-950">
                            {formatCurrency(item.unitPrice * item.quantity, market)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-[10px] text-zinc-500">
                              {formatCurrency(item.unitPrice, market)} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer Summary */}
          {marketItems.length > 0 && (
            <div className="border-t border-[#e6e1d6] bg-[#eee9df]/50 p-6">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-zinc-950">{formatCurrency(subtotal, market)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>{config.taxLabel}</span>
                  <span className="font-mono font-bold text-zinc-950">{formatCurrency(tax, market)}</span>
                </div>
                <div className="border-t border-[#e6e1d6] pt-2 flex justify-between font-bold text-sm text-zinc-950">
                  <span>Estimated Total</span>
                  <span className="font-mono font-black text-lg">{formatCurrency(total, market)}</span>
                </div>
              </div>

              {subtotal >= config.freeShippingThreshold ? (
                <div className="mt-3 rounded-xl bg-[#222b22]/10 px-3 py-1.5 text-[11px] font-bold text-[#222b22]">
                  ✓ Qualified for Free Standard Delivery in {config.name}
                </div>
              ) : (
                <div className="mt-3 text-[11px] text-zinc-500">
                  Add {formatCurrency(config.freeShippingThreshold - subtotal, market)} more for complimentary dispatch.
                </div>
              )}

              <div className="mt-5 space-y-2">
                <Link
                  href={`/${market}/checkout`}
                  onClick={closeCart}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#222b22] py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#161c16] transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={closeCart}
                  className="w-full py-2 text-center text-xs font-bold text-zinc-600 hover:text-black transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

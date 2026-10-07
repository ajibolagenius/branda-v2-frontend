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

  // Filter items that match the current market
  const marketItems = items.filter((item) => item.market === market);
  const subtotal = getSubtotal(market);
  const tax = getTax(market);
  const total = getTotal(market);

  // Lock body scroll when drawer is open
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

  // Handle ESC key
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
        <div className="w-screen max-w-md border-l border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5 dark:border-zinc-900">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
              <h2 id="cart-title" className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Order Review ({marketItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close cart"
              className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {marketItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-400">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">Your cart is empty</h3>
                <p className="mt-1 text-xs text-zinc-500 max-w-xs">
                  Discover services across Digital, Gifts, Create, Studio, and Prints tailored for {config.name}.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-6 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {marketItems.map((item) => (
                  <li key={item.cartItemId} className="flex gap-4 py-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
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
                            className="text-xs font-semibold text-zinc-900 hover:underline dark:text-zinc-100 line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(item.cartItemId)}
                            aria-label={`Remove ${item.name}`}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <span className="inline-block mt-0.5 rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
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
                        {/* Quantity Selector */}
                        <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center font-mono text-xs font-medium text-zinc-900 dark:text-zinc-100">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                            {formatCurrency(item.unitPrice * item.quantity, market)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-[10px] text-zinc-400">
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
            <div className="border-t border-zinc-100 bg-zinc-50/60 p-6 dark:border-zinc-900 dark:bg-zinc-900/40">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100">{formatCurrency(subtotal, market)}</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>{config.taxLabel}</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100">{formatCurrency(tax, market)}</span>
                </div>
                <div className="border-t border-zinc-200 pt-2 flex justify-between font-medium text-sm text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
                  <span>Estimated Total</span>
                  <span className="font-mono font-bold text-base">{formatCurrency(total, market)}</span>
                </div>
              </div>

              {subtotal >= config.freeShippingThreshold ? (
                <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                  ✓ Qualified for Free Standard Delivery in {config.name}
                </div>
              ) : (
                <div className="mt-3 text-[11px] text-zinc-500">
                  Add {formatCurrency(config.freeShippingThreshold - subtotal, market)} more for free express shipping.
                </div>
              )}

              <div className="mt-5 space-y-2">
                <Link
                  href={`/${market}/checkout`}
                  onClick={closeCart}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={closeCart}
                  className="w-full py-2 text-center text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
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

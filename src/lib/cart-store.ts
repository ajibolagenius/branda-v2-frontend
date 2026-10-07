'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, MarketCode } from './types';
import { getMarketConfig } from './markets';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: (market: MarketCode) => number;
  getTax: (market: MarketCode) => number;
  getTotal: (market: MarketCode) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (item) => {
        const sortedOptions = Object.keys(item.selectedOptions)
          .sort()
          .map((k) => `${k}:${item.selectedOptions[k]}`)
          .join('|');
        const cartItemId = `${item.serviceId}-${item.market}-${sortedOptions}`;

        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.cartItemId === cartItemId);
          if (existingIndex > -1) {
            const nextItems = [...state.items];
            nextItems[existingIndex] = {
              ...nextItems[existingIndex],
              quantity: nextItems[existingIndex].quantity + item.quantity,
            };
            return { items: nextItems, isOpen: true };
          }
          return { items: [...state.items, { ...item, cartItemId }], isOpen: true };
        });
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSubtotal: (market) => {
        return get()
          .items.filter((item) => item.market === market)
          .reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
      },

      getTax: (market) => {
        const subtotal = get().getSubtotal(market);
        const config = getMarketConfig(market);
        return Math.round(subtotal * config.taxRate * 100) / 100;
      },

      getTotal: (market) => {
        const subtotal = get().getSubtotal(market);
        const tax = get().getTax(market);
        return subtotal + tax;
      },
    }),
    {
      name: 'branda_v2_cart',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        // Fallback for SSR/Server Components (Ponytail: clean mock without dummy storage packages)
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

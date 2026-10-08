'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, MarketCode } from './types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean; // false until localStorage has been read
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>, open?: boolean) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearMarket: (market: MarketCode) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      hydrated: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (item, open = true) => {
        const id = [item.slug, item.market, ...Object.values(item.options)].join('|');
        set((s) => {
          const existing = s.items.find((i) => i.id === id);
          const items = existing
            ? s.items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i))
            : [...s.items, { ...item, id }];
          return { items, isOpen: open || s.isOpen };
        });
      },

      setQuantity: (id, quantity) =>
        set((s) => ({
          items: quantity < 1 ? s.items.filter((i) => i.id !== id) : s.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),

      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clearMarket: (market) => set((s) => ({ items: s.items.filter((i) => i.market !== market) })),
    }),
    {
      name: 'branda_cart_v3',
      partialize: (s) => ({ items: s.items }),
      // Rehydrated after mount (see CartDrawer) so server and first client render match.
      skipHydration: true,
      onRehydrateStorage: () => () => useCartStore.setState({ hydrated: true }),
    },
  ),
);

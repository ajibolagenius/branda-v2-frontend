import type { CartItem, MarketCode, MarketConfig } from './types';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://branda-v2-theta.vercel.app';

export const MARKETS: Record<MarketCode, MarketConfig> = {
  ng: {
    code: 'ng',
    name: 'Nigeria',
    locale: 'en-NG',
    currency: 'NGN',
    flag: '🇳🇬',
    taxRate: 0.075,
    taxLabel: 'VAT 7.5%',
    shippingFee: 5000,
    freeShippingFrom: 150000,
    headline: 'Every branding job. One order.',
    subline: 'Logos, print, gifts, office branding and websites. Made and delivered anywhere in Nigeria, with no middleman markup.',
    featured: ['executive-gift-box', 'custom-apparel', 'branded-mugs', 'business-cards', 'event-backdrop', 'logo-design'],
    spotlight: 'office-wall-branding',
  },
  us: {
    code: 'us',
    name: 'United States',
    locale: 'en-US',
    currency: 'USD',
    flag: '🇺🇸',
    taxRate: 0.08,
    taxLabel: 'Sales tax (est. 8%)',
    shippingFee: 25,
    freeShippingFrom: 500,
    headline: 'Brand everything. Ship it nationwide.',
    subline: 'Identity, merch, print and web for US teams. One cart, one invoice, delivered to any state.',
    featured: ['logo-design', 'custom-apparel', 'executive-gift-box', 'website-design', 'branded-tumblers', 'stickers-labels'],
    spotlight: 'exhibition-booth',
  },
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    locale: 'en-GB',
    currency: 'GBP',
    flag: '🇬🇧',
    taxRate: 0.2,
    taxLabel: 'VAT 20%',
    shippingFee: 20,
    freeShippingFrom: 350,
    headline: 'Your whole brand, sorted.',
    subline: 'From business cards to office signage. Produced and delivered anywhere in the UK, on one invoice.',
    featured: ['business-cards', 'office-wall-branding', 'logo-design', 'branded-mugs', 'packaging-design', 'brand-portal'],
    spotlight: 'executive-gift-box',
  },
  ca: {
    code: 'ca',
    name: 'Canada',
    locale: 'en-CA',
    currency: 'CAD',
    flag: '🇨🇦',
    taxRate: 0.13,
    taxLabel: 'HST 13%',
    shippingFee: 30,
    freeShippingFrom: 600,
    headline: 'From logo to lobby.',
    subline: 'Identity, gifting, print and workspace branding. Delivered coast to coast across Canada.',
    featured: ['executive-gift-box', 'exhibition-booth', 'custom-apparel', 'branded-backpacks', 'website-design', 'business-cards'],
    spotlight: 'neon-signage',
  },
};

export const SUPPORTED_MARKETS = Object.keys(MARKETS) as MarketCode[];

export function isValidMarket(market: string): market is MarketCode {
  return market in MARKETS;
}

// Route params are untrusted; unknown codes fall back to Nigeria.
export function getMarket(market: string): MarketConfig {
  return isValidMarket(market) ? MARKETS[market] : MARKETS.ng;
}

// hreflang map for a path shared by every market, e.g. '/services/logo-design'.
export function alternates(path = '') {
  return {
    ...Object.fromEntries(SUPPORTED_MARKETS.map((c) => [MARKETS[c].locale, `/${c}${path}`])),
    'x-default': `/ng${path}`,
  };
}

export function formatCurrency(amount: number, market: MarketCode): string {
  const { locale, currency } = MARKETS[market];
  const digits = market === 'ng' ? 0 : 2;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

// Single source of truth for every total shown: drawer, cart page and checkout.
export function orderSummary(allItems: CartItem[], market: MarketCode) {
  const { taxRate, shippingFee, freeShippingFrom } = MARKETS[market];
  const items = allItems.filter((i) => i.market === market);
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((n, i) => n + i.unitPrice * i.quantity, 0);
  const tax = Math.round(subtotal * taxRate * 100) / 100;
  const shipping = count === 0 || subtotal >= freeShippingFrom ? 0 : shippingFee;
  return { items, count, subtotal, tax, shipping, total: subtotal + tax + shipping, toFreeShipping: Math.max(0, freeShippingFrom - subtotal) };
}

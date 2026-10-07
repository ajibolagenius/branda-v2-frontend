import { MarketCode, MarketConfig } from './types';

export const MARKETS: Record<MarketCode, MarketConfig> = {
  ng: {
    code: 'ng',
    name: 'Nigeria',
    currency: 'NGN',
    symbol: '₦',
    flag: '🇳🇬',
    taxRate: 0.075,
    taxLabel: 'VAT (7.5%)',
    freeShippingThreshold: 150000,
    hero: {
      badge: 'Branda V2 · West Africa Production Hub',
      headline: 'The Complete Branding Ecosystem for Modern African Enterprise',
      tagline: 'Order bespoke corporate merchandise, architectural studio fit-outs, and digital brand collateral with nationwide logistics.',
      subtext: 'Fast-tracked turnaround across Lagos, Abuja, Port Harcourt & 33 states with verified quality assurance.',
    },
  },
  us: {
    code: 'us',
    name: 'United States',
    currency: 'USD',
    symbol: '$',
    flag: '🇺🇸',
    taxRate: 0.08,
    taxLabel: 'Est. Sales Tax (8%)',
    freeShippingThreshold: 500,
    hero: {
      badge: 'Branda Global · North America Fulfillment',
      headline: 'Enterprise-Grade Corporate Branding & Premium Custom Swag',
      tagline: 'Transform your brand presence with precision custom apparel, executive gift packs, and high-impact digital experiences.',
      subtext: 'Coast-to-coast rapid fulfillment for high-growth tech startups, agencies, and enterprise marketing teams.',
    },
  },
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    currency: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    taxRate: 0.2,
    taxLabel: 'UK VAT (20%)',
    freeShippingThreshold: 350,
    hero: {
      badge: 'Branda UK · London & Regional Network',
      headline: 'Curated Branding Services & Bespoke Merchandising Solutions',
      tagline: 'Deliver unmatched physical and digital brand touchpoints tailored for demanding British commerce.',
      subtext: 'Precision craftmanship, sustainably sourced materials, and rapid turnaround across London and nationwide.',
    },
  },
  ca: {
    code: 'ca',
    name: 'Canada',
    currency: 'CAD',
    symbol: 'CA$',
    flag: '🇨🇦',
    taxRate: 0.13,
    taxLabel: 'Harmonized Sales Tax (HST 13%)',
    freeShippingThreshold: 600,
    hero: {
      badge: 'Branda Canada · Pan-Canadian Delivery',
      headline: 'Bilingual Branding Excellence & Premium Workspace Production',
      tagline: 'Elevate customer and team touchpoints with executive gifts, retail packaging, and modern corporate signage.',
      subtext: 'Seamless fulfillment across Toronto, Vancouver, Montreal, and nationwide with zero border friction.',
    },
  },
};

export const SUPPORTED_MARKETS: MarketCode[] = ['ng', 'us', 'uk', 'ca'];

// Secure validation against untrusted route parameters (Secure-Me)
export function isValidMarket(market: string): market is MarketCode {
  return SUPPORTED_MARKETS.includes(market as MarketCode);
}

export function getMarketConfig(market: string): MarketConfig {
  if (isValidMarket(market)) {
    return MARKETS[market];
  }
  return MARKETS.ng; // Safe default
}

// Ponytail: Standard library Intl.NumberFormat without external accounting bloat
export function formatCurrency(amount: number, market: MarketCode): string {
  const config = getMarketConfig(market);
  return new Intl.NumberFormat(market === 'ng' ? 'en-NG' : market === 'us' ? 'en-US' : market === 'uk' ? 'en-GB' : 'en-CA', {
    style: 'currency',
    currency: config.currency,
    maximumFractionDigits: market === 'ng' ? 0 : 2,
    minimumFractionDigits: market === 'ng' ? 0 : 2,
  }).format(amount);
}

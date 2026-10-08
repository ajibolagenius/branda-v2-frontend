export type MarketCode = 'ng' | 'us' | 'uk' | 'ca';

export type Category = 'create' | 'prints' | 'gifts' | 'studio' | 'digital';

export type Urgency = 'priority' | 'express' | 'standard';

export interface MarketConfig {
  code: MarketCode;
  name: string;
  locale: string; // BCP 47, drives Intl formatting and hreflang
  currency: 'NGN' | 'USD' | 'GBP' | 'CAD';
  flag: string;
  taxRate: number;
  taxLabel: string;
  shippingFee: number;
  freeShippingFrom: number;
  headline: string;
  subline: string;
  featured: string[]; // service slugs, in display order: hero pair first
  spotlight: string;
}

export interface ServiceOption {
  name: string;
  choices: { label: string; multiplier: number }[]; // first choice is the default
}

export interface Service {
  slug: string;
  name: string;
  category: Category;
  summary: string;
  description: string;
  prices: Record<MarketCode, number>;
  discount?: number; // percent off
  images: string[];
  includes: string[];
  turnaroundDays: number;
  popular: boolean;
  industries: string[];
  useCase: string;
  options: ServiceOption[];
  related: string[];
}

export interface CartItem {
  id: string; // slug + market + options, so the same config merges
  slug: string;
  name: string;
  image: string;
  market: MarketCode;
  options: Record<string, string>; // option name -> choice label
  unitPrice: number;
  quantity: number;
}

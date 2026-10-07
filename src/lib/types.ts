export type MarketCode = 'ng' | 'us' | 'uk' | 'ca';

export type Category = 'digital' | 'gifts' | 'create' | 'studio' | 'prints';

export interface MarketConfig {
  code: MarketCode;
  name: string;
  currency: 'NGN' | 'USD' | 'GBP' | 'CAD';
  symbol: string;
  flag: string;
  taxRate: number;
  taxLabel: string;
  freeShippingThreshold: number;
  hero: {
    badge: string;
    headline: string;
    tagline: string;
    subtext: string;
  };
}

export interface ServiceOptionChoice {
  label: string;
  value: string;
  priceMultiplier: number; // Applied to base price
  isDefault?: boolean;
}

export interface ServiceOption {
  id: string;
  name: string;
  type: 'tier' | 'material' | 'size' | 'finish';
  choices: ServiceOptionChoice[];
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: Category;
  shortDescription: string;
  fullDescription: string;
  basePrices: Record<MarketCode, number>;
  discountPercentage?: number;
  images: string[];
  inclusions: string[];
  turnaroundDays: number;
  popular: boolean;
  featured: boolean;
  industryTags: string[];
  urgency: 'Priority (24-48h)' | 'Express (3-5d)' | 'Standard (7-10d)';
  useCase: 'Brand Launch' | 'Corporate Gifting' | 'Marketing Campaign' | 'Workspace Transformation';
  options: ServiceOption[];
  relatedSlugs: string[];
}

export interface CartItem {
  cartItemId: string;
  serviceId: string;
  slug: string;
  name: string;
  category: Category;
  image: string;
  quantity: number;
  selectedOptions: Record<string, string>; // optionId -> choiceValue
  unitPrice: number;
  market: MarketCode;
}

export interface ServiceFilters {
  category?: Category | 'all';
  search?: string;
  industry?: string;
  urgency?: string;
  useCase?: string;
  sortBy?: 'popularity' | 'price-asc' | 'price-desc' | 'turnaround';
  page?: number;
}

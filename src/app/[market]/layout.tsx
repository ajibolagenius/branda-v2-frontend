import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { isValidMarket, getMarketConfig, SUPPORTED_MARKETS } from '@/lib/markets';
import { MarketCode } from '@/lib/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

export const instant = false;

interface MarketLayoutProps {
  children: React.ReactNode;
  params: Promise<{ market: string }>;
}

export async function generateStaticParams() {
  return SUPPORTED_MARKETS.map((market) => ({ market }));
}

export const metadata: Metadata = {
  title: {
    default: 'Branda — Modern Branding Ecosystem',
    template: '%s | Branda',
  },
  description:
    'Branda connects physical craftsmanship, workspace architecture, and digital brand commerce across Nigeria, USA, UK, and Canada.',
};

export default async function MarketLayout({ children, params }: MarketLayoutProps) {
  const { market } = await params;

  // Secure-Me validation: Prevent invalid market parameter injection
  if (!isValidMarket(market)) {
    redirect('/ng');
  }

  const marketCode = market as MarketCode;

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f4ee] text-[#141513] antialiased selection:bg-[#2a362a] selection:text-white">
      <Header market={marketCode} />
      <main className="flex-1 pt-32 sm:pt-36 pb-20 sm:pb-24">{children}</main>
      <CartDrawer market={marketCode} />
      <Footer market={marketCode} />
    </div>
  );
}

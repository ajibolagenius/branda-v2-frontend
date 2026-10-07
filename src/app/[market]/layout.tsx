import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { isValidMarket, getMarketConfig, SUPPORTED_MARKETS } from '@/lib/markets';
import { MarketCode } from '@/lib/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

interface MarketLayoutProps {
  children: React.ReactNode;
  params: Promise<{ market: string }>;
}

export async function generateStaticParams() {
  return SUPPORTED_MARKETS.map((market) => ({ market }));
}

export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const { market } = await params;
  if (!isValidMarket(market)) {
    return {};
  }
  const config = getMarketConfig(market);

  return {
    title: {
      default: `${config.hero.headline} | Branda V2 ${config.name}`,
      template: `%s | Branda V2 ${config.name}`,
    },
    description: `${config.hero.tagline} ${config.hero.subtext}`,
    alternates: {
      canonical: `/${config.code}`,
      languages: {
        'en-NG': '/ng',
        'en-US': '/us',
        'en-GB': '/uk',
        'en-CA': '/ca',
      },
    },
    openGraph: {
      title: `Branda V2 Branding Ecosystem — ${config.name}`,
      description: config.hero.tagline,
      locale: market === 'ng' ? 'en_NG' : market === 'us' ? 'en_US' : market === 'uk' ? 'en_GB' : 'en_CA',
      siteName: 'Branda V2',
      type: 'website',
    },
  };
}

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
      <main className="flex-1">{children}</main>
      <CartDrawer market={marketCode} />
      <Footer market={marketCode} />
    </div>
  );
}

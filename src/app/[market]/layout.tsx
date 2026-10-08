import { redirect } from 'next/navigation';
import { isValidMarket, SUPPORTED_MARKETS } from '@/lib/markets';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/Cart';

export const instant = false;

export function generateStaticParams() {
  return SUPPORTED_MARKETS.map((market) => ({ market }));
}

export default async function MarketLayout({ children, params }: LayoutProps<'/[market]'>) {
  const { market } = await params;
  if (!isValidMarket(market)) redirect('/ng');

  return (
    <>
      <Header market={market} />
      <main className="min-h-[60vh]">{children}</main>
      <Footer market={market} />
      <CartDrawer market={market} />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { getMarket } from '@/lib/markets';

export const instant = false;

export const metadata: Metadata = { title: 'Order received', robots: { index: false } };

const STEPS = [
  ['Today', 'We check your brief and email a proof within one working day.'],
  ['After you approve', 'Production starts. You get an update at each stage.'],
  ['Delivery', 'Your order ships to the address you gave us.'],
];

export default async function ConfirmationPage({ params, searchParams }: PageProps<'/[market]/checkout/confirmation'>) {
  const { code: market } = getMarket((await params).market);
  const order = [(await searchParams).order].flat()[0];

  return (
    <div className="wrap max-w-4xl py-16 sm:py-24">
      <p className="eyebrow fade-up text-muted">Order received</p>
      <h1 className="display mt-4 text-[clamp(3.25rem,10vw,8rem)]">
        <span className="rise-line"><span>Thank you.</span></span>
      </h1>
      {order && (
        <p className="fade-up mt-6 text-lg" style={{ '--i': 1 } as React.CSSProperties}>
          Your order number is <strong className="bg-lime px-1.5 tabular-nums">{order}</strong>
        </p>
      )}

      <ol className="mt-14 border-t border-ink">
        {STEPS.map(([when, what], i) => (
          <li key={when} className="fade-up grid gap-1 border-b border-line py-6 sm:grid-cols-[200px_1fr]" style={{ '--i': i + 2 } as React.CSSProperties}>
            <span className="font-semibold">{when}</span>
            <span className="text-muted">{what}</span>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href={`/${market}/services`} className="btn btn-dark">Keep shopping</Link>
        <Link href={`/${market}`} className="btn btn-line">Back to home</Link>
      </div>
    </div>
  );
}

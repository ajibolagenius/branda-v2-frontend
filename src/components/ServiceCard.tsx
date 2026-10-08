import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/lib/markets';
import { unitPrice } from '@/lib/services-data';
import type { MarketCode, Service } from '@/lib/types';
import { QuickAdd } from './Cart';

export function ServiceCard({ service, market, sizes = '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw' }: { service: Service; market: MarketCode; sizes?: string }) {
  const price = unitPrice(service, market);
  const listPrice = unitPrice({ ...service, discount: 0 }, market);

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src={service.images[0]}
          alt={service.name}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3 flex gap-1">
          {service.popular && <span className="tag">Popular</span>}
          {service.discount && <span className="tag bg-lime">{service.discount}% off</span>}
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold tracking-wide uppercase">
            {/* Stretched link: the whole card is clickable, the + button sits above it. */}
            <Link href={`/${market}/services/${service.slug}`} className="after:absolute after:inset-0">
              {service.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm tabular-nums">
            <span className="text-muted">From </span>
            <span className="font-semibold">{formatCurrency(price, market)}</span>
            {service.discount && <s className="ml-2 text-xs text-muted">{formatCurrency(listPrice, market)}</s>}
          </p>
        </div>
        <div className="relative z-10">
          <QuickAdd service={service} market={market} />
        </div>
      </div>
    </article>
  );
}

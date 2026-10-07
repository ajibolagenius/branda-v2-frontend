import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Service, MarketCode } from '@/lib/types';
import { formatCurrency } from '@/lib/markets';

interface BundleRecommendationsProps {
  relatedServices: Service[];
  market: MarketCode;
}

export function BundleRecommendations({ relatedServices, market }: BundleRecommendationsProps) {
  if (relatedServices.length === 0) return null;

  return (
    <section className="border-t border-[#e6e1d6] pt-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111311]">
            You May Also Like
          </h2>
          <p className="mt-1 text-xs text-zinc-600">
            Frequently paired ecosystem deliverables to complete your brand touchpoints.
          </p>
        </div>

        <Link
          href={`/${market}`}
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#222b22] hover:underline"
        >
          <span>See Full Catalog</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedServices.map((item) => {
          const price = item.basePrices[market] || 0;
          return (
            <article
              key={item.id}
              className="group flex flex-col space-y-3"
            >
              <Link
                href={`/${market}/services/${item.slug}`}
                className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#eee9df] border border-[#e6e1d6]"
              >
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-black backdrop-blur-md">
                  {item.category}
                </span>
              </Link>

              <div className="flex items-center justify-between gap-3 px-1">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wide text-zinc-950 group-hover:underline truncate">
                    <Link href={`/${market}/services/${item.slug}`}>{item.name}</Link>
                  </h3>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    {item.turnaroundDays}d turnaround · {item.urgency}
                  </p>
                </div>

                <div className="font-mono font-bold text-xs sm:text-sm text-zinc-950 flex-shrink-0">
                  {formatCurrency(price, market)}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

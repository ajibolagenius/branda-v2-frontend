'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Service, MarketCode } from '@/lib/types';
import { formatCurrency } from '@/lib/markets';
import { useCartStore } from '@/lib/cart-store';

interface ServiceCardProps {
  service: Service;
  market: MarketCode;
}

export function ServiceCard({ service, market }: ServiceCardProps) {
  const { addItem } = useCartStore();

  const basePrice = service.basePrices[market] || 0;
  const formattedPrice = formatCurrency(basePrice, market);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultOptions: Record<string, string> = {};
    service.options.forEach((opt) => {
      const defChoice = opt.choices.find((c) => c.isDefault) || opt.choices[0];
      if (defChoice) defaultOptions[opt.id] = defChoice.value;
    });

    addItem({
      serviceId: service.id,
      slug: service.slug,
      name: service.name,
      category: service.category,
      image: service.images[0],
      quantity: 1,
      selectedOptions: defaultOptions,
      unitPrice: basePrice,
      market,
    });
  };

  return (
    <article className="group flex flex-col space-y-3">
      {/* Product Image Frame (Warm Cream Surface matching Reference Mockups 0 & 1) */}
      <Link
        href={`/${market}/services/${service.slug}`}
        className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#eee9df] border border-[#e6e1d6]"
      >
        <Image
          src={service.images[0]}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="rounded-md bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-black shadow-xs">
            {service.category}
          </span>
          {service.popular && (
            <span className="rounded-md bg-[#222b22] text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-xs">
              Popular
            </span>
          )}
        </div>
      </Link>

      {/* Product Details Row */}
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wide text-zinc-950 group-hover:underline truncate">
            <Link href={`/${market}/services/${service.slug}`}>
              {service.name}
            </Link>
          </h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            {service.turnaroundDays}d turnaround · {service.urgency}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono font-bold text-xs sm:text-sm text-zinc-950">
            {formattedPrice}
          </span>
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Quick add ${service.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#e6e1d6] bg-white text-zinc-900 hover:bg-[#222b22] hover:text-white transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

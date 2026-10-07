'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Minus } from 'lucide-react';
import { Service, MarketCode } from '@/lib/types';
import { formatCurrency } from '@/lib/markets';
import { useCartStore } from '@/lib/cart-store';

interface ServiceConfiguratorProps {
  service: Service;
  market: MarketCode;
}

// 12 Visual Deliverable Tiles (Replicating the 12 Ingredients Tiles in Reference Image 3)
const DELIVERABLE_TILES = [
  { icon: '📐', name: 'Vector AI', desc: 'Master Assets' },
  { icon: '⚡', name: 'SVG / EPS', desc: 'Infinite Scale' },
  { icon: '🎨', name: 'Color Specs', desc: 'OKLCH Tokens' },
  { icon: '🔤', name: 'Typography', desc: 'Type Scales' },
  { icon: '📦', name: '3D Mockup', desc: 'Render Suite' },
  { icon: '📖', name: 'Style Guide', desc: 'PDF Matrix' },
  { icon: '🖨️', name: 'CMYK Proof', desc: 'Print Ready' },
  { icon: '✨', name: 'Foil / Stamp', desc: 'Finish Layers' },
  { icon: '📱', name: 'Social Pack', desc: 'Avatar & Banners' },
  { icon: '🏷️', name: 'Favicon Kit', desc: 'App & Web' },
  { icon: '🔄', name: '3 Iterations', desc: 'QA Revisions' },
  { icon: '📜', name: 'Full License', desc: '100% IP Rights' },
];

export function ServiceConfigurator({ service, market }: ServiceConfiguratorProps) {
  const router = useRouter();
  const { addItem } = useCartStore();

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    service.options.forEach((opt) => {
      const def = opt.choices.find((c) => c.isDefault) || opt.choices[0];
      if (def) initial[opt.id] = def.value;
    });
    return initial;
  });

  const [quantity, setQuantity] = useState(1);

  // Dynamic price calculation
  const basePrice = service.basePrices[market] || 0;
  let multiplier = 1;
  service.options.forEach((opt) => {
    const selectedVal = selectedOptions[opt.id];
    const choice = opt.choices.find((c) => c.value === selectedVal);
    if (choice) multiplier *= choice.priceMultiplier;
  });

  const calculatedUnitPrice = Math.round(basePrice * multiplier);
  const calculatedTotal = calculatedUnitPrice * quantity;

  const handleOptionChange = (optionId: string, choiceValue: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: choiceValue,
    }));
  };

  const handleAddToCart = () => {
    addItem({
      serviceId: service.id,
      slug: service.slug,
      name: service.name,
      category: service.category,
      image: service.images[0],
      quantity,
      selectedOptions,
      unitPrice: calculatedUnitPrice,
      market,
    });
  };

  const handleBuyItNow = () => {
    addItem({
      serviceId: service.id,
      slug: service.slug,
      name: service.name,
      category: service.category,
      image: service.images[0],
      quantity,
      selectedOptions,
      unitPrice: calculatedUnitPrice,
      market,
    });
    router.push(`/${market}/checkout`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Quick Metrics Stat Row (Directly matching 4 stats in Mockup 3) */}
      <div className="grid grid-cols-4 gap-2 pt-1 text-left border-b border-[#e6e1d6] pb-5">
        <div>
          <div className="font-black text-lg sm:text-xl text-[#111311]">
            {service.turnaroundDays}d
          </div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            Turnaround
          </div>
        </div>
        <div>
          <div className="font-black text-lg sm:text-xl text-[#111311]">
            3 Direct
          </div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            Concepts
          </div>
        </div>
        <div>
          <div className="font-black text-lg sm:text-xl text-[#111311]">
            Vector
          </div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            Master Kit
          </div>
        </div>
        <div>
          <div className="font-black text-lg sm:text-xl text-[#111311]">
            100%
          </div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            Commercial IP
          </div>
        </div>
      </div>

      {/* 2. Visual Deliverables Grid (Directly matching 12 'Ingredients' tiles in Mockup 3) */}
      <div className="pt-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 mb-3">
          Deliverable Inclusions
        </h4>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {DELIVERABLE_TILES.map((tile, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#eee9df] text-center border border-[#e6e1d6] hover:border-zinc-400 transition-colors"
            >
              <span className="text-base sm:text-lg mb-1">{tile.icon}</span>
              <span className="text-[10px] font-bold text-zinc-950 leading-tight">
                {tile.name}
              </span>
              <span className="text-[9px] text-zinc-600 leading-tight">
                {tile.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Option Selectors (Tiers / Materials) */}
      {service.options.map((option) => (
        <div key={option.id} className="space-y-2 pt-1">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-950">
            {option.name}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {option.choices.map((choice) => {
              const isSelected = selectedOptions[option.id] === choice.value;
              return (
                <button
                  key={choice.value}
                  type="button"
                  onClick={() => handleOptionChange(option.id, choice.value)}
                  className={`rounded-2xl border p-3 text-left text-xs font-bold transition-all ${
                    isSelected
                      ? 'border-[#222b22] bg-[#222b22] text-white shadow-xs'
                      : 'border-[#e6e1d6] bg-white text-zinc-900 hover:bg-[#eee9df]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{choice.label}</span>
                    {choice.priceMultiplier > 1 && (
                      <span className="text-[10px] opacity-80 font-mono">
                        +{Math.round((choice.priceMultiplier - 1) * 100)}%
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* 4. Price Line (Matching Mockup 3 Format) */}
      <div className="border-t border-[#e6e1d6] pt-4">
        <div className="font-mono text-3xl sm:text-4xl font-black text-[#111311]">
          {formatCurrency(calculatedTotal, market)}
        </div>
        {quantity > 1 && (
          <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
            {formatCurrency(calculatedUnitPrice, market)} per unit
          </div>
        )}
      </div>

      {/* 5. Quantity Stepper (Matching Mockup 3 Format) */}
      <div className="flex items-center justify-between py-1">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-950">
          Quantity
        </span>
        <div className="flex items-center rounded-2xl border border-[#e6e1d6] bg-white">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3.5 py-2 text-zinc-700 hover:text-black transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center font-mono text-xs font-bold text-zinc-950">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-3.5 py-2 text-zinc-700 hover:text-black transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 6. Stacked CTAs (Matching Mockup 3 Format) */}
      <div className="space-y-3 pt-2">
        {/* Outlined Add To Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full rounded-2xl border-2 border-[#222b22] bg-white py-4 text-xs font-bold uppercase tracking-wider text-[#222b22] hover:bg-[#eee9df] transition-colors shadow-xs cursor-pointer"
        >
          Add To Cart
        </button>

        {/* Solid Dark Buy It Now */}
        <button
          type="button"
          onClick={handleBuyItNow}
          className="w-full rounded-2xl bg-[#222b22] py-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#161c16] transition-colors shadow-sm cursor-pointer"
        >
          Buy It Now
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronDown, Globe } from 'lucide-react';
import { MarketCode } from '@/lib/types';
import { MARKETS, SUPPORTED_MARKETS, getMarketConfig } from '@/lib/markets';

interface MarketSelectorProps {
  currentMarket: MarketCode;
}

function MarketSelectorInner({ currentMarket }: MarketSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeConfig = getMarketConfig(currentMarket);

  // Close on outside click or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const switchMarket = (targetMarket: MarketCode) => {
    if (targetMarket === currentMarket) {
      setIsOpen(false);
      return;
    }

    // Replace current market prefix in pathname (e.g. /ng/services -> /us/services)
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && SUPPORTED_MARKETS.includes(segments[0] as MarketCode)) {
      segments[0] = targetMarket;
    } else {
      segments.unshift(targetMarket);
    }

    const newPath = `/${segments.join('/')}`;
    const queryString = searchParams.toString();
    const finalUrl = queryString ? `${newPath}?${queryString}` : newPath;

    setIsOpen(false);
    router.push(finalUrl);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select market and currency"
        className="flex items-center gap-2 rounded-full border border-[#e6e1d6] bg-[#eee9df] px-3.5 py-2 text-xs font-bold text-zinc-950 transition-colors hover:bg-[#e4ded2] shadow-xs cursor-pointer"
      >
        <span className="text-sm leading-none">{activeConfig.flag}</span>
        <span className="font-black uppercase tracking-wider">{activeConfig.code}</span>
        <span className="text-zinc-600 font-mono font-bold">({activeConfig.symbol})</span>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-600 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-2xl border border-[#e6e1d6] bg-[#f8f6f0] p-2 shadow-xl ring-1 ring-black/5 focus:outline-none"
        >
          <div className="px-3 py-2 text-[11px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            <span>Select Region & Currency</span>
          </div>

          <div className="space-y-1">
            {SUPPORTED_MARKETS.map((code) => {
              const market = MARKETS[code];
              const isSelected = code === currentMarket;
              return (
                <button
                  key={code}
                  role="menuitem"
                  type="button"
                  onClick={() => switchMarket(code)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#222b22] font-bold text-white shadow-xs'
                      : 'text-zinc-700 hover:bg-[#eee9df] hover:text-black font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{market.flag}</span>
                    <div>
                      <div className="font-bold">{market.name}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>{market.taxLabel}</div>
                    </div>
                  </div>
                  <span className={`font-mono font-bold ${isSelected ? 'text-[#d9e855]' : 'text-zinc-600'}`}>
                    {market.currency} ({market.symbol})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function MarketSelector({ currentMarket }: MarketSelectorProps) {
  const activeConfig = getMarketConfig(currentMarket);
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900">
          <span>{activeConfig.flag}</span>
          <span className="uppercase">{activeConfig.code}</span>
        </div>
      }
    >
      <MarketSelectorInner currentMarket={currentMarket} />
    </Suspense>
  );
}


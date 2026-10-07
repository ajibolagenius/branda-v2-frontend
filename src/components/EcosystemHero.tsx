import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Factory, Layers, ShieldCheck } from 'lucide-react';
import { MarketConfig, MarketCode } from '@/lib/types';
import { formatCurrency } from '@/lib/markets';

interface EcosystemHeroProps {
  config: MarketConfig;
  market: MarketCode;
}

export function EcosystemHero({ config, market }: EcosystemHeroProps) {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Main Photographic Hero (Directly from Reference Mockup 0) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#111311] leading-[1.05]">
            Precision Branding. Built to Scale.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed font-normal">
            Direct factory manufacturing, architectural signage, and digital brand infrastructure. Serving enterprise teams across {config.name}.
          </p>
        </div>

        {/* Two Asymmetrical Photo Cards (From Reference Mockup 0) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <Link
              href={`/${market}/services/executive-onboarding-box`}
              className="group relative aspect-square w-full overflow-hidden rounded-3xl bg-[#eee9df] border border-[#e6e1d6]"
            >
              <Image
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80"
                alt="Executive VIP Client Onboarding Box"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-zinc-950">
                EXECUTIVE VIP ONBOARDING BOX
              </span>
              <span className="font-mono font-bold text-xs sm:text-sm text-zinc-950">
                {formatCurrency(market === 'ng' ? 195000 : 420, market)}
              </span>
            </div>

            <Link
              href={`/${market}?category=gifts`}
              className="inline-flex items-center justify-center rounded-2xl bg-[#222b22] py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#161c16] transition-colors w-full sm:w-auto"
            >
              <span>Explore Collection</span>
            </Link>
          </div>

          {/* Right Card (7 Cols - Taller Showcase) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <Link
              href={`/${market}/services/luxury-foil-business-cards`}
              className="group relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-3xl bg-[#eee9df] border border-[#e6e1d6]"
            >
              <Image
                src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1400&q=80"
                alt="Luxury Debossed & Metallic Foil Business Cards"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 rounded-md bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black shadow-xs">
                FEATURED PRODUCTION
              </div>
            </Link>

            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-zinc-950">
                LUXURY FOIL BUSINESS CARDS & APPAREL
              </span>
              <span className="font-mono font-bold text-xs sm:text-sm text-zinc-950">
                {formatCurrency(market === 'ng' ? 85000 : 180, market)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Feature Pillar Cards (Directly from Mockups 0 & 1) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111311]">
            Enterprise Capabilities
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600">
            Eliminate vendor fragmentation with direct manufacturing, architectural sign craft, and unified brand infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Workspace & Signage */}
          <div className="rounded-3xl border border-[#e6e1d6] bg-white p-6 flex flex-col justify-between shadow-xs hover:border-zinc-400 transition-colors">
            <div>
              <span className="inline-block rounded-md bg-[#eee9df] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#222b22] mb-4">
                CUSTOMIZE
              </span>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#eee9df] mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                  alt="Workspace interior design"
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
                ARCHITECTURAL WORKSPACE & SIGNAGE
              </h3>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                Transform office headquarters with precision 3D acrylic logos, illuminated exterior signs, and acoustic branded environments.
              </p>
            </div>
            <Link
              href={`/${market}?category=studio`}
              className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#222b22] hover:underline"
            >
              <span>Explore Studio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 2: Direct B2B Production */}
          <div className="rounded-3xl border border-[#e6e1d6] bg-white p-6 flex flex-col justify-between shadow-xs hover:border-zinc-400 transition-colors">
            <div>
              <span className="inline-block rounded-md bg-[#eee9df] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#222b22] mb-4">
                DIRECT B2B
              </span>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#eee9df] mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
                  alt="Apparel and print manufacturing"
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
                FACTORY-DIRECT PRODUCTION
              </h3>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                Bypass broker markups with transparent tier pricing on bespoke cards, employee merchandise, and custom packaging.
              </p>
            </div>
            <Link
              href={`/${market}?category=prints`}
              className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#222b22] hover:underline"
            >
              <span>Explore Prints</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 3: Multi-Market Fulfillment */}
          <div className="rounded-3xl border border-[#e6e1d6] bg-white p-6 flex flex-col justify-between shadow-xs hover:border-zinc-400 transition-colors">
            <div>
              <span className="inline-block rounded-md bg-[#eee9df] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#222b22] mb-4">
                GLOBAL HUBS
              </span>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#eee9df] mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Digital web commerce platforms"
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
                MULTI-MARKET FULFILLMENT
              </h3>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                Centralized production pipelines in Lagos, New York, London, and Toronto delivering consistent corporate assets worldwide.
              </p>
            </div>
            <Link
              href={`/${market}?category=digital`}
              className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#222b22] hover:underline"
            >
              <span>Explore Digital</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Split Storytelling Banner (Directly from Mockups 0 & 1 Bottom) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-[#e6e1d6] shadow-xs">
          {/* Left Craftsmanship Photo */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-[#eee9df]">
            <Image
              src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80"
              alt="Creative directors reviewing print proofs"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>

          {/* Right Forest-Olive Story Card */}
          <div className="lg:col-span-7 bg-[#222b22] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              The standard in enterprise brand production.
            </h2>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <Factory className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">Direct Factory Sourcing</h4>
                  <p className="text-xs text-white/80 mt-0.5 leading-relaxed">
                    Source branded collateral straight from facility press lines, saving up to 40% on enterprise volume without broker markups.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">Turnaround SLA Guarantee</h4>
                  <p className="text-xs text-white/80 mt-0.5 leading-relaxed">
                    Strict, predictable production milestones with 2-5 business day fulfillment backed by real-time order tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">100% Commercial IP Ownership</h4>
                  <p className="text-xs text-white/80 mt-0.5 leading-relaxed">
                    Receive uncompressed vector master assets, print dies, and irrevocable commercial ownership rights upon milestone delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

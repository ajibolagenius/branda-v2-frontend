import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { isValidMarket, getMarketConfig, SUPPORTED_MARKETS, formatCurrency } from '@/lib/markets';
import { MarketCode } from '@/lib/types';
import { SERVICES, getServiceBySlug, getRelatedServices } from '@/lib/services-data';
import { ServiceGallery } from '@/components/ServiceGallery';
import { ServiceConfigurator } from '@/components/ServiceConfigurator';
import { BundleRecommendations } from '@/components/BundleRecommendations';

interface ServicePageProps {
  params: Promise<{ market: string; slug: string }>;
}

export const instant = false;

export async function generateStaticParams() {
  const paths: { market: string; slug: string }[] = [];
  for (const market of SUPPORTED_MARKETS) {
    for (const service of SERVICES) {
      paths.push({ market, slug: service.slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { market, slug } = await params;
  if (!isValidMarket(market)) return {};

  const service = getServiceBySlug(slug);
  if (!service) return {};

  const config = getMarketConfig(market);
  const localizedPrice = formatCurrency(service.basePrices[market as MarketCode] || 0, market as MarketCode);

  return {
    title: `${service.name} — ${config.name}`,
    description: `${service.shortDescription} Starting from ${localizedPrice}. Delivered across ${config.name}.`,
    alternates: {
      canonical: `/${market}/services/${slug}`,
      languages: {
        'en-NG': `/ng/services/${slug}`,
        'en-US': `/us/services/${slug}`,
        'en-GB': `/uk/services/${slug}`,
        'en-CA': `/ca/services/${slug}`,
      },
    },
    openGraph: {
      title: `${service.name} | Branda V2 ${config.name}`,
      description: service.shortDescription,
      url: `/${market}/services/${slug}`,
      siteName: 'Branda V2',
      images: [
        {
          url: service.images[0],
          width: 1200,
          height: 800,
          alt: service.name,
        },
      ],
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { market, slug } = await params;

  if (!isValidMarket(market)) {
    redirect('/ng');
  }

  const marketCode = market as MarketCode;
  const config = getMarketConfig(marketCode);

  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
        <Link href={`/${marketCode}`} className="hover:text-black transition-colors">
          Catalog
        </Link>
        <ChevronRight className="h-3 w-3 text-zinc-400" />
        <Link href={`/${marketCode}?category=${service.category}`} className="capitalize hover:text-black transition-colors">
          {service.category}
        </Link>
        <ChevronRight className="h-3 w-3 text-zinc-400" />
        <span className="font-bold text-zinc-950 truncate max-w-xs">{service.name}</span>
      </nav>

      {/* Main Two-Column Service View (Directly from Mockup 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Image Gallery & Deliverables Narrative */}
        <div className="lg:col-span-7 space-y-8">
          <ServiceGallery images={service.images} name={service.name} />

          {/* Deliverables Checklist Box */}
          <div className="rounded-3xl border border-[#e6e1d6] bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#e6e1d6] pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
                Included Deliverable Scope
              </h3>
              <span className="rounded-md bg-[#eee9df] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#222b22]">
                Guaranteed Handover
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {service.inclusions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-xl border border-[#e6e1d6] bg-[#f8f6f0] p-3 text-xs"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#222b22] flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-zinc-900">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Production Narrative */}
          <div className="rounded-3xl border border-[#e6e1d6] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-[#e6e1d6] pb-3">
              Production Specifications & SLAs
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              {service.fullDescription}
            </p>
          </div>
        </div>

        {/* Right Column: Title, Quick Specs Row, & Interactive Configurator (Directly from Mockup 3) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-md bg-[#222b22] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                {service.category}
              </span>
              <span className="text-xs text-zinc-500 font-semibold">· {service.useCase}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111311] leading-tight">
              {service.name}
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {service.shortDescription}
            </p>
          </div>

          {/* Interactive Configurator */}
          <div className="rounded-3xl border border-[#e6e1d6] bg-white p-6 sm:p-8 shadow-xs">
            <ServiceConfigurator service={service} market={marketCode} />
          </div>
        </div>
      </div>

      {/* Bottom Cross-Category Bundling ('You May Also Like' from Mockup 3) */}
      <BundleRecommendations relatedServices={relatedServices} market={marketCode} />
    </div>
  );
}

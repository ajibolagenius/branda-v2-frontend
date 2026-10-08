import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_URL, alternates, formatCurrency, getMarket } from '@/lib/markets';
import { CATEGORIES, SERVICES, getService, getServices, unitPrice } from '@/lib/services-data';
import { ServiceGallery } from '@/components/ServiceGallery';
import { ServiceConfigurator } from '@/components/ServiceConfigurator';
import { ServiceCard } from '@/components/ServiceCard';

type Props = PageProps<'/[market]/services/[slug]'>;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { market, slug } = await params;
  const m = getMarket(market);
  const s = getService(slug);
  if (!s) return {};
  const description = `${s.summary} From ${formatCurrency(unitPrice(s, m.code), m.code)}, delivered anywhere in ${m.name}.`;
  return {
    title: `${s.name} in ${m.name}`,
    description,
    alternates: { canonical: `/${m.code}/services/${slug}`, languages: alternates(`/services/${slug}`) },
    openGraph: {
      title: `${s.name} · Branda ${m.name}`,
      description,
      url: `/${m.code}/services/${slug}`,
      images: [{ url: s.images[0], alt: s.name }],
      locale: m.locale.replace('-', '_'),
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { market: code, slug } = await params;
  const { code: market, name: marketName, currency } = getMarket(code);
  const service = getService(slug);
  if (!service) notFound();

  const category = CATEGORIES[service.category];
  const stats = [
    [`${service.turnaroundDays} days`, 'Turnaround'],
    [String(service.includes.length), 'Included'],
    [category.label, 'Category'],
    ['Nationwide', 'Delivery'],
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: service.name,
    description: service.description,
    image: service.images,
    brand: { '@type': 'Brand', name: 'Branda' },
    offers: {
      '@type': 'Offer',
      price: unitPrice(service, market),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/${market}/services/${slug}`,
    },
  };

  return (
    <div className="wrap py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href={`/${market}`} className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/${market}/services?category=${service.category}`} className="hover:text-ink">{category.label}</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{service.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ServiceGallery images={service.images} name={service.name} />

        <div>
          <div className="flex gap-1">
            <span className="tag bg-sand">{category.label}</span>
            {service.discount && <span className="tag bg-lime">{service.discount}% off</span>}
          </div>
          <h1 className="display mt-4 text-[clamp(2.75rem,5.5vw,5rem)]">{service.name}</h1>
          <p className="mt-5 max-w-lg text-lg text-muted">{service.description}</p>

          <dl className="mt-8 grid grid-cols-4 border-y border-line">
            {stats.map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse border-r border-line py-4 pr-2 pl-3 first:pl-0 last:border-r-0">
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="text-lg font-semibold sm:text-xl">{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="eyebrow mt-10 mb-3">What’s included</h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {service.includes.map((item, i) => (
              <li key={item} className="flex min-h-24 flex-col justify-between bg-sand p-3 text-sm leading-snug">
                <span className="text-xs text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <ServiceConfigurator service={service} market={market} />
          </div>
          <p className="mt-4 text-sm text-muted">Prices in {currency}. Tax and delivery to anywhere in {marketName} are shown at checkout.</p>
        </div>
      </div>

      <section className="mt-24 border-t border-line pt-16 sm:mt-32 sm:pt-24">
        <h2 className="display reveal text-center text-[clamp(2.5rem,7vw,6rem)]">You may also like</h2>
        <p className="reveal mt-4 text-center text-muted">Pairs well with {service.name}, from other Branda studios.</p>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
          {getServices(service.related).map((s) => (
            <li key={s.slug} className="reveal">
              <ServiceCard service={s} market={market} sizes="(min-width: 768px) 33vw, 50vw" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Layers, Package, Wallet } from 'lucide-react';
import { alternates, formatCurrency, getMarket } from '@/lib/markets';
import { CATEGORIES, SERVICES, getService, getServices, unitPrice } from '@/lib/services-data';
import type { Category, MarketCode } from '@/lib/types';
import { ServiceCard } from '@/components/ServiceCard';

export const instant = false;

export async function generateMetadata({ params }: PageProps<'/[market]'>): Promise<Metadata> {
  const m = getMarket((await params).market);
  return {
    title: { absolute: `Branda ${m.name}: ${m.headline}` },
    description: m.subline,
    alternates: { canonical: `/${m.code}`, languages: alternates() },
    openGraph: { title: m.headline, description: m.subline, locale: m.locale.replace('-', '_'), siteName: 'Branda' },
  };
}

const h2 = 'display text-[clamp(2.25rem,5.5vw,4.75rem)]';

const REASONS = [
  { icon: Layers, title: 'One order, every touchpoint', text: 'Logo, print, gifts, office and web in one cart, on one invoice.' },
  { icon: Wallet, title: 'No middleman charges', text: 'We run production ourselves, so you pay for the work, not the handoffs.' },
  { icon: Package, title: 'Samples before you commit', text: 'Order a sample first. Spread bigger jobs over a deposit and balance.' },
];

const CLIENTS = ['GTBank', 'Dangote', 'Truecaller', 'Autochek', 'Reliance Infosystems', 'Swipe'];

export default async function HomePage({ params }: PageProps<'/[market]'>) {
  const config = getMarket((await params).market);
  const market: MarketCode = config.code;
  const [left, right, ...popular] = getServices(config.featured);
  const spotlight = getService(config.spotlight)!;
  const lines = config.headline.split(/(?<=[.,])\s+/);

  return (
    <>
      {/* Hero */}
      <section className="wrap pt-12 pb-20 sm:pt-20 sm:pb-28">
        <h1 className="display text-center text-[clamp(3.1rem,8.6vw,8rem)]">
          {lines.map((line, i) => (
            <span key={line} className="rise-line pb-[0.06em]" style={{ '--i': i } as React.CSSProperties}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p className="fade-up mx-auto mt-6 max-w-xl text-center text-lg text-muted text-balance">{config.subline}</p>
        <div className="fade-up mt-8 flex justify-center" style={{ '--i': 1 } as React.CSSProperties}>
          <Link href={`/${market}/services`} className="btn btn-dark">
            Browse all services <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 grid items-start gap-6 sm:mt-20 md:grid-cols-12 md:gap-10">
          {[left, right].map((s, i) => (
            <Link
              key={s.slug}
              href={`/${market}/services/${s.slug}`}
              className={`group fade-up block ${i === 0 ? 'md:col-span-5 md:mt-24' : 'md:col-span-7'}`}
              style={{ '--i': i + 2 } as React.CSSProperties}
            >
              <div className={`relative overflow-hidden bg-sand ${i === 0 ? 'aspect-[4/5]' : 'aspect-[5/6]'}`}>
                <Image
                  src={s.images[0]}
                  alt={s.name}
                  fill
                  preload
                  sizes={i === 0 ? '(min-width: 768px) 40vw, 100vw' : '(min-width: 768px) 58vw, 100vw'}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-3 flex justify-between gap-4 text-sm font-semibold tracking-wide uppercase">
                <span>{s.name}</span>
                <span className="tabular-nums">{formatCurrency(unitPrice(s, market), market)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular in this market */}
      <section className="border-t border-line bg-white/60 py-20 sm:py-28">
        <div className="wrap">
          <h2 className={`${h2} reveal text-center`}>Popular in {config.name}</h2>
          <nav aria-label="Categories" className="reveal mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
            {Object.entries(CATEGORIES).map(([slug, c]) => (
              <Link key={slug} href={`/${market}/services?category=${slug}`} className="text-muted underline-offset-8 decoration-2 hover:text-ink hover:underline">
                {c.label}
              </Link>
            ))}
          </nav>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {popular.map((s) => (
              <div key={s.slug} className="reveal">
                <ServiceCard service={s} market={market} />
              </div>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <Link href={`/${market}/services`} className="btn btn-dark min-w-56">See all</Link>
          </div>
        </div>
      </section>

      {/* Five categories */}
      <section className="py-20 sm:py-28">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className={`${h2} reveal`}>Five studios.<br />One cart.</h2>
            <p className="reveal max-w-sm text-muted">Mix a logo, office signage and 200 mugs in the same order. We coordinate the rest.</p>
          </div>
        </div>
        <ul className="wrap mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {(Object.keys(CATEGORIES) as Category[]).map((cat) => {
            const cover = SERVICES.find((s) => s.category === cat && s.popular) ?? SERVICES.find((s) => s.category === cat)!;
            return (
              <li key={cat} className="reveal w-[72%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
                <Link href={`/${market}/services?category=${cat}`} className="group block bg-sand p-3">
                  <span className="tag">{CATEGORIES[cat].label}</span>
                  <div className="relative mt-3 aspect-square overflow-hidden">
                    <Image src={cover.images[0]} alt="" fill sizes="(min-width: 1024px) 20vw, 70vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  </div>
                  <p className="mt-3 text-sm">{CATEGORIES[cat].blurb}</p>
                  <span className="mt-4 flex h-10 items-center justify-center border border-ink text-sm font-semibold transition-colors group-hover:bg-forest group-hover:text-cream">
                    Shop {CATEGORIES[cat].label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Spotlight: changes per market */}
      <section className="wrap pb-20 sm:pb-28">
        <div className="reveal grid overflow-hidden bg-forest text-cream lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-14">
            <p className="eyebrow text-lime">Most ordered in {config.name}</p>
            <h2 className="display mt-4 text-[clamp(2.5rem,5vw,4.5rem)]">{spotlight.name}</h2>
            <p className="mt-4 max-w-md text-cream/80">{spotlight.summary}</p>
            <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-cream/20 pt-6">
              {[
                [`${spotlight.turnaroundDays} days`, 'Turnaround'],
                [formatCurrency(unitPrice(spotlight, market), market), 'Starting at'],
                [`${spotlight.includes.length} items`, 'Included'],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col-reverse">
                  <dt className="eyebrow mt-1 text-cream/70">{label}</dt>
                  <dd className="text-lg font-bold text-lime tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            <Link href={`/${market}/services/${spotlight.slug}`} className="btn btn-lime mt-10 self-start">
              Order now
            </Link>
          </div>
          <div className="relative min-h-80 lg:min-h-[560px]">
            <Image src={spotlight.images[0]} alt={spotlight.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Why Branda */}
      <section className="grid bg-sage text-white lg:grid-cols-2">
        <div className="relative min-h-80 lg:min-h-[640px]">
          <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80" alt="A team reviewing printed brand work" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-14 lg:px-20">
          <h2 className="display reveal text-[clamp(2.5rem,5vw,4.5rem)]">Branding without the runaround.</h2>
          <ul className="mt-10 space-y-7">
            {REASONS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="reveal flex items-start gap-5">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-cream text-ink">
                  <Icon className="size-6" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-1 text-white/85">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Clients */}
      <section className="wrap py-20 sm:py-28">
        <p className="eyebrow reveal text-muted">Chosen by 500+ companies, including</p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
          {CLIENTS.map((c) => (
            <li key={c} className="display reveal text-[clamp(2rem,5vw,4rem)] text-ink/25 transition-colors duration-300 hover:text-ink">
              {c}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

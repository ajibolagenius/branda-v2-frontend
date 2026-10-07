import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileCheck2
} from 'lucide-react';
import { isValidMarket, getMarketConfig } from '@/lib/markets';
import { MarketCode } from '@/lib/types';

interface ConfirmationPageProps {
  params: Promise<{ market: string }>;
  searchParams: Promise<{ orderId?: string }>;
}

export default async function OrderConfirmationPage({ params, searchParams }: ConfirmationPageProps) {
  const { market } = await params;
  const { orderId } = await searchParams;

  if (!isValidMarket(market)) {
    notFound();
  }

  const marketCode = market as MarketCode;
  const config = getMarketConfig(marketCode);
  const orderNumber = orderId || `BRD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const milestones = [
    {
      title: 'Brief & Specifications Intake',
      desc: 'Creative brief received, vector requirements parsed and verified.',
      time: 'Completed',
      status: 'completed',
    },
    {
      title: 'Digital Proof & Master Tokens',
      desc: 'Art directors finalizing OKLCH palettes, typography, and cut lines.',
      time: 'In Progress · 24h SLA',
      status: 'active',
    },
    {
      title: 'White-Glove Production & Press Proofing',
      desc: 'Manufacturing physical collateral, debossing, and premium finish layers.',
      time: 'Queued · 48h SLA',
      status: 'pending',
    },
    {
      title: `Regional Courier Dispatch (${config.name})`,
      desc: `Express courier delivery to client address with live tracking notifications.`,
      time: 'Scheduled',
      status: 'pending',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* 1. Header Banner */}
      <div className="rounded-3xl border border-[#e6e1d6] bg-white p-8 sm:p-12 text-center shadow-xs">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#222b22] text-white shadow-xs">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <span className="mt-6 inline-block rounded-md bg-[#eee9df] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#222b22]">
          Order Confirmed & Queued
        </span>

        <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-[#111311]">
          Thank You for Your Order
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto leading-relaxed">
          Your branding project has been assigned to the Branda Regional Production Facility for <strong>{config.name}</strong>.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#e6e1d6] bg-[#f8f6f0] px-5 py-3">
          <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Order Reference:</span>
          <span className="font-mono text-sm sm:text-base font-black text-zinc-950 tracking-wider">
            {orderNumber}
          </span>
        </div>
      </div>

      {/* 2. Production Milestone Progress Tracker */}
      <div className="rounded-3xl border border-[#e6e1d6] bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#e6e1d6] pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-zinc-950">
              Live Production Milestone Pipeline
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              Real-time turnaround visibility across our specialized five-pillar ecosystem.
            </p>
          </div>
          <span className="rounded-md bg-[#222b22]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#222b22]">
            Active Pipeline
          </span>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#e6e1d6]">
          {milestones.map((m, idx) => {
            const isCompleted = m.status === 'completed';
            const isActive = m.status === 'active';

            return (
              <div key={idx} className="relative flex items-start gap-4">
                {/* Node icon */}
                <div
                  className={`absolute -left-6 sm:-left-8 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 ${
                    isCompleted
                      ? 'border-[#222b22] bg-[#222b22] text-white'
                      : isActive
                      ? 'border-[#222b22] bg-white text-[#222b22] animate-pulse'
                      : 'border-zinc-300 bg-white text-zinc-300'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : isActive ? (
                    <Clock className="h-3.5 w-3.5" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-zinc-300" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${
                        isActive ? 'text-[#222b22]' : 'text-zinc-950'
                      }`}
                    >
                      {m.title}
                    </h4>
                    <span className="font-mono text-[11px] font-bold text-zinc-500">
                      {m.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Deliverables & Commercial Rights Handover */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-[#e6e1d6] bg-white p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#222b22]">
            <FileCheck2 className="h-5 w-5" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
              Master Assets Included
            </h3>
          </div>
          <ul className="space-y-1.5 text-xs text-zinc-600">
            <li>✓ Vector Master Files (Adobe Illustrator .AI, SVG, EPS)</li>
            <li>✓ CMYK 300 DPI Prepress Proofs with 3mm Bleed</li>
            <li>✓ Web & App Favicon Kits + Brand Guidelines PDF</li>
            <li>✓ Digital Design Tokens (OKLCH, HEX, RGB, Typography Scales)</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-[#e6e1d6] bg-white p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#222b22]">
            <ShieldCheck className="h-5 w-5" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
              100% Commercial IP Rights
            </h3>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            All trademark registrations, custom illustrations, debossing dies, and digital source files are 100% owned by your organization upon milestone approval.
          </p>
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href={`/${marketCode}`}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[#222b22] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#161c16] transition-colors"
        >
          <span>Return to {config.name} Catalog</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

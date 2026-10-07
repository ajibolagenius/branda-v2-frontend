'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Building2,
  Mail,
  User,
  Phone,
  MapPin,
  Lock,
  AlertCircle
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { isValidMarket, getMarketConfig, formatCurrency } from '@/lib/markets';
import { MarketCode } from '@/lib/types';

interface CheckoutPageProps {
  params: Promise<{ market: string }>;
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { market } = use(params);
  const router = useRouter();

  const marketCode = (isValidMarket(market) ? market : 'ng') as MarketCode;
  const config = getMarketConfig(marketCode);

  const { items, clearMarketItems, getSubtotal, getTax, getTotal } = useCartStore();

  const marketItems = items.filter((item) => item.market === marketCode);
  const subtotal = getSubtotal(marketCode);
  const tax = getTax(marketCode);
  const total = getTotal(marketCode);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Ajibola Akelebe',
    companyName: 'Branda Enterprise Client',
    email: 'ajiboladolapogenius@gmail.com',
    phone: marketCode === 'ng' ? '+234 810 000 0000' : '+1 555 019 2834',
    address: marketCode === 'ng' ? 'Victoria Island, Lagos' : '100 Broadway, New York, NY',
    city: marketCode === 'ng' ? 'Lagos' : 'New York',
    postalCode: marketCode === 'ng' ? '101241' : '10005',
    briefNotes: 'Please ensure high-contrast CMYK prepress proofs and uncompressed vector AI source files are attached.',
    cardNumber: '•••• •••• •••• 9182',
    cardExpiry: '08/28',
    cardCvv: '827',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'gateway'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomOrderId = `BRD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      clearMarketItems(marketCode);
      router.push(`/${marketCode}/checkout/confirmation?orderId=${randomOrderId}`);
    }, 700);
  };

  if (marketItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#eee9df] text-zinc-500">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-black tracking-tight text-[#111311]">
          No Items Ready for Checkout
        </h1>
        <p className="mt-2 text-xs text-zinc-600 max-w-md mx-auto">
          Your order tray for {config.name} is currently empty. Add deliverables from the catalog before proceeding to checkout.
        </p>
        <div className="mt-8">
          <Link
            href={`/${marketCode}`}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#222b22] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#161c16] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Top Breadcrumb */}
      <div className="mb-8">
        <Link
          href={`/${marketCode}/cart`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#222b22] hover:underline mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Cart</span>
        </Link>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111311]">
          Order Checkout & Production Dispatch
        </h1>
        <p className="mt-1 text-xs text-zinc-500 font-medium">
          Localized for {config.name} ({config.symbol} {config.currency}) · Guaranteed 100% Commercial IP Assignment
        </p>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Two Step Form matching Mockup 5 */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Address and Shipping (From Mockup 5) */}
            <section className="rounded-3xl border border-[#e6e1d6] bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#e6e1d6] pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#222b22] text-xs font-black text-white">
                    1
                  </span>
                  <h2 className="text-base sm:text-lg font-black tracking-tight text-zinc-950">
                    Address and Shipping
                  </h2>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Recipient Details
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Client Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-[#e6e1d6] bg-white py-2.5 pl-10 pr-3 text-xs text-zinc-900 outline-none focus:border-[#222b22]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Organization / Brand Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-[#e6e1d6] bg-white py-2.5 pl-10 pr-3 text-xs text-zinc-900 outline-none focus:border-[#222b22]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Email for Digital Proofs
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-[#e6e1d6] bg-white py-2.5 pl-10 pr-3 text-xs text-zinc-900 outline-none focus:border-[#222b22]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Phone / Dispatch Contact
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-[#e6e1d6] bg-white py-2.5 pl-10 pr-3 text-xs text-zinc-900 outline-none focus:border-[#222b22]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Physical Delivery Address ({config.name})
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-[#e6e1d6] bg-white py-2.5 pl-10 pr-3 text-xs text-zinc-900 outline-none focus:border-[#222b22]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    City / State
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-[#e6e1d6] bg-white py-2.5 px-3.5 text-xs text-zinc-900 outline-none focus:border-[#222b22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-[#e6e1d6] bg-white py-2.5 px-3.5 text-xs text-zinc-900 outline-none focus:border-[#222b22]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Brand Brief & Customization Instructions
                  </label>
                  <textarea
                    name="briefNotes"
                    rows={3}
                    value={formData.briefNotes}
                    onChange={handleInputChange}
                    placeholder="Specify PMS spot colors, debossing instructions, foil colors, or vector logo URLs..."
                    className="w-full rounded-2xl border border-[#e6e1d6] bg-white p-3 text-xs text-zinc-900 outline-none focus:border-[#222b22]"
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Payment by Card / Paystack (From Mockup 5) */}
            <section className="rounded-3xl border border-[#e6e1d6] bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#e6e1d6] pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#222b22] text-xs font-black text-white">
                    2
                  </span>
                  <h2 className="text-base sm:text-lg font-black tracking-tight text-zinc-950">
                    Payment by Card & Settlement
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#222b22]">
                  <Lock className="h-3.5 w-3.5" />
                  <span>256-Bit SSL</span>
                </div>
              </div>

              {/* Requirement notice directly from Mockup 5 */}
              <div className="flex items-start gap-3 rounded-2xl bg-[#eee9df] p-4 text-xs text-zinc-700 border border-[#e6e1d6]">
                <ShieldCheck className="h-5 w-5 text-[#222b22] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-zinc-950 block">Enterprise IP Assignment</strong>
                  You will receive permanent commercial IP assignment, irrevocable licenses, and uncompressed vector assets upon milestone signoff.
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#222b22] bg-[#eee9df] shadow-xs'
                      : 'border-[#e6e1d6] bg-white hover:bg-zinc-50'
                  }`}
                >
                  <CreditCard className="h-5 w-5 text-[#222b22] mb-2" />
                  <div className="text-xs font-bold text-zinc-950">Corporate Debit / Credit Card</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">Visa, Mastercard, Amex, Verve</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('gateway')}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    paymentMethod === 'gateway'
                      ? 'border-[#222b22] bg-[#eee9df] shadow-xs'
                      : 'border-[#e6e1d6] bg-white hover:bg-zinc-50'
                  }`}
                >
                  <Building2 className="h-5 w-5 text-[#222b22] mb-2" />
                  <div className="text-xs font-bold text-zinc-950">
                    {marketCode === 'ng' ? 'Paystack / Bank Transfer' : 'Apple Pay / Wire Transfer'}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">Instant invoice & electronic receipt</div>
                </button>
              </div>

              {/* Card Inputs from Mockup 5 */}
              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-[#e6e1d6] bg-white py-2.5 pl-10 pr-3 font-mono text-xs text-zinc-900 outline-none focus:border-[#222b22]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      required
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full rounded-2xl border border-[#e6e1d6] bg-white py-2.5 px-3.5 font-mono text-xs text-zinc-900 outline-none focus:border-[#222b22]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                      Security Code (CVV)
                    </label>
                    <input
                      type="password"
                      name="cardCvv"
                      required
                      maxLength={4}
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-[#e6e1d6] bg-white py-2.5 px-3.5 font-mono text-xs text-zinc-900 outline-none focus:border-[#222b22]"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-[#e6e1d6] bg-white p-6 sm:p-8 shadow-xs space-y-6 sticky top-24">
              <h3 className="text-lg font-black tracking-tight text-zinc-950">
                Itemized Summary
              </h3>

              {/* Itemized Mini List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1 divide-y divide-[#e6e1d6]">
                {marketItems.map((item) => (
                  <div key={item.cartItemId} className="pt-3 first:pt-0 flex gap-3 items-center">
                    <div className="relative h-12 w-12 flex-shrink-0 rounded-xl overflow-hidden bg-[#eee9df] border border-[#e6e1d6]">
                      <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold uppercase tracking-wide text-zinc-900 truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        Qty: {item.quantity} · {item.category}
                      </div>
                    </div>
                    <div className="font-mono text-xs font-bold text-zinc-950">
                      {formatCurrency(item.unitPrice * item.quantity, marketCode)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="space-y-2.5 text-xs border-t border-[#e6e1d6] pt-4">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-zinc-950">{formatCurrency(subtotal, marketCode)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>{config.taxLabel} ({Math.round(config.taxRate * 100)}%)</span>
                  <span className="font-mono font-bold text-zinc-950">{formatCurrency(tax, marketCode)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Express Dispatch</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {subtotal >= config.freeShippingThreshold ? 'FREE' : formatCurrency(marketCode === 'ng' ? 5000 : 25, marketCode)}
                  </span>
                </div>

                <div className="border-t border-[#e6e1d6] pt-3 flex justify-between text-base font-black text-zinc-950">
                  <span>Order Total</span>
                  <span className="font-mono text-2xl">{formatCurrency(total, marketCode)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#222b22] py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#161c16] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Securing Order & Queuing Production...</span>
                ) : (
                  <span>Place Order & Authorize {formatCurrency(total, marketCode)}</span>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400">
                <Lock className="h-3 w-3" />
                <span>Simulated sandbox checkout · No live card charge</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

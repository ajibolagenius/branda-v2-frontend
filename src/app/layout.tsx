import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import { SITE_URL } from '@/lib/markets';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Branda: every branding job, one order', template: '%s · Branda' },
  description: 'Order logos, print, gifts, office branding and websites in one cart. Delivered in Nigeria, the US, the UK and Canada.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Branda V2 — Modern Branding Ecosystem",
    template: "%s | Branda V2",
  },
  description:
    "Branda V2 connects physical craftsmanship, workspace architecture, and digital brand commerce across Nigeria, USA, UK, and Canada.",
  icons: {
    icon: [
      { url: "/favicon_32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon_128x128.png", sizes: "128x128", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_256x256.png", sizes: "256x256", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans"
      >
        {children}
      </body>
    </html>
  );
}

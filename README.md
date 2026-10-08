# Branda V2 — Modern Branding Ecosystem Frontend

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-green?style=flat)](https://turbo.build/pack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Branda V2** is an enterprise-grade digital ordering and branding ecosystem built with **Next.js 16 (App Router)** and **Tailwind CSS**. Designed for corporate clients, enterprise procurement managers, and modern brands across **Nigeria, USA, United Kingdom, and Canada**, Branda connects physical craftsmanship, workspace architecture, and digital identity into a unified, high-performance platform.

---

## 📑 Assessment Deliverables & Technical Reports

This repository fulfills the **Frontend Developer Screening Assessment** for candidate **Ajibola Akelebe** (`ajiboladolapogenius@gmail.com`):

| Deliverable | Location | Description |
|---|---|---|
| **Task 1: Next.js Implementation** | `src/` | Full-stack Next.js 16 App Router application with multi-market routing, catalog, configurator, cart, and checkout. |
| **Task 2: Performance Report** | [`assets/docs/task-2-performance.md`](assets/docs/task-2-performance.md) | Deep diagnostic report on Core Web Vitals, image optimization, caching, and bundle size reduction. |
| **Task 3: Architecture Report** | [`assets/docs/task-3-architecture.md`](assets/docs/task-3-architecture.md) | Scalable frontend architecture, route groups, state management, RBAC, form handling, and testing. |
| **Task 4: Production Review** | [`assets/docs/task-4-website-review.md`](assets/docs/task-4-website-review.md) | Comprehensive frontend audit of `branda.com.ng` (performance, syntax bugs, and multi-market improvements). |
| **Task 5: Screening Answers** | [`assets/docs/task-5-screening-answers.md`](assets/docs/task-5-screening-answers.md) | Detailed, authentic answers to all 13 technical screening questions. |

---

## 🏛️ System Architecture & Key Features

### 1. Multi-Market Subfolder Routing (`/ng`, `/us`, `/uk`, `/ca`)
- **SEO Preservation:** Utilizes subfolder routing rather than subdomains to consolidate domain rank and organic link equity.
- **Localized Economics:** Currencies, tax/VAT calculations (e.g., 7.5% NG VAT vs 20% UK VAT), free delivery thresholds, and localized warehouse dispatch hubs adapt dynamically per market.
- **Header Selector:** Instant, persistent country and currency switcher in the global header with automatic URL synchronisation.
- **Bidirectional hreflang:** Generates canonical and alternate language/region headers for Google organic indexing.

### 2. Category & Service Listing Engine (`/[market]`)
- **Editorial Design System:** Built on a refined warm palette matching brand guidelines: linen background (`#f8f6f0`), cream card surfaces (`#eee9df`), forest obsidian primary elements (`#222b22`), and hairline borders (`#e6e1d6`).
- **Multi-Axis Smart Filters:** Category pills (`All`, `Create`, `Prints`, `Gifts`, `Studio`, `Digital`) combined with full-text search, Industry, Urgency, and Use Case filters.
- **URL-Preserving State:** All active filter parameters are synced directly to the URL (`?category=prints&search=cards&sortBy=price-asc&page=1`) for 100% bookmarkable, shareable results.
- **Localized Price Sorting & Pagination:** Server-rendered pagination bar preserving all active filter facets.

### 3. Interactive Service Configurator (`/[market]/services/[slug]`)
- **Quick-Specs Row:** Instant glance at production turnaround (24h–72h), concept volume, deliverables kit, and 100% commercial IP assignment.
- **12 Visual Deliverable Tiles:** Visual inclusion grid covering Vector AI, SVG/EPS, Color Specs, Typography, 3D Mockup, Style Guide, CMYK Proof, Foil/Stamp, Social Pack, Favicon Kit, 3 Iterations, and Full Commercial License.
- **Real-Time Dynamic Pricing:** Volume tiers and finish selections recalculate unit price and total investment in real time.
- **Cross-Category Bundles:** "You May Also Like" recommendation engine promoting ecosystem cross-selling.

### 4. Enterprise Cart & Checkout Flow (`/[market]/cart` & `/[market]/checkout`)
- **Dual Cart Modes:** Slide-over cart drawer (native `<dialog>` in `Cart.tsx`) for rapid triage + dedicated full shopping cart page (`/cart`).
- **Two-Step Enterprise Checkout (Matching Reference Mockups):**
  - **Step 1: Address and Shipping:** Recipient contact, brand organization, physical delivery address, and detailed brand brief instructions.
  - **Step 2: Payment by Card & Settlement:** Corporate card inputs with 256-bit SSL badges + regional gateway options (Paystack in Nigeria, Apple Pay / Wire in US/UK/CA).
- **Live 4-Stage Milestone Pipeline (`/checkout/confirmation`):**
  - Live progress tracker illustrating real-time production progression:
    1. *Brief & Specifications Intake* (Completed)
    2. *Digital Proof & Master Tokens* (In Progress · 24h SLA)
    3. *White-Glove Production & Press Proofing* (Queued · 48h SLA)
    4. *Regional Courier Dispatch* (Scheduled)
  - 100% Commercial IP Rights certificate and deliverables summary.

---

## 🛠️ Tech Stack & Engineering Decisions

| Layer | Technology | Decision Rationale |
|---|---|---|
| **Framework** | **Next.js 16.4.0 (App Router)** | React Server Components, Turbopack, Partial Prerendering, and static segment caching. |
| **Runtime** | **React 19.3.0** | Native compiler optimizations, Concurrent Mode, and modern streaming features. |
| **Styling** | **Tailwind CSS v4.3.3** | Lightning-fast compilation with `@tailwindcss/turbopack`, CSS variables, and zero runtime CSS overhead. |
| **State Management** | **Zustand 5.0.15** | Lightweight (< 1kB), boilerplate-free client state for the cart with persistent `localStorage` synchronization. |
| **Icons** | **Lucide React 1.52.0** | Crisp, lightweight, tree-shakable SVG icon set. |
| **Type Safety** | **TypeScript 5.9.3** | Strict compile-time validation (`tsc --noEmit`), zero `any` types. |

---

## ⚡ Performance & Core Web Vitals (CWV)

- **LCP (Largest Contentful Paint) < 1.2s:**
  - Above-the-fold hero imagery preloaded via `priority={true}` in `next/image`.
  - Next.js font optimization (`next/font`) with zero layout shift font subsets.
- **INP (Interaction to Next Paint) < 150ms:**
  - 85%+ of application components authored as pure React Server Components (RSC) to minimize client-side JavaScript execution.
  - Main thread remains idle and immediately responsive to user taps.
- **CLS (Cumulative Layout Shift) < 0.05:**
  - Strict aspect ratio reservation on all service card images and gallery containers (`aspect-[4/3]`).
  - Skeleton loaders (`loading.tsx`) accurately mirrored to final rendered dimensions.

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js:** `>= 20.x` (v22.23.2 recommended)
- **Package Manager:** `pnpm` (or `npm`)

### 1. Clone & Install
```bash
git clone https://github.com/ajibolagenius/branda-v2-frontend.git
cd branda-v2-frontend
pnpm install
```

### 2. Run Development Server
```bash
pnpm dev
# or
npx next dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. Navigating to `/` will automatically redirect to `/ng` (Nigeria default market).

### 3. Type Checking & Production Build
```bash
# Type check without emitting files
pnpm exec tsc --noEmit

# Optimized production build with Turbopack (Prerenders all 75 static/dynamic routes)
pnpm build

# Run production server
pnpm start
```

---

## 📁 Repository Directory Structure

```
.
├── assets/
│   └── docs/
│       ├── FRONTEND SCREENING TASK.pdf   # Original assessment specification
│       ├── task-2-performance.md         # Task 2: Performance & CWV report
│       ├── task-3-architecture.md        # Task 3: Code Architecture & Quality report
│       ├── task-4-website-review.md      # Task 4: Production branda.com.ng audit
│       └── task-5-screening-answers.md   # Task 5: 13 Technical Screening answers
├── src/
│   ├── app/
│   │   ├── globals.css                   # Design tokens, square buttons, CSS-only motion
│   │   ├── layout.tsx                    # Root layout, Archivo variable font, metadataBase
│   │   ├── sitemap.ts / robots.ts        # Per-market sitemap with hreflang alternates
│   │   └── [market]/
│   │       ├── layout.tsx                # Market layout (Header, Footer, cart dialog)
│   │       ├── page.tsx                  # Market home: per-market hero, featured, spotlight
│   │       ├── loading.tsx / error.tsx / not-found.tsx
│   │       ├── services/page.tsx         # SSR catalog, filters + pagination in the URL
│   │       ├── services/[slug]/page.tsx  # Service detail, per-service metadata + JSON-LD
│   │       ├── cart/page.tsx             # Cart page
│   │       └── checkout/                 # Checkout + mock confirmation
│   ├── components/
│   │   ├── Header.tsx                    # Nav, market <select>, search + mobile menu popovers
│   │   ├── Footer.tsx                    # Lime wordmark footer, newsletter
│   │   ├── Cart.tsx                      # Cart <dialog>, bag button, quick add, stepper, totals
│   │   ├── CatalogFilters.tsx            # Search + select filters synced to the URL
│   │   ├── ServiceCard.tsx               # Product tile (server component)
│   │   ├── ServiceConfigurator.tsx       # Options, live price, add to cart / order now
│   │   └── ServiceGallery.tsx            # Image gallery with thumbnails
│   └── lib/
│       ├── types.ts                      # Shared types
│       ├── markets.ts                    # Market config, currency formatting, orderSummary()
│       ├── services-data.ts              # Catalog, unitPrice(), smart search, queryCatalog()
│       ├── cart-store.ts                 # Zustand cart persisted to localStorage
│       └── pricing.test.mjs              # `pnpm test`: pricing, totals, search, pagination
├── next.config.ts                        # Next.js 16 Turbopack & Cache Components config
└── tsconfig.json                         # Strict TypeScript configuration
```

---

## 👤 Candidate Information

- **Name:** Ajibola Akelebe
- **Email:** [ajiboladolapogenius@gmail.com](mailto:ajiboladolapogenius@gmail.com)
- **Role Applied:** Frontend Developer — Branda V2
- **GitHub:** [https://github.com/ajibolagenius](https://github.com/ajibolagenius)

---

## 📄 License
MIT © 2026 Ajibola Akelebe. Developed for the Branda V2 Technical Assessment.

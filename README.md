# Branda V2 — Frontend Screening

A service ordering interface for Branda, built with Next.js 16 (App Router) and Tailwind CSS v4. Customers browse branding services across five studios (Create, Prints, Gifts, Studio, Digital), configure an order, and check out in four markets: Nigeria, the US, the UK and Canada.

Built by Ajibola Akelebe for the Frontend Developer screening.

- **Live:** https://branda-v2-theta.vercel.app
- **Repo:** https://github.com/ajibolagenius/branda-v2-frontend

## Written answers

| Task | File |
|---|---|
| Task 2: Performance | [assets/docs/task-2-performance.pdf](assets/docs/task-2-performance.pdf) |
| Task 3: Architecture | [assets/docs/task-3-architecture.pdf](assets/docs/task-3-architecture.pdf) |
| Task 4: Review of branda.com.ng | [assets/docs/task-4-website-review.pdf](assets/docs/task-4-website-review.pdf) |
| Task 5: Short answers | [assets/docs/task-5-screening-answers.pdf](assets/docs/task-5-screening-answers.pdf) |

## Setup

Requires Node 22.18 or later and pnpm.

```bash
git clone https://github.com/ajibolagenius/branda-v2-frontend.git
cd branda-v2-frontend
pnpm install
pnpm dev          # http://localhost:3000, redirects to /ng
```

Other commands:

```bash
pnpm build        # production build
pnpm start        # serve the production build
pnpm test         # pricing, totals, search and pagination checks
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed URL so canonical links, the sitemap and social previews point to the right place.

## What's in it

- **Four markets in subfolders:** `/ng`, `/us`, `/uk`, `/ca`. Each has its own currency, tax, delivery fee and free-delivery threshold, headline, featured services and spotlight. Switching market in the header keeps you on the same page with the same filters.
- **Catalogue** (`/[market]/services`): search, five categories, filters for industry, turnaround and use case, sorting by popularity, price or speed, and pagination. Every filter lives in the URL, so results can be shared and indexed.
- **Service pages** (`/[market]/services/[slug]`): gallery, what's included, turnaround, options with live pricing, quantity, Add to cart and Order now, plus related services from other studios.
- **Cart and checkout:** a slide-in cart, a full cart page, an itemised summary with tax and delivery, and a mock confirmation page. No payment is taken.
- **SEO:** per-page titles and descriptions, canonical and `hreflang` links for all four markets, product structured data, a sitemap and `robots.txt`.
- **States:** loading skeletons, an error boundary with retry, a styled 404, and designed empty states for search and the cart.

## Key decisions

**Server Components by default.** Pages render on the server. Only the interactive pieces run in the browser: the cart, the filters, the product options and the header menus. The product card is a Server Component with one small client button inside it.

**How each page is rendered**

| Page | Rendering | Why |
|---|---|---|
| Market home | Static | Same for every visitor in a market |
| Service detail | Static, one per market and service | Built ahead of time, served from the CDN |
| Catalogue | Per request | Depends on the filters in the URL |
| Cart, checkout | Client | Private to the visitor, nothing to index |
| Confirmation | Per request | Shows the order number from the URL |

**URL as the source of truth for filters.** No filter state hides in a store. Back and forward work, and every result page has a real address.

**One place for money.** `orderSummary()` in `src/lib/markets.ts` calculates subtotal, tax, delivery and total for the drawer, cart page and checkout, and `unitPrice()` applies discounts and option prices. `pnpm test` covers both.

**Zustand for the cart.** It's small, needs no provider, and saves to the browser. The cart loads its saved items after the page mounts, so the server HTML and the first browser render always match.

**Native HTML over libraries.** The cart is a `<dialog>`, the search bar and mobile menu use the popover API, the market switcher is a `<select>`, and product options are radio inputs. Keyboard support, focus handling and Escape-to-close come free, with less JavaScript.

**CSS-only motion.** The headline rises in, sections fade up as you scroll, the cart slides in, and buttons press down. No animation library. Everything respects reduced-motion settings.

**Design.** It follows the reference UI: cream background, sand product tiles, square corners, forest-green buttons and a lime accent. Copy uses Branda's own voice from branda.com.ng, kept short and direct. There is one font, Archivo, with a wide, heavy cut for headlines.

## Project structure

```
src/
  app/
    [market]/
      page.tsx                     market home
      services/page.tsx            catalogue
      services/[slug]/page.tsx     service detail
      cart/, checkout/             cart, checkout, confirmation
      layout.tsx, loading.tsx, error.tsx, not-found.tsx
    sitemap.ts, robots.ts
  components/
    Header, Footer, Cart, CatalogFilters,
    ServiceCard, ServiceConfigurator, ServiceGallery
  lib/
    markets.ts                     market config, currency, order totals
    services-data.ts               catalogue, pricing, search and filters
    cart-store.ts                  Zustand cart
    pricing.test.mjs               checks for the money logic
```

## Contact

Ajibola Akelebe · ajiboladolapogenius@gmail.com · https://ajibolagenius.vercel.app · https://github.com/ajibolagenius

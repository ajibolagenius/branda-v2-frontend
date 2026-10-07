# Task 4: Website and Product Review — branda.com.ng

**Target:** [https://branda.com.ng/](https://branda.com.ng/)  
**Reviewer:** Ajibola Akelebe  
**Date:** October 2026  
**Context:** Production frontend inspection conducted via live DOM, network profiling, and source code tracing to inform the architecture and UI/UX for Branda V2.

---

## 1. Executive Summary

Branda has built a compelling value proposition as a comprehensive branding ecosystem ("One Powerhouse. Every branding solution.") serving over 500+ enterprises (including GTCO, Dangote, Truecaller, and Autochek). 

However, the current production platform (`branda.com.ng`) runs on a heavily patched WordPress/WooCommerce stack (LiteSpeed Server, Elementor, Revolution Slider, WC Designer Pro, YITH plugins). It exhibits severe frontend performance bottlenecks, runtime script syntax errors, mobile friction, and single-market hardcoding that impede international scalability across Nigeria, the USA, the UK, and Canada.

---

## 2. Three Things Working Well (Frontend / UI Perspective)

1. **Clear Brand Hierarchy & Ecosystem Framing:**
   - The grouping of services under distinct umbrella brands—**Studio by Branda**, **Digital by Branda**, **Create by Branda**, **Gifts by Branda**, and **Prints by Branda**—gives prospective corporate clients a clear mental model of full-spectrum agency capabilities rather than a disjointed print vendor.
2. **Prominent Social Proof & Corporate Credibility:**
   - The enterprise logo showcase displaying prominent African and international corporations (GTCO, Dangote Group, Truecaller, Reliance Infosystems, Autochek) establishes immediate trust and authority above the fold.
3. **High-Intent B2B Call-to-Actions (CTAs):**
   - Actionable CTAs such as *"Get An Instant Quote"*, *"Order Corporate Gifts"*, and *"Design Workspace"* are explicitly mapped to high-intent customer purchase funnels, guiding enterprise decision-makers toward conversion.

---

## 3. Five Critical Areas for Improvement

1. **Critical Head JavaScript Syntax Error (Broken Script Execution):**
   - **Observation:** In the document `<head>`, inside an inline Google Tag Manager script block (`lines 212–221`), a raw HTML `<a>` tag for a SiteLock badge was accidentally pasted:
     ```html
     <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'AW-17788095716');
       
       <a href="#" onclick="window.open('https://www.sitelock.com/...');"><img ... /></a>
     </script>
     ```
   - **Impact:** Throws an uncaught `SyntaxError: Unexpected token '<'` immediately during initial document parse, breaking subsequent script execution in that block and polluting the browser console.
2. **Blocking Full-Screen Preloader Destroying FCP & LCP:**
   - **Observation:** The site forces a full-viewport blocking overlay (`#sl-preloader`) rendering an unoptimized 500×500 animated GIF (`Branda-Icon-preloader.gif`) via inline CSS `visibility: visible !important;`.
   - **Impact:** Artificially delays First Contentful Paint (FCP) and Largest Contentful Paint (LCP) by 2–4+ seconds, directly punishing SEO ranking on Google Mobile search.
3. **Severe Plugin Bloat & Asset Payload:**
   - **Observation:** The page enqueues dozens of overlapping stylesheets and scripts: jQuery 3.7.1, jQuery Migrate, jQuery BlockUI, Slick Carousel, Owl Carousel, Magnific Popup, Fancybox, Revolution Slider, Spectrum color picker, and Elementor post styles.
   - **Impact:** Over 3.5MB+ of uncompressed CSS/JS assets, causing severe main-thread blocking, high memory consumption, and sluggish scroll performance on mobile devices.
4. **Single-Market Hardcoding (No Internationalization Architecture):**
   - **Observation:** The current site is hardcoded strictly for Nigeria:
     - Domain hardcoded to `.com.ng`
     - Currency hardcoded to Nigerian Naira (`₦`)
     - Open Graph locale forced to `en_NG` via a client-side DOM script listener (`ogLocale.setAttribute('content', 'en_NG')`)
   - **Impact:** Complete lack of subfolder routing (`/ng`, `/us`, `/uk`, `/ca`), inability to serve international currencies (USD, GBP, CAD), and missing `hreflang` architecture necessary for global organic search.
5. **Overwhelming Navigation & Submenu Usability on Mobile:**
   - **Observation:** The navigation menu contains 4-level deep nested dropdowns with over 35 distinct sub-links (e.g., *Shop > Print Shop > Reliable Print Shop in Nigeria > Wedding Souvenirs Printing Nigeria*).
   - **Impact:** Difficult to tap on touchscreens, high cognitive load, and high bounce rate for mobile users searching for specific branding deliverables.

---

## 4. Noticeable Issues Across Dimensions

| Dimension | Observed Issue |
|---|---|
| **Responsiveness** | Slider Revolution presizing script (`setREVStartSize`) calculates window width imperatively via inline script, causing layout shifts and horizontal overflow on mobile viewports. |
| **Navigation** | Overloaded taxonomy with redundant categories (*"Plain Wears"* vs *"Custom Apparel"* vs *"Print Shop"*). Lack of a persistent search bar or command palette. |
| **User Experience** | Ordering services requires navigating through traditional WooCommerce product pages without interactive options configurators or transparent turnaround schedules. |
| **Page Speed** | Poor mobile Core Web Vitals (FCP > 3.2s, LCP > 5.5s) caused by unoptimized imagery, render-blocking scripts, and the full-page preloader. |
| **Accessibility** | Interactive icons and buttons lack proper `aria-label` attributes; color contrast in secondary Yellowtail script headings fails WCAG 2.1 AA standards. |
| **UI Consistency** | Inconsistent mix of multiple icon sets (FontAwesome, Phosphor Icons, HaruIcons, Pricons) and divergent typography scales (Outfit, Yellowtail, Roboto Slab, Rubik, Montserrat). |

---

## 5. Three Practical Improvements to Prioritize for Branda V2

1. **Subfolder-Based Multi-Market Architecture (`/ng`, `/us`, `/uk`, `/ca`) with Native Currency Switching:**
   - Implement clean Next.js App Router subfolder routing to retain maximum domain SEO equity.
   - Dynamically adapt pricing, localized taxes/VAT (e.g., 7.5% NG VAT vs 20% UK VAT), shipping thresholds, and hero value propositions per geographic market, with seamless header country selection.
2. **Interactive Service Customization & Instant Price Engine:**
   - Replace rigid WooCommerce dropdowns with a real-time service customizer (volume tiers, premium materials, and turnaround pace) that recalculates unit price, total investment, and delivery estimates in real time without page reloads.
3. **Radical Performance & Core Web Vitals Optimization:**
   - Migrate from heavy WordPress plugins to Next.js React Server Components (RSC) and Tailwind CSS.
   - Eliminate all preloaders; employ Next.js `next/image` with modern WebP/AVIF formats and responsive `sizes`; implement streaming skeletons (`loading.tsx`), achieving a sub-1.2s LCP and 95+ Mobile Lighthouse score.

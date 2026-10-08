# Task 4: Website and Product Review, branda.com.ng

Ajibola Akelebe · Frontend Developer, Branda V2 · October 2026

I went through the live site in Chrome on a phone-sized screen (390px) and on desktop: the home page, the shop, product categories, a product page, the Studio, Gifts and web development pages, and both quote forms. I also read the page source and the browser console. Load times are from my own connection in Lagos, checked on 8 October 2026, so treat them as one real-world sample rather than lab numbers.

## Three things working well

1. **The positioning is clear.** "All-in-One Branding Partner" and "One Powerhouse. Every branding solution." say what Branda is in a few words. The home page backs it up with one call to action per service: Get An Instant Quote, Design Workspace, Order Corporate Gifts and Develop Website.
2. **Trust shows up early.** Client logos (Truecaller, GTCO, Swipe, Dangote, Reliance, Wao Wallpaper), "Chosen by 500+ Leading Companies", and press mentions in TechCabal and The Sun answer "can I trust them?" before the visitor has to ask.
3. **Product pages do the job.** The business card page has a real price, options for size, corners and lamination, a minimum order note, Add to cart, and a link to request a quote instead. It also has a proper page heading and product structured data, which most other pages lack.

## Five areas to improve

1. **A script error on every page.** A SiteLock badge (an HTML `<a>` tag) has been pasted inside the Google Ads `gtag` script. Chrome reports `SyntaxError: Unexpected token '<'` on the home page, the shop and product pages. That whole block stops running, so the Google Ads tag (`AW-17788095716`) is never configured, and ad conversions may not be recorded. It's a five-minute fix.
2. **A loading screen hides the site.** On a first visit, a full-screen black preloader with a green spinner covers the page until everything has loaded. On my connection that was about 13 seconds on the shop and 16 on the home page. A visitor sees a blank white screen, then the spinner, and only then the site. The preloader GIF is also 538 KB and is downloaded at high priority on every page.
3. **Too much code for each page.** The home page makes about 115 requests and transfers 1.5 to 1.8 MB: around 40 script files and 48 stylesheets. That includes jQuery and jQuery Migrate, Revolution Slider, two carousel libraries (Slick and Owl) and two lightbox libraries (Magnific Popup and Fancybox), so two jobs are each done twice. The HTML itself is sent with `no-store`, so it is never cached, and the server took 2 to 3 seconds to start responding.
4. **Built for one market only.** Prices are in naira only, there is no currency or country switcher, and there are no `hreflang` tags. The page source declares `og:locale` as `en_US`, then a script changes it to `en_NG` after the page loads. Search engines and link previews that don't run scripts still see US English.
5. **Search engines can't read the most important text.** None of the main pages I checked (home, shop, Studio, Gifts, web development, the quote page, product categories) has an `<h1>`. The home page uses 21 `<h2>`s instead. The five studio names (Gifts, Studio, Create, Prints, Digital) are drawn as shapes in an SVG image with an empty `alt`, so Google and screen readers can't read them, and visitors can't click them.

## Issues by area

| Area | What I found |
|---|---|
| Responsiveness | Holds up. No sideways scrolling at 390px and very little layout shift. The hero headline types itself out letter by letter, so the main message is half-written for the first few seconds ("Unlock the Best Deals in Prints & Mass Pr…") |
| Navigation | 50 menu links in 7 dropdowns. "Print Shop" alone is one list of 24 items. The phone icon links to `branda.com.ng/+2348026101233`, which is a 404 page, because `tel:` is missing. The Facebook icon has an empty link, so it just reloads the page |
| User experience | Two separate quote pages with different forms: `/request-a-quote/` has 27 fields (10 required) and `/request-a-quote-now/` has 17 (5 required). Product cards show wide price ranges, like ₦12,500 to ₦554,420, until options are chosen. Web development has no price at all |
| Page speed | Preloader until full load, 1.5 MB or more per page, HTML never cached, and only 4 of about 30 home page images lazy-loaded. The main content finished loading after about 9 seconds on mobile in my test |
| Accessibility | No `<h1>` on main pages. Five icon-only links (Facebook, phone, WhatsApp, Instagram and one more) have no label, so a screen reader can't say what they are. Three meaningful images have an empty `alt`: the studio names, a hoodie mockup and a services banner |
| UI consistency | Six font families (Montserrat, Outfit, Roboto, Roboto Slab, Rubik, Yellowtail) and five icon sets (Font Awesome, Phosphor, Haru, Pricon, Elementor icons) on one page |
| SEO | Page titles are too long to show in full. The product page title is about 140 characters. Category URLs are long keyword chains, up to five folders deep. A duplicate product with "copy" in its address is live |
| Mobile | Phones get the worst of it: the heaviest pages, the slowest start, and the longest time behind the loading screen |

## Three improvements I would prioritise for V2

1. **Multi-market from day one.** `/ng`, `/us`, `/uk` and `/ca`, each with its own currency, tax, delivery terms and headline, plus `hreflang` so Google shows the right version in each country. This assessment build already does this.
2. **One ordering flow for everything.** Products already have prices and options. Services should work the same way: a clear starting price, options with a live total, and checkout in the same cart. Merge the two quote pages into one short form for the jobs that really need a conversation.
3. **Speed and search as a release rule.** No preloader. One font family and one icon set. Real text for headings and key messages, with one `<h1>` per page and short titles. Core Web Vitals checked on a real phone on mobile data before every release. Fixing the `gtag` error and the broken phone link are the first two commits.

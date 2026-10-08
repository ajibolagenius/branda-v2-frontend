import type { CatalogQuery, Category, MarketCode, Service, Urgency } from './types';

export const CATEGORIES: Record<Category, { label: string; blurb: string }> = {
  create: { label: 'Create', blurb: 'Logos, packaging and decks' },
  prints: { label: 'Prints', blurb: 'Cards, apparel and event print' },
  gifts: { label: 'Gifts', blurb: 'Branded gifts your clients keep' },
  studio: { label: 'Studio', blurb: 'Office walls, booths and signage' },
  digital: { label: 'Digital', blurb: 'Websites, portals and social kits' },
};

export const INDUSTRIES: Record<string, string> = {
  tech: 'Tech & startups',
  finance: 'Finance & corporate',
  retail: 'Retail & e-commerce',
  events: 'Hospitality & events',
  creators: 'Creators & personal brands',
};

export const USE_CASES: Record<string, string> = {
  launch: 'Brand launch',
  gifting: 'Corporate gifting',
  campaign: 'Marketing campaign',
  workspace: 'Workspace fit-out',
};

export const URGENCY: Record<Urgency, string> = {
  priority: 'Within 48 hours',
  express: '3 to 5 days',
  standard: '6 days or more',
};

export const SORTS: Record<string, string> = {
  popular: 'Most popular',
  'price-asc': 'Price, low to high',
  'price-desc': 'Price, high to low',
  fastest: 'Fastest turnaround',
};

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const SERVICES: Service[] = [
  {
    slug: 'logo-design',
    name: 'Logo & Brand Identity',
    category: 'create',
    summary: 'A logo, colours and type that work everywhere your brand shows up.',
    description: 'Three logo directions from a senior designer, refined over three rounds. You leave with every file format your printer, developer and social team will ask for, plus a short guide on how to use them.',
    prices: { ng: 350000, us: 850, uk: 680, ca: 1150 },
    discount: 10,
    images: [img('1600697395543-ef3ee6e9af7b'), img('1620912189865-1e8a33da4c5e'), img('1626785774573-4b799315345d')],
    includes: ['3 logo directions', '3 revision rounds', 'Full colour palette', 'Font pairing', 'SVG, PNG, PDF files', 'Brand usage guide'],
    turnaroundDays: 5,
    popular: true,
    industries: ['tech', 'finance', 'retail', 'creators'],
    useCase: 'launch',
    options: [
      { name: 'Package', choices: [{ label: 'Essentials', multiplier: 1 }, { label: 'Plus social kit', multiplier: 1.4 }, { label: 'Plus motion logo', multiplier: 2.1 }] },
      { name: 'Speed', choices: [{ label: 'Standard', multiplier: 1 }, { label: 'Rush, 48 hours', multiplier: 1.35 }] },
    ],
    related: ['business-cards', 'brand-portal', 'custom-apparel'],
  },
  {
    slug: 'packaging-design',
    name: 'Packaging Design',
    category: 'create',
    summary: 'Boxes and labels designed to sell on the shelf and on camera.',
    description: 'We design the structure and the artwork together, then hand your manufacturer print-ready dielines and 3D previews. Foil, spot UV and emboss layers are separated for you.',
    prices: { ng: 280000, us: 650, uk: 520, ca: 890 },
    images: [img('1589939705384-5185137a7f0f'), img('1607082348824-0a96f2a4b9da')],
    includes: ['Print-ready dieline', '3D mockups', 'Finish layer proofs', 'Manufacturer handoff notes', '2 revision rounds'],
    turnaroundDays: 6,
    popular: false,
    industries: ['retail', 'events', 'creators'],
    useCase: 'launch',
    options: [{ name: 'Box type', choices: [{ label: 'Mailer box', multiplier: 1 }, { label: 'Rigid magnetic box', multiplier: 1.3 }, { label: 'Kraft sleeve', multiplier: 1.15 }] }],
    related: ['paper-bags', 'stickers-labels', 'executive-gift-box'],
  },
  {
    slug: 'pitch-deck-design',
    name: 'Pitch Deck Design',
    category: 'create',
    summary: 'Investor and sales decks that read clearly in a room or an inbox.',
    description: 'Send us your draft and numbers. We restructure the story, design every slide in your brand, and deliver an editable file your team can keep updating.',
    prices: { ng: 180000, us: 450, uk: 360, ca: 610 },
    images: [img('1626785774625-ddcddc3445e9'), img('1557804506-669a67965ba0'), img('1505373877841-8d25f7d46678')],
    includes: ['Story restructure', 'Up to 15 slides', 'Charts redrawn', 'Editable Keynote or Slides file', 'PDF export'],
    turnaroundDays: 4,
    popular: false,
    industries: ['tech', 'finance'],
    useCase: 'campaign',
    options: [{ name: 'Length', choices: [{ label: 'Up to 15 slides', multiplier: 1 }, { label: 'Up to 30 slides', multiplier: 1.7 }] }],
    related: ['logo-design', 'website-design'],
  },
  {
    slug: 'business-cards',
    name: 'Foil Business Cards',
    category: 'prints',
    summary: 'Thick 600gsm cards with metallic foil and painted edges.',
    description: 'Printed on heavy cotton stock with foil on both sides and a soft-touch finish. Pick an edge colour to match your brand.',
    prices: { ng: 85000, us: 180, uk: 145, ca: 245 },
    discount: 15,
    images: [img('1616628188859-7a11abb6fcc9'), img('1611532736597-de2d4265fba3')],
    includes: ['600gsm cotton stock', 'Double-sided foil', 'Soft-touch coating', 'Painted edges', 'Desk dispenser'],
    turnaroundDays: 4,
    popular: true,
    industries: ['finance', 'tech', 'creators'],
    useCase: 'launch',
    options: [
      { name: 'Quantity', choices: [{ label: '250 cards', multiplier: 1 }, { label: '500 cards', multiplier: 1.6 }, { label: '1,000 cards', multiplier: 2.6 }] },
      { name: 'Foil', choices: [{ label: 'Gold', multiplier: 1 }, { label: 'Silver', multiplier: 1.05 }, { label: 'Black deboss', multiplier: 1.1 }] },
    ],
    related: ['logo-design', 'executive-gift-box', 'stickers-labels'],
  },
  {
    slug: 'event-backdrop',
    name: 'Event Backdrop',
    category: 'prints',
    summary: 'Wrinkle-free step-and-repeat banner with a frame that sets up in minutes.',
    description: 'Dye-sublimated fabric that does not glare under camera flash, on a snap-together aluminium frame. Ships in a wheeled case.',
    prices: { ng: 220000, us: 480, uk: 390, ca: 640 },
    images: [img('1511578314322-379afb476865'), img('1475721027785-f74eccf877e2'), img('1492684223066-81342ee5ff30')],
    includes: ['Stretch fabric print', 'Aluminium frame', 'Wheeled carry case', 'Logo repeat proof'],
    turnaroundDays: 2,
    popular: true,
    industries: ['events', 'tech', 'finance'],
    useCase: 'campaign',
    options: [{ name: 'Size', choices: [{ label: '8 × 8 ft', multiplier: 1 }, { label: '10 × 8 ft', multiplier: 1.25 }, { label: '20 × 8 ft', multiplier: 2.1 }] }],
    related: ['exhibition-booth', 'custom-apparel', 'stickers-labels'],
  },
  {
    slug: 'custom-apparel',
    name: 'Branded T-shirts & Hoodies',
    category: 'prints',
    summary: 'Heavy cotton tees and hoodies your team will actually wear.',
    description: 'Screen print, puff print or embroidery on pre-shrunk cotton. We send a fit sample before the full run, and each piece arrives folded and bagged.',
    prices: { ng: 140000, us: 320, uk: 260, ca: 430 },
    images: [img('1503342217505-b0a15ec3261c'), img('1556905055-8f358a7a47b2'), img('1521572267360-ee0c2909d518')],
    includes: ['Pre-shrunk cotton', 'Custom neck label', 'Screen, puff or embroidery', 'Fit sample first', 'Individually bagged'],
    turnaroundDays: 5,
    popular: true,
    industries: ['tech', 'retail', 'creators', 'events'],
    useCase: 'gifting',
    options: [
      { name: 'Pack', choices: [{ label: '25 pieces', multiplier: 1 }, { label: '50 pieces', multiplier: 1.8 }, { label: '100 pieces', multiplier: 3.3 }] },
      { name: 'Garment', choices: [{ label: 'T-shirt', multiplier: 1 }, { label: 'Hoodie', multiplier: 1.6 }] },
    ],
    related: ['branded-mugs', 'branded-backpacks', 'executive-gift-box'],
  },
  {
    slug: 'stickers-labels',
    name: 'Stickers & Labels',
    category: 'prints',
    summary: 'Die-cut vinyl stickers and product labels in any shape.',
    description: 'Waterproof vinyl, cut to the outline of your artwork. Good for laptops, packaging seals and product labels.',
    prices: { ng: 35000, us: 90, uk: 75, ca: 120 },
    images: [img('1572375992501-4b0892d50c69')],
    includes: ['Waterproof vinyl', 'Custom die-cut shape', 'Matte or gloss', 'Free proof'],
    turnaroundDays: 3,
    popular: false,
    industries: ['retail', 'tech', 'creators'],
    useCase: 'campaign',
    options: [{ name: 'Quantity', choices: [{ label: '200 stickers', multiplier: 1 }, { label: '500 stickers', multiplier: 2 }, { label: '1,000 stickers', multiplier: 3.4 }] }],
    related: ['packaging-design', 'paper-bags', 'business-cards'],
  },
  {
    slug: 'paper-bags',
    name: 'Branded Paper Bags',
    category: 'prints',
    summary: 'Sturdy shopping bags with rope handles and your logo.',
    description: 'Thick paper bags printed edge to edge, with rope or ribbon handles. Ideal for retail, events and gift handouts.',
    prices: { ng: 120000, us: 260, uk: 210, ca: 350 },
    images: [img('1607082348824-0a96f2a4b9da')],
    includes: ['250gsm art paper', 'Full-colour print', 'Rope or ribbon handles', 'Reinforced base'],
    turnaroundDays: 6,
    popular: false,
    industries: ['retail', 'events'],
    useCase: 'campaign',
    options: [{ name: 'Quantity', choices: [{ label: '100 bags', multiplier: 1 }, { label: '250 bags', multiplier: 2.2 }, { label: '500 bags', multiplier: 4 }] }],
    related: ['packaging-design', 'stickers-labels', 'executive-gift-box'],
  },
  {
    slug: 'executive-gift-box',
    name: 'Executive Gift Box',
    category: 'gifts',
    summary: 'A magnetic box with a power bank, notebook, pen and welcome card.',
    description: 'Each box is fitted with foam inserts and personalised for the recipient. We can ship straight to each person on your list.',
    prices: { ng: 195000, us: 420, uk: 340, ca: 560 },
    discount: 12,
    images: [img('1549465220-1a8b9238cd48'), img('1512909006721-3d6018887383'), img('1607344645866-009c320b63e0')],
    includes: ['Magnetic gift box', 'Engraved power bank', 'Debossed notebook', 'Metal pen', 'Printed welcome card', 'Direct-to-recipient delivery'],
    turnaroundDays: 4,
    popular: true,
    industries: ['finance', 'tech', 'creators'],
    useCase: 'gifting',
    options: [{ name: 'Boxes', choices: [{ label: '10 boxes', multiplier: 1 }, { label: '25 boxes', multiplier: 2.2 }, { label: '50 boxes', multiplier: 4.1 }] }],
    related: ['branded-mugs', 'business-cards', 'branded-tumblers'],
  },
  {
    slug: 'branded-mugs',
    name: 'Branded Mugs',
    category: 'gifts',
    summary: 'Ceramic or enamel mugs printed with your logo.',
    description: 'Dishwasher-safe print that will not fade. Each mug is boxed, so they are ready to hand out or post.',
    prices: { ng: 45000, us: 110, uk: 90, ca: 150 },
    discount: 10,
    images: [img('1572119865084-43c285814d63'), img('1514228742587-6b1558fcca3d')],
    includes: ['Dishwasher-safe print', 'Ceramic or enamel', 'Individual gift box', 'Free mockup'],
    turnaroundDays: 3,
    popular: true,
    industries: ['tech', 'finance', 'retail', 'events'],
    useCase: 'gifting',
    options: [
      { name: 'Quantity', choices: [{ label: '12 mugs', multiplier: 1 }, { label: '36 mugs', multiplier: 2.6 }, { label: '72 mugs', multiplier: 4.8 }] },
      { name: 'Material', choices: [{ label: 'Ceramic', multiplier: 1 }, { label: 'Enamel', multiplier: 1.2 }] },
    ],
    related: ['branded-tumblers', 'custom-apparel', 'executive-gift-box'],
  },
  {
    slug: 'branded-tumblers',
    name: 'Insulated Tumblers',
    category: 'gifts',
    summary: 'Steel tumblers that keep drinks cold for 24 hours, laser engraved.',
    description: 'Double-wall steel with a ceramic lining, so there is no metal taste. Engraving is permanent and each tumbler comes boxed.',
    prices: { ng: 65000, us: 140, uk: 110, ca: 190 },
    images: [img('1577937927133-66ef06acdf18'), img('1514432324607-a09d9b4aefdd')],
    includes: ['500ml double-wall steel', 'Ceramic lining', 'Laser engraving', 'Leak-proof lid', 'Gift box'],
    turnaroundDays: 2,
    popular: false,
    industries: ['tech', 'retail', 'events'],
    useCase: 'gifting',
    options: [{ name: 'Quantity', choices: [{ label: '12 tumblers', multiplier: 1 }, { label: '30 tumblers', multiplier: 2.2 }, { label: '60 tumblers', multiplier: 4 }] }],
    related: ['branded-mugs', 'executive-gift-box'],
  },
  {
    slug: 'branded-backpacks',
    name: 'Branded Backpacks',
    category: 'gifts',
    summary: 'Everyday laptop backpacks with an embossed or stitched logo.',
    description: 'Padded laptop sleeve, water-resistant base and your logo embossed on leather or stitched on canvas. A welcome-kit favourite.',
    prices: { ng: 160000, us: 380, uk: 300, ca: 510 },
    images: [img('1622560480605-d83c853bc5c3')],
    includes: ['Padded 16" laptop sleeve', 'Water-resistant base', 'Embossed or stitched logo', 'Dust bag'],
    turnaroundDays: 7,
    popular: false,
    industries: ['tech', 'finance'],
    useCase: 'gifting',
    options: [{ name: 'Quantity', choices: [{ label: '10 backpacks', multiplier: 1 }, { label: '25 backpacks', multiplier: 2.3 }] }],
    related: ['custom-apparel', 'executive-gift-box'],
  },
  {
    slug: 'office-wall-branding',
    name: 'Office Wall Branding',
    category: 'studio',
    summary: '3D logos, wall graphics and lit signs for your office.',
    description: 'We survey the space, design the walls and install everything. Acrylic or metal letters, with optional halo lighting.',
    prices: { ng: 550000, us: 1400, uk: 1150, ca: 1850 },
    images: [img('1497366216548-37526070297c'), img('1497215728101-856f4ea42174'), img('1524758631624-e2822e304c36')],
    includes: ['On-site survey', 'Wall layout drawings', '3D logo lettering', 'Installation crew', '2-year warranty'],
    turnaroundDays: 8,
    popular: true,
    industries: ['finance', 'tech'],
    useCase: 'workspace',
    options: [{ name: 'Material', choices: [{ label: 'Acrylic', multiplier: 1 }, { label: 'Brushed metal', multiplier: 1.25 }, { label: 'Lit halo sign', multiplier: 1.65 }] }],
    related: ['neon-signage', 'logo-design', 'brand-portal'],
  },
  {
    slug: 'exhibition-booth',
    name: 'Exhibition Booth',
    category: 'studio',
    summary: 'A reusable trade show stand with lightbox walls and a counter.',
    description: 'Modular aluminium frame, backlit fabric graphics, a lockable counter and screen mounts. Packs into flight cases for the next show.',
    prices: { ng: 950000, us: 2400, uk: 1950, ca: 3200 },
    images: [img('1540575467063-178a50c2df87'), img('1531058020387-3be344556be6'), img('1475721027785-f74eccf877e2')],
    includes: ['Modular frame', 'Backlit fabric walls', 'Lockable counter', 'Screen mounts', 'Flight cases'],
    turnaroundDays: 10,
    popular: false,
    industries: ['events', 'tech', 'finance'],
    useCase: 'campaign',
    options: [{ name: 'Footprint', choices: [{ label: '10 × 10 ft', multiplier: 1 }, { label: '20 × 10 ft', multiplier: 1.85 }] }],
    related: ['event-backdrop', 'custom-apparel', 'stickers-labels'],
  },
  {
    slug: 'neon-signage',
    name: 'LED Neon Signs',
    category: 'studio',
    summary: 'Custom neon-style logo signs for walls, receptions and shopfronts.',
    description: 'Flexible LED neon on a clear acrylic back. Low heat, low power, dimmable, and ready to hang.',
    prices: { ng: 180000, us: 420, uk: 340, ca: 560 },
    images: [img('1563906267088-b029e7101114'), img('1600508774634-4e11d34730e2')],
    includes: ['LED neon tubing', 'Clear acrylic back', 'Dimmer remote', 'Wall fixings'],
    turnaroundDays: 6,
    popular: true,
    industries: ['retail', 'events', 'creators'],
    useCase: 'workspace',
    options: [{ name: 'Width', choices: [{ label: '60 cm', multiplier: 1 }, { label: '100 cm', multiplier: 1.5 }, { label: '150 cm', multiplier: 2.2 }] }],
    related: ['office-wall-branding', 'event-backdrop'],
  },
  {
    slug: 'website-design',
    name: 'Website Design & Build',
    category: 'digital',
    summary: 'A fast, mobile-first website your team can edit.',
    description: 'Designed in your brand and built to load fast on mobile data. Comes with a simple editor, analytics and 30 days of support after launch.',
    prices: { ng: 650000, us: 1600, uk: 1300, ca: 2150 },
    discount: 10,
    images: [img('1460925895917-afdab827c52f'), img('1541462608143-67571c6738dd'), img('1558655146-d09347e92766')],
    includes: ['Custom design', 'Mobile-first build', 'Content editor', 'Analytics setup', '30 days of support'],
    turnaroundDays: 7,
    popular: true,
    industries: ['tech', 'retail', 'finance'],
    useCase: 'launch',
    options: [{ name: 'Size', choices: [{ label: 'Up to 6 pages', multiplier: 1 }, { label: 'Up to 15 pages', multiplier: 1.6 }, { label: 'Store or portal', multiplier: 2.4 }] }],
    related: ['logo-design', 'social-media-kit', 'brand-portal'],
  },
  {
    slug: 'brand-portal',
    name: 'Online Brand Guidelines',
    category: 'digital',
    summary: 'Your brand rules and logo downloads on one private web page.',
    description: 'Replaces the PDF nobody can find. Colours, fonts, tone of voice and every logo file, at a link you can share with partners.',
    prices: { ng: 220000, us: 520, uk: 420, ca: 710 },
    images: [img('1507238691740-187a5b1d37b8'), img('1581291518857-4e27b48ff24e')],
    includes: ['Private web page', 'Logo download library', 'Colour and font specs', 'Tone of voice notes'],
    turnaroundDays: 4,
    popular: false,
    industries: ['tech', 'finance'],
    useCase: 'launch',
    options: [{ name: 'Hosting', choices: [{ label: 'We host it', multiplier: 1 }, { label: 'Code handover', multiplier: 0.9 }] }],
    related: ['logo-design', 'website-design'],
  },
  {
    slug: 'social-media-kit',
    name: 'Social Media Kit',
    category: 'digital',
    summary: 'Post templates, profile images and story covers in your brand.',
    description: 'Editable templates for every platform you use, so anyone on your team can post on-brand in minutes.',
    prices: { ng: 120000, us: 300, uk: 240, ca: 400 },
    images: [img('1611162617213-7d7a39e9b1d7'), img('1563986768494-4dee2763ff3f'), img('1586953208448-b95a79798f07')],
    includes: ['20 post templates', 'Profile and cover images', 'Story highlight covers', 'Canva or Figma files'],
    turnaroundDays: 3,
    popular: true,
    industries: ['creators', 'retail', 'tech'],
    useCase: 'campaign',
    options: [{ name: 'Templates', choices: [{ label: '20 templates', multiplier: 1 }, { label: '50 templates', multiplier: 1.8 }] }],
    related: ['logo-design', 'website-design'],
  },
];

export const PAGE_SIZE = 8;

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServices(slugs: string[]) {
  return slugs.map(getService).filter((s): s is Service => Boolean(s));
}

export function urgencyOf(days: number): Urgency {
  return days <= 2 ? 'priority' : days <= 5 ? 'express' : 'standard';
}

export function defaultOptions(service: Service): Record<string, string> {
  return Object.fromEntries(service.options.map((o) => [o.name, o.choices[0].label]));
}

// Price per unit after the discount and any option multipliers.
export function unitPrice(service: Service, market: MarketCode, options = defaultOptions(service)) {
  const multiplier = service.options.reduce(
    (m, o) => m * (o.choices.find((c) => c.label === options[o.name])?.multiplier ?? 1),
    1,
  );
  return Math.round(service.prices[market] * (1 - (service.discount ?? 0) / 100) * multiplier);
}

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '');

// Every word must match somewhere; services whose name matches rank first.
function search(services: Service[], query: string) {
  const words = normalize(query).split(' ').filter(Boolean);
  if (!words.length) return services;
  return services
    .map((s) => {
      const name = normalize(s.name);
      const hay = normalize(
        [s.name, s.summary, CATEGORIES[s.category].label, USE_CASES[s.useCase], ...s.industries.map((i) => INDUSTRIES[i]), ...s.includes].join(' '),
      );
      if (!words.every((w) => hay.includes(w))) return null;
      return { s, score: words.filter((w) => name.includes(w)).length };
    })
    .filter((r) => r !== null)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.s);
}

export function queryCatalog(market: MarketCode, q: CatalogQuery) {
  let list = SERVICES.filter(
    (s) =>
      (!q.category || s.category === q.category) &&
      (!q.industry || s.industries.includes(q.industry)) &&
      (!q.urgency || urgencyOf(s.turnaroundDays) === q.urgency) &&
      (!q.useCase || s.useCase === q.useCase),
  );
  if (q.search) list = search(list, q.search);

  const price = (s: Service) => unitPrice(s, market);
  if (q.sort === 'price-asc') list.sort((a, b) => price(a) - price(b));
  else if (q.sort === 'price-desc') list.sort((a, b) => price(b) - price(a));
  else if (q.sort === 'fastest') list.sort((a, b) => a.turnaroundDays - b.turnaroundDays);
  else if (!q.search) list.sort((a, b) => Number(b.popular) - Number(a.popular));

  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, Number(q.page) || 1));
  return { results: list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), total: list.length, page, pages };
}

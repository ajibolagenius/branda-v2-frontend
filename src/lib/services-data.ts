import { Service } from './types';

export const SERVICES: Service[] = [
  // 1. CREATE
  {
    id: 'srv-create-01',
    slug: 'logo-visual-identity-system',
    name: 'Logo Design & Visual Identity System',
    category: 'create',
    shortDescription: 'Complete vector identity, typography scale, OKLCH color system, and brand usage guidelines.',
    fullDescription: 'From initial moodboarding to final vector master assets, we engineer a resilient visual identity designed for modern multi-platform scale. You receive production-ready logo marks, horizontal and stacked variants, typography pairings, and a responsive asset kit.',
    basePrices: {
      ng: 350000,
      us: 850,
      uk: 680,
      ca: 1150,
    },
    discountPercentage: 10,
    images: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
    ],
    inclusions: [
      '3 Distinct Creative Directions & Concepts',
      'Vector Master Files (SVG, AI, EPS, PDF)',
      'Primary, Secondary, Monogram & Favicon Marks',
      'Brand Style Guide (Typography & Color Specs)',
      'Full Commercial Copyright Transfer',
      '3 Iteration Rounds with Senior Art Director',
    ],
    turnaroundDays: 5,
    popular: true,
    featured: true,
    industryTags: ['Technology & Startups', 'Corporate & Finance', 'Retail & E-commerce'],
    urgency: 'Express (3-5d)',
    useCase: 'Brand Launch',
    options: [
      {
        id: 'tier',
        name: 'Package Scope',
        type: 'tier',
        choices: [
          { label: 'Essential Identity', value: 'essential', priceMultiplier: 1.0, isDefault: true },
          { label: 'Growth Ecosystem (+ Social Kit)', value: 'growth', priceMultiplier: 1.4 },
          { label: 'Enterprise Suite (+ 3D Assets & Animation)', value: 'enterprise', priceMultiplier: 2.1 },
        ],
      },
      {
        id: 'turnaround_speed',
        name: 'Turnaround Pace',
        type: 'finish',
        choices: [
          { label: 'Standard Schedule (5 Business Days)', value: 'standard', priceMultiplier: 1.0, isDefault: true },
          { label: 'Priority Rush (48 Hours)', value: 'rush', priceMultiplier: 1.35 },
        ],
      },
    ],
    relatedSlugs: ['luxury-foil-business-cards', 'digital-brand-guidelines', 'custom-branded-apparel'],
  },
  {
    id: 'srv-create-02',
    slug: 'luxury-packaging-box-architecture',
    name: 'Luxury Product Packaging & Die-Cut Design',
    category: 'create',
    shortDescription: 'Custom structural packaging design, print-ready die-lines, and 3D realistic rendering.',
    fullDescription: 'Custom packaging engineered to captivate on shelves and unboxing videos alike. We deliver precise CAD/dieline drawings, foil and emboss stamping layers, CMYK separation profiles, and photorealistic 3D renders ready for manufacturer handoff.',
    basePrices: {
      ng: 280000,
      us: 650,
      uk: 520,
      ca: 890,
    },
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=80',
    ],
    inclusions: [
      'Precision CAD Dieline Template (AI / PDF)',
      '3D Photorealistic Digital Mockups',
      'Foil, Spot UV, & Deboss Layer Proofs',
      'Direct Manufacturer Production Handoff Notes',
      '2 Revision Rounds',
    ],
    turnaroundDays: 6,
    popular: false,
    featured: false,
    industryTags: ['Retail & E-commerce', 'Hospitality & Events', 'Personal Brands'],
    urgency: 'Standard (7-10d)',
    useCase: 'Brand Launch',
    options: [
      {
        id: 'packaging_type',
        name: 'Box Architecture',
        type: 'material',
        choices: [
          { label: 'Mailer / Subscription Box', value: 'mailer', priceMultiplier: 1.0, isDefault: true },
          { label: 'Rigid Drawer / Magnetic Closure', value: 'rigid', priceMultiplier: 1.3 },
          { label: 'Eco-Kraft Sliding Sleeve', value: 'kraft', priceMultiplier: 1.15 },
        ],
      },
    ],
    relatedSlugs: ['executive-onboarding-box', 'luxury-foil-business-cards'],
  },

  // 2. PRINTS
  {
    id: 'srv-prints-01',
    slug: 'luxury-foil-business-cards',
    name: 'Luxury Debossed & Metallic Foil Business Cards',
    category: 'prints',
    shortDescription: 'Heavyweight 600gsm cotton cardstock with metallic foil accents and painted edges.',
    fullDescription: 'Command boardroom respect with tactile business cards crafted on museum-grade cotton pulp. Choose between warm gold, champagne, holographic, or matte black foil, with optional edge painting in your custom brand color.',
    basePrices: {
      ng: 85000,
      us: 180,
      uk: 145,
      ca: 245,
    },
    discountPercentage: 15,
    images: [
      'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1200&q=80',
    ],
    inclusions: [
      'Ultra-Thick 600gsm Cotton Stock',
      'Double-Sided Precision Metallic Foil Stamping',
      'Velvet Soft-Touch Protective Coating',
      'Custom Colored Edge Gilding Included',
      'Complimentary Acrylic Desktop Dispenser',
    ],
    turnaroundDays: 4,
    popular: true,
    featured: true,
    industryTags: ['Corporate & Finance', 'Technology & Startups', 'Personal Brands'],
    urgency: 'Express (3-5d)',
    useCase: 'Brand Launch',
    options: [
      {
        id: 'quantity_tier',
        name: 'Quantity Count',
        type: 'tier',
        choices: [
          { label: '250 Cards', value: '250', priceMultiplier: 1.0, isDefault: true },
          { label: '500 Cards (Save 20%)', value: '500', priceMultiplier: 1.6 },
          { label: '1,000 Cards (Save 35%)', value: '1000', priceMultiplier: 2.6 },
        ],
      },
      {
        id: 'finish_style',
        name: 'Foil Finish',
        type: 'finish',
        choices: [
          { label: 'Warm Gold Metallic', value: 'gold', priceMultiplier: 1.0, isDefault: true },
          { label: 'Silver Champagne Holographic', value: 'silver', priceMultiplier: 1.05 },
          { label: 'Matte Black Blind Deboss', value: 'black', priceMultiplier: 1.1 },
        ],
      },
    ],
    relatedSlugs: ['logo-visual-identity-system', 'executive-onboarding-box', 'custom-branded-tumbler'],
  },
  {
    id: 'srv-prints-02',
    slug: 'event-fabric-backdrop',
    name: 'Tension Fabric Step-and-Repeat Event Backdrop',
    category: 'prints',
    shortDescription: 'Seamless anti-glare tension fabric with aluminum tubular frame and carry duffle.',
    fullDescription: 'Engineered for press events, red carpets, and keynote conferences. High-resolution dye-sublimation print absorbs flashes without hotspot glare, while the snap-together aluminum frame erects in under five minutes.',
    basePrices: {
      ng: 220000,
      us: 480,
      uk: 390,
      ca: 640,
    },
    images: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    ],
    inclusions: [
      'Wrinkle-Free Heavyweight Stretch Poly Fabric',
      'High-Resolution Ultra-Vivid Dye Sublimation',
      'Collapsible Lightweight Aluminum Frame',
      'Padded Protective Travel Case with Wheels',
      'Pre-Flight Proofing for Logo Repeat Patterns',
    ],
    turnaroundDays: 3,
    popular: true,
    featured: false,
    industryTags: ['Hospitality & Events', 'Technology & Startups', 'Corporate & Finance'],
    urgency: 'Priority (24-48h)',
    useCase: 'Marketing Campaign',
    options: [
      {
        id: 'frame_size',
        name: 'Backdrop Width',
        type: 'size',
        choices: [
          { label: '8ft x 8ft Standard Stage', value: '8x8', priceMultiplier: 1.0, isDefault: true },
          { label: '10ft x 8ft Keynote Stage', value: '10x8', priceMultiplier: 1.25 },
          { label: '20ft x 8ft Mega Red Carpet', value: '20x8', priceMultiplier: 2.1 },
        ],
      },
    ],
    relatedSlugs: ['expo-exhibition-pavilion', 'custom-branded-apparel'],
  },
  {
    id: 'srv-prints-03',
    slug: 'custom-branded-apparel',
    name: 'Heavyweight Custom Branded Corporate Apparel',
    category: 'prints',
    shortDescription: 'Organic 420gsm French Terry hoodies & luxury combed cotton tees with 3D puff print.',
    fullDescription: 'Custom employee uniforms and community merch that team members actually want to wear. Crafted from ethically sourced heavy combed cotton with your choice of high-definition screen printing, 3D puff ink, or Japanese embroidery.',
    basePrices: {
      ng: 140000,
      us: 320,
      uk: 260,
      ca: 430,
    },
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    ],
    inclusions: [
      '100% Pre-Shrunk Combed Cotton',
      'Custom Woven Inner Neck Label & Care Tags',
      'High-Density Screen Print or 3D Puff Texture',
      'Individually Packaged in Biodegradable Polybags',
      'Sample Fit Review Included',
    ],
    turnaroundDays: 5,
    popular: true,
    featured: false,
    industryTags: ['Technology & Startups', 'Retail & E-commerce', 'Personal Brands'],
    urgency: 'Express (3-5d)',
    useCase: 'Corporate Gifting',
    options: [
      {
        id: 'garment_tier',
        name: 'Pack Size',
        type: 'tier',
        choices: [
          { label: 'Starter Pack (25 Pieces)', value: '25', priceMultiplier: 1.0, isDefault: true },
          { label: 'Team Pack (50 Pieces)', value: '50', priceMultiplier: 1.8 },
          { label: 'Scale Pack (100 Pieces)', value: '100', priceMultiplier: 3.3 },
        ],
      },
      {
        id: 'apparel_style',
        name: 'Garment Cut',
        type: 'material',
        choices: [
          { label: 'Classic Heavyweight Tees (280gsm)', value: 'tee', priceMultiplier: 1.0, isDefault: true },
          { label: 'Luxury Pullover Hoodies (420gsm)', value: 'hoodie', priceMultiplier: 1.6 },
        ],
      },
    ],
    relatedSlugs: ['custom-branded-tumbler', 'executive-onboarding-box'],
  },

  // 3. GIFTS
  {
    id: 'srv-gifts-01',
    slug: 'executive-onboarding-box',
    name: 'Executive VIP Client Onboarding Gift Box',
    category: 'gifts',
    shortDescription: 'Matte black magnetic box containing personalized tech swag, leather journal, and artisanal treats.',
    fullDescription: 'First impressions sealed in luxury. Each recipient box features precision laser-cut EVA foam fitment, a MagSafe wireless power bank, leatherette planner with debossed initials, ceramic coffee vessel, and a handwritten foil welcome card.',
    basePrices: {
      ng: 195000,
      us: 420,
      uk: 340,
      ca: 560,
    },
    discountPercentage: 12,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1200&q=80',
    ],
    inclusions: [
      'Rigid Magnetic Closure Presentation Box',
      'Custom Laser-Engraved 10,000mAh Power Bank',
      'Debossed A5 Hardcover Executive Notebook',
      'Matte Finish Metal Stylus Ballpoint Pen',
      'Foil-Stamped Personalized Welcome Letter',
      'Direct-to-Recipient Global Dropshipping Support',
    ],
    turnaroundDays: 4,
    popular: true,
    featured: true,
    industryTags: ['Corporate & Finance', 'Technology & Startups', 'Personal Brands'],
    urgency: 'Express (3-5d)',
    useCase: 'Corporate Gifting',
    options: [
      {
        id: 'box_quantity',
        name: 'Order Volume',
        type: 'tier',
        choices: [
          { label: '10 Executive Boxes', value: '10', priceMultiplier: 1.0, isDefault: true },
          { label: '25 Executive Boxes', value: '25', priceMultiplier: 2.2 },
          { label: '50 Executive Boxes', value: '50', priceMultiplier: 4.1 },
        ],
      },
    ],
    relatedSlugs: ['custom-branded-tumbler', 'luxury-foil-business-cards'],
  },
  {
    id: 'srv-gifts-02',
    slug: 'custom-branded-tumbler',
    name: 'Matte Double-Wall Insulated Smart Tumbler Set',
    category: 'gifts',
    shortDescription: '18/8 food-grade stainless steel with ceramic interior lining and precision fiber laser etching.',
    fullDescription: 'Keep drinks ice-cold for 24 hours or piping hot for 12 hours. Zero metallic aftertaste thanks to our true-taste ceramic inner coating. Finished in tactile scratch-resistant powder coat and branded with ultra-fine fiber laser engraving.',
    basePrices: {
      ng: 65000,
      us: 140,
      uk: 110,
      ca: 190,
    },
    images: [
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    ],
    inclusions: [
      'Double-Wall Vacuum Insulation (500ml)',
      'Ceramic Shield Interior Flavor Protector',
      'Laser-Etched Permanent Monogram or Logo',
      'Leak-Proof Magnetic Slider Sip Lid',
      'Individual Recyclable Gift Box per Unit',
    ],
    turnaroundDays: 3,
    popular: false,
    featured: false,
    industryTags: ['Technology & Startups', 'Retail & E-commerce', 'Hospitality & Events'],
    urgency: 'Priority (24-48h)',
    useCase: 'Corporate Gifting',
    options: [
      {
        id: 'tumbler_count',
        name: 'Pack Count',
        type: 'tier',
        choices: [
          { label: 'Pack of 12 Tumblers', value: '12', priceMultiplier: 1.0, isDefault: true },
          { label: 'Pack of 30 Tumblers', value: '30', priceMultiplier: 2.2 },
          { label: 'Pack of 60 Tumblers', value: '60', priceMultiplier: 4.0 },
        ],
      },
    ],
    relatedSlugs: ['executive-onboarding-box', 'custom-branded-apparel'],
  },

  // 4. STUDIO
  {
    id: 'srv-studio-01',
    slug: 'corporate-workspace-branding',
    name: 'Corporate Workspace & Architectural Wall Branding',
    category: 'studio',
    shortDescription: 'Dimensional 3D acrylic lettering, illuminated LED logos, and acoustic fabric murals.',
    fullDescription: 'Turn your physical headquarters into a branded experience center. We conduct on-site 3D spatial laser surveys, produce brushed metallic or edge-lit acrylic dimensional signs, and apply seamless wall coverings tuned to your company culture.',
    basePrices: {
      ng: 550000,
      us: 1400,
      uk: 1150,
      ca: 1850,
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    ],
    inclusions: [
      '3D Spatial Elevation & Wall CAD Schematics',
      'Cast Acrylic or Brushed Aluminum 3D Lettering',
      'Optional Low-Voltage Halo LED Backlighting',
      'Professional White-Glove Installation Crew',
      '2-Year Mechanical & Electrical Warranty',
    ],
    turnaroundDays: 8,
    popular: true,
    featured: true,
    industryTags: ['Corporate & Finance', 'Technology & Startups'],
    urgency: 'Standard (7-10d)',
    useCase: 'Workspace Transformation',
    options: [
      {
        id: 'signage_style',
        name: 'Fabrication Material',
        type: 'material',
        choices: [
          { label: 'Matte Dual-Layer Acrylic', value: 'acrylic', priceMultiplier: 1.0, isDefault: true },
          { label: 'Brushed Gold Aluminum', value: 'aluminum', priceMultiplier: 1.25 },
          { label: 'Halo LED Backlit Illuminated', value: 'halo_led', priceMultiplier: 1.65 },
        ],
      },
    ],
    relatedSlugs: ['logo-visual-identity-system', 'digital-brand-guidelines'],
  },
  {
    id: 'srv-studio-02',
    slug: 'expo-exhibition-pavilion',
    name: 'Modular Exhibition Booth & Trade Show Pavilion',
    category: 'studio',
    shortDescription: 'Custom modular aluminum exhibit structure with backlit graphics, reception counter, and AV mounts.',
    fullDescription: 'Dominate the exhibition floor with architectural presence. Reconfigurable aluminum hardware, high-power LED lightboxes, built-in lockable storage counters, and integrated TV/monitor brackets built to withstand international freight.',
    basePrices: {
      ng: 950000,
      us: 2400,
      uk: 1950,
      ca: 3200,
    },
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    ],
    inclusions: [
      'Tool-Less Modular Aluminum System Hardware',
      'Full-Height Silicon Edge Fabric (SEG) Graphics',
      'Branded Lockable Reception Greeting Pod',
      'Universal VESA Display Mounts up to 65"',
      'Heavy-Duty Flight Cases on Casters',
    ],
    turnaroundDays: 10,
    popular: false,
    featured: false,
    industryTags: ['Hospitality & Events', 'Technology & Startups', 'Corporate & Finance'],
    urgency: 'Standard (7-10d)',
    useCase: 'Marketing Campaign',
    options: [
      {
        id: 'booth_footprint',
        name: 'Booth Footprint',
        type: 'size',
        choices: [
          { label: '10ft x 10ft Corner Pavilion', value: '10x10', priceMultiplier: 1.0, isDefault: true },
          { label: '20ft x 10ft Island Pavilion', value: '20x10', priceMultiplier: 1.85 },
        ],
      },
    ],
    relatedSlugs: ['event-fabric-backdrop', 'luxury-foil-business-cards'],
  },

  // 5. DIGITAL
  {
    id: 'srv-digital-01',
    slug: 'custom-web-platform',
    name: 'High-Conversion Web & Digital Commerce Platform',
    category: 'digital',
    shortDescription: 'Next.js App Router engineering, Tailwind styling, headless CMS, and sub-second performance.',
    fullDescription: 'We build high-performance web experiences that translate brand equity into enterprise conversions. Engineered with Next.js Server Components, localized multi-region support, WCAG 2.1 AA accessibility, and automated CI/CD deployment pipelines.',
    basePrices: {
      ng: 650000,
      us: 1600,
      uk: 1300,
      ca: 2150,
    },
    discountPercentage: 10,
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    ],
    inclusions: [
      'Production Next.js App Router & TypeScript Codebase',
      'Sub-Second Core Web Vitals (LCP < 1.2s, INP < 100ms)',
      'Multi-Market Currency & Subfolder Routing Ready',
      'Structured Headless CMS Integration',
      'Full GitHub Repository Ownership & CI/CD Setup',
      '30-Day Post-Launch Hypercare Support',
    ],
    turnaroundDays: 7,
    popular: true,
    featured: true,
    industryTags: ['Technology & Startups', 'Retail & E-commerce', 'Corporate & Finance'],
    urgency: 'Express (3-5d)',
    useCase: 'Brand Launch',
    options: [
      {
        id: 'build_scale',
        name: 'Deployment Scope',
        type: 'tier',
        choices: [
          { label: 'Marketing Platform (Up to 6 Pages)', value: 'marketing', priceMultiplier: 1.0, isDefault: true },
          { label: 'Ecosystem & Catalog (Up to 15 Pages + Filters)', value: 'catalog', priceMultiplier: 1.6 },
          { label: 'Custom Enterprise Portal & User Dashboard', value: 'enterprise', priceMultiplier: 2.4 },
        ],
      },
    ],
    relatedSlugs: ['logo-visual-identity-system', 'digital-brand-guidelines'],
  },
  {
    id: 'srv-digital-02',
    slug: 'digital-brand-guidelines',
    name: 'Interactive Brand Portal & Design Token System',
    category: 'digital',
    shortDescription: 'Living design system documentation, downloadable assets, and OKLCH color palettes.',
    fullDescription: 'Say goodbye to static 80-page PDFs that get outdated in a week. We deploy a private, searchable web portal containing your live CSS/Tailwind design tokens, logo asset downloads in every format, copy voice guidelines, and partner badges.',
    basePrices: {
      ng: 220000,
      us: 520,
      uk: 420,
      ca: 710,
    },
    images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    ],
    inclusions: [
      'Password-Protected Living Brand Portal Web URL',
      'Exportable Tailwind CSS & Figma Design Tokens',
      'Self-Service Press Kit & Vector Logo Repository',
      'Editorial Voice, Tone & Messaging Matrix',
      'Subdomain Setup (brand.yourcompany.com)',
    ],
    turnaroundDays: 4,
    popular: false,
    featured: false,
    industryTags: ['Technology & Startups', 'Corporate & Finance'],
    urgency: 'Express (3-5d)',
    useCase: 'Brand Launch',
    options: [
      {
        id: 'portal_hosting',
        name: 'Hosting & Deployment',
        type: 'material',
        choices: [
          { label: 'Cloud Hosted (Includes 1yr SSL & Updates)', value: 'hosted', priceMultiplier: 1.0, isDefault: true },
          { label: 'Self-Hosted Git Repository Export', value: 'self_hosted', priceMultiplier: 0.9 },
        ],
      },
    ],
    relatedSlugs: ['custom-web-platform', 'logo-visual-identity-system'],
  },
];

// Helper functions for catalog queries
export function getAllServices(): Service[] {
  return SERVICES;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  return SERVICES.filter((s) => s.category === category);
}

export function getRelatedServices(service: Service): Service[] {
  return SERVICES.filter((s) => service.relatedSlugs.includes(s.slug));
}

// Server-side filter & search processor (Pure function, Ponytail lean)
export function filterServices(
  services: Service[],
  filters: {
    category?: string;
    search?: string;
    industry?: string;
    urgency?: string;
    useCase?: string;
    sortBy?: string;
  }
): Service[] {
  let result = [...services];

  if (filters.category && filters.category !== 'all') {
    result = result.filter((s) => s.category.toLowerCase() === filters.category?.toLowerCase());
  }

  if (filters.search && filters.search.trim() !== '') {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.industryTags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (filters.industry && filters.industry !== 'all') {
    result = result.filter((s) => s.industryTags.includes(filters.industry!));
  }

  if (filters.urgency && filters.urgency !== 'all') {
    result = result.filter((s) => s.urgency.toLowerCase().includes(filters.urgency!.toLowerCase()));
  }

  if (filters.useCase && filters.useCase !== 'all') {
    result = result.filter((s) => s.useCase.toLowerCase() === filters.useCase?.toLowerCase());
  }

  if (filters.sortBy) {
    if (filters.sortBy === 'popularity') {
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    } else if (filters.sortBy === 'turnaround') {
      result.sort((a, b) => a.turnaroundDays - b.turnaroundDays);
    }
  }

  return result;
}

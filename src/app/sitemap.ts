import type { MetadataRoute } from 'next';
import { SITE_URL, SUPPORTED_MARKETS, alternates } from '@/lib/markets';
import { CATEGORIES, SERVICES } from '@/lib/services-data';

// Every path exists in every market; each entry lists its hreflang siblings.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/services', ...Object.keys(CATEGORIES).map((c) => `/services?category=${c}`), ...SERVICES.map((s) => `/services/${s.slug}`)];

  return SUPPORTED_MARKETS.flatMap((code) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${code}${path}`,
      alternates: {
        languages: Object.fromEntries(Object.entries(alternates(path)).map(([lang, href]) => [lang, SITE_URL + href])),
      },
    })),
  );
}

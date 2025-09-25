import type { MetadataRoute } from 'next';
import { legacyRuas, legacyHistorias } from '@/data/legacyData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://historin.com';

  // Static routes known in app directory
  const staticRoutes = [
    '',
    '/sobre',
    '/referencias',
    '/ruasehistorias',
    '/legado-africano',
    '/adicionar-historia',
    '/quiz',
    '/streets',
  ];

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1.0 : 0.7,
  }));

  // Dynamic ruas
  const ruaEntries: MetadataRoute.Sitemap = (legacyRuas || []).map((rua) => ({
    url: `${baseUrl}/rua/${rua.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic historias
  const historiaEntries: MetadataRoute.Sitemap = (legacyHistorias || []).map((h) => ({
    url: `${baseUrl}/rua/${h.rua_id}/historia/${h.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...ruaEntries, ...historiaEntries];
}

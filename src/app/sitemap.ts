import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

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

  // Create Supabase client for server-side data fetching
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch dynamic ruas from Supabase
  const { data: ruas } = await supabase
    .from('streets')
    .select('id');

  const ruaEntries: MetadataRoute.Sitemap = (ruas || []).map((rua) => ({
    url: `${baseUrl}/rua/${rua.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Fetch dynamic historias from Supabase
  const { data: historias } = await supabase
    .from('stories')
    .select('id, rua_id');

  const historiaEntries: MetadataRoute.Sitemap = (historias || []).map((h) => ({
    url: `${baseUrl}/rua/${h.rua_id}/historia/${h.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...ruaEntries, ...historiaEntries];
}

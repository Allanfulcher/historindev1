import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser Supabase client (use for non-sensitive, client-side operations).
 * Prefer calling our API routes for writes so that RLS and validation remain enforced server-side.
 */
export const supabaseBrowser = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

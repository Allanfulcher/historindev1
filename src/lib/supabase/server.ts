import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * Server-only Supabase client.
 * - Uses Service Role key if available (server-side only) for trusted operations.
 * - Falls back to anon key for environments where service role isn't configured.
 * - Cookies set/remove are no-ops in route handlers to avoid runtime errors.
 */
export function getSupabaseServerClient<TDatabase = any>(): SupabaseClient<TDatabase> {
  const cookieStore = cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !(serviceRoleKey || anonKey)) {
    throw new Error(
      'Missing Supabase environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set. For secure server operations, also set SUPABASE_SERVICE_ROLE_KEY.'
    );
  }

  return createServerClient<TDatabase>(
    supabaseUrl,
    (serviceRoleKey || anonKey) as string,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(_name: string, _value: string, _options: CookieOptions) {
          // noop for route handlers (avoid read-only headers error)
        },
        remove(_name: string, _options: CookieOptions) {
          // noop for route handlers (avoid read-only headers error)
        },
      },
    }
  );
}

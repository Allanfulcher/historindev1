import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * Server-only Supabase client.
 * - Uses Service Role key if available (server-side only) for trusted operations.
 * - Falls back to anon key for environments where service role isn't configured.
 * - Cookies set/remove are no-ops in route handlers to avoid runtime errors.
 */
export async function getSupabaseServerClient<TDatabase = any>(): Promise<SupabaseClient<TDatabase>> {
  // Next.js route handlers require awaiting cookies()
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  // Detailed logging for debugging (server-side)
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasServiceRole = !!serviceRoleKey;
  const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!hasUrl || (!hasServiceRole && !hasAnonKey)) {
    console.group('🔧 Supabase Server Client Configuration');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', hasUrl ? '✅ Configured' : '❌ Missing (using placeholder)');
    console.log('SUPABASE_SERVICE_ROLE_KEY:', hasServiceRole ? '✅ Configured' : '⚠️ Not set (using anon key)');
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', hasAnonKey ? '✅ Configured' : '❌ Missing (using placeholder)');
    console.warn('⚠️ Supabase not fully configured. Database features will not work.');
    console.log('📖 See DEPLOYMENT.md for setup instructions');
    console.groupEnd();
  }

  return createServerClient<TDatabase>(
    supabaseUrl,
    (serviceRoleKey || anonKey) as string,
    {
      cookies: {
        async get(name: string) {
          return cookieStore.get(name)?.value;
        },
        async set(_name: string, _value: string, _options: CookieOptions) {
          // noop for route handlers (avoid read-only headers error)
        },
        async remove(_name: string, _options: CookieOptions) {
          // noop for route handlers (avoid read-only headers error)
        },
      },
    }
  );
}

export function getSupabaseServiceRoleClient<TDatabase = any>(): SupabaseClient<TDatabase> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  }

  return createClient<TDatabase>(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

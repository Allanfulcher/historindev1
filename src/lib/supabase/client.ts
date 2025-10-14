import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser Supabase client (use for non-sensitive, client-side operations).
 * Prefer calling our API routes for writes so that RLS and validation remain enforced server-side.
 */

// Fallback values for build-time when env vars are missing
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Detailed logging for debugging (browser only)
if (typeof window !== 'undefined') {
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.group('🔧 Supabase Browser Client Configuration');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', hasUrl ? '✅ Configured' : '❌ Missing (using placeholder)');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', hasKey ? '✅ Configured' : '❌ Missing (using placeholder)');
  
  if (!hasUrl || !hasKey) {
    console.warn('⚠️ Supabase not fully configured. Database features will not work.');
    console.log('📖 See DEPLOYMENT.md for setup instructions');
  } else {
    console.log('✅ Supabase client initialized successfully');
  }
  console.groupEnd();
}

export const supabaseBrowser = createBrowserClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

// Centralized JSON helpers
export function jsonOk(body: any, init?: ResponseInit) {
  return NextResponse.json(body, init);
}
export function jsonBadRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}
export function jsonUnauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
export function jsonServerError(message: string) {
  return NextResponse.json({ error: message }, { status: 500 });
}

// Simple admin auth using a shared env token
export function requireAdmin(req: NextRequest): NextResponse | null {
  const token = req.headers.get('x-admin-token') || req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) return jsonUnauthorized();
  return null;
}

// Shared Supabase server client (awaited)
export async function adminSupabase() {
  return await getSupabaseServerClient();
}

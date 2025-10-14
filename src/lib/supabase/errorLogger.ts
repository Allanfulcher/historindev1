/**
 * Enhanced error logging for Supabase operations
 * Helps debug configuration and runtime issues
 */

export function logSupabaseError(operation: string, error: any, context?: Record<string, any>) {
  console.group(`❌ Supabase Error: ${operation}`);
  console.error('Error:', error);
  
  if (error?.message) {
    console.error('Message:', error.message);
  }
  
  if (error?.code) {
    console.error('Code:', error.code);
  }
  
  if (error?.details) {
    console.error('Details:', error.details);
  }
  
  if (error?.hint) {
    console.log('Hint:', error.hint);
  }
  
  if (context) {
    console.log('Context:', context);
  }
  
  // Common error hints
  if (error?.message?.includes('Failed to fetch') || error?.message?.includes('NetworkError')) {
    console.warn('💡 This might be a network issue or CORS problem');
    console.log('Check: 1) Internet connection, 2) Supabase URL is correct, 3) CORS settings');
  }
  
  if (error?.message?.includes('Invalid API key') || error?.message?.includes('JWT')) {
    console.warn('💡 This looks like an authentication issue');
    console.log('Check: 1) SUPABASE_ANON_KEY is correct, 2) Key hasn\'t expired');
  }
  
  if (error?.message?.includes('relation') && error?.message?.includes('does not exist')) {
    console.warn('💡 Database table doesn\'t exist');
    console.log('Check: 1) Run database migrations, 2) Table name is correct');
  }
  
  if (error?.code === 'PGRST116') {
    console.warn('💡 Row Level Security (RLS) might be blocking this operation');
    console.log('Check: 1) RLS policies in Supabase, 2) User permissions');
  }
  
  console.groupEnd();
}

export function logSupabaseSuccess(operation: string, data?: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`✅ Supabase: ${operation}`, data ? `(${Array.isArray(data) ? data.length : 1} records)` : '');
  }
}

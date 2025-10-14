'use client';

import { useState, useEffect } from 'react';

/**
 * Debug panel to show Supabase configuration status
 * Only shows in development mode
 * Add to your page with: <SupabaseDebugPanel />
 */
export default function SupabaseDebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    hasUrl: false,
    hasAnonKey: false,
    url: '',
  });

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not configured';

    setConfig({ hasUrl, hasAnonKey, url });
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        title="Toggle Supabase Debug Panel"
      >
        🔧 Debug
      </button>

      {/* Debug panel */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-50 bg-white border-2 border-gray-300 rounded-lg shadow-2xl p-4 w-96 max-h-96 overflow-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">🔧 Supabase Config</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className={config.hasUrl ? 'text-green-600' : 'text-red-600'}>
                {config.hasUrl ? '✅' : '❌'}
              </span>
              <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL</span>
            </div>
            {config.hasUrl && (
              <div className="ml-6 text-xs text-gray-600 break-all">
                {config.url}
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className={config.hasAnonKey ? 'text-green-600' : 'text-red-600'}>
                {config.hasAnonKey ? '✅' : '❌'}
              </span>
              <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
            </div>
            {config.hasAnonKey && (
              <div className="ml-6 text-xs text-gray-600">
                Configured (hidden for security)
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-600">
                <strong>Status:</strong>{' '}
                {config.hasUrl && config.hasAnonKey ? (
                  <span className="text-green-600 font-medium">✅ Fully Configured</span>
                ) : (
                  <span className="text-red-600 font-medium">❌ Not Configured</span>
                )}
              </div>
              
              {(!config.hasUrl || !config.hasAnonKey) && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                  <strong>⚠️ Setup Required:</strong>
                  <ol className="mt-1 ml-4 list-decimal space-y-1">
                    <li>Copy <code className="bg-gray-100 px-1">.env.example</code> to <code className="bg-gray-100 px-1">.env</code></li>
                    <li>Add your Supabase credentials</li>
                    <li>Restart dev server</li>
                  </ol>
                  <div className="mt-2">
                    See <code className="bg-gray-100 px-1">DEPLOYMENT.md</code> for details
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => {
                  console.clear();
                  console.log('🔧 Supabase Configuration Check:');
                  console.log('NEXT_PUBLIC_SUPABASE_URL:', config.hasUrl ? '✅ Set' : '❌ Missing');
                  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', config.hasAnonKey ? '✅ Set' : '❌ Missing');
                  if (config.hasUrl) {
                    console.log('URL:', config.url);
                  }
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-xs font-medium transition-colors"
              >
                📋 Log to Console
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

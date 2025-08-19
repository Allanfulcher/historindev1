'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const HashRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isProcessingHash, setIsProcessingHash] = useState(false);

  useEffect(() => {
    const handleHashRoute = () => {
      const hash = window.location.hash;
      
      if (hash) {
        setIsProcessingHash(true);
        
        // Remove the # from the beginning
        const route = hash.substring(1);
        
        // Check if it matches our rua/historia pattern
        const ruaHistoriaMatch = route.match(/^\/rua\/(\d+)\/historia\/(\d+)$/);
        
        if (ruaHistoriaMatch) {
          const [, ruaId, historiaId] = ruaHistoriaMatch;
          const nextjsRoute = `/rua/${ruaId}/historia/${historiaId}`;
          
          // Replace the current URL with the Next.js route
          router.replace(nextjsRoute);
          return;
        }
        
        // Check if it matches simple rua pattern
        const ruaMatch = route.match(/^\/rua\/(\d+)$/);
        
        if (ruaMatch) {
          const [, ruaId] = ruaMatch;
          const nextjsRoute = `/rua/${ruaId}/historia/1`; // Default to first historia
          
          router.replace(nextjsRoute);
          return;
        }
        
        // If no pattern matches, redirect to home
        if (route !== '/') {
          router.replace('/');
        }
        
        setIsProcessingHash(false);
      }
    };

    // Check for hash on initial load
    const initialHash = window.location.hash;
    if (initialHash && pathname === '/') {
      handleHashRoute();
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashRoute);

    return () => {
      window.removeEventListener('hashchange', handleHashRoute);
    };
  }, [router, pathname]);

  // Show loading overlay if we're processing a hash route and on home page
  if (isProcessingHash && pathname === '/') {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default HashRouter;

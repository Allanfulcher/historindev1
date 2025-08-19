'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HashRouter = () => {
  const router = useRouter();

  useEffect(() => {
    const handleHashRoute = () => {
      const hash = window.location.hash;
      
      if (hash) {
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
      }
    };

    // Handle initial load
    handleHashRoute();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashRoute);

    return () => {
      window.removeEventListener('hashchange', handleHashRoute);
    };
  }, [router]);

  return null; // This component doesn't render anything
};

export default HashRouter;

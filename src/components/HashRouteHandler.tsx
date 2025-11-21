'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { trackHashRoute, trackUTMParameters } from '../lib/gtag';

interface HashRouteHandlerProps {
  children: React.ReactNode;
}

const HashRouteHandler: React.FC<HashRouteHandlerProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [shouldRenderContent, setShouldRenderContent] = useState(false);

  useEffect(() => {
    const checkAndHandleHash = () => {
      const hash = window.location.hash;
      
      // Track UTM parameters on initial load
      if (isInitialLoad) {
        trackUTMParameters();
      }
      
      if (hash && pathname === '/') {
        // We have a hash route on the home page, handle it
        const route = hash.substring(1);
        
        // Track the hash route
        trackHashRoute(route);
        
        // Capture UTM parameters from URL before redirect
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');
        const utmMedium = urlParams.get('utm_medium');
        const utmCampaign = urlParams.get('utm_campaign');
        
        // Debug logging
        if (utmMedium === 'qr') {
          console.log('🎯 QR Code detected in HashRouteHandler:', {
            utmSource,
            utmMedium,
            utmCampaign,
            hash,
            route
          });
        }
        
        // Build query string with UTM parameters
        const buildQueryString = () => {
          const params = new URLSearchParams();
          if (utmSource) params.set('utm_source', utmSource);
          if (utmMedium) params.set('utm_medium', utmMedium);
          if (utmCampaign) params.set('utm_campaign', utmCampaign);
          return params.toString() ? `?${params.toString()}` : '';
        };
        
        // Check if it matches our rua/historia pattern
        const ruaHistoriaMatch = route.match(/^\/rua\/(\d+)\/historia\/(\d+)$/);
        
        if (ruaHistoriaMatch) {
          const [, ruaId, historiaId] = ruaHistoriaMatch;
          const nextjsRoute = `/rua/${ruaId}/historia/${historiaId}${buildQueryString()}`;
          router.replace(nextjsRoute);
          return; // Don't render content, we're redirecting
        }
        
        // Check if it matches simple rua pattern
        const ruaMatch = route.match(/^\/rua\/(\d+)$/);
        
        if (ruaMatch) {
          const [, ruaId] = ruaMatch;
          const nextjsRoute = `/rua/${ruaId}${buildQueryString()}`;
          router.replace(nextjsRoute);
          return; // Don't render content, we're redirecting
        }
      }
      
      // No hash route to handle, render normally
      setShouldRenderContent(true);
      setIsInitialLoad(false);
    };

    if (isInitialLoad) {
      // Small delay to prevent flash
      const timer = setTimeout(checkAndHandleHash, 10);
      return () => clearTimeout(timer);
    }
  }, [router, pathname, isInitialLoad]);

  // Show loading screen during initial hash processing
  if (isInitialLoad || (!shouldRenderContent && pathname === '/')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default HashRouteHandler;

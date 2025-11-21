'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function RuaPage() {
  const params = useParams();
  const router = useRouter();
  const ruaId = Array.isArray(params?.ruaId) ? params.ruaId[0] : params?.ruaId;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!ruaId) return;

    async function findFirstHistoria() {
      try {
        // Capture UTM parameters from URL before redirect
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');
        const utmMedium = urlParams.get('utm_medium');
        const utmCampaign = urlParams.get('utm_campaign');
        
        // Debug logging
        if (utmMedium === 'qr') {
          console.log('🎯 QR Code detected in RuaPage:', {
            utmSource,
            utmMedium,
            utmCampaign,
            ruaId
          });
        }

        // Find the first historia for this rua from Supabase
        const { data, error } = await supabaseBrowser
          .from('stories')
          .select('id')
          .eq('rua_id', ruaId)
          .order('ano', { ascending: true })
          .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
          // Build redirect URL with preserved UTM parameters
          const firstHistoria = data[0];
          let redirectUrl = `/rua/${ruaId}/historia/${firstHistoria.id}`;
          
          // Preserve UTM parameters in the redirect
          const redirectParams = new URLSearchParams();
          if (utmSource) redirectParams.set('utm_source', utmSource);
          if (utmMedium) redirectParams.set('utm_medium', utmMedium);
          if (utmCampaign) redirectParams.set('utm_campaign', utmCampaign);
          
          if (redirectParams.toString()) {
            redirectUrl += `?${redirectParams.toString()}`;
          }
          
          router.replace(redirectUrl);
        } else {
          // No historias found for this rua, redirect to home
          router.replace('/');
        }
      } catch (error) {
        console.error('Error fetching historia:', error);
        router.replace('/');
      } finally {
        setIsLoading(false);
      }
    }

    findFirstHistoria();
  }, [ruaId, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
        <p className="text-[#6B5B4F]">Redirecionando...</p>
      </div>
    </div>
  );
}

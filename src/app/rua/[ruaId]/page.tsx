'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { legacyDb } from '../../../utils/legacyDb';
import { legacyHistorias, legacyRuas, legacyCidades } from '../../../data/legacyData';

export default function RuaPage() {
  const params = useParams();
  const router = useRouter();
  const ruaId = Array.isArray(params?.ruaId) ? params.ruaId[0] : params?.ruaId;

  useEffect(() => {
    if (!ruaId) return;

    // Initialize database
    legacyDb.loadData({
      historias: legacyHistorias,
      ruas: legacyRuas,
      cidades: legacyCidades
    });

    // Find the first historia for this rua
    const historiasForRua = legacyDb.getHistorias().filter(historia => 
      historia.rua_id?.toString() === ruaId
    );

    if (historiasForRua.length > 0) {
      // Redirect to the first historia for this rua
      const firstHistoria = historiasForRua[0];
      router.replace(`/rua/${ruaId}/historia/${firstHistoria.id}`);
    } else {
      // No historias found for this rua, redirect to home or show error
      router.replace('/');
    }
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

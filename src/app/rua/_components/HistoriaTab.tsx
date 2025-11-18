import React, { useEffect, useMemo, useState } from 'react';
import type { Historia, Rua, Cidade } from '../../../types';
import HistoriaCard from './HistoriaCard';
import AdCard, { AdBusiness } from '../../../components/cards/AdCard';
import type { Ad } from '@/types';

interface HistoriaTabProps {
  historias: Historia[];
  rua?: Rua | null;
  cidade?: Cidade | null;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  isReady?: boolean;
}

const HistoriaTab: React.FC<HistoriaTabProps> = ({ 
  historias, 
  rua, 
  cidade, 
  sortOrder, 
  setSortOrder,
  isReady = true
}) => {
  // --- Load ad from API ---
  const [ad, setAd] = useState<Ad | null>(null);
  const [adLoading, setAdLoading] = useState(false);
  const [adError, setAdError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchAd() {
      setAdLoading(true);
      setAdError(null);
      try {
        const qs = rua?.id ? `?ruaId=${encodeURIComponent(String(rua.id))}` : '';
        const res = await fetch(`/api/ads${qs}`, { cache: 'no-store' });
        if (!res.ok) {
          console.warn('Ad API not available:', res.status);
          if (!cancelled) setAd(null);
          return;
        }
        const json = await res.json();
        // If API returns null (table doesn't exist), silently skip
        if (!cancelled) setAd(json.data || null);
      } catch (e: any) {
        // Silently fail if ads feature not available
        console.warn('Ads feature not available:', e?.message);
        if (!cancelled) setAd(null);
      } finally {
        if (!cancelled) setAdLoading(false);
      }
    }
    fetchAd();
    return () => { cancelled = true; };
  }, [rua?.id]);

  // Determine match index using ad.match_keywords (if provided)
  const matchIndex = useMemo(() => {
    if (!ad || !ad.match_keywords || ad.match_keywords.length === 0) return -1;
    const kws = ad.match_keywords.map((s) => (s || '').toLowerCase()).filter(Boolean);
    if (kws.length === 0) return -1;
    return historias.findIndex((h) => {
      const t = (h.titulo || '').toLowerCase();
      const d = (h.descricao || '').toLowerCase();
      return kws.some((k) => t.includes(k) || d.includes(k));
    });
  }, [ad, historias]);

  const shouldShowTopAd = useMemo(() => {
    if (!ad) return false;
    if (ad.placement === 'top') return true;
    return matchIndex === -1;
  }, [ad, matchIndex]);

  const selectedBusiness: AdBusiness | null = useMemo(() => {
    if (!ad) return null;
    return {
      id: ad.id,
      name: ad.title,
      description: ad.description,
      image: ad.image_url,
      link: ad.link_url,
      tag: ad.tag || 'Patrocinado',
    };
  }, [ad]);

  return (
    <>
      {/* Feed Header and Controls */}
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs sm:text-sm text-[#A0958A] font-medium pt-1.5">
          {(rua?.nome || cidade?.nome) && (
            <span className="inline-flex items-center">
              {rua?.nome && cidade?.nome && (
                <span className="mr-2 text-[#D6C7B6]"></span>
              )}
              {cidade?.nome && (
                <span className="inline-flex items-center">
                  <i className="fas fa-map-marker-alt mr-2 text-[#CD853F]"></i>
                  <span>{cidade.nome}</span>
                </span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Prominent Rua Title */}
      {rua?.nome && (
        <div className="mb-3 lg:px-6 xl:px-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-normal px-5 text-[#4A3F35]">
            {rua.nome}
          </h1>
        </div>
      )}
      <div className="h-px bg-[#EADCCD] mb-5 lg:mx-6 xl:mx-8"></div>

      {/* Historia Feed */}
      <div className="flex flex-col gap-8 bg-[#f4ede0]">
        {/* Top Ad when no matching historia exists */}
        {shouldShowTopAd && selectedBusiness && (
          <div className="px-0 sm:px-0 lg:px-6 xl:px-8">
            <div className="max-w-md mx-auto w-full">
              <AdCard business={selectedBusiness} />
            </div>
          </div>
        )}

        {historias.length > 0 && (
          historias.map((historia, idx) => (
            <React.Fragment key={historia.id}>
              <div
                id={`historia-${historia.id}`}
                className="scroll-mt-24"
              >
                <HistoriaCard historia={historia} />
              </div>

              {/* Insert Ad right after the first matching historia */}
              {selectedBusiness && matchIndex !== -1 && idx === matchIndex && (
                <div className="px-0 sm:px-0 lg:px-6 xl:px-8">
                  <div className="max-w-md mx-auto w-full">
                    <AdCard business={selectedBusiness} />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))
        )}
        {isReady && historias.length === 0 && (
          <div className="text-center py-8 text-[#6B5B4F]">Nenhuma história para esta rua.</div>
        )}
      </div>
    </>
  );
};

export default HistoriaTab;

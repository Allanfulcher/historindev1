'use client';

import React from 'react';
import { Historia } from '../../types';

interface RecomendedHistoriasProps {
  historias: Historia[];
}

const RecomendedHistorias: React.FC<RecomendedHistoriasProps> = ({ historias }) => {
  // Safely get a string URL from Historia.fotos (string[] | FotoWithCredit[])
  const getHistoriaImage = (h: Historia): string | null => {
    const fotos = h.fotos;
    if (!fotos || fotos.length === 0) return null;
    const first = fotos[0] as unknown;
    if (typeof first === 'string') return first;
    if (first && typeof first === 'object' && 'url' in (first as any) && typeof (first as any).url === 'string') {
      return (first as any).url as string;
    }
    return null;
  };

  const parseYear = (ano?: string): number | null => {
    if (!ano) return null;
    const match = ano.match(/\d{4}/);
    if (!match) return null;
    const year = parseInt(match[0], 10);
    return Number.isFinite(year) ? year : null;
  };

  // Filter historias from 1990 onwards
  const recentHistorias = historias
    .filter((h) => {
      const y = parseYear(h.ano);
      return y !== null && y >= 1990;
    })
    .slice();

  // Shuffle shallow copy for variety
  for (let i = recentHistorias.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [recentHistorias[i], recentHistorias[j]] = [recentHistorias[j], recentHistorias[i]];
  }

  const selected = recentHistorias.slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {selected.map((h) => {
        const imageSource = getHistoriaImage(h);
        return (
          <div
            key={h.id}
            className="bg-[#FEFCF8] rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 border border-[#F5F1EB] hover:border-[#E6D3B4]"
            onClick={() => {
              const target = `/rua/${String(h.rua_id)}`;
              if (typeof window !== 'undefined') window.location.href = target;
            }}
          >
            {typeof imageSource === 'string' ? (
              <img
                src={imageSource}
                alt={h.titulo}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-[#F5F1EB] flex items-center justify-center text-[#A09082] text-sm">
                Sem imagem
              </div>
            )}
            <div className="p-5">
              <h3 className="font-semibold text-[#4A3F35] text-lg mb-1">{h.titulo}</h3>
              <p className="text-xs text-[#6B5B4F] mb-2">{parseYear(h.ano) ?? ''}</p>
              <p className="text-sm text-[#6B5B4F] line-clamp-3">{h.descricao}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecomendedHistorias;

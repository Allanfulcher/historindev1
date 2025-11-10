'use client';

import React from 'react';
import { Rua, Historia } from '../../types';

interface RecomendedStreetsProps {
  ruas: Rua[];
  historias: Historia[];
  handleRuaClick: (rua: Rua) => void;
}

const RecomendedStreets = ({ ruas, historias, handleRuaClick }: RecomendedStreetsProps) => {
  // Function to get a random photo from histories related to a street
  const getRandomHistoryPhoto = (ruaId: string | number): string | null => {
    const relatedHistorias = historias.filter(historia => historia.rua_id === String(ruaId));
    
    if (relatedHistorias.length === 0) return null;
    
    // Get random historia
    const randomHistoria = relatedHistorias[Math.floor(Math.random() * relatedHistorias.length)];
    
    if (!randomHistoria.fotos || randomHistoria.fotos.length === 0) return null;
    
    // Photos are already normalized to string array format by legacy system
    const fotos = randomHistoria.fotos;
    const chosen = (fotos as Array<string | { url?: string }>)[Math.floor(Math.random() * fotos.length)];
    if (typeof chosen === 'string') return chosen;
    if (chosen && typeof chosen === 'object' && typeof chosen.url === 'string') return chosen.url;
    return null;
  };

  // Safely extract a single string URL from various possible foto formats (string | string[] | object)
  const getFirstRuaPhoto = (fotos: unknown): string | null => {
    if (!fotos) return null;
    if (typeof fotos === 'string') return fotos;
    if (Array.isArray(fotos)) {
      // pick the first string-like entry
      const first = fotos.find((f) => typeof f === 'string');
      return typeof first === 'string' ? first : null;
    }
    if (typeof fotos === 'object') {
      // try common fields
      const anyFotos = fotos as Record<string, unknown>;
      const candidates = [anyFotos.url, anyFotos.src, (anyFotos as any)[0]] as unknown[];
      const first = candidates.find((c) => typeof c === 'string');
      return typeof first === 'string' ? (first as string) : null;
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {ruas.slice(0, 4).map((rua) => {
        const historyPhoto = getRandomHistoryPhoto(rua.id);
        const imageSource = historyPhoto || getFirstRuaPhoto((rua as any).fotos);
        
        return (
          <div
            key={rua.id}
            className="group bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden cursor-pointer hover:shadow-xl hover:ring-1 hover:ring-[#8B4513]/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => handleRuaClick(rua)}
          >
          <div className="relative overflow-hidden h-48">
            {typeof imageSource === 'string' ? (
              <img
                src={imageSource}
                alt={rua.nome}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-[#F5F1EB] flex items-center justify-center text-[#A09082] text-sm">
                Sem imagem
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-[#4A3F35] text-lg mb-2 group-hover:text-[#8B4513] transition-colors">{rua.nome}</h3>
            <p className="text-sm text-[#6B5B4F] line-clamp-3">{rua.descricao}</p>
          </div>
        </div>
      );
    })}
  </div>
  );
};

export default RecomendedStreets;

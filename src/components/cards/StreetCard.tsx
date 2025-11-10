'use client';

import React from 'react';
import { Rua } from '../../types';

const StreetCard = ({ ruas, handleRuaClick }: { ruas: Rua[]; handleRuaClick: (rua: Rua) => void }) => {
return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {ruas.map((rua) => (
      <div
        key={rua.id}
        className="group bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden cursor-pointer hover:shadow-xl hover:ring-1 hover:ring-[#8B4513]/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        onClick={() => handleRuaClick(rua)}
      >
        <div className="relative overflow-hidden h-48">
          <img
            src={
              Array.isArray(rua.fotos)
                ? (rua.fotos[0] || 'https://placehold.co/600x400?text=Sem+foto')
                : (rua.fotos as unknown as string) || 'https://placehold.co/600x400?text=Sem+foto'
            }
            alt={rua.nome}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-[#4A3F35] text-lg mb-2 group-hover:text-[#8B4513] transition-colors">{rua.nome}</h3>
          <p className="text-sm text-[#6B5B4F] line-clamp-3">{rua.descricao}</p>
        </div>
      </div>
    ))}
  </div>
) 
} 
export default StreetCard;
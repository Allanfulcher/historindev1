'use client';

import React from 'react';
import { Rua } from '../../types';

const StreetCard = ({ ruas, handleRuaClick }: { ruas: Rua[]; handleRuaClick: (rua: Rua) => void }) => {
return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {ruas.slice(0, 3).map((rua) => (
      <div
        key={rua.id}
        className="bg-[#FEFCF8] rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 border border-[#F5F1EB] hover:border-[#E6D3B4]"
        onClick={() => handleRuaClick(rua)}
      >
        <img
          src={rua.fotos}
          alt={rua.nome}
          className="w-full h-48 object-cover"
        />
        <div className="p-5">
          <h3 className="font-semibold text-[#4A3F35] text-lg mb-2">{rua.nome}</h3>
          <p className="text-sm text-[#6B5B4F] line-clamp-3">{rua.descricao}</p>
        </div>
      </div>
    ))}
  </div>
) 
} 
export default StreetCard;
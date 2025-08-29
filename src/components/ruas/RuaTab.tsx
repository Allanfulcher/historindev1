import React from 'react';
import type { Rua, Cidade } from '../../types';

interface RuaTabProps {
  rua: Rua;
  cidade?: Cidade | null;
}

const RuaTab: React.FC<RuaTabProps> = ({ rua, cidade }) => {
  return (
    <div className="mb-6 p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb line */}
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs sm:text-sm text-[#A0958A] font-medium pt-1.5">
          {(rua?.nome || cidade?.nome) && (
            <span className="inline-flex items-center">
              {rua?.nome && cidade?.nome && (
                <span className="mx-2 text-[#D6C7B6]">•</span>
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-normal text-[#4A3F35]">
            {rua.nome}
          </h1>
        </div>
      )}
      <div className="h-px bg-[#EADCCD] mb-5 lg:mx-6 xl:mx-8"></div>

      <div className="prose max-w-none bg-[#FDFBF7] border border-[#F0E8DC] border-l-4 border-l-[#CD853F] rounded-lg p-6 mb-8 shadow-inner">
        <p className="text-[#6B5B4F] leading-relaxed text-lg">{rua.descricao}</p>
      </div>
      
      {/* Image Gallery */}
      {rua.fotos && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-[#4A3F35] mb-4">
            <i className="fas fa-images mr-2 text-[#CD853F]"></i>
            Galeria de Imagens
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Array.isArray(rua.fotos) ? rua.fotos : [rua.fotos]).map((foto, index) => (
              <div key={index} className="group cursor-pointer">
                <img
                  src={foto}
                  alt={`${rua.nome} - Imagem ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105"
                  onClick={() => {
                    window.open(foto, '_blank');
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RuaTab;

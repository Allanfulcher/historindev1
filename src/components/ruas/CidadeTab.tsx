import React from 'react';
import type { Cidade } from '../../types';

interface CidadeTabProps {
  cidade: Cidade;
}

const CidadeTab: React.FC<CidadeTabProps> = ({ cidade }) => {
  return (
    <div className="mb-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#4A3F35]">{cidade.nome}</h1>
      
      <div className="prose max-w-none bg-[#FDFBF7] border border-[#F0E8DC] border-l-4 border-l-[#CD853F] rounded-lg p-6 mb-8 shadow-inner">
        <p className="text-[#6B5B4F] leading-relaxed text-lg">{cidade.descricao}</p>
      </div>
      
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-[#F5F1EB] rounded-lg">
          <h3 className="text-base font-medium text-[#4A3F35] mb-2">Estado</h3>
          <p className="text-[#6B5B4F] text-lg">{cidade.estado}</p>
        </div>
        <div className="p-6 bg-[#F5F1EB] rounded-lg">
          <h3 className="text-base font-medium text-[#4A3F35] mb-2">População</h3>
          <p className="text-[#6B5B4F] text-lg">{cidade.populacao}</p>
        </div>
      </div>
      
      {/* Image Gallery */}
      {cidade.foto && (
        <div className="mt-8">
          <h3 className="text-xl font-medium text-[#4A3F35] mb-6">
            <i className="fas fa-images mr-2 text-[#CD853F]"></i>
            Galeria de Imagens
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Array.isArray(cidade.foto) ? cidade.foto : [cidade.foto]).map((foto, index) => (
              <div key={index} className="group cursor-pointer">
                <img
                  src={foto}
                  alt={`${cidade.nome} - Imagem ${index + 1}`}
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

export default CidadeTab;

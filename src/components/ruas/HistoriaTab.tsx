import React from 'react';
import type { Historia, Rua, Cidade } from '../../types';
import HistoriaCard from './HistoriaCard';

interface HistoriaTabProps {
  historias: Historia[];
  rua?: Rua | null;
  cidade?: Cidade | null;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

const HistoriaTab: React.FC<HistoriaTabProps> = ({ 
  historias, 
  rua, 
  cidade, 
  sortOrder, 
  setSortOrder 
}) => {
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
        {/* Sort controls can be uncommented if needed
        <div className="flex items-center gap-2">
          <label htmlFor="sortOrder" className="text-sm text-[#6B5B4F]">Ordenar:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="text-sm bg-[#F5F1EB] text-[#4A3F35] border border-[#E6D3B4] rounded px-2 py-1"
          >
            <option value="asc">Antigas</option>
            <option value="desc">Recentes</option>
          </select>
        </div>
        */}
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
        {historias.length === 0 && (
          <div className="text-center py-8 text-[#6B5B4F]">Nenhuma história para esta rua.</div>
        )}

        {historias.map((historia) => (
          <HistoriaCard key={historia.id} historia={historia} />
        ))}
      </div>
    </>
  );
};

export default HistoriaTab;

'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import type { Cidade } from '../types';

interface CityCarouselProps {
  cidades: Cidade[];
  handleCityClick: (cidade: Cidade) => void;
  selectedCityId?: string;
}

const CityCarousel: React.FC<CityCarouselProps> = ({ 
  cidades, 
  handleCityClick, 
  selectedCityId 
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current && selectedCityId) {
      const selectedElement = carouselRef.current.querySelector(`[data-id='${selectedCityId}']`) as HTMLElement;
      if (selectedElement) {
        const carouselWidth = carouselRef.current.offsetWidth;
        const selectedElementOffset = selectedElement.offsetLeft;
        const selectedElementWidth = selectedElement.offsetWidth;

        const scrollPosition = selectedElementOffset - (carouselWidth / 2) + (selectedElementWidth / 2);
        window.requestAnimationFrame(() => {
          carouselRef.current?.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        });
      }
    }
  }, [selectedCityId]);

  return (
    <div className="w-full flex items-center">
      {/* Botão de Voltar ao Mapa */}
      <Link
        href="/"
        className="flex items-center px-4 py-2 mr-4 bg-gray-300 hover:bg-gray-400 rounded-full cursor-pointer transition-colors"
        aria-label="Voltar ao Mapa"
      >
        <i className="fas fa-arrow-left mr-2" />
        <span>Voltar ao Mapa</span>
      </Link>

      {/* Carrossel de Cidades */}
      <div 
        ref={carouselRef} 
        className="overflow-x-auto whitespace-nowrap flex-grow"
      >
        <div className="flex space-x-2 inline-flex">
          {cidades.map((cidade) => (
            <span
              key={cidade.id}
              data-id={cidade.id}
              className={`px-4 py-2 rounded-full cursor-pointer whitespace-nowrap ${
                cidade.id === selectedCityId 
                  ? 'bg-[#8A5A44] text-white' 
                  : 'bg-gray-200'
              }`}
              onClick={() => handleCityClick(cidade)}
            >
              {cidade.nome}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityCarousel;

// Export to window object for global access (for legacy compatibility)
if (typeof window !== 'undefined') {
  (window as any).CityCarousel = CityCarousel;
}

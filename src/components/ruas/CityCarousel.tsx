'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Cidade } from '../../types';

// Types
interface CityCarouselProps {
  /** Array of city objects to display */
  cidades: Cidade[];
  /** Callback function when a city is selected */
  onCitySelect: (cidade: Cidade) => void;
  /** Currently selected city ID */
  selectedCityId?: string;
  /** Optional class name for the container */
  className?: string;
  /** Show back button (default: true) */
  showBackButton?: boolean;
  /** Back button label (default: 'Voltar ao Mapa') */
  backButtonLabel?: string;
}

/**
 * A responsive, accessible city carousel component with smooth scrolling and keyboard navigation.
 */
const CityCarousel: React.FC<CityCarouselProps> = ({
  cidades,
  onCitySelect,
  selectedCityId,
  className = '',
  showBackButton = true,
  backButtonLabel = 'Voltar ao Mapa',
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle smooth scrolling to selected city
  const scrollToSelectedCity = useCallback(() => {
    if (!carouselRef.current || !selectedCityId) return;

    const selectedElement = carouselRef.current.querySelector<HTMLElement>(`[data-id='${selectedCityId}']`);
    if (!selectedElement) return;

    const carousel = carouselRef.current;
    const carouselRect = carousel.getBoundingClientRect();
    const selectedRect = selectedElement.getBoundingClientRect();
    
    const scrollPosition = selectedElement.offsetLeft - (carouselRect.width / 2) + (selectedRect.width / 2);
    
    window.requestAnimationFrame(() => {
      carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    });
  }, [selectedCityId]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, cidade: Cidade) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCitySelect(cidade);
    }
  }, [onCitySelect]);

  // Scroll to selected city on mount and when selectedCityId changes
  useEffect(() => {
    scrollToSelectedCity();
  }, [selectedCityId, scrollToSelectedCity]);

  // Add smooth scrolling on mount
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.style.scrollBehavior = 'smooth';
      return () => {
        carousel.style.scrollBehavior = '';
      };
    }
  }, []);

  return (
    <div className="w-full">
      <div 
        ref={containerRef}
        className="max-w-5xl mx-auto px-4 flex items-center"
        role="navigation"
        aria-label="Navegação de cidades"
      >
        {/* Back Button */}
        {showBackButton && (
          <Link
            href="/"
            className="flex-shrink-0 flex bg-[#FEFCF8] rounded-full border border-[#F5F1EB] shadow-sm items-center px-4 py-3 text-sm font-medium text-[#6B5B4F] hover:text-[#A0522D] transition-colors duration-200 whitespace-nowrap"
            aria-label={backButtonLabel}
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">{backButtonLabel}</span>
            <span className="sm:hidden">Voltar</span>
          </Link>
        )}

        {/* Cities Carousel */}
        <div 
          ref={carouselRef}
          className="relative flex-1 overflow-x-auto whitespace-nowrap py-3 scrollbar-hide px-2"
          role="listbox"
          aria-orientation="horizontal"
        >
          <div className="inline-flex space-x-2">
            {cidades.map((cidade) => {
              const isSelected = cidade.id === selectedCityId;
              return (
                <button
                  key={cidade.id}
                  data-id={cidade.id}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-full transition-all duration-150
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B4513]/50 focus-visible:ring-offset-1
                    ${isSelected 
                      ? 'bg-[#8B4513] text-white shadow-sm' 
                      : 'bg-[#FEFCF8] text-[#6B5B4F] hover:bg-[#F5F1EB] shadow-sm'
                    }
                  `}
                  onClick={() => onCitySelect(cidade)}
                  onKeyDown={(e) => handleKeyDown(e, cidade)}
                  role="option"
                  aria-selected={isSelected}
                  aria-label={`Selecionar ${cidade.nome}`}
                  tabIndex={0}
                >
                  {cidade.nome}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCarousel;

// Add custom scrollbar hiding utility to your global CSS
// Add this to your global.css or a CSS module:
/*
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/

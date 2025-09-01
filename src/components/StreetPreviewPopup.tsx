'use client';

import React, { useState, useEffect } from 'react';
import { Historia, Rua as RuaType } from '../types';

interface StreetPreviewPopupProps {
  rua: RuaType;
  historia?: Historia;
  historias?: Historia[];
  isVisible: boolean;
  onClose: () => void;
  onNavigate: (ruaId: string) => void;
}

const StreetPreviewPopup: React.FC<StreetPreviewPopupProps> = ({
  rua,
  historia,
  historias = [],
  isVisible,
  onClose,
  onNavigate
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting'>('entering');

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Small delay to ensure the component is mounted before starting animation
      const timer = setTimeout(() => {
        setAnimationState('entered');
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setAnimationState('exiting');
      // Keep component mounted during exit animation
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimationState('entering');
      }, 500); // Match the transition duration
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  // Function to get a random photo from histories related to a street (same as RecomendedStreets)
  const getRandomHistoryPhoto = (ruaId: string | number): string | null => {
    const relatedHistorias = historias.filter(historia => historia.rua_id === String(ruaId));
    
    if (relatedHistorias.length === 0) return null;
    
    // Get random historia
    const randomHistoria = relatedHistorias[Math.floor(Math.random() * relatedHistorias.length)];
    
    if (!randomHistoria.fotos || randomHistoria.fotos.length === 0) return null;
    
    // Handle both string arrays and object arrays
    const fotos = randomHistoria.fotos;
    if (typeof fotos[0] === 'string') {
      return fotos[Math.floor(Math.random() * fotos.length)] as string;
    } else if (typeof fotos[0] === 'object' && (fotos[0] as any).url) {
      return (fotos[Math.floor(Math.random() * fotos.length)] as any).url;
    }
    
    return null;
  };

  const getStreetImage = (): string | null => {
    // Use same logic as RecomendedStreets - get from historia photos first
    const historyPhoto = getRandomHistoryPhoto(rua.id);
    const imageSource = historyPhoto || rua.fotos;
    return typeof imageSource === 'string' ? imageSource : null;
  };

  if (!shouldRender) return null;

  const getAnimationClasses = () => {
    switch (animationState) {
      case 'entering':
        return 'translate-y-full opacity-0 scale-95';
      case 'entered':
        return 'translate-y-0 opacity-100 scale-100';
      case 'exiting':
        return 'translate-y-full opacity-0 scale-95';
      default:
        return 'translate-y-full opacity-0 scale-95';
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Popup positioned at bottom of viewport with enhanced opening animation */}
      <div className={`absolute bottom-0 left-0 right-0 pointer-events-auto transform transition-all duration-500 ease-out ${getAnimationClasses()}`}>
        <div className="bg-[#FEFCF8] rounded-t-xl shadow-xl border-t border-l border-r border-[#F5F1EB] overflow-hidden max-w-md mx-auto mb-4 mx-4">
          {/* Close button - larger and more prominent for accessibility */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm hover:bg-white text-[#4A3F35] hover:text-[#8B4513] rounded-full flex items-center justify-center transition-all duration-200 shadow-lg border-2 border-[#E6D3B4] hover:border-[#8B4513]"
            aria-label="Fechar preview"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Image section */}
          {getStreetImage() && (
            <div className="relative h-40 bg-[#F5F1EB]">
              <img
                src={getStreetImage()!}
                alt={`Foto da ${rua.nome}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  console.log('Image failed to load:', getStreetImage());
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', getStreetImage());
                }}
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
          
          {/* Content section */}
          <div className="p-6">
            {/* Street name */}
            <h3 className="font-bold text-xl text-[#4A3F35] mb-3">
              {rua.nome}
            </h3>
            
            {/* Street description */}
            <div className="mb-4">
              <p className="text-[#6B5B4F] text-base leading-relaxed">
                {rua.descricao 
                  ? (rua.descricao.length > 120 
                      ? `${rua.descricao.substring(0, 120)}...` 
                      : rua.descricao)
                  : 'Uma rua histórica com muitas histórias para contar. Explore e descubra os segredos que ela guarda.'
                }
              </p>
            </div>
            
            {/* Historia count indicator */}
            {historia && (
              <div className="mb-4 p-3 bg-[#F5F1EB] rounded-lg">
                <p className="text-sm text-[#A0958A] mb-1">História em destaque:</p>
                <p className="text-[#6B5B4F] font-medium text-sm">
                  {historia.titulo}
                </p>
              </div>
            )}
            
            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => onNavigate(rua.id)}
                className="flex-1 bg-[#8B4513] hover:bg-[#A0522D] text-white font-medium py-3 px-4 rounded transition-colors duration-200 text-sm flex items-center justify-center gap-2"
              >
                <span>Explorar Rua</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
            </div>
          </div>
          
          {/* Bottom handle indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-12 h-1 bg-[#A0958A] rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreetPreviewPopup;

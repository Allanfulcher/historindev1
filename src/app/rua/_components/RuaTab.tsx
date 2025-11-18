import React, { useState } from 'react';
import type { Rua, Cidade } from '../../../types';

interface RuaTabProps {
  rua: Rua;
  cidade?: Cidade | null;
}

const RuaTab: React.FC<RuaTabProps> = ({ rua, cidade }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullText, setShowFullText] = useState(false);
  
  const images = Array.isArray(rua.fotos) ? rua.fotos : rua.fotos ? [rua.fotos] : [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;
  
  // Truncate text for preview (approximately 3 lines)
  const previewText = rua.descricao && rua.descricao.length > 150 
    ? rua.descricao.substring(0, 150) + '.....' 
    : rua.descricao || '';

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#F0E8DC] mb-6 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Image Carousel - At the top and full width */}
      {hasImages && (
        <div className="relative bg-black -mx-3 -mt-3">
          <div className="aspect-square relative overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={`${rua.nome} - Imagem ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation arrows for multiple images */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all"
                >
                  <i className="fas fa-chevron-left text-sm"></i>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all"
                >
                  <i className="fas fa-chevron-right text-sm"></i>
                </button>
              </>
            )}
            
            {/* Image indicators */}
            {hasMultipleImages && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            )}
            
            {/* Image counter */}
            {hasMultipleImages && (
              <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                {currentImageIndex + 1}/{images.length}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header with street name and city - Now below the image */}
      <div className="p-4 pb-3">
        {/* Breadcrumb line */}
        {cidade?.nome && (
          <div className="mb-2">
            <div className="text-xs text-[#A0958A] font-medium">
              <span className="inline-flex items-center">
                <i className="fas fa-map-marker-alt mr-1 text-[#CD853F]"></i>
                <span>{cidade.nome}</span>
              </span>
            </div>
          </div>
        )}
        
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A3F35] leading-tight">
          {rua.nome}
        </h1>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {/* Description */}
        <div className="mb-4">
          <p className="text-[#4A3F35] leading-relaxed text-sm">
            {showFullText ? rua.descricao : previewText}
            {/* Show more/less button with horizontal spacing */}
            {rua.descricao && rua.descricao.length > 150 && (
              <>
                <span className="mx-2"></span>
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="text-[#CD853F] text-sm font-medium hover:text-[#B8763A] transition-colors"
                >
                  {showFullText ? 'mostrar menos' : 'mostrar mais'}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RuaTab;

import React, { useState } from 'react';
import type { Cidade } from '../../../types';

interface CidadeTabProps {
  cidade: Cidade;
}

const CidadeTab: React.FC<CidadeTabProps> = ({ cidade }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = Array.isArray(cidade.foto) ? cidade.foto : cidade.foto ? [cidade.foto] : [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;
  const descricao = cidade.descricao ?? '';

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
              alt={`${cidade.nome} - Imagem ${currentImageIndex + 1}`}
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

      {/* Header with city name - Now below the image */}
      <div className="p-4 pb-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A3F35] leading-tight">
          {cidade.nome}
        </h1>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {/* Description rendered as HTML */}
        {descricao && (
          <div
            className="prose prose-amber max-w-none text-[#4A3F35] leading-relaxed text-sm"
            dangerouslySetInnerHTML={{ __html: descricao }}
          />
        )}
        
        {/* City Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        </div>
      </div>
    </div>
  );
};

export default CidadeTab;


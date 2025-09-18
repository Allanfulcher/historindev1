import React, { useState } from 'react';
import { Historia } from '@/types';
import { useExpandableText } from '@/utils/textFormatter';

interface HistoriaCardProps {
  historia: Historia;
}

const HistoriaCard: React.FC<HistoriaCardProps> = ({ historia }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Touch/swipe state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const images = historia.fotos || [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  // Use the new text formatting system
  const { 
    formattedText, 
    isExpanded, 
    needsExpansion, 
    toggleExpanded 
  } = useExpandableText(historia.descricao, 150);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch handlers for swipe navigation
  const SWIPE_THRESHOLD = 50; // px
  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!hasMultipleImages) return;
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
    setIsSwiping(false);
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!hasMultipleImages || touchStartX === null || touchStartY === null) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    // Only consider horizontal intent
    if (!isSwiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      setIsSwiping(true);
    }
    if (isSwiping) {
      // Prevent vertical page scroll while swiping horizontally
      e.preventDefault();
    }
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!hasMultipleImages || touchStartX === null || touchStartY === null) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
    setIsSwiping(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#F0E8DC] mb-6 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Image Carousel - Now at the top and full width */}
      {hasImages && (
        <div className="relative bg-black -mx-3 -mt-3">
          <div
            className="aspect-square relative overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={typeof images[currentImageIndex] === 'string' 
                ? images[currentImageIndex] as string
                : (images[currentImageIndex] as any).url}
              alt={`${historia.titulo} - Imagem ${currentImageIndex + 1}`}
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

      {/* Header with year and title - Now below the image */}
      <div className="p-4 pb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-[#CD853F] text-white px-3 py-1 rounded-full text-sm font-medium">
            {historia.ano}
          </div>
          <h2 className="text-lg font-bold text-[#4A3F35] leading-tight flex-1">
            {historia.titulo}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {/* Description */}
        <div className="mb-3">
          <div className="text-[#4A3F35] leading-relaxed text-sm">
            {formattedText}
            {/* Show more/less button with horizontal spacing */}
            {needsExpansion && (
              <div className="mt-2">
                <button
                  onClick={toggleExpanded}
                  className="text-[#CD853F] text-sm font-medium hover:text-[#B8763A] transition-colors inline-flex items-center gap-1"
                >
                  {isExpanded ? (
                    <>
                      <span>mostrar menos</span>
                      <i className="fas fa-chevron-up text-xs"></i>
                    </>
                  ) : (
                    <>
                      <span>mostrar mais</span>
                      <i className="fas fa-chevron-down text-xs"></i>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Image credit if available */}
        <p className="text-xs text-[#8B7355] italic mt-2">
          Crédito: {historia.criador}
        </p>
      </div>
    </div>
  );
};

export default HistoriaCard;

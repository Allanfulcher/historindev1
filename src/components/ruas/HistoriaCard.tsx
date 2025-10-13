import React, { useState } from 'react';
import { Historia } from '@/types';
import { useExpandableText } from '@/utils/textFormatter';

interface HistoriaCardProps {
  historia: Historia;
}

const HistoriaCard: React.FC<HistoriaCardProps> = ({ historia }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
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

  // Build shareable URL with scroll and UTM parameters
  const buildShareUrl = (): string => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const ruaId = String(historia.rua_id);
    const historiaId = String(historia.id);
    const url = `${origin}/rua/${ruaId}/historia/${historiaId}?scroll=true&utm_source=share&utm_medium=app&utm_campaign=historia_share`;
    return url;
  };

  const handleShare = async () => {
    const shareUrl = buildShareUrl();
    const shareData = {
      title: `Historin • ${historia.titulo}`,
      text: `Veja esta história (${historia.ano}): ${historia.titulo}`,
      url: shareUrl,
    };
    try {
      if (typeof navigator !== 'undefined' && (navigator as any).share) {
        await (navigator as any).share(shareData);
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch (_) {
      // Fallback: try copy on error
      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }
      } catch {}
    }
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
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 text-[#4A3F35] hover:text-[#2f261f] text-sm font-medium bg-[#F5F1EB] px-2.5 py-1.5 rounded-md border border-[#E6D3B4] transition-colors"
              aria-label="Compartilhar história"
              title="Compartilhar"
            >
              <i className="fas fa-share-alt text-xs"></i>
              <span className="hidden sm:inline">Compartilhar</span>
            </button>
            {copied && (
              <span className="text-xs text-[#6B5B4F]">Link copiado</span>
            )}
          </div>
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

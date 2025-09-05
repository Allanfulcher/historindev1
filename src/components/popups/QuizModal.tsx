'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../LoadingSpinner';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);


  const router = useRouter();

  const handleClose = () => {
    onClose();
  };

  const handleGoToQuiz = async () => {
    setIsNavigating(true);
    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/quiz');
    onClose();
    setIsNavigating(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[10000] backdrop-blur-sm bg-black/40"
      onClick={handleClose}
    >
      <div
        className="bg-[#FEFCF8] p-8 md:p-10 rounded-xl shadow-2xl w-[92vw] md:w-[80vw] max-w-3xl md:max-w-4xl max-h-[85vh] overflow-y-auto ring-1 ring-[#A0958A]/20"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center text-[#4A3F35]">Quiz do Historin</h3>
        <p className="text-base md:text-lg text-[#6B5B4F] mb-6 text-center">
          Teste seus conhecimentos sobre a região!
        </p>
        <div className="text-[#6B5B4F] mb-8 space-y-3">
          <p>
            • 10 perguntas aleatórias sobre as histórias
          </p>
          <p>
            • Pontuação baseada em acertos
          </p>
          <p>
            • Ranking com outros participantes
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleGoToQuiz}
            disabled={isNavigating}
            className="flex-1 bg-[#8B4513] hover:bg-[#A0522D] disabled:bg-[#A0958A] text-white py-3 px-5 rounded text-base md:text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 disabled:cursor-not-allowed"
          >
            {isNavigating ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="sm" color="white" text="" />
                <span className="ml-2">Carregando...</span>
              </div>
            ) : (
              'Começar Quiz'
            )}
          </button>
          <button
            onClick={handleClose}
            disabled={isNavigating}
            className="flex-1 bg-[#F5F1EB] hover:bg-[#E8E0D6] disabled:bg-[#F5F1EB]/50 text-[#4A3F35] disabled:text-[#A0958A] py-3 px-5 rounded text-base md:text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#A0958A]/40 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;

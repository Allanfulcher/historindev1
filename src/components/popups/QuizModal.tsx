'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const router = useRouter();

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[10000]"
      onClick={handleClose}
    >
      <div
        className="bg-[#FEFCF8] p-8 md:p-10 rounded-xl shadow-lg w-[92vw] md:w-[80vw] max-w-3xl md:max-w-4xl max-h-[85vh] overflow-y-auto ring-1 ring-[#A0958A]/20"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center text-[#4A3F35]">Quiz do Historin</h3>
        <p className="text-base md:text-lg text-[#6B5B4F] mb-6 text-center">
          Deseja ir para a página do Quiz?
        </p>
        {/* Placeholder explanatory content */}
        <div className="text-[#6B5B4F] mb-8 space-y-3">
          <p>
            Este quiz ainda esta em desenvolvimento!
          </p>
        </div>
        <div className="flex gap-3">
          <button
            disabled
            aria-disabled="true"
            title="Em desenvolvimento"
            className="flex-1 bg-[#A0958A] text-white py-3 px-5 rounded text-base md:text-lg cursor-not-allowed opacity-70"
          >
            Em breve
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-[#F5F1EB] hover:bg-[#E8E0D6] text-[#4A3F35] py-3 px-5 rounded text-base md:text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#A0958A]/40"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;

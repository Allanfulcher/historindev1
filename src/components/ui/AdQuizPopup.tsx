import React, { useState } from 'react';
import Popup from './Popup';
import type { PopupProps } from './Popup';

export type AdQuizPopupProps = Omit<PopupProps, 'children'> & {
  // Ad data from database
  businessName: string;
  title: string;
  description: string;
  question: string;
  imageUrl?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  
  // Quiz options - custom answers for the question
  answers: string[]; // Array of 2-4 answer options
};

/**
 * AdQuizPopup - Interactive advertisement popup with quiz engagement
 * 
 * Stage 1 (Intro): Generic intro about answering a question to win a prize
 * Stage 2 (Question): Shows the question with answer options and "Responda e Ganhe" text
 * Stage 3 (Reveal): After user answers, shows full business ad with details
 * 
 * Example:
 * <AdQuizPopup
 *   isOpen={showAd}
 *   onClose={() => setShowAd(false)}
 *   businessName="Café São Pedro"
 *   title="Desconto Especial!"
 *   description="Ganhe 10% de desconto em qualquer bebida..."
 *   question="Quer um desconto no Café São Pedro?"
 *   answers={["Sim, quero!", "Não, obrigado"]}
 *   imageUrl="https://..."
 *   website="https://cafesaopedro.com"
 * />
 */
export function AdQuizPopup({
  businessName,
  title,
  description,
  question,
  imageUrl,
  phone,
  email,
  website,
  answers,
  isOpen,
  onClose,
  ...popupProps
}: AdQuizPopupProps) {
  const [stage, setStage] = useState<'intro' | 'question' | 'reveal'>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Reset stage when popup opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setStage('intro');
      setSelectedAnswer(null);
    }
  }, [isOpen]);

  // Shuffle answers on mount
  const options = React.useMemo(() => {
    return [...answers].sort(() => Math.random() - 0.5);
  }, [answers]);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    // Wait a moment to show selection, then reveal ad
    setTimeout(() => {
      setStage('reveal');
    }, 500);
  };

  const handleVisitWebsite = () => {
    if (website) {
      window.open(website, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      position="center"
      showCloseButton={false}
      closeOnBackdropClick={stage === 'reveal'}
      className="relative px-4"
      {...popupProps}
    >
      {/* Custom Close Button - Above Popup */}
      <div className="absolute -top-12 right-0 left-0 flex justify-center z-10">
        <button
          onClick={onClose}
          className="w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 group border-2 border-[#F5F1EB]"
          aria-label="Fechar"
        >
          <i className="fas fa-times text-[#6B5B4F] group-hover:text-[#8B4513] transition-colors text-lg"></i>
        </button>
      </div>

      {stage === 'intro' ? (
        // STAGE 1: Generic Intro
        <div className="p-10 space-y-10 text-center bg-gradient-to-b from-white to-[#FEFCF8]">
          {/* Prize Icon with Animation */}
          <div className="flex justify-center pt-2">
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <i className="fas fa-gift text-white text-5xl"></i>
              </div>
              {/* Decorative rings */}
              <div className="absolute inset-0 w-28 h-28 rounded-full border-4 border-amber-200 animate-ping opacity-20"></div>
            </div>
          </div>

          {/* Intro Text - Single cohesive message */}
          <div className="space-y-5 px-2">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-[#4A3F35] leading-tight">
                Ganhe um brinde!
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
            </div>
            <p className="text-lg text-[#6B5B4F] leading-relaxed font-medium max-w-sm mx-auto">
              Responda uma pergunta simples e ganhe um prêmio em um estabelecimento perto de você
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => setStage('question')}
              className="w-full py-5 px-8 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-xl hover:from-[#A0522D] hover:to-[#8B4513] transition-all font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300 flex items-center justify-center gap-3"
            >
              <span>Começar Agora</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      ) : stage === 'question' ? (
        // STAGE 2: Question Only
        <div className="p-8 space-y-8 bg-gradient-to-b from-white to-[#FEFCF8]">
          {/* Question */}
          <div className="text-center py-2 px-4">
            <h3 className="text-2xl font-bold text-[#4A3F35] leading-relaxed">
              {question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 px-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
                className={`
                  w-full p-5 rounded-xl border-2 transition-all duration-300 shadow-md
                  ${
                    selectedAnswer === option
                      ? 'border-[#8B4513] bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white scale-105 shadow-xl'
                      : 'border-[#E6D3B4] bg-white text-[#4A3F35] hover:border-[#8B4513] hover:bg-[#FEFCF8] hover:shadow-lg'
                  }
                  ${selectedAnswer && selectedAnswer !== option ? 'opacity-40' : ''}
                  disabled:cursor-not-allowed
                  font-semibold text-left text-lg
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                    ${selectedAnswer === option ? 'border-white bg-white scale-110' : 'border-[#8B4513]'}
                  `}>
                    {selectedAnswer === option && (
                      <i className="fas fa-check text-[#8B4513] text-sm"></i>
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Text with Icon */}
          <div className="text-center pt-4 pb-2">
            <div className="inline-flex items-center gap-2 px-6 py-3">
              <i className="fas fa-gift text-[#8B4513]"></i>
              <p className="text-sm font-bold text-[#8B4513] uppercase tracking-wider">
                Responda e Ganhe um brinde
              </p>
            </div>
          </div>
        </div>
      ) : (
        // STAGE 3: Business Ad Reveal
        <div className="space-y-6 bg-gradient-to-b from-white to-[#FEFCF8]">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 p-4 rounded-t-lg border-b-2 border-green-200">
            <div className="flex items-center justify-center gap-3 text-green-700">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-check-circle text-xl"></i>
              </div>
              <p className="font-bold text-base">Oferta Revelada!</p>
            </div>
          </div>

          <div className="px-6 pb-6 space-y-4">
            {/* Image */}
            {imageUrl && (
              <div className="w-full h-48 rounded-lg overflow-hidden bg-[#F5F1EB]">
                <img
                  src={imageUrl}
                  alt={businessName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Business Info */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-[#4A3F35]">{title}</h2>
              <p className="text-lg font-semibold text-[#8B4513]">{businessName}</p>
            </div>

            {/* Description */}
            <div className="bg-[#FEFCF8] p-4 rounded-lg border border-[#F5F1EB]">
              <p className="text-[#6B5B4F] leading-relaxed">{description}</p>
            </div>

            {/* Contact Info */}
            {website && (
              <div className="pt-2">
                <button
                  onClick={handleVisitWebsite}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-xl hover:from-[#A0522D] hover:to-[#8B4513] transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
                >
                  <i className="fas fa-external-link-alt"></i>
                  <span>Visitar Website</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Popup>
  );
}

export default AdQuizPopup;

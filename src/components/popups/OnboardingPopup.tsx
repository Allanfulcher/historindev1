'use client';

import React, { useState } from 'react';

interface OnboardingPopupProps {
  onClose: () => void;
}

const OnboardingPopup: React.FC<OnboardingPopupProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    setStep(totalSteps - 1);
  };

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="bg-[#FEFCF8] rounded-xl shadow-xl w-full max-w-md p-6 relative flex flex-col items-center ring-1 ring-[#A0958A]/20"
        style={{
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Conteúdo do Onboarding baseado na Home */}
        <div className="introduction p-4">
          <h2 className="text-xl font-bold text-center mb-4">Bem-vindo ao Historin!</h2>
          <div className="steps">
            {step === 0 && (
              <div className="step text-center">
                <span className="step-number inline-block w-8 h-8 bg-[#8B4513] text-white rounded-full text-center leading-8 mb-2">1</span>
                <p>Explore histórias pela geografia e descubra a história por trás dos lugares!</p>
              </div>
            )}
            {step === 1 && (
              <div className="step text-center">
                <span className="step-number inline-block w-8 h-8 bg-[#8B4513] text-white rounded-full text-center leading-8 mb-2">2</span>
                <p>Navegue pela linha do tempo para reviver os eventos que moldaram nossa cidade!</p>
              </div>
            )}
            {step === 2 && (
              <div className="step text-center">
                <span className="step-number inline-block w-8 h-8 bg-[#8B4513] text-white rounded-full text-center leading-8 mb-2">3</span>
                <p>Contribua com suas histórias e experiências e aproveite a jornada!</p>
              </div>
            )}
          </div>
        </div>

        {/* Botão de Avançar */}
        {step < totalSteps - 1 && (
          <button
            className="bg-[#8B4513] text-white px-6 py-2.5 rounded-lg mb-4 hover:bg-[#A0522D] transition-all duration-200 font-medium"
            onClick={handleNext}
            aria-label="Avançar"
          >
            Avançar
          </button>
        )}

        {/* Botão "Começar" */}
        {step === totalSteps - 1 && (
          <button
            className="bg-[#8B4513] text-white px-6 py-2.5 rounded-lg mb-4 hover:bg-[#A0522D] transition-all duration-200 font-medium"
            onClick={onClose}
            aria-label="Começar"
          >
            Começar
          </button>
        )}

        {/* Botão de Pular */}
        {step < totalSteps - 1 && (
          <button
            className="text-[#6B5B4F] underline mb-4 hover:text-[#4A3F35] transition-colors"
            onClick={handleSkip}
            aria-label="Pular"
          >
            Pular
          </button>
        )}

        {/* Botão de Fechar */}
        <button
          className="absolute top-3 right-3 text-[#A0958A] cursor-pointer hover:text-[#6B5B4F] transition-colors p-1"
          onClick={onClose}
          aria-label="Fechar onboarding"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default OnboardingPopup;

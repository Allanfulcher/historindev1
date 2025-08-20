import React, { useState } from 'react';

// FeedbackPopup Component - User feedback form with star rating
// Converted from JavaScript to TypeScript with proper type definitions

interface FeedbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  nome: string;
  email: string;
  comentario: string;
  estrelas: number;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    comentario: '',
    estrelas: 0
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleStarClick = (starValue: number) => {
    setFormData({ ...formData, estrelas: starValue });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 flex items-start justify-end p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-[#FEFCF8] rounded-lg shadow-lg w-full max-w-md p-6 relative ring-1 ring-[#A0958A]/20"
        onClick={handleStopPropagation}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 bg-transparent hover:bg-[#F5F1EB] text-[#6B5B4F] p-1 rounded-full flex items-center justify-center text-xl transition-colors duration-200"
          onClick={onClose}
          aria-label="Fechar formulário de feedback"
        >
          <i className="fas fa-times" />
        </button>
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-center text-[#4A3F35]">
          Envie seu Feedback
        </h3>
        
        {/* Description */}
        <p className="text-[#6B5B4F] text-center mb-4">
          Estamos em fase inicial da nossa plataforma e sua opinião é muito importante para nós! 
          Por favor, avalie-nos ajude a melhorar.
        </p>
        
        {/* Form */}
        <form
          action="https://formspree.io/f/manywvne"
          method="POST"
        >
          {/* Star rating section */}
          <div className="mb-4 text-center">
            <label className="block text-[#4A3F35] text-sm font-bold mb-2">
              Avaliação:
            </label>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className={`text-3xl transition-colors duration-200 hover:scale-110 transition-transform ${
                    formData.estrelas >= star ? 'text-[#DAA520]' : 'text-[#A0958A]'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="text-[#A0958A] text-sm">
              Sua avaliação: {formData.estrelas} estrela(s)
            </p>
            <input
              type="hidden"
              name="estrelas"
              value={formData.estrelas}
            />
          </div>
          
          {/* Name field */}
          <div className="mb-4">
            <label
              className="block text-[#4A3F35] text-sm font-bold mb-2"
              htmlFor="nome"
            >
              Nome (opcional):
            </label>
            <input
              className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
              id="nome"
              type="text"
              name="nome"
              placeholder="Seu nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>
          
          {/* Email field */}
          <div className="mb-4">
            <label
              className="block text-[#4A3F35] text-sm font-bold mb-2"
              htmlFor="email"
            >
              E-mail (opcional):
            </label>
            <input
              className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
              id="email"
              type="email"
              name="email"
              placeholder="Seu e-mail"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          {/* Comment field */}
          <div className="mb-4">
            <label
              className="block text-[#4A3F35] text-sm font-bold mb-2"
              htmlFor="comentario"
            >
              Comentário:
            </label>
            <textarea
              className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
              id="comentario"
              name="comentario"
              rows={4}
              placeholder="Escreva seu feedback sobre a plataforma"
              value={formData.comentario}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Submit button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded whitespace-nowrap flex-shrink-0 text-sm sm:text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50"
            >
              Enviar Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPopup;

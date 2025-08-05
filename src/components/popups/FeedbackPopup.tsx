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
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-high"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
        onClick={handleStopPropagation}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
          aria-label="Fechar formulário de feedback"
        >
          <i className="fas fa-times text-xl" />
        </button>
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-center">
          Envie seu Feedback
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-center mb-4">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Avaliação:
            </label>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className={`text-3xl ${
                    formData.estrelas >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="text-gray-500 text-sm">
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
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nome"
            >
              Nome (opcional):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              E-mail (opcional):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="comentario"
            >
              Comentário:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

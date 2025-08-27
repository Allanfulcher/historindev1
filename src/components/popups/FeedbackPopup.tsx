import React, { useState } from 'react';

// FeedbackPopup Component - User feedback form with star rating
// Integrated with Google Apps Script for data submission

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

interface SubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    comentario: '',
    estrelas: 5
  });

  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  // Google Apps Script URL
  const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwFT869Xdz9xGtw21gtvbbiTQf66dMLBAgopA1dVks2xzVz4nQQSwj6B9zvXJdFNOHm/exec';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate star rating
    if (formData.estrelas < 1) {
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Por favor, selecione pelo menos 1 estrela para avaliar.'
      });
      return;
    }
    
    // Set submitting state
    setSubmissionState({
      isSubmitting: true,
      isSuccess: false,
      error: null
    });

    // Create and submit form via hidden iframe (bypasses CORS)
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'feedback-frame';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.action = GOOGLE_APPS_SCRIPT_URL;
    form.method = 'POST';
    form.target = 'feedback-frame';

    // Add form fields
    const fields = [
      { name: 'nome', value: formData.nome },
      { name: 'email', value: formData.email },
      { name: 'comentario', value: formData.comentario },
      { name: 'estrelas', value: formData.estrelas.toString() }
    ];

    fields.forEach(field => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = field.name;
      input.value = field.value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    // Clean up and show success after submission
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
      
      setSubmissionState({
        isSubmitting: false,
        isSuccess: true,
        error: null
      });

      // Reset form data
      setFormData({
        nome: '',
        email: '',
        comentario: '',
        estrelas: 5
      });

      // Close popup after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmissionState({
          isSubmitting: false,
          isSuccess: false,
          error: null
        });
      }, 2000);
    }, 1000);
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
        
        {/* Success Message */}
        {submissionState.isSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2"></i>
              Feedback enviado com sucesso! Obrigado pela sua contribuição.
            </div>
          </div>
        )}

        {/* Error Message */}
        {submissionState.error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <div className="flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {submissionState.error}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Star rating section */}
          <div className="mb-4 text-center">
            <label className="block text-[#4A3F35] text-sm font-bold mb-2">
              Avaliação: <span className="text-red-500">*</span>
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
              {formData.estrelas === 0 ? (
                <span className="text-red-500">Selecione pelo menos 1 estrela</span>
              ) : (
                `Sua avaliação: ${formData.estrelas} estrela(s)`
              )}
            </p>
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
              placeholder="Seu nome"
              value={formData.nome}
              onChange={handleChange}
              disabled={submissionState.isSubmitting}
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
              placeholder="Seu e-mail"
              value={formData.email}
              onChange={handleChange}
              disabled={submissionState.isSubmitting}
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
              rows={4}
              placeholder="Escreva seu feedback sobre a plataforma"
              value={formData.comentario}
              onChange={handleChange}
              disabled={submissionState.isSubmitting}
              required
            />
          </div>
          
          {/* Submit button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={submissionState.isSubmitting}
              className={`py-2 px-4 rounded whitespace-nowrap flex-shrink-0 text-sm sm:text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 ${
                submissionState.isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#8B4513] hover:bg-[#A0522D] text-white'
              }`}
            >
              {submissionState.isSubmitting ? (
                <div className="flex items-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Enviando...
                </div>
              ) : (
                'Enviar Feedback'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPopup;

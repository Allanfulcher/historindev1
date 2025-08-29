import React from 'react';
import { useRouter } from 'next/navigation';

interface ValidationErrorProps {
  error: string;
}

const ValidationError: React.FC<ValidationErrorProps> = ({ error }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="mb-4">
          <i className="fas fa-exclamation-triangle text-4xl text-[#CD853F] mb-4"></i>
        </div>
        <h2 className="text-xl font-bold text-[#4A3F35] mb-2">Erro de Validação</h2>
        <p className="text-[#6B5B4F] mb-6">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded transition-colors duration-200"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
};

export default ValidationError;

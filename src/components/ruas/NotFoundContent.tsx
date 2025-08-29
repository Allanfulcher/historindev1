import React from 'react';

interface NotFoundContentProps {
  type: 'historia' | 'rua' | 'cidade';
}

const NotFoundContent: React.FC<NotFoundContentProps> = ({ type }) => {
  const getTitle = () => {
    switch (type) {
      case 'historia': return 'História não encontrada';
      case 'rua': return 'Rua não encontrada';
      case 'cidade': return 'Cidade não encontrada';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'historia': return 'esta história';
      case 'rua': return 'esta rua';
      case 'cidade': return 'esta cidade';
    }
  };

  return (
    <div className="text-center py-12">
      <div className="mb-4">
        <i className="fas fa-search text-4xl text-[#A0958A] mb-4"></i>
      </div>
      <h2 className="text-xl font-bold text-[#4A3F35] mb-2">
        {getTitle()}
      </h2>
      <p className="text-[#A0958A] text-lg">
        Não foi possível encontrar informações sobre {getDescription()}.
      </p>
      <div className="mt-6">
        <button
          onClick={() => window.history.back()}
          className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded transition-colors duration-200"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default NotFoundContent;

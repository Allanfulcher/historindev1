'use client';

import React from 'react';
import Link from 'next/link';

interface DonationPopupProps {
  onClose: () => void;
}

const DonationPopup: React.FC<DonationPopupProps> = ({ onClose }) => {
  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
          aria-label="Fechar doação"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        <h3 className="text-xl font-bold mb-4 text-center">Gostou do Historin?</h3>
        <p className="text-center mb-4">Apoie o projeto e ajude a cobrir os custos mensais!</p>
        <div className="flex justify-center">
          <Link
            href="/sobre#doacao"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={onClose}
          >
            Doar Agora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationPopup;

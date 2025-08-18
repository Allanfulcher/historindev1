'use client';

import React from 'react';
import Link from 'next/link';

const LegadoAfricanoCard: React.FC = () => {
  return (
    <div className="px-4 mt-6">
      {/* Card that directs to the African Legacy page */}
      <Link 
        href="/legado-africano" 
        className="block bg-white p-6 rounded-lg shadow mb-4 hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex flex-col md:flex-row items-center">
          <img 
            src="images/pages/legadoafricano.png" 
            alt="Legado Africano" 
            className="w-56 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-4" 
          />
          <div>
            <h2 className="text-xl text-[#6B5B4F] font-bold mb-2">Legado Afro-brasileiro em Gramado</h2>
            <p className="text-[#6B5B4F]">
              Conheça a história e o legado afro-brasileiro em Gramado. Descubra relatos e contribuições da população negra na formação cultural da cidade.
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LegadoAfricanoCard;

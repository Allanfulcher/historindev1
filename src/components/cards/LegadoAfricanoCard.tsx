'use client';

import React from 'react';
import Link from 'next/link';

const LegadoAfricanoCard: React.FC = () => {
  return (
    <div className="px-4 mt-6">
      {/* Card that directs to the African Legacy page */}
      <Link 
        href="/legado-africano" 
        className="group block bg-white p-6 rounded-xl shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-xl hover:ring-1 hover:ring-[#8B4513]/20 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative overflow-hidden rounded-lg mb-4 md:mb-0 md:mr-4 flex-shrink-0">
            <img 
              src="images/pages/legadoafricano.webp" 
              alt="Legado Africano" 
              className="w-56 h-32 object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          <div>
            <h2 className="text-xl text-[#4A3F35] font-bold mb-2 group-hover:text-[#8B4513] transition-colors">
              Legado Afro-brasileiro em Gramado
            </h2>
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

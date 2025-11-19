'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiCamera, FiMap, FiAward } from 'react-icons/fi';

export default function QrHuntCard() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/caca-qr')}
      className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-white"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="bg-white/20 p-3 rounded-lg">
          <FiCamera className="w-8 h-8" />
        </div>
        <FiAward className="w-6 h-6 text-yellow-300" />
      </div>

      <h3 className="text-xl font-bold mb-2">Caça ao QR Code</h3>
      
      <p className="text-sm text-white/90 mb-4">
        Explore a cidade, encontre QR Codes escondidos e ganhe prêmios! Uma aventura interativa pelas ruas históricas.
      </p>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <FiMap className="w-4 h-4" />
          <span>Mapa interativo</span>
        </div>
        <div className="flex items-center gap-1">
          <FiCamera className="w-4 h-4" />
          <span>Scanner QR</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
        <span className="text-sm font-semibold">Começar agora</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}

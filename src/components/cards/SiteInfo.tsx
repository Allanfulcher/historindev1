'use client';

import React from 'react';
import Link from 'next/link';

const SiteInfo = () => {
return (
    <div className="flex flex-col md:flex-row items-center">
    <img
      src="https://i.imgur.com/nav9mZa.jpeg"
      alt="Informações sobre a plataforma"
      className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6 object-cover"
    />
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-2">Estamos só começando!</h2>
      <p className="text-gray-700 mb-4">
        O Historin é mais do que uma plataforma de histórias. Nossa jornada está apenas começando, e em breve, traremos uma experiência imersiva com{' '}
        <strong>Realidade Aumentada</strong>. QR codes serão espalhados pelas ruas de Gramado, permitindo a todos explorar a história de maneira interativa.
      </p>
      <Link
        href="/sobre"
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition inline-block"
      >
        Saiba mais sobre o Historin
      </Link>
    </div>
  </div>   
)
}
export default SiteInfo
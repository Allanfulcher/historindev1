'use client';

import React from 'react';
import Link from 'next/link';
import PrimaryBtn from '../buttons/PrimaryBtn';

const SiteInfo = () => {
  const sponsors = [
    {
      src: '/images/orgs/prefeituragramado.png',
      alt: 'Prefeitura de Gramado',
      label: 'Prefeitura de Gramado',
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiUtFDFGcK3PvoitnOMwfhL_eXzF7ihu9Q_Q&s',
      alt: 'Feevale',
      label: 'Feevale',
    },
    {
      src: '/images/orgs/logo-mundo-vapor.png',
      alt: 'Mundo a Vapor',
      label: 'Mundo a Vapor',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center">
      <img
        src="https://i.imgur.com/nav9mZa.jpeg"
        alt="Informações sobre a plataforma"
        className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6 object-cover"
      />
      <div className="flex-1">
        <h2 className="text-xl text-[#6B5B4F] font-bold mb-2">Apoio e Patrocínio</h2>
        <p className="text-[#6B5B4F] mb-4">Obrigado aos parceiros que tornam o Historin possível.</p>

        {/* 2-column grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {sponsors.map((s, i) => (
            <div key={i} className="text-center">
              <img
                src={s.src}
                alt={s.alt}
                className="mx-auto mb-1 h-12 w-auto object-contain"
              />
              {s.label && <p className="text-sm text-[#6B5B4F]">{s.label}</p>}
            </div>
          ))}
        </div>

        <Link href="/sobre" className="inline-block">
          <PrimaryBtn>Saiba mais sobre o Historin</PrimaryBtn>
        </Link>
      </div>
    </div>
  );
};

export default SiteInfo;
'use client';

import React from 'react';
import Link from 'next/link';
import PrimaryBtn from '../buttons/PrimaryBtn';

const SiteInfo = () => {
  const sponsors = [
    {
      src: '/images/orgs/prefeituragramado.webp',
      alt: 'Prefeitura de Gramado',
      label: 'Prefeitura de Gramado',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Logo_UCS_Vertical_PNG.png/500px-Logo_UCS_Vertical_PNG.png',
      alt: 'UCS',
      label: 'Universidade de Caxias do Sul',
    },
    {
      src: '/images/orgs/logo-mundo-vapor.webp',
      alt: 'Mundo a Vapor',
      label: 'Mundo a Vapor',
    },
    {
      src: 'https://brockerturismo.com.br/images/modulo/logo/brocker-turismo.svg',
      alt: 'Brocker Turismo',
      label: 'Brocker Turismo',
    },
    {
      src: 'https://lirp.cdn-website.com/6fcf29d3/dms3rep/multi/opt/01-aplicacao-principal-verde-c857a384-640w.png',
      alt: 'Hotel Alpestre',
      label: 'Hotel Alpestre',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center">
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
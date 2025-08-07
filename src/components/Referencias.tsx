'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Type definitions for the data structures
interface Org {
  id: string;
  fantasia: string;
  logo: string;
  descricao: string;
  link: string;
}

interface Autor {
  id: string;
  nome: string;
  foto: string;
  descricao: string;
  link: string;
}

interface Obra {
  id: string;
  titulo: string;
  capa: string;
  descricao: string;
  link: string;
  pago: boolean;
}

interface Site {
  id: string;
  nome: string;
  logo: string;
  link: string;
}

type SectionType = 'orgs' | 'autores' | 'obras' | 'sites' | null;

const Referencias: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract the 'section' parameter from URL
    const section = searchParams.get('section');
    if (section === 'orgs' || section === 'autores' || section === 'obras' || section === 'sites') {
      setActiveSection(section);
    }
  }, [searchParams]);

  const toggleSection = (sectionName: SectionType) => {
    setActiveSection(prevSection => (prevSection === sectionName ? null : sectionName));
  };

  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
      className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className="referencias px-4 md:px-8 lg:px-16 py-8">
      {/* Main Title */}
      <h1 className="text-3xl font-bold text-center">Referências</h1>
      <h3 className="font-bold text-center mb-6">+ Conteúdo</h3>

      {/* Descriptive Paragraph */}
      <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
        Nesta página, você encontrará uma ampla variedade de referências para aprofundar seu conhecimento histórico. 
        Nosso objetivo é incentivar o interesse das pessoas e disseminar conteúdo histórico relevante, fornecendo 
        fontes confiáveis e diversas para a exploração da rica história que a nossa plataforma oferece.
      </p>

      {/* Organizations Section */}
      <section className="orgs mb-8">
        <button
          className="flex items-center justify-between w-full px-4 py-2 text-2xl font-semibold text-left bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none transition-colors duration-200"
          onClick={() => toggleSection('orgs')}
        >
          <span>Organizações</span>
          <ChevronIcon isOpen={activeSection === 'orgs'} />
        </button>
        {activeSection === 'orgs' && (
          <div className="mt-4">
            {typeof window !== 'undefined' && window.orgs && window.orgs.map((org: Org) => (
              <div key={org.id} className="org bg-white shadow-md p-4 rounded-lg mb-4">
                <img
                  src={org.logo}
                  alt={`${org.fantasia} logo`}
                  className="h-32 mx-auto mb-4 object-contain"
                />
                <h3 className="text-xl font-bold text-center">{org.fantasia}</h3>
                <p className="text-gray-700 mt-2 text-center">{org.descricao}</p>
                <a
                  href={org.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 block text-center"
                >
                  Visitar site
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Authors Section */}
      <section className="autores mb-8">
        <button
          className="flex items-center justify-between w-full px-4 py-2 text-2xl font-semibold text-left bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none transition-colors duration-200"
          onClick={() => toggleSection('autores')}
        >
          <span>Autores</span>
          <ChevronIcon isOpen={activeSection === 'autores'} />
        </button>
        {activeSection === 'autores' && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {typeof window !== 'undefined' && window.autores && window.autores.map((autor: Autor) => (
              <div key={autor.id} className="autor bg-white shadow-md p-4 rounded-lg">
                <img
                  src={autor.foto}
                  alt={autor.nome}
                  className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
                />
                <h3 className="text-xl font-bold text-center">{autor.nome}</h3>
                <p className="text-gray-700 mt-2 text-center">{autor.descricao}</p>
                <a
                  href={autor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 block text-center"
                >
                  Ver mais
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Works Section */}
      <section className="obras mb-8">
        <button
          className="flex items-center justify-between w-full px-4 py-2 text-2xl font-semibold text-left bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none transition-colors duration-200"
          onClick={() => toggleSection('obras')}
        >
          <span>Obras</span>
          <ChevronIcon isOpen={activeSection === 'obras'} />
        </button>
        {activeSection === 'obras' && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {typeof window !== 'undefined' && window.obras && window.obras.map((obra: Obra) => (
              <div key={obra.id} className="obra bg-white shadow-md p-4 rounded-lg">
                <img
                  src={obra.capa}
                  alt={obra.titulo}
                  className="w-full h-40 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-bold">{obra.titulo}</h3>
                <p className="text-gray-700 mt-2">{obra.descricao}</p>
                <a
                  href={obra.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  {obra.pago ? "Adquirir" : "Ler gratuitamente"}
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sites Section */}
      <section className="sites mb-8">
        <button
          className="flex items-center justify-between w-full px-4 py-2 text-2xl font-semibold text-left bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none transition-colors duration-200"
          onClick={() => toggleSection('sites')}
        >
          <span>Sites</span>
          <ChevronIcon isOpen={activeSection === 'sites'} />
        </button>
        {activeSection === 'sites' && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {typeof window !== 'undefined' && window.sites && window.sites.map((site: Site) => (
              <div key={site.id} className="site bg-white shadow-md p-4 rounded-lg flex flex-col items-center">
                <img
                  src={site.logo}
                  alt={`${site.nome} logo`}
                  className="w-24 h-24 mb-4 rounded-lg object-contain"
                />
                <h3 className="text-xl font-bold text-center">{site.nome}</h3>
                <a
                  href={site.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 block text-center"
                >
                  Visitar site
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Videos Section */}
      <section className="videos mb-8">
        <h2 className="pl-4 text-2xl font-semibold mb-4">Vídeos</h2>
        <div className="video-container">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/videoseries?list=PL7HcHb8oOEF8p3w7QAc5LPFVVaBP1SNoP"
            title="YouTube playlist"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          />
        </div>
      </section>
    </div>
  );
};

export default Referencias;

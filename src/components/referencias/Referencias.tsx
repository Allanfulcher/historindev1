'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import YoutubeSection from './YoutubeSection';
import Header from '../Header';
import Menu from '../Menu';
import TitleSubtitle from '../text/TitleSubtitle';
import Paragraph from '../text/Paragraph';
import DropDown from '../buttons/DropDown';
import { sampleData } from '../../data/sampleData';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState({
    orgs: sampleData.orgs,
    autores: sampleData.autores,
    obras: sampleData.obras,
    sites: sampleData.sites
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract the 'section' parameter from URL
    const section = searchParams.get('section');
    if (section === 'orgs' || section === 'autores' || section === 'obras' || section === 'sites') {
      setActiveSection(section);
    }
    
    // Reset body overflow when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header setMenuOpen={setMenuOpen} setShowFeedback={setShowFeedback} />
      
      {/* Side Menu */}
      <Menu 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
      />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <TitleSubtitle /> 
          <Paragraph /> 
          {/* Sections */}
          <div className="space-y-6">
            {/* Organizations Section */}
            <DropDown
              title="Organizações"
              items={data.orgs}
              itemKey="id"
              renderItem={(org: Org) => (
                <a 
                  href={org.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col border border-gray-100">
                    <div className="flex-grow flex items-center justify-center mb-4 h-32">
                      <img
                        src={org.logo}
                        alt={`${org.fantasia} logo`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-center text-amber-900 group-hover:text-amber-700 transition-colors">
                      {org.fantasia}
                    </h3>
                    <p className="text-gray-600 mt-3 text-sm text-center flex-grow">{org.descricao}</p>
                    <div className="mt-4 flex justify-center">
                      <span className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-md text-sm font-medium hover:bg-amber-200 transition-colors">
                        Visitar site
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              )}
            />

            {/* Authors Section */}
            <DropDown
              title="Autores"
              items={data.autores}
              itemKey="id"
              renderItem={(autor: Autor) => (
                <a 
                  href={autor.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col border border-gray-100">
                    <div className="flex-grow flex items-center justify-center mb-4 h-32">
                      <img
                        src={autor.foto}
                        alt={`Foto de ${autor.nome}`}
                        className="h-32 w-32 rounded-full object-cover border-2 border-amber-100"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-center text-amber-900 group-hover:text-amber-700 transition-colors">
                      {autor.nome}
                    </h3>
                    <p className="text-gray-600 mt-3 text-sm text-center flex-grow">{autor.descricao}</p>
                  </div>
                </a>
              )}
            />

            {/* Works Section */}
            <DropDown
              title="Obras"
              items={data.obras}
              itemKey="id"
              renderItem={(obra: Obra) => (
                <a 
                  href={obra.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col border border-gray-100 overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={obra.capa}
                        alt={`Capa de ${obra.titulo}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold text-amber-900 group-hover:text-amber-700 transition-colors">
                        {obra.titulo}
                      </h3>
                      <p className="text-gray-600 mt-2 text-sm flex-grow">
                        {obra.descricao}
                      </p>
                      {obra.pago && (
                        <span className="mt-3 inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                          Conteúdo pago
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              )}
            />

            {/* Sites Section */}
            <DropDown
              title="Sites"
              items={data.sites}
              itemKey="id"
              renderItem={(site: Site) => (
                <a 
                  href={site.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col items-center border border-gray-100">
                    <div className="h-16 w-full mb-4 flex items-center justify-center">
                      <img
                        src={site.logo}
                        alt={`Logo ${site.nome}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-center text-amber-900 group-hover:text-amber-700 transition-colors">
                      {site.nome}
                    </h3>
                    <div className="mt-3">
                      <span className="inline-flex items-center text-sm text-amber-700 hover:text-amber-900">
                        Acessar site
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              )}
            />
          </div>
          </div>
          {/* YouTube Section */}
          <YoutubeSection /> 
          </main>
        </div>
  );
};

export default Referencias;

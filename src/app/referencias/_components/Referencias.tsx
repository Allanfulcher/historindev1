'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import YoutubeSection from './YoutubeSection';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import TitleSubtitle from '../../../components/text/TitleSubtitle';
import Paragraph from '../../../components/text/Paragraph';
import DropDown from '../../../components/buttons/DropDown';
import { useLegacyData } from '../../../hooks/useLegacyData';
import { Organizacao, Autor, Obra, Site } from '../../../types';
import FeedbackPopup from '../../../components/popups/FeedbackPopup';
import QuizModal from '../../../components/popups/QuizModal';

type SectionType = 'orgs' | 'autores' | 'obras' | 'sites' | null;

const Referencias: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Use legacy data hook
  const { data } = useLegacyData();
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
    <div className="min-h-screen bg-[#f4ede0]">
      {/* Header */}
      <Header setMenuOpen={setMenuOpen} setShowFeedback={setShowFeedback} setShowQuiz={setShowQuiz} />
      
      {/* Side Menu */}
      <Menu 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
      />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-[#FEFCF8] rounded-lg shadow-sm p-6 md:p-8">
          <TitleSubtitle /> 
          <Paragraph /> 
          {/* Sections */}
          <div className="space-y-6">
            {/* Organizations Section */}
            <DropDown
              title="Organizações"
              items={data.orgs}
              itemKey="id"
              renderItem={(org: Organizacao) => (
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
                    <h3 className="text-lg font-bold text-center text-[#6B5B4F] group-hover:text-[#A0522D] transition-colors">
                      {org.fantasia}
                    </h3>
                    <p className="text-[#A0958A] mt-3 text-sm text-center flex-grow">{org.sobre}</p>
                    <div className="mt-4 flex justify-center">
                      <span className="inline-flex items-center px-4 py-2 bg-[#F5F1EB] text-[#6B5B4F] rounded-md text-sm font-medium hover:bg-[#CD853F] hover:text-white transition-colors">
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
              renderItem={(autor: Autor) => {
                const content = (
                  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col border border-gray-100">
                    <div className="flex-grow flex items-center justify-center mb-4 h-32">
                      <img
                        src={autor.foto}
                        alt={`${autor.nome} foto`}
                        className="h-32 w-32 rounded-full object-cover border-2 border-[#F5F1EB]"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-center text-[#6B5B4F] group-hover:text-[#A0522D] transition-colors">
                      {autor.nome}
                    </h3>
                    <p className="text-[#A0958A] mt-3 text-sm text-center flex-grow">{autor.bio}</p>
                  </div>
                );
                
                return autor.link ? (
                  <a 
                    href={autor.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="block">
                    {content}
                  </div>
                );
              }}
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
                  <div className="bg-[#FEFCF8] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col border border-[#F5F1EB] overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={obra.capa}
                        alt={`Capa de ${obra.titulo}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold text-[#6B5B4F] group-hover:text-[#A0522D] transition-colors">
                        {obra.titulo}
                      </h3>
                      <p className="text-[#A0958A] mt-2 text-sm flex-grow">
                        {obra.descricao}
                      </p>
                      {obra.pago && (
                        <span className="mt-3 inline-block bg-[#CD853F] text-white text-xs px-2 py-1 rounded-full">
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
                  <div className="bg-[#FEFCF8] p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col items-center border border-[#F5F1EB]">
                    <div className="h-16 w-full mb-4 flex items-center justify-center">
                      <img
                        src={site.logo}
                        alt={`Logo ${site.nome}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-center text-[#6B5B4F] group-hover:text-[#A0522D] transition-colors">
                      {site.nome}
                    </h3>
                    <div className="mt-3">
                      <span className="inline-flex items-center text-sm text-[#A0958A] hover:text-[#6B5B4F]">
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
          {showFeedback && (
            <FeedbackPopup  
              isOpen={showFeedback}
              onClose={() => setShowFeedback(false)}
            />
          )}
          {showQuiz && (
            <QuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
          )}
      </div>
  );
};

export default Referencias;


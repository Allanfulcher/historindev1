'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Contribuir from './contribuir';
import Menu from '../Menu';
import Header from '../Header';
import DropDown from '../buttons/DropDown';

interface TeamMember {
  name: string;
  role: string;
  description: string;
}

const Sobre: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const searchParams = useSearchParams();

  // Handle hash navigation for donation section
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#doacao") {
      const donationSection = document.getElementById("doacao");
      if (donationSection) {
        donationSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  // Note: SEO metadata is now handled by Next.js page metadata

  const teamMembers: TeamMember[] = [
    {
      name: 'Allan Fulcher',
      role: 'Fundador',
      description: `Allan Fulcher, fundador do Historin, é um empreendedor dinâmico com uma visão inovadora. Com experiência em múltiplos segmentos de negócios e uma profunda conexão com a cidade de Gramado, Allan acredita que a história deve ser preservada e contada de maneira acessível a todos. Com sua expertise em tecnologia e marketing, ele idealizou o Historin como uma maneira de imortalizar as histórias que moldaram a cidade, trazendo-as para o mundo digital.`,
    },
    {
      name: 'Mateus Canova',
      role: 'Co-fundador',
      description: `Mateus Canova, co-fundador do projeto, é um estrategista de marketing com uma mente criativa, responsável por trazer inovação e dinamismo ao Historin. Com uma vasta experiência em comunicação digital, Mateus está focado em conectar pessoas e histórias de uma forma única. Sua paixão por soluções visuais e narrativas envolventes é o que torna o Historin uma experiência não só informativa, mas também emocional para seus usuários.`,
    },
  ];

  const copyToClipboard = () => {
    const pixKey = '00020101021126580014br.gov.bcb.pix01368eac1054-b957-4af2-88c7-046b743ece015204000053039865802BR5925allcom comercio e servico6009SAO PAULO622905251J87ZBFMDTY970D6AP39DEHSC6304FDFB';
    navigator.clipboard.writeText(pixKey);
    alert('Chave Pix copiada!');
  };

  const handleJoinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xvgopalo', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        alert('Formulário enviado com sucesso!');
        setShowJoinModal(false);
        form.reset();
      } else {
        alert('Erro ao enviar formulário. Tente novamente.');
      }
    } catch (error) {
      alert('Erro ao enviar formulário. Tente novamente.');
    }
  };

  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <Header 
        setMenuOpen={() => setMenuOpen(true)} 
        setShowFeedback={() => {}} 
      />
      <Menu 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="mb-8">
          <nav className="flex items-center">
            <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <i className="fas fa-arrow-left text-xl text-gray-600"></i>
            </Link>
            <h1 className="text-2xl font-bold ml-4">Sobre Nós</h1>
          </nav>
        </header>

      {/* About Us Section */}
      <section className="mb-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Sobre o Historin</h2>
        <p className="text-gray-700 leading-relaxed">
          O Historin nasceu da paixão pela história, pela inovação e pelo desejo de conectar passado e presente de maneira interativa. Somos um projeto incubado na Secretaria de Cultura de Gramado, desenvolvido para preservar as memórias da cidade através de uma plataforma acessível e inovadora.
        </p>
      </section>

      {/* YouTube Video Section */}
      <section className="mb-10">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-sm"
            src="https://www.youtube.com/embed/1_oyH5Af9fk"
            title="Conheça o Historin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="mb-10 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Quem Somos</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Allan Fulcher e Mateus Canova, dois empreendedores apaixonados por tecnologia, inovação e desenvolvimento local, são os responsáveis pela criação do Historin.
        </p>

      {/* Team Members */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Nossa Equipe</h3>
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <DropDown
              key={member.name}
              title={
                <div className="flex items-center justify-between w-full">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-amber-600">{member.role}</div>
                  </div>
                </div>
              }
              items={[member]}
              itemKey="name"
              renderItem={(item) => (
                <div className="pt-3 mt-2 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              )}
              buttonClassName="w-full p-4 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left flex items-center justify-between"
              contentClassName="px-4 pb-4 -mt-2"
            />
          ))}
        </div>
      </div>
      </section>

      {/* We Need Help / Sign Up Section */}
      <section className="mb-10 bg-gradient-to-r from-amber-50 to-amber-50 rounded-xl p-6 shadow-sm">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Faça parte do Historin</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Estamos sempre em busca de pessoas apaixonadas por história, tecnologia e inovação para se juntarem ao nosso time. Se você deseja contribuir com o Historin, inscreva-se abaixo!
          </p>
          <button
            onClick={() => setShowJoinModal(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm hover:shadow"
          >
            Quero contribuir
          </button>
        </div>
      </section>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Junte-se ao Historin</h3>
              <button
                onClick={() => setShowJoinModal(false)}
                className="p-2 -mr-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500"
                aria-label="Fechar formulário"
              >
                <i className="w-5 h-5 fas fa-times"></i>
              </button>
            </div>
            <div className="max-h-[80vh] overflow-y-auto p-6">
              <Contribuir />
            </div>
          </div>
        </div>
      )}

      {/* Our Vision Section */}
      <section className="mb-6">
        <h2 className="text-center text-2xl font-bold mb-4">Nossa Visão</h2>
        <p className="text-justify">
          Queremos que o Historin seja mais do que um repositório de histórias. Nossa visão é que a plataforma seja uma ferramenta de aprendizado, inspiração e conexão. Acreditamos que ao contar as histórias de Gramado, desde os pioneiros até os dias atuais, podemos fortalecer a identidade local e conectar gerações de uma forma envolvente, usando tecnologias como QR codes e Realidade Aumentada para proporcionar uma "viagem no tempo".
        </p>
        <p className="text-justify mt-2">
          Nosso compromisso é com a valorização da história e da cultura local, criando experiências que inspirem tanto moradores quanto turistas a explorar as ruas de Gramado de um jeito novo e interativo.
        </p>
      </section>

      {/* Where We Are Section */}
      <section className="mb-6">
        <h2 className="text-center text-2xl font-bold mb-4">Onde Estamos</h2>
        <p className="text-justify">
          O projeto é incubado na Vila Joaquina, em parceria com a Secretaria de Cultura de Gramado, e estamos sempre trabalhando para expandir nossas iniciativas, incorporando novas histórias e novos olhares sobre o que faz de Gramado uma cidade tão única.
        </p>
      </section>

      {/* Support and Sponsorship Section */}
      <section className="mb-6">
        <h3 className="text-center text-xl font-bold mb-4">Apoio e Patrocínio</h3>
        
        {/* 2-column grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <img
              src="https://gramado.atende.net/static/portal/img/2024/08/30/img_79375C9ED9F9C9774D60D45812CF5EEEEBDB33F1.png"
              alt="Prefeitura de Gramado"
              className="mx-auto mb-1 h-12 w-auto"
            />
            <p className="text-sm">Prefeitura de Gramado</p>
          </div>

          <div className="text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiUtFDFGcK3PvoitnOMwfhL_eXzF7ihu9Q_Q&s"
              alt="Feevale"
              className="mx-auto mb-1 h-12 w-auto"
            />
            <p className="text-sm">Feevale</p>
          </div>

          <div className="text-center">
            <img
              src="fotos/orgs/logo-mundo-vapor.png"
              alt="Mundo a Vapor"
              className="mx-auto mb-1 h-12 w-auto"
            />
            <p className="text-sm">Mundo a Vapor</p>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="doacao" className="mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-center text-xl font-bold mb-4">Faça sua Doação</h3>
          <p className="text-center text-gray-600 mb-4">
            Contamos com financiamento coletivo e patrocínios para manter o Historin.com. Apoie o Historin e nos ajude a cobrir os custos mensais da plataforma.
          </p>
          <div className="flex justify-center">
            <button
              className="bg-[#8A5A44] text-white px-6 py-3 rounded-md hover:bg-[#D8A568] flex items-center space-x-2 transition-transform transform hover:scale-105"
              onClick={copyToClipboard}
            >
              <i className="fas fa-copy"></i>
              <span>Copiar Chave Pix</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="mb-6">
        <h3 className="text-center text-xl font-bold mb-4">Entre em Contato Conosco</h3>
        <div className="flex justify-around space-x-6">
          {/* WhatsApp Link */}
          <a
            href="https://wa.me/54993264627"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-green-500 hover:text-green-600 transition"
          >
            <i className="fab fa-whatsapp text-3xl"></i>
            <span className="text-sm">WhatsApp</span>
          </a>

          {/* Email Link */}
          <a
            href="mailto:contato@historin.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-blue-500 hover:text-blue-600 transition"
          >
            <i className="fas fa-envelope text-3xl"></i>
            <span className="text-sm">E-mail</span>
          </a>

          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/historin_ofc/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-pink-500 hover:text-pink-600 transition"
          >
            <i className="fab fa-instagram text-3xl"></i>
            <span className="text-sm">Instagram</span>
          </a>
        </div>
      </section>
    </div>
    </div>
  );
};
export default Sobre;

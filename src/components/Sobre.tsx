'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface TeamMember {
  name: string;
  role: string;
  description: string;
}

const Sobre: React.FC = () => {
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

  return (
    <div className="p-4 w-full lg:w-4/5 mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <div className="text-2xl cursor-pointer">
          <Link href="/">
            <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
        <h1 className="text-lg font-bold">Sobre Nós</h1>
        <div className="w-10 h-10"></div>
      </header>

      {/* About Us Section */}
      <section className="mb-6">
        <h2 className="text-center text-2xl font-bold mb-4">Sobre Nós</h2>
        <p className="text-justify">
          O Historin nasceu da paixão pela história, pela inovação e pelo desejo de conectar passado e presente de maneira interativa. Somos um projeto incubado na Secretaria de Cultura de Gramado, desenvolvido para preservar as memórias da cidade através de uma plataforma acessível e inovadora.
        </p>
      </section>

      {/* YouTube Video Section */}
      <section className="mb-6">
        <div className="video-container mb-4">
          <iframe
            width="100%"
            height="215"
            src="https://www.youtube.com/embed/1_oyH5Af9fk"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="mb-6">
        <h2 className="text-center text-2xl font-bold mb-4">Quem Somos</h2>
        <p className="text-justify mb-4">
          Allan Fulcher e Mateus Canova, dois empreendedores apaixonados por tecnologia, inovação e desenvolvimento local, são os responsáveis pela criação do Historin.
        </p>
      </section>

      {/* Creation and Curation Section */}
      <section className="mb-6">
        <h3 className="text-center text-xl font-bold mb-4">Criação e Curadoria</h3>
        <div className="space-y-2">
          {teamMembers.map((member, index) => (
            <button
              key={index}
              className={`w-full py-2 px-4 rounded-full focus:outline-none flex justify-between items-center transition-colors duration-300 ${
                selectedMember === member ? 'bg-[#8A5A44] text-white' : 'bg-gray-200 text-black'
              }`}
              onClick={() => setSelectedMember(selectedMember === member ? null : member)}
            >
              <span>{member.name}</span>
              <i
                className={`fas ${
                  selectedMember === member ? 'fa-chevron-up' : 'fa-chevron-down'
                } transition-transform duration-300`}
              ></i>
            </button>
          ))}
        </div>
        {/* Display selected member description */}
        {selectedMember && (
          <div className="mt-4 border border-black p-4 rounded-md bg-[#f5f1e8]">
            <h4 className="text-xl font-bold mb-2">{selectedMember.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{selectedMember.role}</p>
            <p>{selectedMember.description}</p>
          </div>
        )}
      </section>

      {/* We Need Help / Sign Up Section */}
      <section className="mb-6">
        <h3 className="text-center text-xl font-bold mb-4">Precisamos de Ajuda</h3>
        <p className="text-center text-gray-700 mb-4">
          Estamos sempre em busca de pessoas apaixonadas por história, tecnologia e inovação para se juntarem ao nosso time. Se você deseja contribuir com o Historin, inscreva-se abaixo!
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => setShowJoinModal(true)}
            className="bg-[#8A5A44] text-white px-6 py-3 rounded-md hover:bg-[#5a3e2e] transition"
          >
            Cadastre-se
          </button>
        </div>
      </section>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowJoinModal(false)}
              aria-label="Fechar formulário"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">Junte-se ao Historin</h3>
            <form onSubmit={handleJoinSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                  Nome:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nome"
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  E-mail:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Seu e-mail"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cargo">
                  Cargo de Interesse:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cargo"
                  type="text"
                  name="cargo"
                  placeholder="Qual posição você deseja ocupar?"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mensagem">
                  Mensagem:
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  placeholder="Por que você quer se juntar ao Historin?"
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Enviar
                </button>
              </div>
            </form>
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
  );
};

export default Sobre;

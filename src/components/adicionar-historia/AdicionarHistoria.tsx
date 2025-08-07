'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../Header';
import Menu from '../Menu';
import AddForm from './AddForm';

interface FormData {
  nome: string;
  telefone: string;
  local: string;
  historia: string;
}

const AdicionarHistoria: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    telefone: '',
    local: '',
    historia: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formspreeEndpoint = "https://formspree.io/f/meojbabr";

    const data = {
      nome: formData.nome,
      telefone: formData.telefone,
      local: formData.local,
      historia: formData.historia
    };

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('História enviada com sucesso! Entraremos em contato para captar os materiais que serão postados no seu nome.');
        setFormData({
          nome: '',
          telefone: '',
          local: '',
          historia: ''
        });
      } else {
        alert('Houve um problema ao enviar sua história. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Houve um erro ao enviar sua história. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header setMenuOpen={() => {}} setShowFeedback={() => {}} />
      <Menu menuOpen={false} setMenuOpen={() => {}} />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header with back button and title */}
        <div className="flex items-center mb-6">
          <Link 
            href="/" 
            className="flex items-center text-gray-700 hover:text-amber-700 transition-colors"
          >
            <i className="fas fa-arrow-left text-xl mr-3"></i>
            <span className="text-lg font-medium">Voltar</span>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Page header */}
          <div className="bg-amber-800 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              Compartilhe seu acervo
            </h1>
          </div>
          <div className="p-6">
            <p className="mb-6 text-gray-700 leading-relaxed">
              Dependemos de pessoas como você para aumentar nosso acervo. Vamos até o local para captar uma série de fotos ou até mesmo apenas uma história que você queira compartilhar.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <AddForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdicionarHistoria;

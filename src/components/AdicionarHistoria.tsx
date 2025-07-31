'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <div className="text-2xl cursor-pointer">
          <Link href="/">
            <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
        <h1 className="text-lg font-bold">Compartilhe seu acervo</h1>
        <div className="w-10 h-10"></div>
      </header>
      
      <div className="bg-[#f5f0e1] p-4 rounded-lg shadow-md max-w-lg mx-auto">
        <p className="mb-4 text-gray-700">
          Dependemos de pessoas como você para aumentar nosso acervo. Vamos até o local para captar uma série de fotos ou até mesmo apenas uma história que você queira compartilhar.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
              Nome:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nome"
              type="text"
              placeholder="Seu nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefone">
              Telefone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="telefone"
              type="text"
              placeholder="Seu telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="local">
              Local:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="local"
              type="text"
              placeholder="Local relacionado à história"
              value={formData.local}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="historia">
              Conte sua história:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="historia"
              rows={4}
              placeholder="Compartilhe uma história relacionada ao local ou à época descrita. Pode ser um acontecimento histórico, memórias pessoais ou contribuições culturais."
              value={formData.historia}
              onChange={handleChange}
              required
            />
          </div>

          {/* Informational card about the material collection process */}
          <div className="mb-4 p-4 bg-[#e2e8f0] rounded">
            <p className="text-gray-700">
              Sua história passará por análise e entraremos em contato para captar os materiais que serão postados em seu nome.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-[#8A5A44] hover:bg-[#5a3e2e] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarHistoria;

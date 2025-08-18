'use client';

import { useState } from 'react';

interface FormData {
    nome: string;
    telefone: string;
    local: string;
    historia: string;
}

const AddForm: React.FC = () => {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#4A3F35] text-sm font-bold mb-2" htmlFor="nome">
              Nome:
            </label>
            <input
              className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
              id="nome"
              type="text"
              placeholder="Seu nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#4A3F35] text-sm font-bold mb-2" htmlFor="telefone">
              Telefone:
            </label>
            <input
              className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
              id="telefone"
              type="text"
              placeholder="Seu telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#4A3F35] text-sm font-bold mb-2" htmlFor="local">
              Local:
            </label>
            <input
              className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
              id="local"
              type="text"
              placeholder="Local relacionado à história"
              value={formData.local}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#4A3F35] text-sm font-bold mb-2" htmlFor="historia">
              Conte sua história:
            </label>
            <textarea
              className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
              id="historia"
              rows={4}
              placeholder="Compartilhe uma história relacionada ao local ou à época descrita. Pode ser um acontecimento histórico, memórias pessoais ou contribuições culturais."
              value={formData.historia}
              onChange={handleChange}
              required
            />
          </div>

          {/* Informational card about the material collection process */}
          <div className="mb-4 p-4 bg-[#F5F1EB] rounded">
            <p className="text-[#6B5B4F]">
              Sua história passará por análise e entraremos em contato para captar os materiais que serão postados em seu nome.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-colors duration-200"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
    );
};

export default AddForm;
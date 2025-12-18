'use client';

import { useState } from 'react';

interface FormData {
    nome: string;
    telefone: string;
    local: string;
    historia: string;
}

interface SubmissionState {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
}

const AddForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        telefone: '',
        local: '',
        historia: ''
    });

    const [submissionState, setSubmissionState] = useState<SubmissionState>({
        isSubmitting: false,
        isSuccess: false,
        error: null
    });

    // Google Apps Script URL for story submissions
    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwN3qNr2dG5ijnCYnFHs5nzfiFZFlsyPzPuTLbjKqvwf8qwbjWvWm6PkZxCfKajgVnoKQ/exec';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Reset submission state
        setSubmissionState({
            isSubmitting: true,
            isSuccess: false,
            error: null
        });

        const formElement = e.currentTarget;

        // Create and submit form via hidden iframe (bypasses CORS)
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'add-historia-frame';
        document.body.appendChild(iframe);

        const form = document.createElement('form');
        form.action = GOOGLE_APPS_SCRIPT_URL;
        form.method = 'POST';
        form.target = 'add-historia-frame';

        // Add form fields
        const fields = [
            { name: 'nome', value: formData.nome },
            { name: 'telefone', value: formData.telefone },
            { name: 'local', value: formData.local },
            { name: 'historia', value: formData.historia }
        ];

        fields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();

        // Clean up and show success after submission
        setTimeout(() => {
            document.body.removeChild(form);
            document.body.removeChild(iframe);
            
            setSubmissionState({
                isSubmitting: false,
                isSuccess: true,
                error: null
            });

            // Reset form data
            setFormData({
                nome: '',
                telefone: '',
                local: '',
                historia: ''
            });

            // Reset form using stored reference
            if (formElement) {
                formElement.reset();
            }

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSubmissionState({
                    isSubmitting: false,
                    isSuccess: false,
                    error: null
                });
            }, 3000);
        }, 1000);
    };
    return (
        <form onSubmit={handleSubmit}>
          {/* Success Message */}
          {submissionState.isSuccess && (
            <div className="mb-4 p-4 bg-[#6B8E23]/10 border border-[#6B8E23]/30 text-[#4A3F35] rounded-lg">
              <div className="flex items-center">
                <i className="fas fa-check-circle mr-2 text-[#6B8E23]"></i>
                História enviada com sucesso! Entraremos em contato para captar os materiais.
              </div>
            </div>
          )}

          {/* Error Message */}
          {submissionState.error && (
            <div className="mb-4 p-4 bg-[#A0522D]/10 border border-[#A0522D]/30 text-[#4A3F35] rounded-lg">
              <div className="flex items-center">
                <i className="fas fa-exclamation-circle mr-2 text-[#A0522D]"></i>
                {submissionState.error}
              </div>
            </div>
          )}

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
              disabled={submissionState.isSubmitting}
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
              disabled={submissionState.isSubmitting}
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
              disabled={submissionState.isSubmitting}
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
              disabled={submissionState.isSubmitting}
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
              type="submit"
              disabled={submissionState.isSubmitting}
              className={`font-medium py-2.5 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all duration-200 ${
                submissionState.isSubmitting
                  ? 'bg-[#A0958A] cursor-not-allowed text-white'
                  : 'bg-[#8B4513] hover:bg-[#A0522D] text-white shadow-sm hover:shadow-md'
              }`}
            >
              {submissionState.isSubmitting ? (
                <div className="flex items-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Enviando...
                </div>
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        </form>
    );
};

export default AddForm;
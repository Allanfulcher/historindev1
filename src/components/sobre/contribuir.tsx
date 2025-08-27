'use client';

import React, { useState } from 'react';

const Contribuir: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

    // Google Apps Script URL - you'll need to create a separate script for this form
    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwUpCZnKxIpknIGRWDJD2FaycKppB9ilt323dpZoBmEv8nRbgCpHDlNrTQwZD5Axkrhig/exec';

    const handleJoinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        const formElement = e.currentTarget;
        const formData = new FormData(formElement);
        const formValues = Object.fromEntries(formData.entries());
        
        // Create and submit form via hidden iframe (bypasses CORS)
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'contribuir-frame';
        document.body.appendChild(iframe);

        const form = document.createElement('form');
        form.action = GOOGLE_APPS_SCRIPT_URL;
        form.method = 'POST';
        form.target = 'contribuir-frame';

        // Add form fields
        const fields = [
            { name: 'nome', value: formValues.nome as string || '' },
            { name: 'email', value: formValues.email as string || '' },
            { name: 'mensagem', value: formValues.mensagem as string || '' }
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
            
            setSubmitStatus({
                success: true,
                message: 'Obrigado por se inscrever! Entraremos em contato em breve.'
            });
            
            // Reset form using stored reference
            if (formElement) {
                formElement.reset();
            }
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <form onSubmit={handleJoinSubmit} className="space-y-4 px-4 py-6">
            {submitStatus && (
                <div className={`p-4 rounded-lg ${submitStatus.success ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    <p className="font-medium">{submitStatus.message}</p>
                </div>
            )}
            
            <div className="space-y-1">
                <label htmlFor="nome" className="block text-sm font-semibold text-amber-900">
                    Nome completo
                </label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    className="mt-1 block w-full rounded-lg border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-amber-900 text-base p-3 border"
                    placeholder="Digite seu nome completo"
                    disabled={isSubmitting}
                />
            </div>
            
            <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-semibold text-amber-900">
                    E-mail
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-lg border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-amber-900 text-base p-3 border"
                    placeholder="seu@email.com"
                    disabled={isSubmitting}
                />
            </div>
            
            <div className="space-y-1">
                <label htmlFor="mensagem" className="block text-sm font-semibold text-amber-900">
                    Mensagem (opcional)
                </label>
                <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={4}
                    className="mt-1 block w-full rounded-lg border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-amber-900 text-base p-3 border"
                    placeholder="Conte-nos como você gostaria de contribuir..."
                    disabled={isSubmitting}
                />
            </div>
            
            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white ${
                        isSubmitting 
                            ? 'bg-amber-600' 
                            : 'bg-amber-700 hover:bg-amber-800'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                        </>
                    ) : (
                        <span>Enviar mensagem</span>
                    )}
                </button>
            </div>
            
            <p className="text-xs text-amber-700 text-center pt-2">
                Ao se inscrever, você concorda com nossa Política de Privacidade.
            </p>
        </form>
    );
};

export default Contribuir;

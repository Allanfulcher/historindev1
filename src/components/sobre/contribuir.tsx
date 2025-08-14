'use client';

import React, { useState } from 'react';

const Contribuir: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

    const handleJoinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        try {
            const formData = new FormData(e.currentTarget);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', formValues);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSubmitStatus({
                success: true,
                message: 'Obrigado por se inscrever! Entraremos em contato em breve.'
            });
            e.currentTarget.reset();
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus({
                success: false,
                message: 'Ocorreu um erro. Por favor, tente novamente mais tarde.'
            });
        } finally {
            setIsSubmitting(false);
        }
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

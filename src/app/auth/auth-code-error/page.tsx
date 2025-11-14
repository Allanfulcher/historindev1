'use client';

import Link from 'next/link';

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-4">
          <i className="fas fa-exclamation-triangle text-amber-500 text-5xl"></i>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Erro na Autenticação
        </h1>
        <p className="text-gray-600 mb-6">
          Ocorreu um erro ao fazer login com sua conta Google. Por favor, tente novamente.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}

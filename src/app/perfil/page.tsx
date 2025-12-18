'use client';

import { useUserData } from '@/hooks/useUserData';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import LoadingPage from '@/components/LoadingPage';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { featureFlags } from '@/config/featureFlags';

export default function PerfilPage() {
  const { 
    isAuthenticated, 
    profile, 
    quizStats,
    qrHuntProgress,
    loading,
    signIn,
    signOut
  } = useUserData();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return <LoadingPage message="Carregando perfil..." />;
  }

  // Show coming soon if features are disabled
  if (!featureFlags.userProfile || !featureFlags.googleAuth) {
    return (
      <div className="min-h-screen bg-[#f4ede0]">
        <Header setMenuOpen={setMenuOpen} setShowFeedback={() => {}} setShowQuiz={() => {}} />
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-[#FEFCF8] p-8 rounded-lg shadow-sm ring-1 ring-[#A0958A]/20 text-center">
            <div className="mb-6">
              <i className="fas fa-clock text-6xl text-[#8B4513]"></i>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-[#4A3F35]">
              Em Breve!
            </h1>
            <p className="text-[#6B5B4F] mb-4">
              O sistema de perfis estará disponível em breve.
            </p>
            <p className="text-sm text-[#A0958A] mb-6">
              Enquanto isso, explore as histórias das ruas de Gramado e Canela.
            </p>
            <Link
              href="/"
              className="bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold py-2 px-6 rounded transition-colors inline-flex items-center gap-2"
            >
              <i className="fas fa-home"></i>
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f4ede0]">
        <Header setMenuOpen={setMenuOpen} setShowFeedback={() => {}} setShowQuiz={() => {}} />
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-[#FEFCF8] p-8 rounded-lg shadow-sm ring-1 ring-[#A0958A]/20 text-center">
            <div className="mb-6">
              <i className="fas fa-user-circle text-6xl text-[#A0958A]"></i>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-[#4A3F35]">
              Perfil do Usuário
            </h1>
            <p className="text-[#6B5B4F] mb-6">
              Faça login para ver seu perfil
            </p>
            <button
              onClick={signIn}
              className="bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold py-2 px-6 rounded transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Entrar com Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz stats are now simple: { gramado: number | null, canela: number | null }

  return (
    <div className="min-h-screen bg-[#f4ede0]">
      <Header setMenuOpen={setMenuOpen} setShowFeedback={() => {}} setShowQuiz={() => {}} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-[#FEFCF8] p-6 rounded-lg shadow-sm ring-1 ring-[#A0958A]/20 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt={profile.displayName}
                className="w-20 h-20 rounded-full ring-4 ring-[#E6D3B4]"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#E6D3B4] flex items-center justify-center">
                <i className="fas fa-user text-3xl text-[#6B5B4F]"></i>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-[#4A3F35] mb-1">
                {profile.displayName}
              </h1>
              <p className="text-sm text-[#6B5B4F] break-words">
                <i className="fas fa-envelope mr-2"></i>
                {profile.email}
              </p>
            </div>
          </div>
          
        </div>

        {/* Sign Out Section - Moved to bottom */}

        {/* QR Hunt Progress - First Section */}
        {qrHuntProgress && qrHuntProgress.total > 0 ? (
          <div className="bg-[#FEFCF8] p-6 rounded-lg shadow-sm ring-1 ring-[#A0958A]/20 mb-6">
            <h2 className="text-xl font-bold text-[#4A3F35] mb-4">
              <i className="fas fa-qrcode mr-2"></i>
              Caça ao QR Code
            </h2>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#6B5B4F]">
                  {qrHuntProgress.scanned} de {qrHuntProgress.total} QR Codes encontrados
                </span>
                <span className="text-sm font-bold text-[#8B4513]">
                  {qrHuntProgress.percentage}%
                </span>
              </div>
              <div className="w-full bg-[#F5F1EB] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${qrHuntProgress.percentage}%` }}
                />
              </div>
            </div>

            {qrHuntProgress.percentage === 100 ? (
              <div className="bg-[#6B8E23]/10 border-2 border-[#6B8E23] rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <i className="fas fa-trophy text-3xl text-[#6B8E23]"></i>
                  <div>
                    <p className="font-bold text-[#4A3F35] mb-1">
                      🎉 Parabéns! Você completou a caça!
                    </p>
                    <p className="text-sm text-[#6B5B4F]">
                      Você encontrou todos os QR Codes da cidade!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#F5F1EB] rounded-lg p-4 mb-4">
                <p className="text-sm text-[#6B5B4F]">
                  Continue explorando a cidade para encontrar mais QR Codes!
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-[#F5F1EB]">
              <Link
                href="/caca-qr"
                className="text-sm text-[#8B4513] hover:text-[#A0522D] transition-colors inline-flex items-center gap-2"
              >
                <i className="fas fa-camera"></i>
                Continuar caça ao QR Code
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-[#FEFCF8] p-6 rounded-lg shadow-sm ring-1 ring-[#A0958A]/20 mb-6">
            <h2 className="text-xl font-bold text-[#4A3F35] mb-4">
              <i className="fas fa-qrcode mr-2"></i>
              Caça ao QR Code
            </h2>
            <p className="text-[#6B5B4F] mb-4">
              Você ainda não começou a caça ao QR Code. Explore a cidade e encontre QR Codes escondidos!
            </p>
            <Link
              href="/caca-qr"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white py-2 px-4 rounded transition-all text-sm"
            >
              <i className="fas fa-camera"></i>
              Começar Caça ao QR Code
            </Link>
          </div>
        )}

        {/* Quiz Scores - Second Section */}
        {quizStats && (quizStats.gramado !== null || quizStats.canela !== null) ? (
          <div className="bg-[#FEFCF8] p-6 rounded-lg shadow-sm ring-1 ring-[#A0958A]/20 mb-6">
            <h2 className="text-xl font-bold text-[#4A3F35] mb-4">
              <i className="fas fa-clipboard-check mr-2"></i>
              Quizes
            </h2>
            
            <div className="space-y-3">
              {/* Gramado Score */}
              {quizStats.gramado !== null && (
                <div className="flex items-center justify-between p-4 bg-[#F5F1EB] rounded-lg">
                  <div>
                    <p className="font-medium text-[#4A3F35]">Gramado</p>
                    <p className="text-sm text-[#A0958A]">Melhor resultado</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#8B4513]">
                      {quizStats.gramado}%
                    </p>
                  </div>
                </div>
              )}

              {/* Canela Score */}
              {quizStats.canela !== null && (
                <div className="flex items-center justify-between p-4 bg-[#F5F1EB] rounded-lg">
                  <div>
                    <p className="font-medium text-[#4A3F35]">Canela</p>
                    <p className="text-sm text-[#A0958A]">Melhor resultado</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#8B4513]">
                      {quizStats.canela}%
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-[#F5F1EB]">
              <Link
                href="/quiz"
                className="text-sm text-[#8B4513] hover:text-[#A0522D] transition-colors inline-flex items-center gap-2"
              >
                <i className="fas fa-redo"></i>
                Fazer outro quiz
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-[#FEFCF8] p-6 rounded-lg shadow-sm ring-1 ring-[#A0958A]/20 mb-6">
            <h2 className="text-xl font-bold text-[#4A3F35] mb-4">
              <i className="fas fa-clipboard-check mr-2"></i>
              Quizes
            </h2>
            <p className="text-[#6B5B4F] mb-4">
              Você ainda não completou nenhum quiz.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 bg-[#8B4513] hover:bg-[#A0522D] text-white py-2.5 px-5 rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow-md"
            >
              <i className="fas fa-play"></i>
              Fazer um Quiz
            </Link>
          </div>
        )}

        {/* Sign Out Section - At the bottom */}
        <div className="bg-[#FEFCF8] p-6 rounded-lg shadow-sm ring-1 ring-[#A0958A]/20 mb-6">
          <h2 className="text-lg font-bold text-[#4A3F35] mb-3">
            <i className="fas fa-cog mr-2"></i>
            Configurações
          </h2>
          <button
            onClick={handleSignOut}
            className="text-sm text-[#A0522D] hover:text-[#8B4513] transition-colors inline-flex items-center gap-2"
            title="Desconectar"
          >
            <i className="fas fa-sign-out-alt"></i>
            Desconectar da Conta
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * User Utilities Example Component
 * 
 * Demonstrates all features of the user utilities system.
 * Use this as a reference for implementing user features.
 */

'use client';

import { useState } from 'react';
import { useUserData, useUserQuiz } from '@/hooks/useUserData';

// ============================================================================
// EXAMPLE 1: User Profile Display
// ============================================================================

export function UserProfileExample() {
  const { isAuthenticated, profile, signIn, signOut, loading } = useUserData({
    autoLoadQuizData: false, // We don't need quiz data here
  });

  if (loading) {
    return <div className="p-4">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 border rounded-lg">
        <p className="mb-4">Você não está logado</p>
        <button 
          onClick={signIn}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Entrar com Google
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-4 mb-4">
        {profile.avatar && (
          <img 
            src={profile.avatar} 
            alt={profile.displayName}
            className="w-16 h-16 rounded-full"
          />
        )}
        <div>
          <h3 className="text-xl font-bold">{profile.displayName}</h3>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>
      
      <button 
        onClick={signOut}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sair
      </button>
    </div>
  );
}

// ============================================================================
// EXAMPLE 2: Quiz Statistics Dashboard
// ============================================================================

export function QuizStatsExample({ city }: { city?: string }) {
  const { quizStats, quizHistory, loading, isAuthenticated } = useUserData({ city });

  if (!isAuthenticated) {
    return (
      <div className="p-4 text-center">
        <p>Faça login para ver suas estatísticas</p>
      </div>
    );
  }

  if (loading) {
    return <div className="p-4">Carregando estatísticas...</div>;
  }

  if (!quizStats || quizStats.totalQuizzes === 0) {
    return (
      <div className="p-4 text-center">
        <p>Você ainda não completou nenhum quiz</p>
        <p className="text-sm text-gray-600 mt-2">
          Complete um quiz para ver suas estatísticas!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Suas Estatísticas</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Total de Quizzes</p>
          <p className="text-3xl font-bold text-blue-600">{quizStats.totalQuizzes}</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Média</p>
          <p className="text-3xl font-bold text-green-600">
            {quizStats.averagePercentage.toFixed(1)}%
          </p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">Melhor Resultado</p>
          <p className="text-3xl font-bold text-purple-600">
            {quizStats.bestPercentage}%
          </p>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-lg">
          <p className="text-sm text-gray-600">Cidades Jogadas</p>
          <p className="text-3xl font-bold text-amber-600">
            {quizStats.citiesPlayed.length}
          </p>
        </div>
      </div>

      {/* Cities List */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Cidades</h3>
        <div className="flex flex-wrap gap-2">
          {quizStats.citiesPlayed.map(cityName => (
            <span 
              key={cityName}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {cityName}
            </span>
          ))}
        </div>
      </div>

      {/* Recent History */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Histórico Recente</h3>
        <div className="space-y-2">
          {quizHistory.slice(0, 5).map(quiz => (
            <div 
              key={quiz.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{quiz.city}</p>
                <p className="text-sm text-gray-600">
                  {new Date(quiz.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{quiz.percentage}%</p>
                <p className="text-sm text-gray-600">
                  {quiz.score}/{quiz.total_questions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 3: Quiz Submission Form
// ============================================================================

export function QuizSubmissionExample({ city }: { city: string }) {
  const { saveQuiz, isAuthenticated, stats } = useUserQuiz(city);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Mock quiz data - replace with real quiz logic
  const mockAnswers = [
    { questionId: 1, answer: 'A', correct: true },
    { questionId: 2, answer: 'B', correct: true },
    { questionId: 3, answer: 'C', correct: false },
    { questionId: 4, answer: 'A', correct: true },
    { questionId: 5, answer: 'D', correct: true },
    { questionId: 6, answer: 'B', correct: false },
    { questionId: 7, answer: 'C', correct: true },
    { questionId: 8, answer: 'A', correct: true },
    { questionId: 9, answer: 'D', correct: false },
    { questionId: 10, answer: 'B', correct: true },
  ];

  async function handleSubmit() {
    setSubmitting(true);

    const score = mockAnswers.filter(a => a.correct).length;
    const totalQuestions = mockAnswers.length;
    const percentage = (score / totalQuestions) * 100;

    if (isAuthenticated) {
      // Save to database for logged users
      const result = await saveQuiz({
        city,
        score,
        totalQuestions,
        percentage,
        answers: mockAnswers,
      });

      if (result) {
        console.log('Quiz saved successfully:', result);
      }
    } else {
      // Just show results for anonymous users
      console.log('Anonymous submission - not saved');
    }

    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    const score = mockAnswers.filter(a => a.correct).length;
    const percentage = (score / mockAnswers.length) * 100;

    return (
      <div className="p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold">Quiz Completo!</h2>
        
        <div className="p-6 bg-green-50 rounded-lg">
          <p className="text-4xl font-bold text-green-600">{percentage}%</p>
          <p className="text-gray-600 mt-2">
            Você acertou {score} de {mockAnswers.length} questões
          </p>
        </div>

        {isAuthenticated ? (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              ✓ Resultado salvo no seu perfil!
            </p>
            {stats && (
              <p className="text-sm text-blue-600 mt-2">
                Sua média em {city}: {stats.averagePercentage.toFixed(1)}%
              </p>
            )}
          </div>
        ) : (
          <div className="p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-800">
              Faça login para salvar seus resultados!
            </p>
          </div>
        )}

        <button 
          onClick={() => setSubmitted(false)}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Quiz - {city}</h2>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Este é um exemplo de formulário de quiz.
          Em produção, aqui estariam as perguntas reais.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Total de questões: {mockAnswers.length}
        </p>
      </div>

      {!isAuthenticated && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            💡 Faça login para salvar seus resultados e acompanhar seu progresso!
          </p>
        </div>
      )}

      <button 
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {submitting ? 'Enviando...' : 'Enviar Quiz'}
      </button>
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Complete Demo Page
// ============================================================================

export default function UserUtilitiesDemo() {
  const [selectedCity, setSelectedCity] = useState('São Paulo');
  const cities = ['São Paulo', 'Rio de Janeiro'];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Utilities Demo</h1>
        <p className="text-gray-600">
          Demonstração completa do sistema de utilidades de usuário
        </p>
      </div>

      {/* City Selector */}
      <div className="flex gap-2">
        {cities.map(city => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-lg ${
              selectedCity === city
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Examples Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="border rounded-lg">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold">1. Perfil do Usuário</h3>
          </div>
          <UserProfileExample />
        </div>

        {/* Quiz Submission */}
        <div className="border rounded-lg">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold">2. Envio de Quiz</h3>
          </div>
          <QuizSubmissionExample city={selectedCity} />
        </div>
      </div>

      {/* Stats - Full Width */}
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold">3. Estatísticas do Usuário</h3>
        </div>
        <QuizStatsExample city={selectedCity} />
      </div>

      {/* Documentation Link */}
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold mb-2">📚 Documentação</h3>
        <p className="text-sm text-gray-700 mb-4">
          Para mais informações sobre como usar o sistema de utilidades de usuário,
          consulte o guia completo em <code className="bg-white px-2 py-1 rounded">USER_UTILITIES_GUIDE.md</code>
        </p>
        <div className="space-y-2 text-sm">
          <p><strong>Principais recursos:</strong></p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Hook <code>useUserData()</code> para acesso completo aos dados do usuário</li>
            <li>Hook <code>useUserQuiz()</code> para operações específicas de quiz</li>
            <li>Service <code>userService</code> para uso direto em funções</li>
            <li>Suporte completo a TypeScript</li>
            <li>Fácil de estender com novos recursos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

'use client';

import Header from '@/components/Header';
import Menu from '@/components/Menu';
import FeedbackPopup from '@/components/popups/FeedbackPopup';
import QuizModal from '@/components/popups/QuizModal';
import LoadingPage from '@/components/LoadingPage';
import LoadingSpinner from '@/components/LoadingSpinner';
import { legacyQuestions } from '@/data/legacyData';
import React, { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { submitQuiz } from '@/utils/quizApi';

interface Question {
  id?: string;
  question: string;
  answers: string[];
  correct: number;
  city?: number;
}

interface ScoreEntry {
  name: string;
  email: string;
  city: string;
  score: number;
  percentage: number;
}

// Use questions from legacy data (fallback)
const legacyPool: Question[] = legacyQuestions;

function getRandomQuestions(all: Question[], num: number, cityFilter: number): Question[] {
  // Filter questions based on city (0 = both cities, 1 = Gramado, 2 = Canela)
  // Include questions without city property (treat as general questions)
  const filtered = all.filter(q => 
    q.city === 0 || 
    q.city === cityFilter || 
    q.city === undefined
  );
  
  // Fisher-Yates shuffle for proper randomization without repeats
  const shuffled = [...filtered];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(num, shuffled.length));
}

async function fetchQuestionsFromSupabase(cityFilter: number, limit = 10): Promise<Question[]> {
  // Try to fetch from DB; if anything fails, throw and caller can fallback
  const { data, error } = await supabaseBrowser
    .from('quiz_questions')
    .select('id, city, question, options, answer')
    .in('city', [0, cityFilter]);

  if (error) throw error;
  const mapped: Question[] = (data || []).map((q: any) => ({
    id: q.id,
    city: q.city,
    question: q.question,
    answers: q.options,
    correct: (q.answer ?? 1) - 1, // DB is 1-based, UI uses 0-based
  }));

  // Shuffle and take limit
  const shuffled = [...mapped];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(limit, shuffled.length));
}

export default function QuizPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answersDisabled, setAnswersDisabled] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  // Inline feedback for correct/incorrect answer
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [score, setScore] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  // Modal feedback form state
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  // Track chosen answers for analytics/storage
  const [answersGiven, setAnswersGiven] = useState<number[]>([]);
  // Loading fetched questions
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  



  // Simple loading effect
  useEffect(() => {
    const loadData = async () => {
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsLoading(false);
    };
    loadData();
  }, []);


  const handleAnswer = (idx: number) => {
    if (answersDisabled) return;
    setAnswersDisabled(true);
    setSelectedAnswerIndex(idx);
    const correctIndex = selectedQuestions[currentQuestion]?.correct;
    const correct = idx === correctIndex;
    setIsCorrect(correct);
    if (correct) {
      setScore((s) => s + 10);
      setFeedbackMessage('Correto!');
    } else {
      setFeedbackMessage('Incorreto!');
    }
    // record chosen answer
    setAnswersGiven((prev) => {
      const next = [...prev];
      next[currentQuestion] = idx;
      return next;
    });
    setShowAnswerFeedback(true);
    setTimeout(() => {
      setShowAnswerFeedback(false);
      setSelectedAnswerIndex(null);
      setCurrentQuestion((q) => q + 1);
      setAnswersDisabled(false);
      setIsCorrect(null);
    }, 1000);
  };

  // When quiz is finished
  useEffect(() => {
    if (selectedQuestions.length > 0 && currentQuestion >= selectedQuestions.length) {
      setQuizCompleted(true);
      setQuizStarted(false);
    }
  }, [currentQuestion, selectedQuestions.length]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEmail(true);
    
    try {
      const percentage = Math.round((score / (selectedQuestions.length * 10)) * 100);
      // Build answers payload
      const answersPayload = selectedQuestions.map((q, i) => ({
        id: q.id || null,
        question: q.question,
        chosen: answersGiven[i] ?? null,
        correct: q.correct,
        options: q.answers,
      }));

      // Submit to our Supabase-backed API
      await submitQuiz({
        answers: answersPayload,
        score,
        meta: {
          name,
          email,
          city,
          percentage,
          totalQuestions: selectedQuestions.length,
          ts: new Date().toISOString(),
        },
      });

      // UX delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setSubmissionError('');
      setScoreSubmitted(true);
    } catch (err) {
      console.error('Erro ao enviar email:', err);
      setSubmissionError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  // Function to start quiz
  const startQuiz = async () => {
    if (!name || !email || !city) {
      alert('Por favor, preencha todos os campos antes de começar o quiz.');
      return;
    }
    
    setQuizStarted(true);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestion(0);
    setAnswersGiven([]);
    setLoadingQuestions(true);
    
    // Convert city name to number for filtering
    const cityFilter = city === 'Gramado' ? 1 : city === 'Canela' ? 2 : 1;
    try {
      const dbQuestions = await fetchQuestionsFromSupabase(cityFilter, 10);
      if (dbQuestions.length > 0) {
        setSelectedQuestions(dbQuestions);
      } else {
        // fallback to legacy content if no DB questions
        setSelectedQuestions(getRandomQuestions(legacyPool, 10, cityFilter));
      }
    } catch (e) {
      console.warn('Falha ao buscar perguntas no Supabase, usando legado:', e);
      setSelectedQuestions(getRandomQuestions(legacyPool, 10, cityFilter));
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Function to reset quiz completely
  const resetQuiz = () => {
    setName('');
    setEmail('');
    setCity('');
    setQuizStarted(false);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedQuestions([]);
    setScoreSubmitted(false);
    setSubmissionError('');
    setAnswersDisabled(false);
    setSelectedAnswerIndex(null);
    setIsCorrect(null);
    setShowAnswerFeedback(false);
    setFeedbackMessage('');
  };

  if (isLoading) {
    return <LoadingPage message="Carregando quiz..." />;
  }

  return (
    <div className="min-h-screen bg-[#f4ede0]">
      <Header setMenuOpen={setMenuOpen} setShowFeedback={setShowFeedbackForm} setShowQuiz={() => {}} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <FeedbackPopup isOpen={showFeedbackForm} onClose={() => setShowFeedbackForm(false)} />
      <QuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)}/>
      
      <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
        <div className="bg-[#FEFCF8] p-6 rounded-lg shadow-lg ring-1 ring-[#A0958A]/20">
          {!quizStarted && !quizCompleted ? (
            <div>
              <h1 className="text-2xl font-bold mb-4 text-center text-[#4A3F35]">Quiz do Historin</h1>
              <p className="text-base text-[#6B5B4F] mb-4 text-center">
                Teste seus conhecimentos sobre a história de Gramado e Canela!
              </p>
              <p className="text-sm text-[#6B5B4F] mb-6 text-center">
                10 perguntas aleatórias sobre os locais históricos da cidade.
              </p>
              
              {/* User form moved to beginning */}
              <div className="mb-6">
                <label className="block text-[#4A3F35] text-sm font-bold mb-4 text-center">
                  Preencha seus dados para começar:
                </label>
                
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] mb-3"
                  placeholder="Seu nome completo"
                />
                
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] mb-3"
                  placeholder="seu@email.com"
                />
                
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] mb-4"
                >
                  <option value="">Selecione sua cidade</option>
                  <option value="Gramado">Gramado</option>
                  <option value="Canela">Canela</option>
                </select>
              </div>
              
              <button
                onClick={startQuiz}
                className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded whitespace-nowrap w-full text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transform hover:scale-105 active:scale-95"
              >
                Começar Quiz
              </button>
            </div>
          ) : quizStarted && loadingQuestions ? (
            <div className="flex flex-col items-center justify-center py-10">
              <LoadingSpinner size="md" color="#8B4513" text="" />
              <p className="mt-3 text-[#6B5B4F] text-sm">Carregando perguntas...</p>
            </div>
          ) : quizStarted && selectedQuestions[currentQuestion] ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-medium text-[#4A3F35]">
                  Pergunta {currentQuestion + 1} de {selectedQuestions.length}
                </span>
                <span className="text-sm text-[#A0958A]">Pontuação: {score} pts</span>
              </div>
              <p className="text-lg font-bold mb-4 text-[#4A3F35]">
                {selectedQuestions[currentQuestion].question}
              </p>
              {selectedQuestions[currentQuestion].answers.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full py-2 mb-2 rounded transition-colors duration-200 ${
                    answersDisabled
                      ? idx === selectedQuestions[currentQuestion].correct
                        ? 'bg-[#6B8E23] text-white'
                        : idx === selectedAnswerIndex
                        ? 'bg-[#A0522D] text-white'
                        : 'bg-[#F5F1EB] text-[#6B5B4F]'
                      : 'bg-[#8B4513] text-white hover:bg-[#A0522D] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50'
                  }`}
                  disabled={answersDisabled}
                >
                  {answer}
                </button>
              ))}
              {showAnswerFeedback && (
                <p className={`text-center text-lg font-bold mt-4 ${isCorrect ? 'text-[#6B8E23]' : 'text-[#A0522D]'}`}>
                  {feedbackMessage}
                </p>
              )}
            </div>
          ) : quizCompleted ? (
            <div className="text-center">
              <p className="text-2xl font-bold mb-4 text-[#4A3F35]">Quiz finalizado!</p>
              {(() => {
                const total = selectedQuestions.length * 10;
                const pct = total ? Math.round((score / total) * 100) : 0;
                return (
                  <>
                    <p className="text-lg font-bold mb-2 text-[#4A3F35]">Sua pontuação: {pct}%</p>
                    <p className="text-base text-[#6B5B4F] mb-6">{score} de {total} pontos</p>
                  </>
                );
              })()}
              
              <form onSubmit={handleEmailSubmit} className="flex flex-col mb-4">
                <label className="block text-[#4A3F35] text-sm font-bold mb-2 text-center">
                  Salvar sua pontuação:
                </label>
                
                {submissionError && (
                  <div className="mb-4 p-3 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-lg">
                    <p className="text-[#DC2626] text-sm font-medium">
                      ❌ {submissionError}
                    </p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmittingEmail}
                  onClick={() => setSubmissionError('')}
                  className="bg-[#16A34A] hover:bg-[#15803D] disabled:bg-[#A0958A] text-white py-2 px-4 rounded whitespace-nowrap w-full text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#16A34A]/50 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed mb-2"
                >
                  {isSubmittingEmail ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner size="sm" color="white" text="" />
                      <span className="ml-2">Salvando...</span>
                    </div>
                  ) : (
                    'Salvar Pontuação'
                  )}
                </button>
              </form>
              
              {scoreSubmitted && (
                <div className="mb-4 p-4 bg-[#16A34A]/10 border border-[#16A34A]/30 rounded-lg">
                  <p className="text-[#15803D] text-sm font-medium mb-2">
                    ✅ Pontuação salva com sucesso!
                  </p>
                  <p className="text-[#15803D] text-xs">
                    Obrigado por participar do Quiz do Historin. Sua pontuação foi registrada.
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <button
                  onClick={resetQuiz}
                  className="bg-[#6B8E23] hover:bg-[#556B2F] text-white py-2 px-4 rounded w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/50 transform hover:scale-105 active:scale-95"
                >
                  Tentar Novamente
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transform hover:scale-105 active:scale-95"
                >
                  Voltar ao Início
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4 text-center text-[#4A3F35]">Quiz do Historin</h1>
              <p className="text-base text-[#6B5B4F] mb-6 text-center">
                Teste seus conhecimentos sobre a história de Gramado e região!
              </p>
              <button
                onClick={startQuiz}
                className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded whitespace-nowrap w-full text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transform hover:scale-105 active:scale-95"
              >
                Começar Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

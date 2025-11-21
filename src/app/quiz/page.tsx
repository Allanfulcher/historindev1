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
import { useUserQuiz, useUserData } from '@/hooks/useUserData';
import { InfoPopup, CustomContentPopup } from '@/components/ui';

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
  
  // Use the new user utilities hook
  const { saveQuiz: saveQuizToDb, isAuthenticated, stats } = useUserQuiz(city);
  
  // Also get user data for display and auth
  const { user, profile, signIn } = useUserData({ autoLoadQuizData: false });
  
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
  
  // New popup system - show results popup
  const [showResultsPopup, setShowResultsPopup] = useState(false);
  



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
      // Show results popup after a short delay
      setTimeout(() => {
        setShowResultsPopup(true);
      }, 500);
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

      // Use the new saveQuiz utility for authenticated users
      if (isAuthenticated && city) {
        await saveQuizToDb({
          city,
          score,
          totalQuestions: selectedQuestions.length,
          percentage,
          answers: answersPayload,
        });
      }

      // UX delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setSubmissionError('');
      setScoreSubmitted(true);
    } catch (err) {
      console.error('Erro ao enviar resultado:', err);
      setSubmissionError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  // Function to start quiz
  const startQuiz = async () => {
    if (!city) {
      alert('Por favor, selecione uma cidade antes de começar o quiz.');
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
              
              {/* Login prompt if not logged in */}
              {!user && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 mb-3 text-center">
                    <i className="fas fa-info-circle mr-2"></i>
                    Faça login para salvar seus resultados automaticamente!
                  </p>
                  <button
                    onClick={signIn}
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Entrar com Google
                  </button>
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    Ou continue sem login (não salvaremos seus resultados)
                  </p>
                </div>
              )}

              {/* User info display if logged in */}
              {user && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-900 text-center">
                    <i className="fas fa-check-circle mr-2"></i>
                    Logado como <strong>{profile.displayName}</strong>
                  </p>
                  <p className="text-xs text-green-700 mt-1 text-center">
                    Seus resultados serão salvos automaticamente
                  </p>
                </div>
              )}
              
              {/* User form - only show name/email if not logged in */}
              <div className="mb-6">
                {!user && (
                  <>
                    <label className="block text-[#4A3F35] text-sm font-bold mb-4 text-center">
                      Preencha seus dados (opcional):
                    </label>
                    
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] mb-3"
                      placeholder="Seu nome completo (opcional)"
                    />
                    
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] mb-3"
                      placeholder="seu@email.com (opcional)"
                    />
                  </>
                )}
                
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

      {/* Results Popup - New Popup System */}
      {quizCompleted && (
        <CustomContentPopup
          isOpen={showResultsPopup}
          onClose={() => setShowResultsPopup(false)}
          size="lg"
          animation="scale"
          header={
            <div className="text-center">
              <div className="mb-3">
                {score / selectedQuestions.length >= 7 ? (
                  <i className="fas fa-trophy text-5xl text-amber-500"></i>
                ) : score / selectedQuestions.length >= 5 ? (
                  <i className="fas fa-medal text-5xl text-[#8B4513]"></i>
                ) : (
                  <i className="fas fa-star text-5xl text-blue-500"></i>
                )}
              </div>
              <h2 className="text-2xl font-bold text-[#4A3F35]">
                Quiz Concluído!
              </h2>
              <p className="text-[#A0958A] mt-2">{city || 'Quiz'}</p>
            </div>
          }
          footer={
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setShowResultsPopup(false);
                  resetQuiz();
                }}
                className="px-6 py-2 bg-[#6B8E23] hover:bg-[#556B2F] text-white rounded transition-colors duration-200"
              >
                <i className="fas fa-redo mr-2"></i>
                Tentar Novamente
              </button>
              <button 
                onClick={() => {
                  setShowResultsPopup(false);
                  window.location.href = '/';
                }}
                className="px-6 py-2 bg-[#8B4513] hover:bg-[#A0522D] text-white rounded transition-colors duration-200"
              >
                <i className="fas fa-home mr-2"></i>
                Voltar ao Início
              </button>
            </div>
          }
        >
          <div className="space-y-6 py-4">
            {/* Score Display */}
            <div className="text-center">
              <div className="text-6xl font-bold text-[#8B4513] mb-2">
                {Math.round((score / (selectedQuestions.length * 10)) * 100)}%
              </div>
              <p className="text-[#6B5B4F] text-lg mb-4">
                Você acertou {score / 10} de {selectedQuestions.length} questões!
              </p>
              
              {/* Performance message */}
              {score / selectedQuestions.length >= 8 ? (
                <p className="text-green-600 font-medium">
                  🎉 Excelente! Você domina a história da região!
                </p>
              ) : score / selectedQuestions.length >= 6 ? (
                <p className="text-blue-600 font-medium">
                  👍 Muito bom! Continue explorando nossa história!
                </p>
              ) : score / selectedQuestions.length >= 4 ? (
                <p className="text-amber-600 font-medium">
                  📚 Bom trabalho! Que tal conhecer mais histórias?
                </p>
              ) : (
                <p className="text-[#6B5B4F] font-medium">
                  💪 Continue tentando! Explore mais o Historin!
                </p>
              )}
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-[#F5F1EB] rounded-lg">
                <div className="text-2xl font-bold text-green-600">{score / 10}</div>
                <div className="text-sm text-[#A0958A]">Acertos</div>
              </div>
              <div className="p-4 bg-[#F5F1EB] rounded-lg">
                <div className="text-2xl font-bold text-red-600">{selectedQuestions.length - (score / 10)}</div>
                <div className="text-sm text-[#A0958A]">Erros</div>
              </div>
              <div className="p-4 bg-[#F5F1EB] rounded-lg">
                <div className="text-2xl font-bold text-[#4A3F35]">{selectedQuestions.length}</div>
                <div className="text-sm text-[#A0958A]">Total</div>
              </div>
            </div>

            {/* Encouragement */}
            {!user && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <p className="text-sm text-blue-900 mb-2">
                  <i className="fas fa-lightbulb mr-2"></i>
                  <strong>Dica:</strong> Faça login para salvar seus resultados!
                </p>
                <button
                  onClick={() => {
                    setShowResultsPopup(false);
                    signIn();
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                >
                  Entrar com Google
                </button>
              </div>
            )}
          </div>
        </CustomContentPopup>
      )}
    </div>
  );
}

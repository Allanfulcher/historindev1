'use client';

import Header from '@/components/Header';
import Menu from '@/components/Menu';
import FeedbackPopup from '@/components/popups/FeedbackPopup';
import QuizModal from '@/components/popups/QuizModal';
import LoadingPage from '@/components/LoadingPage';
import LoadingSpinner from '@/components/LoadingSpinner';
import { legacyQuestions } from '@/data/legacyData';
import React, { useEffect, useState } from 'react';

interface Question {
  question: string;
  answers: string[];
  correct: number;
}

interface ScoreEntry {
  name: string;
  email: string;
  city: string;
  score: number;
  percentage: number;
}

// Use questions from legacy data
const questions: Question[] = legacyQuestions;

function getRandomQuestions(all: Question[], num: number): Question[] {
  // Fisher-Yates shuffle for proper randomization without repeats
  const shuffled = [...all];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(num, shuffled.length));
}

export default function QuizPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);
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
  const [scoresList, setScoresList] = useState<ScoreEntry[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  // Modal feedback form state
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  

  // Load stored scores and check submission status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedScores = JSON.parse(localStorage.getItem('scoresList') || '[]');
      setScoresList(storedScores);
      
      // Check if user has submitted before (using a simple flag)
      const hasSubmitted = localStorage.getItem('quizSubmitted') === 'true';
      setHasSubmittedBefore(hasSubmitted);
    }
  }, []);

  // Persist progress
  useEffect(() => {
    if (quizStarted && typeof window !== 'undefined') {
      const quizData = {
        quizStarted,
        quizCompleted,
        score,
        currentQuestion,
        selectedAnswerIndex,
        answersDisabled,
        showAnswerFeedback,
        feedbackMessage,
        isCorrect,
        selectedQuestions,
      };
      localStorage.setItem('quizProgress', JSON.stringify(quizData));
    }
  }, [
    quizStarted,
    quizCompleted,
    currentQuestion,
    score,
    selectedAnswerIndex,
    answersDisabled,
    showAnswerFeedback,
    feedbackMessage,
    isCorrect,
    selectedQuestions,
  ]);

  // Load progress when page mounts
  useEffect(() => {
    const loadData = async () => {
      if (typeof window !== 'undefined') {
        // Simulate loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const saved = localStorage.getItem('quizProgress');
        if (saved) {
          const data = JSON.parse(saved);
          setQuizStarted(data.quizStarted || false);
          setQuizCompleted(data.quizCompleted || false);
          setScore(data.score || 0);
          setCurrentQuestion(data.currentQuestion || 0);
          setSelectedAnswerIndex(
            data.selectedAnswerIndex !== null ? data.selectedAnswerIndex : null
          );
          setAnswersDisabled(data.answersDisabled || false);
          // Backward compatibility: support old key name `showFeedback`
          const savedInline = (data.showAnswerFeedback ?? data.showFeedback) || false;
          setShowAnswerFeedback(savedInline);
          setFeedbackMessage(data.feedbackMessage || '');
          setIsCorrect(data.isCorrect ?? null);
          setSelectedQuestions(data.selectedQuestions || []);
        }
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEmail(true);
    
    try {
      const percentage = Math.round((score / (selectedQuestions.length * 10)) * 100);
      
      // Prepare form data for Google Apps Script
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('city', city);
      formData.append('score', score.toString());
      formData.append('percentage', percentage.toString());
      formData.append('totalQuestions', selectedQuestions.length.toString());
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbzQvlJ-Sb4FhoLdWcbZv-NObK1T3K4ZVHn0nDX8Tg5j4mHBzei-dFjpWa0-wwwNvpZz3Q/exec', {
        method: 'POST',
        body: formData,
      });
      
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.status === 'error' && result.code === 'DUPLICATE_EMAIL') {
          setSubmissionError('Este email já foi utilizado. Cada pessoa pode participar apenas uma vez.');
          return;
        }
        
        if (result.status === 'error') {
          setSubmissionError('Erro ao salvar pontuação. Tente novamente.');
          return;
        }
        // Save score to localStorage
        if (typeof window !== 'undefined') {
          const stored = JSON.parse(localStorage.getItem('scoresList') || '[]');
          const newScores = [...stored, { name, email, city, score, percentage }];
          localStorage.setItem('scoresList', JSON.stringify(newScores));
          setScoresList(newScores);
          
          // Mark as submitted to prevent future submissions
          localStorage.setItem('quizSubmitted', 'true');
          setHasSubmittedBefore(true);
        }
        
        // Clear quiz progress but keep user on results page
        localStorage.removeItem('quizProgress');
        setSubmissionError('');
        setScoreSubmitted(true);
      } else {
        setSubmissionError('Erro ao conectar com o servidor. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro ao enviar email:', err);
      setSubmissionError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsSubmittingEmail(false);
    }
  };

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

  // Function to start quiz
  const startQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedQuestions(getRandomQuestions(questions, 10));
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
                Teste seus conhecimentos sobre a história de Gramado e região!
              </p>
              <p className="text-sm text-[#6B5B4F] mb-6 text-center">
                10 perguntas aleatórias sobre os locais históricos da cidade.
              </p>
              <button
                onClick={startQuiz}
                className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded whitespace-nowrap w-full text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transform hover:scale-105 active:scale-95"
              >
                Começar Quiz
              </button>
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
              
              {!hasSubmittedBefore ? (
                <form onSubmit={handleEmailSubmit} className="flex flex-col mb-4">
                  <label className="block text-[#4A3F35] text-sm font-bold mb-2">
                    Preencha seus dados para salvar sua pontuação:
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
                  
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] mb-4"
                    placeholder="Sua cidade de origem"
                  />
                  
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
              ) : scoreSubmitted ? (
                <div className="mb-4 p-4 bg-[#16A34A]/10 border border-[#16A34A]/30 rounded-lg">
                  <p className="text-[#15803D] text-sm font-medium mb-2">
                    ✅ Pontuação salva com sucesso!
                  </p>
                  <p className="text-[#15803D] text-xs">
                    Obrigado por participar do Quiz do Historin. Sua pontuação foi registrada.
                  </p>
                </div>
              ) : (
                <div className="mb-4 p-4 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg">
                  <p className="text-[#92400E] text-sm font-medium mb-2">
                    ⚠️ Você já enviou uma pontuação anteriormente
                  </p>
                  <p className="text-[#92400E] text-xs">
                    Apenas uma submissão por pessoa é permitida. Você pode continuar praticando, mas não poderá salvar novas pontuações.
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <button
                  onClick={startQuiz}
                  className="bg-[#6B8E23] hover:bg-[#556B2F] text-white py-2 px-4 rounded w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/50 transform hover:scale-105 active:scale-95"
                >
                  {hasSubmittedBefore || scoreSubmitted ? 'Praticar Novamente' : 'Tentar Novamente'}
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

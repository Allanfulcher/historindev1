'use client';

import Header from '@/components/Header';
import Menu from '@/components/Menu';
import FeedbackPopup from '@/components/popups/FeedbackPopup';
import QuizModal from '@/components/popups/QuizModal';
import React, { useEffect, useState } from 'react';

interface Question {
  question: string;
  answers: string[];
  correct: number;
}

interface ScoreEntry {
  email: string;
  score: number;
}

const questions: Question[] = [
  {
    question: 'Qual é o principal objetivo do Historin?',
    answers: [
      'Vender produtos turísticos',
      'Preservar e compartilhar histórias locais',
      'Criar jogos online',
      'Promover eventos',
    ],
    correct: 1,
  },
  {
    question: 'Em que cidade o Historin foi criado?',
    answers: ['Porto Alegre', 'Canela', 'Gramado', 'Caxias do Sul'],
    correct: 2,
  },
  {
    question: 'Qual tecnologia o Historin planeja usar para experiências imersivas?',
    answers: ['Realidade Virtual', 'Realidade Aumentada', 'Inteligência Artificial', 'Blockchain'],
    correct: 1,
  },
  {
    question: 'O que são os QR codes no contexto do Historin?',
    answers: [
      'Códigos de desconto',
      'Links para redes sociais',
      'Portais para histórias locais',
      'Senhas de acesso',
    ],
    correct: 2,
  },
  {
    question: 'Qual é a missão do Historin?',
    answers: [
      'Conectar passado e presente através de histórias',
      'Criar aplicativos móveis',
      'Vender ingressos',
      'Organizar eventos',
    ],
    correct: 0,
  },
  {
    question: 'O Historin é incubado em qual local?',
    answers: ['Universidade Federal', 'Vila Joaquina', 'Centro de Gramado', 'Parque Knorr'],
    correct: 1,
  },
  {
    question: 'Qual é o foco principal das histórias do Historin?',
    answers: [
      'Histórias internacionais',
      'Ficção científica',
      'História local de Gramado',
      'Biografias de celebridades',
    ],
    correct: 2,
  },
  {
    question: 'Como o Historin pretende tornar a história mais acessível?',
    answers: ['Através de livros impressos', 'Por meio de tecnologia interativa', 'Com palestras presenciais', 'Via correspondência'],
    correct: 1,
  },
  {
    question: 'O que diferencia o Historin de outras plataformas?',
    answers: [
      'Foco em histórias locais e tecnologia imersiva',
      'Preços mais baixos',
      'Maior número de usuários',
      'Design mais bonito',
    ],
    correct: 0,
  },
  {
    question: 'Qual é a visão futura do Historin?',
    answers: ['Expandir para outros países', 'Criar uma experiência imersiva com QR codes nas ruas', 'Vender franquias', 'Desenvolver jogos'],
    correct: 1,
  },
];

function getRandomQuestions(all: Question[], num: number): Question[] {
  const shuffled = [...all].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export default function QuizPage() {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

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
  

  // Load stored scores
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedScores = JSON.parse(localStorage.getItem('scoresList') || '[]');
      setScoresList(storedScores);
    }
  }, []);

  // Persist progress
  useEffect(() => {
    if (quizStarted && typeof window !== 'undefined') {
      const quizData = {
        email,
        emailSubmitted,
        quizStarted,
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
    currentQuestion,
    score,
    selectedAnswerIndex,
    answersDisabled,
    showAnswerFeedback,
    feedbackMessage,
    isCorrect,
    selectedQuestions,
    email,
    emailSubmitted,
  ]);

  // Load progress when page mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quizProgress');
      if (saved) {
        const data = JSON.parse(saved);
        setEmail(data.email || '');
        setEmailSubmitted(data.emailSubmitted || false);
        setQuizStarted(data.quizStarted || false);
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
    }
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xpwzrpvj', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setEmailSubmitted(true);
        setQuizStarted(true);
        setSelectedQuestions(getRandomQuestions(questions, 10));
      } else {
        console.error('Falha ao enviar email');
      }
    } catch (err) {
      console.error('Erro ao enviar email:', err);
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

  // When finished
  useEffect(() => {
    if (selectedQuestions.length > 0 && currentQuestion >= selectedQuestions.length) {
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('scoresList') || '[]');
        const newScores = [...stored, { email, score }];
        localStorage.setItem('scoresList', JSON.stringify(newScores));
        setScoresList(newScores);
      }
      setQuizStarted(false);
    }
  }, [currentQuestion, selectedQuestions.length, email, score]);

  // Start quiz if email had been submitted
  useEffect(() => {
    if (emailSubmitted && !quizStarted) {
      setQuizStarted(true);
      setSelectedQuestions(getRandomQuestions(questions, 10));
    }
  }, [emailSubmitted, quizStarted]);

  return (
    <div className="min-h-screen bg-[#f4ede0]">
      <Header setMenuOpen={setMenuOpen} setShowFeedback={setShowFeedbackForm} setShowQuiz={() => {}} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <FeedbackPopup isOpen={showFeedbackForm} onClose={() => setShowFeedbackForm(false)} />
      <QuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)}/>
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-[#FEFCF8] p-6 rounded-lg shadow-lg ring-1 ring-[#A0958A]/20">
          {!quizStarted && !emailSubmitted ? (
            <div>
              <h1 className="text-2xl font-bold mb-4 text-center text-[#4A3F35]">Quiz do Historin</h1>
              <p className="text-base text-[#6B5B4F] mb-4 text-center">
                Teste seus conhecimentos sobre a plataforma.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col">
                <label className="block text-[#4A3F35] text-sm font-bold mb-2">
                  Digite seu email para começar:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] mb-4"
                  placeholder="seu@email.com"
                />
                <button
                  type="submit"
                  className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded whitespace-nowrap w-full text-sm sm:text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50"
                >
                  Começar Quiz
                </button>
              </form>
            </div>
          ) : quizStarted && selectedQuestions[currentQuestion] ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-medium text-[#4A3F35]">
                  Pergunta {currentQuestion + 1} de {selectedQuestions.length}
                </span>
                <span className="text-sm text-[#A0958A]">Pontuação: {score}</span>
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
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold mb-4 text-[#4A3F35]">Quiz finalizado!</p>
              <p className="text-base font-medium mb-2 text-[#6B5B4F]">Email: {email}</p>
              {(() => {
                const total = selectedQuestions.length * 10;
                const pct = total ? Math.round((score / total) * 100) : 0;
                return (
                  <p className="text-lg font-bold mb-4 text-[#4A3F35]">Sua pontuação é {pct}%</p>
                );
              })()}
              <h3 className="text-xl font-bold mb-2 text-[#4A3F35]">Ranking:</h3>
              <ul className="mb-4">
                {scoresList
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 5)
                  .map((item, idx) => {
                    const total = selectedQuestions.length * 10 || 100;
                    const pct = Math.round((item.score / total) * 100);
                    return (
                      <li
                        key={idx}
                        className="flex justify-between items-center py-2 px-4 bg-[#F5F1EB] rounded mb-2"
                      >
                        <span className="text-[#6B5B4F]">{idx + 1}. {item.email}</span>
                        <span className="text-[#4A3F35] font-medium">{pct}%</span>
                      </li>
                    );
                  })}
              </ul>
              <button
                onClick={() => {
                  setScore(0);
                  setCurrentQuestion(0);
                  setQuizStarted(true);
                  setSelectedQuestions(getRandomQuestions(questions, 10));
                }}
                className="bg-[#6B8E23] hover:bg-[#556B2F] text-white py-2 px-4 rounded w-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/50 mb-2"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

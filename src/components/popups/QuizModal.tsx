'use client';

import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  answers: string[];
  correct: number;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: (email: string) => void;
  emailSubmitted: boolean;
  setEmailSubmitted: (submitted: boolean) => void;
  quizStarted: boolean;
  setQuizStarted: (started: boolean) => void;
}

interface ScoreEntry {
  email: string;
  score: number;
}

// Sample questions data - you can replace this with your actual questions
const questions: Question[] = [
  {
    question: "Qual é o principal objetivo do Historin?",
    answers: [
      "Vender produtos turísticos",
      "Preservar e compartilhar histórias locais",
      "Criar jogos online",
      "Promover eventos"
    ],
    correct: 1
  },
  {
    question: "Em que cidade o Historin foi criado?",
    answers: [
      "Porto Alegre",
      "Canela",
      "Gramado",
      "Caxias do Sul"
    ],
    correct: 2
  },
  {
    question: "Qual tecnologia o Historin planeja usar para experiências imersivas?",
    answers: [
      "Realidade Virtual",
      "Realidade Aumentada",
      "Inteligência Artificial",
      "Blockchain"
    ],
    correct: 1
  },
  {
    question: "O que são os QR codes no contexto do Historin?",
    answers: [
      "Códigos de desconto",
      "Links para redes sociais",
      "Portais para histórias locais",
      "Senhas de acesso"
    ],
    correct: 2
  },
  {
    question: "Qual é a missão do Historin?",
    answers: [
      "Conectar passado e presente através de histórias",
      "Criar aplicativos móveis",
      "Vender ingressos",
      "Organizar eventos"
    ],
    correct: 0
  },
  {
    question: "O Historin é incubado em qual local?",
    answers: [
      "Universidade Federal",
      "Vila Joaquina",
      "Centro de Gramado",
      "Parque Knorr"
    ],
    correct: 1
  },
  {
    question: "Qual é o foco principal das histórias do Historin?",
    answers: [
      "Histórias internacionais",
      "Ficção científica",
      "História local de Gramado",
      "Biografias de celebridades"
    ],
    correct: 2
  },
  {
    question: "Como o Historin pretende tornar a história mais acessível?",
    answers: [
      "Através de livros impressos",
      "Por meio de tecnologia interativa",
      "Com palestras presenciais",
      "Via correspondência"
    ],
    correct: 1
  },
  {
    question: "O que diferencia o Historin de outras plataformas?",
    answers: [
      "Foco em histórias locais e tecnologia imersiva",
      "Preços mais baixos",
      "Maior número de usuários",
      "Design mais bonito"
    ],
    correct: 0
  },
  {
    question: "Qual é a visão futura do Historin?",
    answers: [
      "Expandir para outros países",
      "Criar uma experiência imersiva com QR codes nas ruas",
      "Vender franquias",
      "Desenvolver jogos"
    ],
    correct: 1
  }
];

const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  email,
  setEmail,
  emailSubmitted,
  setEmailSubmitted,
  quizStarted,
  setQuizStarted,
}) => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answersDisabled, setAnswersDisabled] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [scoresList, setScoresList] = useState<ScoreEntry[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  // Função para obter 10 perguntas aleatórias
  function getRandomQuestions(allQuestions: Question[], num: number): Question[] {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  // Salvar progresso no localStorage
  const saveProgress = () => {
    if (typeof window !== 'undefined') {
      const quizData = {
        email,
        emailSubmitted,
        quizStarted,
        score,
        currentQuestion,
        selectedAnswerIndex,
        answersDisabled,
        showFeedback,
        feedbackMessage,
        isCorrect,
        selectedQuestions,
      };
      localStorage.setItem('quizProgress', JSON.stringify(quizData));
    }
  };

  // Carregar progresso do localStorage
  const loadProgress = () => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('quizProgress');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setEmail(parsedData.email || '');
        setEmailSubmitted(parsedData.emailSubmitted || false);
        setQuizStarted(parsedData.quizStarted || false);
        setScore(parsedData.score || 0);
        setCurrentQuestion(parsedData.currentQuestion || 0);
        setSelectedAnswerIndex(
          parsedData.selectedAnswerIndex !== null ? parsedData.selectedAnswerIndex : null
        );
        setAnswersDisabled(parsedData.answersDisabled || false);
        setShowFeedback(parsedData.showFeedback || false);
        setFeedbackMessage(parsedData.feedbackMessage || '');
        setIsCorrect(parsedData.isCorrect);
        setSelectedQuestions(parsedData.selectedQuestions || []);
      }
    }
  };

  // Carregar progresso quando o componente é montado
  useEffect(() => {
    if (isOpen) {
      loadProgress();
    }
  }, [isOpen]);

  // Salvar progresso sempre que o estado relevante mudar
  useEffect(() => {
    if (quizStarted) saveProgress();
  }, [
    quizStarted,
    currentQuestion,
    score,
    selectedAnswerIndex,
    answersDisabled,
    showFeedback,
    feedbackMessage,
    isCorrect,
    selectedQuestions,
  ]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Enviar email via Formspree
      const response = await fetch('https://formspree.io/f/xpwzrpvj', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        // Email enviado com sucesso
        setEmailSubmitted(true);
        setQuizStarted(true);
        setSelectedQuestions(getRandomQuestions(questions, 10));
      } else {
        // Lidar com erro
        console.error('Falha ao enviar email');
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    }
  };

  const handleAnswer = (index: number) => {
    if (answersDisabled) return;
    setAnswersDisabled(true);
    setSelectedAnswerIndex(index);
    const correctIndex = selectedQuestions[currentQuestion]?.correct;
    const isCorrect = index === correctIndex;
    setIsCorrect(isCorrect);
    if (isCorrect) {
      setScore(score + 10);
      setFeedbackMessage('Correto!');
    } else {
      setFeedbackMessage('Incorreto!');
    }
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswerIndex(null);
      setCurrentQuestion(currentQuestion + 1);
      setAnswersDisabled(false);
      setIsCorrect(null);
    }, 1000);
  };

  const handleClose = () => {
    saveProgress();
    onClose();
  };

  // Salvar pontuação e finalizar quiz quando todas as perguntas forem respondidas
  useEffect(() => {
    if (selectedQuestions.length > 0 && currentQuestion >= selectedQuestions.length) {
      if (typeof window !== 'undefined') {
        const storedScores = JSON.parse(localStorage.getItem('scoresList') || '[]');
        const newScores = [...storedScores, { email, score }];
        localStorage.setItem('scoresList', JSON.stringify(newScores));
        setScoresList(newScores);
      }

      // Resetar estado do quiz
      setQuizStarted(false);
    }
  }, [currentQuestion, selectedQuestions.length, email, score]);

  // Iniciar quiz se o email já foi enviado
  useEffect(() => {
    if (emailSubmitted && !quizStarted) {
      setQuizStarted(true);
      setSelectedQuestions(getRandomQuestions(questions, 10));
    }
  }, [emailSubmitted, quizStarted]);

  // Carregar scores do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedScores = JSON.parse(localStorage.getItem('scoresList') || '[]');
      setScoresList(storedScores);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {quizStarted || (!quizStarted && emailSubmitted) ? (
          selectedQuestions[currentQuestion] ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">
                  Pergunta {currentQuestion + 1} de {selectedQuestions.length}
                </span>
                <span className="text-sm text-gray-600">
                  Pontuação: {score}
                </span>
              </div>
              <p className="text-lg font-semibold mb-4">
                {selectedQuestions[currentQuestion].question}
              </p>
              {selectedQuestions[currentQuestion].answers.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full py-2 mb-2 rounded-lg transition-colors ${
                    answersDisabled
                      ? idx === selectedQuestions[currentQuestion].correct
                        ? 'bg-green-500 text-white'
                        : idx === selectedAnswerIndex
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  disabled={answersDisabled}
                >
                  {answer}
                </button>
              ))}
              {showFeedback && (
                <p
                  className={`text-center text-lg font-bold mt-4 ${
                    isCorrect ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {feedbackMessage}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-semibold mb-4">Quiz finalizado!</p>
              <p className="text-lg font-semibold mb-2">Email: {email}</p>
              {(() => {
                const totalScore = selectedQuestions.length * 10;
                const percentageScore = Math.round((score / totalScore) * 100);
                return (
                  <p className="text-lg font-semibold mb-4">
                    Sua pontuação é {percentageScore}%
                  </p>
                );
              })()}
              <h3 className="text-xl font-bold mb-2">Ranking:</h3>
              <ul className="mb-4">
                {scoresList
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 5) // Top 5
                  .map((item, idx) => {
                    const totalScore = selectedQuestions.length * 10;
                    const percentageScore = Math.round(
                      (item.score / totalScore) * 100
                    );
                    return (
                      <li
                        key={idx}
                        className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-lg mb-2"
                      >
                        <span>
                          {idx + 1}. {item.email}
                        </span>
                        <span>{percentageScore}%</span>
                      </li>
                    );
                  })}
              </ul>
              <button
                onClick={() => {
                  // Reiniciar quiz sem pedir email novamente
                  setScore(0);
                  setCurrentQuestion(0);
                  setQuizStarted(true);
                  setSelectedQuestions(getRandomQuestions(questions, 10));
                }}
                className="py-2 mb-2 bg-green-500 text-white rounded-lg mx-auto block w-full hover:bg-green-600"
              >
                Tentar novamente
              </button>
            </div>
          )
        ) : !emailSubmitted ? (
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">Quiz do Historin</h3>
            <p className="text-lg font-semibold mb-4">
              Teste seus conhecimentos sobre a plataforma.
            </p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col">
              <label className="mb-2 text-lg font-semibold">
                Digite seu email para começar:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seu@email.com"
              />
              <button
                type="submit"
                className="py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Começar Quiz
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg">Carregando quiz...</p>
          </div>
        )}
        <button
          onClick={handleClose}
          className="mt-4 text-red-500 hover:text-red-600 w-full text-center"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default QuizModal;

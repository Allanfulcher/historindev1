'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
  setShowFeedback: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setMenuOpen, setShowFeedback }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Share function
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Historin - Histórias de Gramado',
          text: 'Descubra as histórias de Gramado através do Historin!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      alert('Compartilhamento não suportado neste navegador.');
    }
  };

  const buttonStyle = 'px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600';

  return (
    <header className="flex justify-between items-center p-4 bg-[#E6D3B4]">
      {/* Logo section */}
      <div className="flex items-center">
        <Link href="/" className="mr-2">
          <img
            src="fotos/historin-logo.svg"
            alt="HISTORIN Logo"
            className="text-2xl font-bold logo"
          />
        </Link>
      </div>
      
      {/* Buttons section */}
      <div className="flex items-center space-x-4">
        {/* Quiz button */}
        <button
          onClick={() => setShowQuiz(true)}
          className={`${buttonStyle} flex items-center`}
        >
          <i className="fas fa-question-circle mr-2" />
          Quiz
        </button>
        
        {/* Quiz Modal (conditionally rendered) */}
        {showQuiz && typeof window !== 'undefined' && (window as any).QuizModal && (
          <div>
            {React.createElement((window as any).QuizModal, {
              isOpen: showQuiz,
              onClose: () => setShowQuiz(false),
              email: email,
              setEmail: setEmail,
              emailSubmitted: emailSubmitted,
              setEmailSubmitted: setEmailSubmitted,
              quizStarted: quizStarted,
              setQuizStarted: setQuizStarted
            })}
          </div>
        )}
        
        {/* Share button */}
        <button
          onClick={handleShare}
          aria-label="Compartilhar"
          className="text-2xl pr-2 hover:text-blue-600"
        >
          <i className="fas fa-share-alt" />
        </button>
        
        {/* Feedback button */}
        <button
          onClick={() => setShowFeedback(true)}
          aria-label="Feedback"
          className="text-2xl pr-2 hover:text-blue-600"
        >
          <i className="fas fa-comment-dots" />
        </button>
        
        {/* Menu button */}
        <div
          className="text-2xl cursor-pointer hover:text-blue-600"
          onClick={() => setMenuOpen(true)}
        >
          <i className="fas fa-bars" />
        </div>
      </div>
    </header>
  );
};

export default Header;

// Export to window object for global access (for legacy compatibility)
if (typeof window !== 'undefined') {
  (window as any).Header = Header;
}

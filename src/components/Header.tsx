'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PrimaryBtn from './buttons/PrimaryBtn';
import TransparentBtn from './buttons/TransparentBtn';

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

  return (
    <header className="flex justify-between items-center p-4 bg-[#e6d3b4] border-b border-[#F5F1EB]">
      {/* Logo section */}
      <div className="flex items-center">
        <Link href="/" className="mr-2">
          <img
            src="/images/meta/historin-logo.svg"
            alt="Historin"
            className="h-12 w-auto"
          />
        </Link>
      </div>
      
      {/* Buttons section */}
      <div className="flex items-center space-x-4">
        {/* Quiz button */}
        <PrimaryBtn
          onClick={() => setShowQuiz(true)}
        >
          <i className="fas fa-question-circle mr-2" />
          Quiz
        </PrimaryBtn>
        
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
        <TransparentBtn
          onClick={handleShare}
          aria-label="Compartilhar"
        >
          <i className="fas fa-share-alt" />
        </TransparentBtn>
        
        {/* Feedback button */}
        <TransparentBtn
          onClick={() => setShowFeedback(true)}
          aria-label="Feedback"
        >
          <i className="fas fa-comment-dots" />
        </TransparentBtn>
        
        {/* Menu button */}
        <TransparentBtn
          onClick={() => setMenuOpen(true)}
        >
          <i className="fas fa-bars" />
        </TransparentBtn>
      </div>
    </header>
  );
};

export default Header;

// Export to window object for global access (for legacy compatibility)
if (typeof window !== 'undefined') {
  (window as any).Header = Header;
}

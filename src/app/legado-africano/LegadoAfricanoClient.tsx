'use client';

import React, { useState } from 'react';
import LegadoAfricano from '@/app/legado-africano/_components/LegadoAfricano';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import QuizModal from '@/components/popups/QuizModal';
import FeedbackPopup from '@/components/popups/FeedbackPopup';
import DonationPopup from '@/components/popups/DonationPopup';

export default function LegadoAfricanoClient() {
  // State for UI components
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showDonation, setShowDonation] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <Header
        setMenuOpen={setMenuOpen}
        setShowFeedback={setShowFeedback}
        setShowQuiz={setShowQuiz}
      />

      {/* Main Content */}
      <LegadoAfricano setShowDonation={setShowDonation} />

      {/* Menu */}
      {menuOpen && (
        <Menu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      )}

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
      )}

      {/* Feedback Popup */}
      {showFeedback && (
        <FeedbackPopup isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
      )}

      {/* Donation Popup */}
      {showDonation && (
        <DonationPopup onClose={() => setShowDonation(false)} />
      )}
    </div>
  );
}

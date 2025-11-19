/**
 * useUserData Hook
 * 
 * Custom React hook for easy access to user data and operations.
 * Combines auth context with user service for seamless component integration.
 * 
 * Usage:
 * ```tsx
 * const { user, profile, quizStats, saveQuiz } = useUserData();
 * 
 * // Save quiz result
 * await saveQuiz({ city: 'São Paulo', score: 8, totalQuestions: 10 });
 * 
 * // Access user info
 * console.log(profile.displayName, profile.email, profile.avatar);
 * ```
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { userService } from '@/services/user.service';
import { qrService } from '@/services/qr.service';
import type { Database } from '@/types/database.types';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
type QuizResult = Database['public']['Tables']['user_quiz_results']['Row'];

interface UserQuizStats {
  gramado: number | null;
  canela: number | null;
}

interface QrHuntProgress {
  scanned: number;
  total: number;
  percentage: number;
  scannedIds: string[];
}

interface UserData {
  // Auth state
  user: ReturnType<typeof useAuth>['user'];
  session: ReturnType<typeof useAuth>['session'];
  loading: boolean;
  isAuthenticated: boolean;
  
  // User profile
  profile: {
    displayName: string;
    email: string | null;
    avatar: string | null;
    fullProfile: UserProfile | null;
  };
  
  // Quiz data
  quizStats: UserQuizStats | null;
  quizHistory: QuizResult[];
  
  // QR Hunt data
  qrHuntProgress: QrHuntProgress | null;
  
  // Actions
  saveQuiz: (params: {
    city: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    answers: any;
  }) => Promise<QuizResult | null>;
  
  refreshQuizData: (city?: string) => Promise<void>;
  refreshQrData: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

/**
 * Main hook for accessing user data and operations
 */
export function useUserData(options?: { autoLoadQuizData?: boolean; city?: string }): UserData {
  const { user, session, loading: authLoading, signInWithGoogle, signOut } = useAuth();
  const [fullProfile, setFullProfile] = useState<UserProfile | null>(null);
  const [quizStats, setQuizStats] = useState<UserQuizStats | null>(null);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [qrHuntProgress, setQrHuntProgress] = useState<QrHuntProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const { autoLoadQuizData = true, city } = options || {};

  // Load user profile when user changes
  useEffect(() => {
    async function loadProfile() {
      if (user?.id) {
        const profile = await userService.getProfile(user.id);
        setFullProfile(profile);
      } else {
        setFullProfile(null);
      }
      setLoading(false);
    }

    loadProfile();
  }, [user?.id]);

  // Load quiz data when user changes (if enabled)
  useEffect(() => {
    async function loadQuizData() {
      if (user?.id && autoLoadQuizData) {
        const stats = await userService.getQuizStats(user.id);
        setQuizStats(stats);
        // We don't need history anymore, just best scores
        setQuizHistory([]);
      } else {
        setQuizStats(null);
        setQuizHistory([]);
      }
    }

    if (!authLoading) {
      loadQuizData();
    }
  }, [user?.id, autoLoadQuizData, authLoading]);

  // Load QR hunt data when user changes
  useEffect(() => {
    async function loadQrData() {
      if (user?.id) {
        const progress = await qrService.getUserProgress(user.id);
        setQrHuntProgress(progress);
      } else {
        setQrHuntProgress(null);
      }
    }

    if (!authLoading) {
      loadQrData();
    }
  }, [user?.id, authLoading]);

  // Refresh quiz data manually
  const refreshQuizData = useCallback(async () => {
    if (!user?.id) return;

    const stats = await userService.getQuizStats(user.id);
    setQuizStats(stats);
  }, [user?.id]);

  // Refresh QR hunt data manually
  const refreshQrData = useCallback(async () => {
    if (!user?.id) return;

    const progress = await qrService.getUserProgress(user.id);
    setQrHuntProgress(progress);
  }, [user?.id]);

  // Save quiz result
  const saveQuiz = useCallback(async (params: {
    city: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    answers: any;
  }) => {
    if (!user?.id) {
      console.warn('Cannot save quiz: user not authenticated');
      return null;
    }

    const result = await userService.saveQuizResult({
      userId: user.id,
      ...params,
    });

    // Refresh quiz data after saving
    if (result) {
      await refreshQuizData();
    }

    return result;
  }, [user?.id, refreshQuizData]);

  return {
    // Auth state
    user,
    session,
    loading: authLoading || loading,
    isAuthenticated: !!user,
    
    // User profile
    profile: {
      displayName: userService.getDisplayName(user),
      email: userService.getEmail(user),
      avatar: userService.getAvatar(user),
      fullProfile,
    },
    
    // Quiz data
    quizStats,
    quizHistory,
    
    // QR Hunt data
    qrHuntProgress,
    
    // Actions
    saveQuiz,
    refreshQuizData,
    refreshQrData,
    signIn: signInWithGoogle,
    signOut,
  };
}

/**
 * Hook for quiz-specific operations (lighter version)
 */
export function useUserQuiz(city?: string) {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserQuizStats | null>(null);
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!user?.id) {
      setStats(null);
      setHistory([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const statsData = await userService.getQuizStats(user.id);
    setStats(statsData);
    setHistory([]); // We don't need history, just best scores
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveQuiz = useCallback(async (params: {
    city: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    answers: any;
  }) => {
    if (!user?.id) return null;

    const result = await userService.saveQuizResult({
      userId: user.id,
      ...params,
    });

    if (result) {
      await loadData();
    }

    return result;
  }, [user?.id, loadData]);

  return {
    stats,
    history,
    loading,
    saveQuiz,
    refresh: loadData,
    isAuthenticated: !!user,
  };
}

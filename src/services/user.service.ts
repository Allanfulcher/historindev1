/**
 * User Service
 * 
 * Centralized service for all user-related operations.
 * Provides clean, reusable functions for user data management.
 * 
 * Usage:
 * ```ts
 * import { userService } from '@/services/user.service';
 * 
 * const profile = await userService.getProfile(userId);
 * const quizHistory = await userService.getQuizHistory(userId);
 * ```
 */

import { supabaseBrowser } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

// Type aliases for cleaner code
type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
type QuizResult = Database['public']['Tables']['user_quiz_results']['Row'];

// ============================================================================
// USER PROFILE OPERATIONS
// ============================================================================

/**
 * Get user profile by user ID
 */
async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabaseBrowser
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

/**
 * Update user profile
 */
async function updateUserProfile(
  userId: string,
  updates: Partial<Omit<UserProfile, 'id' | 'created_at'>>
): Promise<UserProfile | null> {
  const { data, error } = await supabaseBrowser
    .from('user_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user profile:', error);
    return null;
  }

  return data;
}

/**
 * Get user display name (from profile or auth metadata)
 */
function getUserDisplayName(user: User | null): string {
  if (!user) return 'Visitante';
  
  // Try user metadata first (from Google OAuth)
  if (user.user_metadata?.full_name) {
    return user.user_metadata.full_name;
  }
  
  if (user.user_metadata?.name) {
    return user.user_metadata.name;
  }
  
  // Fallback to email username
  if (user.email) {
    return user.email.split('@')[0];
  }
  
  return 'Usuário';
}

/**
 * Get user email
 */
function getUserEmail(user: User | null): string | null {
  return user?.email ?? null;
}

/**
 * Get user avatar URL
 */
function getUserAvatar(user: User | null): string | null {
  if (!user) return null;
  
  // Try user metadata (from Google OAuth)
  if (user.user_metadata?.avatar_url) {
    return user.user_metadata.avatar_url;
  }
  
  if (user.user_metadata?.picture) {
    return user.user_metadata.picture;
  }
  
  return null;
}

// ============================================================================
// QUIZ OPERATIONS
// ============================================================================

/**
 * Get user's quiz history
 */
async function getUserQuizHistory(
  userId: string,
  options?: {
    limit?: number;
    city?: string;
    orderBy?: 'created_at' | 'score' | 'percentage';
    ascending?: boolean;
  }
): Promise<QuizResult[]> {
  const { limit = 50, city, orderBy = 'created_at', ascending = false } = options || {};

  let query = supabaseBrowser
    .from('user_quiz_results')
    .select('*')
    .eq('user_id', userId);

  if (city) {
    query = query.eq('city', city);
  }

  query = query.order(orderBy, { ascending }).limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching quiz history:', error);
    return [];
  }

  return data || [];
}

/**
 * Get user's best quiz scores per city (simplified)
 * Returns only the highest score for each city - they are independent
 */
async function getUserQuizStats(userId: string) {
  const { data, error } = await supabaseBrowser
    .from('user_quiz_results')
    .select('city, percentage')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching quiz stats:', error);
    return null;
  }

  if (!data || data.length === 0) {
    return {
      gramado: null,
      canela: null,
    };
  }

  // Get best score for each city independently
  const gramadoScores = data.filter(q => q.city === 'Gramado').map(q => q.percentage);
  const canelaScores = data.filter(q => q.city === 'Canela').map(q => q.percentage);

  return {
    gramado: gramadoScores.length > 0 ? Math.max(...gramadoScores) : null,
    canela: canelaScores.length > 0 ? Math.max(...canelaScores) : null,
  };
}

/**
 * Get user's best quiz result for a specific city
 */
async function getUserBestQuizForCity(
  userId: string,
  city: string
): Promise<QuizResult | null> {
  const { data, error } = await supabaseBrowser
    .from('user_quiz_results')
    .select('*')
    .eq('user_id', userId)
    .eq('city', city)
    .order('percentage', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching best quiz:', error);
    return null;
  }

  return data;
}

/**
 * Save quiz result for authenticated user
 */
async function saveQuizResult(params: {
  userId: string;
  city: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: any;
}): Promise<QuizResult | null> {
  const { data, error } = await supabaseBrowser
    .from('user_quiz_results')
    .insert({
      user_id: params.userId,
      city: params.city,
      score: params.score,
      total_questions: params.totalQuestions,
      percentage: params.percentage,
      answers: params.answers,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving quiz result:', error);
    return null;
  }

  return data;
}

/**
 * Check if user has completed quiz for a city
 */
async function hasUserCompletedQuiz(
  userId: string,
  city: string
): Promise<boolean> {
  const { data, error } = await supabaseBrowser
    .from('user_quiz_results')
    .select('id')
    .eq('user_id', userId)
    .eq('city', city)
    .limit(1);

  if (error) {
    console.error('Error checking quiz completion:', error);
    return false;
  }

  return (data?.length ?? 0) > 0;
}

// ============================================================================
// EXPORT SERVICE OBJECT
// ============================================================================

/**
 * Main user service object with all operations
 * Use this for cleaner imports
 */
export const userService = {
  // Profile operations
  getProfile: getUserProfile,
  updateProfile: updateUserProfile,
  getDisplayName: getUserDisplayName,
  getEmail: getUserEmail,
  getAvatar: getUserAvatar,
  
  // Quiz operations
  getQuizHistory: getUserQuizHistory,
  getQuizStats: getUserQuizStats,
  getBestQuizForCity: getUserBestQuizForCity,
  saveQuizResult: saveQuizResult,
  hasCompletedQuiz: hasUserCompletedQuiz,
};

// Export individual functions for tree-shaking
export {
  getUserProfile,
  updateUserProfile,
  getUserDisplayName,
  getUserEmail,
  getUserAvatar,
  getUserQuizHistory,
  getUserQuizStats,
  getUserBestQuizForCity,
  saveQuizResult,
  hasUserCompletedQuiz,
};

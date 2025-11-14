// Database types for Historin Supabase schema
// Generated manually based on database schema. For auto-generation, use:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      quiz: {
        Row: {
          id: string;
          created_at: string;
          answers: Json;
          score: number | null;
          meta: Json | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          answers: Json;
          score?: number | null;
          meta?: Json | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          answers?: Json;
          score?: number | null;
          meta?: Json | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      user_profiles: {
        Row: {
          id: string;
          email: string | null;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_quiz_results: {
        Row: {
          id: string;
          user_id: string;
          city: string;
          score: number;
          total_questions: number;
          percentage: number;
          answers: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          city: string;
          score: number;
          total_questions: number;
          percentage: number;
          answers: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          city?: string;
          score?: number;
          total_questions?: number;
          percentage?: number;
          answers?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_quiz_results_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_favorites: {
        Row: {
          id: string;
          user_id: string;
          historia_id: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          historia_id: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          historia_id?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_favorites_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      quiz_questions: {
        Row: {
          id: number;
          city: string;
          question: string;
          options: Json;
          correct_answer: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          city: string;
          question: string;
          options: Json;
          correct_answer: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          city?: string;
          question?: string;
          options?: Json;
          correct_answer?: number;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Convenience type exports
export type QuizRow = Database['public']['Tables']['quiz']['Row'];
export type QuizInsert = Database['public']['Tables']['quiz']['Insert'];
export type QuizUpdate = Database['public']['Tables']['quiz']['Update'];

export type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
export type UserProfileInsert = Database['public']['Tables']['user_profiles']['Insert'];
export type UserProfileUpdate = Database['public']['Tables']['user_profiles']['Update'];

export type UserQuizResult = Database['public']['Tables']['user_quiz_results']['Row'];
export type UserQuizResultInsert = Database['public']['Tables']['user_quiz_results']['Insert'];
export type UserQuizResultUpdate = Database['public']['Tables']['user_quiz_results']['Update'];

export type UserFavorite = Database['public']['Tables']['user_favorites']['Row'];
export type UserFavoriteInsert = Database['public']['Tables']['user_favorites']['Insert'];
export type UserFavoriteUpdate = Database['public']['Tables']['user_favorites']['Update'];

export type QuizQuestion = Database['public']['Tables']['quiz_questions']['Row'];
export type QuizQuestionInsert = Database['public']['Tables']['quiz_questions']['Insert'];
export type QuizQuestionUpdate = Database['public']['Tables']['quiz_questions']['Update'];

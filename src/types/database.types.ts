// Minimal Database types for the `quiz` table. Adjust to your exact schema in Supabase.
// If you have generated types from Supabase, replace this file with the generated version.

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
          id: string; // uuid
          created_at: string; // timestamptz
          answers: Json; // jsonb: raw answers or structured data
          score: number | null; // numeric or integer
          meta: Json | null; // any extra context (version, city, device, etc.)
          user_id: string | null; // optional user identifier (if auth added later)
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
    };
  };
}

export type QuizRow = Database['public']['Tables']['quiz']['Row'];
export type QuizInsert = Database['public']['Tables']['quiz']['Insert'];

-- Create user_quiz_results table to store quiz results per user
CREATE TABLE IF NOT EXISTS user_quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  city TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own quiz results"
  ON user_quiz_results
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results"
  ON user_quiz_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS user_quiz_results_user_id_idx ON user_quiz_results(user_id);
CREATE INDEX IF NOT EXISTS user_quiz_results_city_idx ON user_quiz_results(city);
CREATE INDEX IF NOT EXISTS user_quiz_results_created_at_idx ON user_quiz_results(created_at DESC);
CREATE INDEX IF NOT EXISTS user_quiz_results_percentage_idx ON user_quiz_results(percentage DESC);

-- Create view for user statistics
CREATE OR REPLACE VIEW user_quiz_stats AS
SELECT 
  user_id,
  COUNT(*) as total_quizzes,
  AVG(percentage) as avg_percentage,
  MAX(percentage) as best_percentage,
  MIN(percentage) as worst_percentage,
  COUNT(DISTINCT city) as cities_played
FROM user_quiz_results
GROUP BY user_id;

-- Grant access to the view
GRANT SELECT ON user_quiz_stats TO authenticated;

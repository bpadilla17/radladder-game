-- Radiology Ladder Game - Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Questions Table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id VARCHAR(20) UNIQUE NOT NULL,
  rung_level INTEGER NOT NULL CHECK (rung_level BETWEEN 1 AND 10),
  image_url TEXT NOT NULL,
  clinical_scenario TEXT NOT NULL,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  teaching_point TEXT NOT NULL,
  time_limit_seconds INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Game Sessions Table
CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_name VARCHAR(100) NOT NULL,
  start_time TIMESTAMP DEFAULT NOW(),
  end_time TIMESTAMP,
  current_rung INTEGER DEFAULT 3,
  final_rung INTEGER,
  total_questions INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  wrong_answers INTEGER DEFAULT 0,
  total_time_seconds INTEGER,
  final_score INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Game Answers Table
CREATE TABLE IF NOT EXISTS game_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES game_sessions(id),
  question_id VARCHAR(20) REFERENCES questions(question_id),
  selected_answer CHAR(1) CHECK (selected_answer IN ('A','B','C','D','P','T')),
  is_correct BOOLEAN,
  time_taken_seconds INTEGER,
  rung_at_time INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Answer Statistics Table
CREATE TABLE IF NOT EXISTS answer_statistics (
  question_id VARCHAR(20) PRIMARY KEY REFERENCES questions(question_id),
  total_attempts INTEGER DEFAULT 0,
  option_a_count INTEGER DEFAULT 0,
  option_b_count INTEGER DEFAULT 0,
  option_c_count INTEGER DEFAULT 0,
  option_d_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_questions_rung ON questions(rung_level);
CREATE INDEX IF NOT EXISTS idx_sessions_completed ON game_sessions(completed, final_rung);
CREATE INDEX IF NOT EXISTS idx_sessions_created ON game_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_answers_session ON game_answers(session_id);

-- Enable Row Level Security (RLS)
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE answer_statistics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Public Read Access
CREATE POLICY "Public can read questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Public can insert sessions" ON game_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update own session" ON game_sessions FOR UPDATE USING (true);
CREATE POLICY "Public can read completed sessions" ON game_sessions FOR SELECT USING (completed = true);
CREATE POLICY "Public can insert answers" ON game_answers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read answer stats" ON answer_statistics FOR SELECT USING (true);
CREATE POLICY "Public can insert answer stats" ON answer_statistics FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update answer stats" ON answer_statistics FOR UPDATE USING (true);

-- Success Message
SELECT 'Database schema created successfully!' as message;

/*
  # Create user progress tracking tables

  1. New Tables
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, tracks user)
      - `lesson_id` (int, references lesson)
      - `completed` (boolean, whether lesson is completed)
      - `progress` (int, progress percentage 0-100)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `quiz_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, tracks user)
      - `quiz_id` (int, references quiz)
      - `score` (int, score achieved)
      - `total` (int, total questions)
      - `percentage` (int, percentage correct)
      - `completed_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to manage their own data
*/

CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  lesson_id int NOT NULL,
  completed boolean DEFAULT false,
  progress int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  quiz_id int NOT NULL,
  score int NOT NULL,
  total int NOT NULL,
  percentage int NOT NULL,
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_progress
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own progress"
  ON user_progress
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own quiz results"
  ON quiz_results
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own quiz results"
  ON quiz_results
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

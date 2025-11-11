-- Create enrollments table for training program registrations
CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  job_title VARCHAR(100),
  training_program VARCHAR(255) NOT NULL,
  training_type VARCHAR(100),
  experience_level VARCHAR(50),
  preferred_start_date DATE,
  learning_goals TEXT,
  how_heard_about_us VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  synced_to_erp BOOLEAN DEFAULT FALSE,
  erp_sync_date TIMESTAMP WITH TIME ZONE
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_enrollments_email ON enrollments(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_enrollments_created_at ON enrollments(created_at DESC);

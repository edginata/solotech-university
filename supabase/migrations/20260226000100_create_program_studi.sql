-- Create table program_studi
CREATE TABLE IF NOT EXISTS public.program_studi (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Optional index
CREATE INDEX IF NOT EXISTS idx_program_studi_name ON public.program_studi (name);

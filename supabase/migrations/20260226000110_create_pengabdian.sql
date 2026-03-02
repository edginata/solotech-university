-- Create table pengabdian
CREATE TABLE IF NOT EXISTS public.pengabdian (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  author text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pengabdian_title ON public.pengabdian (title);

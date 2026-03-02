-- Create table galeri (gallery)
CREATE TABLE IF NOT EXISTS public.galeri (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_galeri_created_at ON public.galeri (created_at);

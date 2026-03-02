-- Create table berita
CREATE TABLE IF NOT EXISTS public.berita (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  content text,
  category text,
  author text,
  image_url text,
  published_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_berita_published_at ON public.berita (published_at);

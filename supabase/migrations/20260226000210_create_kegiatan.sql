-- Create table kegiatan (events/activities)
CREATE TABLE IF NOT EXISTS public.kegiatan (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  location text,
  start_at timestamptz,
  end_at timestamptz,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_kegiatan_start_at ON public.kegiatan (start_at);

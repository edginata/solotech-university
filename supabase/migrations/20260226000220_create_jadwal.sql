-- Create table jadwal (schedules)
CREATE TABLE IF NOT EXISTS public.jadwal (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  day text,
  time_from time,
  time_to time,
  location text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_jadwal_day ON public.jadwal (day);

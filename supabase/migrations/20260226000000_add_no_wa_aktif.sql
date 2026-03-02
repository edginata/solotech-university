-- Add column no_wa_aktif to pendaftar table
ALTER TABLE public.pendaftar
ADD COLUMN IF NOT EXISTS no_wa_aktif text;

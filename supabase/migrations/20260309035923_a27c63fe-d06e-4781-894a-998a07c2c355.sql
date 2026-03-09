-- Add akreditasi and duration columns to program_studi table
ALTER TABLE public.program_studi 
ADD COLUMN akreditasi text DEFAULT 'B',
ADD COLUMN durasi text DEFAULT '4 Tahun';
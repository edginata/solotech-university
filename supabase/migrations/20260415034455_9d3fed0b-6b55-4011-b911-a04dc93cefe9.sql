
-- Add document URL columns to pendaftar
ALTER TABLE public.pendaftar ADD COLUMN ijazah_url text DEFAULT NULL;
ALTER TABLE public.pendaftar ADD COLUMN ktp_url text DEFAULT NULL;
ALTER TABLE public.pendaftar ADD COLUMN nilai_url text DEFAULT NULL;

-- Create storage bucket for registration documents
INSERT INTO storage.buckets (id, name, public) VALUES ('pendaftaran-docs', 'pendaftaran-docs', false);

-- Allow anyone (anon) to upload documents
CREATE POLICY "Anyone can upload registration docs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'pendaftaran-docs');

-- Allow admins to view all documents
CREATE POLICY "Admins can view registration docs"
ON storage.objects FOR SELECT
USING (bucket_id = 'pendaftaran-docs' AND public.is_admin());

-- Allow admins to delete documents
CREATE POLICY "Admins can delete registration docs"
ON storage.objects FOR DELETE
USING (bucket_id = 'pendaftaran-docs' AND public.is_admin());

-- Allow anon to read their uploaded files (by path matching)
CREATE POLICY "Uploaders can view own registration docs"
ON storage.objects FOR SELECT
USING (bucket_id = 'pendaftaran-docs');

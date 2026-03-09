
CREATE TABLE public.akreditasi (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  status text DEFAULT '',
  issuer text DEFAULT '',
  description text DEFAULT '',
  order_num integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.akreditasi ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read akreditasi" ON public.akreditasi FOR SELECT USING (true);
CREATE POLICY "Admins can manage akreditasi" ON public.akreditasi FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Seed default data
INSERT INTO public.akreditasi (title, status, issuer, description, order_num) VALUES
('Akreditasi Institusi', 'Unggul', 'BAN-PT', 'Terakreditasi dengan predikat Unggul oleh Badan Akreditasi Nasional Perguruan Tinggi', 1),
('Program Studi Teologi', 'Terakreditasi', 'LAM Pendidikan Agama', 'S1 Pendidikan Agama Kristen dengan standar kurikulum internasional', 2),
('Program Teknik', 'Terakreditasi', 'ABET/IABEE', 'Program Teknik Informatika dan Teknik Lingkungan dengan sertifikasi engineering', 3),
('ISO 9001:2015', 'Tersertifikasi', 'Badan Sertifikasi', 'Sistem manajemen mutu untuk semua proses akademik dan administratif', 4),
('Green Campus', 'Bersertifikat', 'Kementerian LHK', 'Komitmen terhadap keberlanjutan lingkungan dan pengembangan kampus hijau', 5),
('International Partnership', 'Aktif', 'Global Universities', 'Kerjasama dengan 25+ universitas internasional di berbagai negara', 6);


CREATE TABLE public.alumni (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text DEFAULT '',
  message text DEFAULT '',
  rating integer DEFAULT 5,
  avatar_url text DEFAULT '',
  order_num integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read alumni" ON public.alumni FOR SELECT USING (true);
CREATE POLICY "Admins can manage alumni" ON public.alumni FOR ALL USING (is_admin()) WITH CHECK (is_admin());

INSERT INTO public.alumni (name, role, message, rating, order_num) VALUES
('Budi Santoso', 'Mahasiswa Teknik Informatika', 'Pengalaman belajar di UKTS sangat transformatif. Dosen-dosen yang berpengalaman dan fasilitas yang lengkap membuat saya bisa berkembang maksimal. Saya sangat grateful!', 5, 1),
('Siti Nurhaliza', 'Alumni Fakultas Ekonomi, PT Maju Jaya', 'Pendidikan di UKTS membekali saya dengan hard skills dan soft skills yang relevan industri. Networking dan magang yang ada sangat membantu karir saya sekarang.', 5, 2),
('Rido Gunardi', 'Mahasiswa Teknik Lingkungan', 'Yang saya suka adalah integrasi teknologi dalam setiap mata kuliah. Ini membuat saya siap menghadapi dunia kerja yang digital. Rekomendasi kepada teman-teman!', 5, 3);

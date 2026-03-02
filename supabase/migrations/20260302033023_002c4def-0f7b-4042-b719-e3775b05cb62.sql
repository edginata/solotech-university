
-- Section metadata for editable section headers
CREATE TABLE public.section_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name text NOT NULL UNIQUE,
  title text NOT NULL DEFAULT '',
  description text DEFAULT ''
);
ALTER TABLE public.section_metadata ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read section_metadata" ON public.section_metadata FOR SELECT USING (true);
CREATE POLICY "Admins can manage section_metadata" ON public.section_metadata FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Seed initial section metadata
INSERT INTO public.section_metadata (section_name, title, description) VALUES
  ('pendaftar', 'Data Pendaftar', 'Kelola data calon mahasiswa baru'),
  ('akademik', 'Program Akademik', 'Kelola fakultas dan program studi'),
  ('pengabdian', 'Pengabdian Masyarakat', 'Kegiatan pengabdian kepada masyarakat'),
  ('penelitian', 'Penelitian', 'Kegiatan penelitian dosen dan mahasiswa'),
  ('berita', 'Berita & Artikel', 'Berita terbaru seputar kampus'),
  ('kegiatan', 'Kegiatan Kampus', 'Agenda dan kegiatan kampus'),
  ('jadwal', 'Jadwal Perkuliahan', 'Jadwal kuliah dan kegiatan akademik'),
  ('galeri', 'Galeri Foto', 'Dokumentasi kegiatan kampus'),
  ('bem', 'BEM & Organisasi', 'Kegiatan organisasi mahasiswa');

-- Faculty table
CREATE TABLE public.faculty (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  order_num integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read faculty" ON public.faculty FOR SELECT USING (true);
CREATE POLICY "Admins can manage faculty" ON public.faculty FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Seed faculties
INSERT INTO public.faculty (name, description, order_num) VALUES
  ('Fakultas Teologi', 'Fakultas Teologi UKTS', 1),
  ('Fakultas Teknik', 'Fakultas Teknik UKTS', 2),
  ('Fakultas Ekonomi', 'Fakultas Ekonomi UKTS', 3);

-- Program Studi table
CREATE TABLE public.program_studi (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  faculty_id uuid REFERENCES public.faculty(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.program_studi ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read program_studi" ON public.program_studi FOR SELECT USING (true);
CREATE POLICY "Admins can manage program_studi" ON public.program_studi FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Pengabdian table
CREATE TABLE public.pengabdian (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  category text DEFAULT 'pengabdian',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.pengabdian ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read pengabdian" ON public.pengabdian FOR SELECT USING (true);
CREATE POLICY "Admins can manage pengabdian" ON public.pengabdian FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Berita table
CREATE TABLE public.berita (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  description text,
  author text,
  category text,
  image_url text,
  link text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read berita" ON public.berita FOR SELECT USING (true);
CREATE POLICY "Admins can manage berita" ON public.berita FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Kegiatan table
CREATE TABLE public.kegiatan (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  location text,
  image_url text,
  start_at timestamptz DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.kegiatan ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read kegiatan" ON public.kegiatan FOR SELECT USING (true);
CREATE POLICY "Admins can manage kegiatan" ON public.kegiatan FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Jadwal table
CREATE TABLE public.jadwal (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  day text,
  time_from text,
  time_to text,
  location text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.jadwal ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read jadwal" ON public.jadwal FOR SELECT USING (true);
CREATE POLICY "Admins can manage jadwal" ON public.jadwal FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Galeri table
CREATE TABLE public.galeri (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  image_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.galeri ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read galeri" ON public.galeri FOR SELECT USING (true);
CREATE POLICY "Admins can manage galeri" ON public.galeri FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- BEM table
CREATE TABLE public.bem (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.bem ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read bem" ON public.bem FOR SELECT USING (true);
CREATE POLICY "Admins can manage bem" ON public.bem FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Media storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Anyone can view media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND public.is_admin());

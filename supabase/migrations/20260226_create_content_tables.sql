-- Create program_studi table
CREATE TABLE public.program_studi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pengabdian table
CREATE TABLE public.pengabdian (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    author TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create berita table
CREATE TABLE public.berita (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    category TEXT,
    author TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create kegiatan table
CREATE TABLE public.kegiatan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    start_at TIMESTAMP WITH TIME ZONE,
    end_at TIMESTAMP WITH TIME ZONE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create jadwal table
CREATE TABLE public.jadwal (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    day TEXT,
    time_from TEXT,
    time_to TEXT,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create galeri table
CREATE TABLE public.galeri (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    description TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add no_wa_aktif column to pendaftar
ALTER TABLE public.pendaftar ADD COLUMN no_wa_aktif TEXT;

-- Enable RLS on all new tables
ALTER TABLE public.program_studi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengabdian ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kegiatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jadwal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeri ENABLE ROW LEVEL SECURITY;

-- RLS Policies for program_studi
CREATE POLICY "Anyone can read program_studi"
ON public.program_studi
FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins can insert program_studi"
ON public.program_studi
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update program_studi"
ON public.program_studi
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete program_studi"
ON public.program_studi
FOR DELETE
TO authenticated
USING (public.is_admin());

-- RLS Policies for pengabdian
CREATE POLICY "Anyone can read pengabdian"
ON public.pengabdian
FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins can insert pengabdian"
ON public.pengabdian
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update pengabdian"
ON public.pengabdian
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete pengabdian"
ON public.pengabdian
FOR DELETE
TO authenticated
USING (public.is_admin());

-- RLS Policies for berita
CREATE POLICY "Anyone can read berita"
ON public.berita
FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins can insert berita"
ON public.berita
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update berita"
ON public.berita
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete berita"
ON public.berita
FOR DELETE
TO authenticated
USING (public.is_admin());

-- RLS Policies for kegiatan
CREATE POLICY "Anyone can read kegiatan"
ON public.kegiatan
FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins can insert kegiatan"
ON public.kegiatan
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update kegiatan"
ON public.kegiatan
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete kegiatan"
ON public.kegiatan
FOR DELETE
TO authenticated
USING (public.is_admin());

-- RLS Policies for jadwal
CREATE POLICY "Anyone can read jadwal"
ON public.jadwal
FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins can insert jadwal"
ON public.jadwal
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update jadwal"
ON public.jadwal
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete jadwal"
ON public.jadwal
FOR DELETE
TO authenticated
USING (public.is_admin());

-- RLS Policies for galeri
CREATE POLICY "Anyone can read galeri"
ON public.galeri
FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins can insert galeri"
ON public.galeri
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update galeri"
ON public.galeri
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete galeri"
ON public.galeri
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Create update triggers for all tables
CREATE TRIGGER update_program_studi_updated_at
BEFORE UPDATE ON public.program_studi
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pengabdian_updated_at
BEFORE UPDATE ON public.pengabdian
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_berita_updated_at
BEFORE UPDATE ON public.berita
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_kegiatan_updated_at
BEFORE UPDATE ON public.kegiatan
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jadwal_updated_at
BEFORE UPDATE ON public.jadwal
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_galeri_updated_at
BEFORE UPDATE ON public.galeri
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

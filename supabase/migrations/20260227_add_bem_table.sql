-- Create bem table for BEM content (struktur, kegiatan, dll)
CREATE TABLE public.bem (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bem ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bem
CREATE POLICY "Anyone can read bem"
ON public.bem FOR SELECT TO public USING (true);

CREATE POLICY "Admins can insert bem"
ON public.bem FOR INSERT TO authenticated WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update bem"
ON public.bem FOR UPDATE TO authenticated USING (public.is_admin());

CREATE POLICY "Admins can delete bem"
ON public.bem FOR DELETE TO authenticated USING (public.is_admin());

-- Insert default BEM metadata if not exists
INSERT INTO public.section_metadata (section_name, title, description) VALUES
  ('bem', 'Badan Eksekutif Mahasiswa', 'BEM UKTS adalah organisasi kemahasiswaan yang merepresentasikan seluruh mahasiswa. Badan ini berperan dalam mengembangkan hubungan antar mahasiswa, mengadvokasi kepentingan mahasiswa, dan mengelola program-program untuk meningkatkan kualitas kehidupan kampus.')
ON CONFLICT (section_name) DO NOTHING;

-- Create update trigger
CREATE TRIGGER update_bem_updated_at
BEFORE UPDATE ON public.bem
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

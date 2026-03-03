
-- Content pages table for dynamic section content editing
CREATE TABLE public.content_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL,
  section_key text NOT NULL,
  field_key text NOT NULL,
  field_type text NOT NULL DEFAULT 'text',
  value text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(page_key, section_key, field_key)
);
ALTER TABLE public.content_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read content_pages" ON public.content_pages FOR SELECT USING (true);
CREATE POLICY "Admins can manage content_pages" ON public.content_pages FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Site settings table
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value text DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site_settings" ON public.site_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Seed initial settings
INSERT INTO public.site_settings (key, value) VALUES
  ('pmb_open', 'true'),
  ('site_name', 'Universitas Kristen Teknologi Solo');

-- Add trigger for updated_at on content_pages
CREATE TRIGGER update_content_pages_updated_at
BEFORE UPDATE ON public.content_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

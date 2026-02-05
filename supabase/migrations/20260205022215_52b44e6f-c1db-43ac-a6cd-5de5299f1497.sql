-- Create app_role enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for storing admin roles
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create pendaftar table for registration data
CREATE TABLE public.pendaftar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama TEXT NOT NULL,
    email TEXT NOT NULL,
    telepon TEXT NOT NULL,
    alamat TEXT,
    program_studi TEXT NOT NULL,
    jalur_pendaftaran TEXT DEFAULT 'Reguler',
    status TEXT NOT NULL DEFAULT 'Pending',
    tanggal_lahir DATE,
    jenis_kelamin TEXT,
    asal_sekolah TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on pendaftar
ALTER TABLE public.pendaftar ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.is_admin());

-- RLS Policies for pendaftar (only admins can access)
CREATE POLICY "Admins can view all pendaftar"
ON public.pendaftar
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can insert pendaftar"
ON public.pendaftar
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update pendaftar"
ON public.pendaftar
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete pendaftar"
ON public.pendaftar
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Allow public to insert pendaftar for registration form
CREATE POLICY "Anyone can register"
ON public.pendaftar
FOR INSERT
TO anon
WITH CHECK (true);

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for pendaftar table
CREATE TRIGGER update_pendaftar_updated_at
BEFORE UPDATE ON public.pendaftar
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
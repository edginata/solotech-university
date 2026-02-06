-- Allow users to insert their own admin role during signup (only for themselves)
CREATE POLICY "Users can add their own role during signup"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
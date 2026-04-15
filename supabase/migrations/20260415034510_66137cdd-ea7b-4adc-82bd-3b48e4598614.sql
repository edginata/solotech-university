
-- Remove overly permissive SELECT policy
DROP POLICY "Uploaders can view own registration docs" ON storage.objects;

-- Allow public inserts to properties table
CREATE POLICY "Anyone can insert properties"
ON public.properties
FOR INSERT
TO public
WITH CHECK (true);
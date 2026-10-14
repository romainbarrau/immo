-- Allow public updates to properties table (for main_image_url)
CREATE POLICY "Anyone can update properties"
ON public.properties
FOR UPDATE
TO public
USING (true);
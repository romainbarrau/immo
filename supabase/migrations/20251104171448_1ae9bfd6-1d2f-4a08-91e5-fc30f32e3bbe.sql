-- Allow public uploads to property-images storage bucket for admin
DROP POLICY IF EXISTS "Authenticated users can upload property images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update property images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete property images" ON storage.objects;

-- Allow anyone to upload property images (for admin page)
CREATE POLICY "Anyone can upload property images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'property-images');

-- Allow anyone to update property images
CREATE POLICY "Anyone can update property images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'property-images');

-- Allow anyone to delete property images
CREATE POLICY "Anyone can delete property images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'property-images');

-- Allow public inserts into property_images table
CREATE POLICY "Anyone can insert property images"
ON public.property_images
FOR INSERT
TO public
WITH CHECK (true);

-- Allow public updates to property_images table
CREATE POLICY "Anyone can update property images"
ON public.property_images
FOR UPDATE
TO public
USING (true);

-- Allow public deletes from property_images table
CREATE POLICY "Anyone can delete property images"
ON public.property_images
FOR DELETE
TO public
USING (true);
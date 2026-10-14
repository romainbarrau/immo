-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
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

-- RLS policy for user_roles: only admins can see roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop existing permissive policies on all tables and replace with secure ones

-- BLOG_ARTICLES: Public can read published, only admins can write
DROP POLICY IF EXISTS "Anyone can delete articles" ON public.blog_articles;
DROP POLICY IF EXISTS "Anyone can insert articles" ON public.blog_articles;
DROP POLICY IF EXISTS "Anyone can update articles" ON public.blog_articles;
DROP POLICY IF EXISTS "Anyone can view all articles" ON public.blog_articles;

CREATE POLICY "Public can view published articles"
ON public.blog_articles FOR SELECT
USING (published = true);

CREATE POLICY "Admins can view all articles"
ON public.blog_articles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert articles"
ON public.blog_articles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update articles"
ON public.blog_articles FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete articles"
ON public.blog_articles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- PROPERTIES: Public can read, only admins can write
DROP POLICY IF EXISTS "Anyone can insert properties" ON public.properties;
DROP POLICY IF EXISTS "Anyone can update properties" ON public.properties;
DROP POLICY IF EXISTS "Properties are viewable by everyone" ON public.properties;

CREATE POLICY "Public can view properties"
ON public.properties FOR SELECT
USING (true);

CREATE POLICY "Admins can insert properties"
ON public.properties FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update properties"
ON public.properties FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete properties"
ON public.properties FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- GOOGLE_REVIEWS: Public can read active, only admins can write
DROP POLICY IF EXISTS "Anyone can delete reviews" ON public.google_reviews;
DROP POLICY IF EXISTS "Anyone can insert reviews" ON public.google_reviews;
DROP POLICY IF EXISTS "Anyone can update reviews" ON public.google_reviews;
DROP POLICY IF EXISTS "Anyone can view active reviews" ON public.google_reviews;

CREATE POLICY "Public can view active reviews"
ON public.google_reviews FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all reviews"
ON public.google_reviews FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert reviews"
ON public.google_reviews FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update reviews"
ON public.google_reviews FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete reviews"
ON public.google_reviews FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- VIDEOS: Public can read active, only admins can write
DROP POLICY IF EXISTS "Anyone can delete videos" ON public.videos;
DROP POLICY IF EXISTS "Anyone can insert videos" ON public.videos;
DROP POLICY IF EXISTS "Anyone can update videos" ON public.videos;
DROP POLICY IF EXISTS "Anyone can view videos" ON public.videos;

CREATE POLICY "Public can view active videos"
ON public.videos FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all videos"
ON public.videos FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert videos"
ON public.videos FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update videos"
ON public.videos FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete videos"
ON public.videos FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- PROPERTY_IMAGES: Public can read, only admins can write
DROP POLICY IF EXISTS "Anyone can delete property images" ON public.property_images;
DROP POLICY IF EXISTS "Anyone can insert property images" ON public.property_images;
DROP POLICY IF EXISTS "Anyone can update property images" ON public.property_images;
DROP POLICY IF EXISTS "Property images are viewable by everyone" ON public.property_images;

CREATE POLICY "Public can view property images"
ON public.property_images FOR SELECT
USING (true);

CREATE POLICY "Admins can insert property images"
ON public.property_images FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update property images"
ON public.property_images FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete property images"
ON public.property_images FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- STORAGE: Fix storage policies for property-images bucket
DROP POLICY IF EXISTS "Anyone can upload property images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update property images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete property images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view property images" ON storage.objects;

CREATE POLICY "Public can view property images"
ON storage.objects FOR SELECT
USING (bucket_id = 'property-images');

CREATE POLICY "Admins can upload property images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update property images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'property-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete property images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'property-images' AND public.has_role(auth.uid(), 'admin'));
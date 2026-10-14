-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference VARCHAR(50) UNIQUE NOT NULL,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  location_fr TEXT NOT NULL,
  location_en TEXT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area_m2 DECIMAL(10,2),
  land_area_m2 DECIMAL(10,2),
  property_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  characteristics JSONB,
  main_image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create property_images table
CREATE TABLE public.property_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Properties are viewable by everyone"
ON public.properties
FOR SELECT
USING (true);

CREATE POLICY "Property images are viewable by everyone"
ON public.property_images
FOR SELECT
USING (true);

-- Create indexes
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_reference ON public.properties(reference);
CREATE INDEX idx_property_images_property_id ON public.property_images(property_id);
CREATE INDEX idx_property_images_display_order ON public.property_images(display_order);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true);

-- Create storage policies
CREATE POLICY "Property images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update property images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'property-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete property images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'property-images' AND auth.role() = 'authenticated');
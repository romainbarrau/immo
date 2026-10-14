-- Create table for Google reviews
CREATE TABLE public.google_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  google_url TEXT NOT NULL,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  review_text_fr TEXT,
  review_text_en TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for videos
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_url TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.google_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- RLS policies for google_reviews
CREATE POLICY "Anyone can view active reviews" ON public.google_reviews FOR SELECT USING (true);
CREATE POLICY "Anyone can insert reviews" ON public.google_reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update reviews" ON public.google_reviews FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete reviews" ON public.google_reviews FOR DELETE USING (true);

-- RLS policies for videos
CREATE POLICY "Anyone can view videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Anyone can insert videos" ON public.videos FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update videos" ON public.videos FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete videos" ON public.videos FOR DELETE USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_google_reviews_updated_at
BEFORE UPDATE ON public.google_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
BEFORE UPDATE ON public.videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
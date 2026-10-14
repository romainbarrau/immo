-- Create blog_articles table
CREATE TABLE public.blog_articles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR NOT NULL UNIQUE,
    title_fr TEXT NOT NULL,
    title_en TEXT NOT NULL,
    excerpt_fr TEXT NOT NULL,
    excerpt_en TEXT NOT NULL,
    content_fr TEXT NOT NULL,
    content_en TEXT NOT NULL,
    cover_image_url TEXT,
    published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
CREATE POLICY "Anyone can view published articles"
ON public.blog_articles
FOR SELECT
USING (published = true);

-- Anyone can insert/update/delete for now (will be secured with auth later)
CREATE POLICY "Anyone can insert articles"
ON public.blog_articles
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update articles"
ON public.blog_articles
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete articles"
ON public.blog_articles
FOR DELETE
USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_blog_articles_updated_at
BEFORE UPDATE ON public.blog_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
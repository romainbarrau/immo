-- Drop old policy that only allows viewing published articles
DROP POLICY IF EXISTS "Anyone can view published articles" ON public.blog_articles;

-- Create new policy that allows viewing ALL articles (admin needs to see drafts too)
CREATE POLICY "Anyone can view all articles" 
ON public.blog_articles 
FOR SELECT 
USING (true);
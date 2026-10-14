import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['blog-article', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const title = language === 'fr' ? article?.title_fr : article?.title_en;
  const content = language === 'fr' ? article?.content_fr : article?.content_en;

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 md:px-6 py-20 pt-32">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 md:px-6 py-20 pt-32 text-center">
          <h1 className="text-3xl font-display font-bold mb-4 text-foreground">
            {language === 'fr' ? 'Article non trouvé' : 'Article not found'}
          </h1>
          <Link to="/blog">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {language === 'fr' ? 'Retour aux articles' : 'Back to articles'}
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <article className="container mx-auto px-4 md:px-6 py-20 pt-32">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog">
            <Button variant="ghost" className="gap-2 mb-8">
              <ArrowLeft className="h-4 w-4" />
              {language === 'fr' ? 'Retour aux articles' : 'Back to articles'}
            </Button>
          </Link>

          {article.cover_image_url && (
            <img 
              src={article.cover_image_url} 
              alt={title} 
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
            />
          )}

          <div className="flex items-center text-sm text-foreground/80 mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            <time dateTime={article.published_at || article.created_at}>
              {format(
                new Date(article.published_at || article.created_at),
                'PPP',
                { locale: language === 'fr' ? fr : enUS }
              )}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-foreground">
            {title}
          </h1>

          <div 
            className="prose prose-lg max-w-none text-foreground/90"
            dangerouslySetInnerHTML={{ __html: content?.replace(/\n/g, '<br />') || '' }}
          />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogArticle;
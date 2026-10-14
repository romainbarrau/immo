import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

const Blog = () => {
  const { t, language } = useLanguage();

  const { data: articles, isLoading } = useQuery({
    queryKey: ['blog-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-20 pt-32">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif leading-[1.05] tracking-tight mb-4 text-foreground">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-foreground/90">
            {t('blog.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <Card key={i} className="p-8 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
                <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </Card>
            ))
          ) : articles?.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-foreground/70">
                {language === 'fr' 
                  ? 'Aucun article pour le moment. Revenez bientôt !' 
                  : 'No articles yet. Check back soon!'}
              </p>
            </Card>
          ) : (
            articles?.map((article, index) => {
              const title = language === 'fr' ? article.title_fr : article.title_en;

              return (
                <Link key={article.id} to={`/blog/${article.slug}`}>
                  <Card 
                    className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl md:text-2xl font-sans font-medium text-foreground group-hover:text-primary transition-colors">
                        {title}
                      </h2>
                      <ArrowRight className="h-5 w-5 text-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                </Link>
              );
            })
          )
        }
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

const AdminBlogList = () => {
  const queryClient = useQueryClient();

  const { data: articles, isLoading } = useQuery({
    queryKey: ['admin-blog-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_articles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-articles'] });
      toast.success('Article supprimé');
    },
    onError: () => {
      toast.error('Erreur lors de la suppression');
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase
        .from('blog_articles')
        .update({ 
          published, 
          published_at: published ? new Date().toISOString() : null 
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-articles'] });
      toast.success('Statut mis à jour');
    },
    onError: () => {
      toast.error('Erreur lors de la mise à jour');
    },
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Supprimer l'article "${title}" ?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin/properties">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl text-foreground font-serif">
              Gestion des Articles
            </h1>
          </div>
          <Link to="/admin/blog/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nouvel Article
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : articles?.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-foreground/70 mb-4">Aucun article pour le moment</p>
            <Link to="/admin/blog/create">
              <Button>Créer votre premier article</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {articles?.map((article) => (
              <Card key={article.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl text-foreground font-sans font-medium">
                        {article.title_fr}
                      </h2>
                      <Badge variant={article.published ? 'default' : 'secondary'}>
                        {article.published ? 'Publié' : 'Brouillon'}
                      </Badge>
                    </div>
                    <p className="text-foreground/70 text-sm mb-2">
                      {article.excerpt_fr}
                    </p>
                    <p className="text-foreground/50 text-xs">
                      Créé le {format(new Date(article.created_at), 'dd/MM/yyyy')}
                      {article.published_at && ` • Publié le ${format(new Date(article.published_at), 'dd/MM/yyyy')}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePublishMutation.mutate({ 
                        id: article.id, 
                        published: !article.published 
                      })}
                      title={article.published ? 'Dépublier' : 'Publier'}
                    >
                      {article.published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Link to={`/admin/blog/edit/${article.id}`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(article.id, article.title_fr)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogList;
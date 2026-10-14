import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Eye, EyeOff, ArrowLeft, Star, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const AdminReviewsList = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    google_url: '',
    author_name: '',
    rating: 5,
    review_text_fr: '',
    review_text_en: '',
  });

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('google_reviews')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('google_reviews')
        .insert([data]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      toast.success('Avis ajouté');
      setIsDialogOpen(false);
      setFormData({
        google_url: '',
        author_name: '',
        rating: 5,
        review_text_fr: '',
        review_text_en: '',
      });
    },
    onError: () => {
      toast.error('Erreur lors de l\'ajout');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('google_reviews')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      toast.success('Avis supprimé');
    },
    onError: () => {
      toast.error('Erreur lors de la suppression');
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('google_reviews')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      toast.success('Statut mis à jour');
    },
    onError: () => {
      toast.error('Erreur lors de la mise à jour');
    },
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Supprimer l'avis de "${name}" ?`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
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
              Gestion des Avis Google
            </h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouvel Avis
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Ajouter un avis Google</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="google_url">Lien Google Review *</Label>
                  <Input
                    id="google_url"
                    value={formData.google_url}
                    onChange={(e) => setFormData({ ...formData, google_url: e.target.value })}
                    placeholder="https://g.page/r/..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="author_name">Nom de l'auteur *</Label>
                  <Input
                    id="author_name"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Note (1-5) *</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="review_text_fr">Texte de l'avis (FR)</Label>
                  <Textarea
                    id="review_text_fr"
                    value={formData.review_text_fr}
                    onChange={(e) => setFormData({ ...formData, review_text_fr: e.target.value })}
                    placeholder="Excellent service..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="review_text_en">Texte de l'avis (EN)</Label>
                  <Textarea
                    id="review_text_en"
                    value={formData.review_text_en}
                    onChange={(e) => setFormData({ ...formData, review_text_en: e.target.value })}
                    placeholder="Excellent service..."
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Ajout...' : 'Ajouter l\'avis'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : reviews?.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-foreground/70 mb-4">Aucun avis pour le moment</p>
            <Button onClick={() => setIsDialogOpen(true)}>Ajouter votre premier avis</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {reviews?.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl text-foreground font-sans font-medium">
                        {review.author_name}
                      </h2>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Badge variant={review.is_active ? 'default' : 'secondary'}>
                        {review.is_active ? 'Actif' : 'Masqué'}
                      </Badge>
                    </div>
                    {review.review_text_fr && (
                      <p className="text-foreground/70 text-sm mb-2 line-clamp-2">
                        {review.review_text_fr}
                      </p>
                    )}
                    <a 
                      href={review.google_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary text-xs flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Voir sur Google
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleActiveMutation.mutate({ 
                        id: review.id, 
                        is_active: !review.is_active 
                      })}
                      title={review.is_active ? 'Masquer' : 'Afficher'}
                    >
                      {review.is_active ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(review.id, review.author_name)}
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

export default AdminReviewsList;

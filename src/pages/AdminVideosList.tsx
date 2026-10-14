import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Eye, EyeOff, ArrowLeft, Video, ExternalLink, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const AdminVideosList = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    youtube_url: '',
    title_fr: '',
    title_en: '',
    description_fr: '',
    description_en: '',
  });

  const { data: videos, isLoading } = useQuery({
    queryKey: ['admin-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('videos')
        .insert([data]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
      toast.success('Vidéo ajoutée');
      setIsDialogOpen(false);
      setFormData({
        youtube_url: '',
        title_fr: '',
        title_en: '',
        description_fr: '',
        description_en: '',
      });
    },
    onError: () => {
      toast.error('Erreur lors de l\'ajout');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
      toast.success('Vidéo supprimée');
    },
    onError: () => {
      toast.error('Erreur lors de la suppression');
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('videos')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
      toast.success('Statut mis à jour');
    },
    onError: () => {
      toast.error('Erreur lors de la mise à jour');
    },
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Supprimer la vidéo "${title}" ?`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
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
              Gestion des Vidéos
            </h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouvelle Vidéo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Ajouter une vidéo YouTube</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="youtube_url">Lien YouTube *</Label>
                  <Input
                    id="youtube_url"
                    value={formData.youtube_url}
                    onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="title_fr">Titre (FR) *</Label>
                  <Input
                    id="title_fr"
                    value={formData.title_fr}
                    onChange={(e) => setFormData({ ...formData, title_fr: e.target.value })}
                    placeholder="Visite d'un appartement..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="title_en">Titre (EN) *</Label>
                  <Input
                    id="title_en"
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    placeholder="Apartment tour..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description_fr">Description (FR)</Label>
                  <Textarea
                    id="description_fr"
                    value={formData.description_fr}
                    onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                    placeholder="Description de la vidéo..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="description_en">Description (EN)</Label>
                  <Textarea
                    id="description_en"
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    placeholder="Video description..."
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Ajout...' : 'Ajouter la vidéo'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : videos?.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-foreground/70 mb-4">Aucune vidéo pour le moment</p>
            <Button onClick={() => setIsDialogOpen(true)}>Ajouter votre première vidéo</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {videos?.map((video) => {
              const videoId = getYouTubeId(video.youtube_url);
              return (
                <Card key={video.id} className="p-6">
                  <div className="flex items-start gap-4">
                    {videoId && (
                      <div className="w-40 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                          alt={video.title_fr}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl text-foreground font-sans font-medium">
                          {video.title_fr}
                        </h2>
                        <Badge variant={video.is_active ? 'default' : 'secondary'}>
                          {video.is_active ? 'Active' : 'Masquée'}
                        </Badge>
                      </div>
                      {video.description_fr && (
                        <p className="text-foreground/70 text-sm mb-2 line-clamp-2">
                          {video.description_fr}
                        </p>
                      )}
                      <a 
                        href={video.youtube_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary text-xs flex items-center gap-1 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Voir sur YouTube
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleActiveMutation.mutate({ 
                          id: video.id, 
                          is_active: !video.is_active 
                        })}
                        title={video.is_active ? 'Masquer' : 'Afficher'}
                      >
                        {video.is_active ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(video.id, video.title_fr)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVideosList;

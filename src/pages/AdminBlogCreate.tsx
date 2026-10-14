import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

const AdminBlogCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    slug: '',
    title_fr: '',
    title_en: '',
    excerpt_fr: '',
    excerpt_en: '',
    content_fr: '',
    content_en: '',
    cover_image_url: '',
    published: false,
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('blog_articles')
        .insert([{
          ...formData,
          published_at: formData.published ? new Date().toISOString() : null,
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Article créé avec succès');
      navigate('/admin/blog');
    },
    onError: (error: Error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSlug = () => {
    const slug = formData.title_fr
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    handleChange('slug', slug);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slug || !formData.title_fr || !formData.title_en) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    createMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin/blog">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl text-foreground font-serif">
            Nouvel Article
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl text-foreground font-sans font-medium">Informations générales</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL) *</Label>
                <div className="flex gap-2">
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    placeholder="mon-article"
                  />
                  <Button type="button" variant="outline" onClick={generateSlug}>
                    Générer
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover_image_url">URL image de couverture</Label>
                <Input
                  id="cover_image_url"
                  value={formData.cover_image_url}
                  onChange={(e) => handleChange('cover_image_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => handleChange('published', checked)}
              />
              <Label htmlFor="published">Publier immédiatement</Label>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl text-foreground font-sans font-medium">🇫🇷 Contenu Français</h2>
            
            <div className="space-y-2">
              <Label htmlFor="title_fr">Titre *</Label>
              <Input
                id="title_fr"
                value={formData.title_fr}
                onChange={(e) => handleChange('title_fr', e.target.value)}
                placeholder="Titre de l'article"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt_fr">Extrait *</Label>
              <Textarea
                id="excerpt_fr"
                value={formData.excerpt_fr}
                onChange={(e) => handleChange('excerpt_fr', e.target.value)}
                placeholder="Court résumé de l'article..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content_fr">Contenu *</Label>
              <Textarea
                id="content_fr"
                value={formData.content_fr}
                onChange={(e) => handleChange('content_fr', e.target.value)}
                placeholder="Contenu complet de l'article..."
                rows={10}
              />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl text-foreground font-sans font-medium">🇬🇧 English Content</h2>
            
            <div className="space-y-2">
              <Label htmlFor="title_en">Title *</Label>
              <Input
                id="title_en"
                value={formData.title_en}
                onChange={(e) => handleChange('title_en', e.target.value)}
                placeholder="Article title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt_en">Excerpt *</Label>
              <Textarea
                id="excerpt_en"
                value={formData.excerpt_en}
                onChange={(e) => handleChange('excerpt_en', e.target.value)}
                placeholder="Short article summary..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content_en">Content *</Label>
              <Textarea
                id="content_en"
                value={formData.content_en}
                onChange={(e) => handleChange('content_en', e.target.value)}
                placeholder="Full article content..."
                rows={10}
              />
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Link to="/admin/blog">
              <Button type="button" variant="outline">Annuler</Button>
            </Link>
            <Button type="submit" disabled={createMutation.isPending} className="gap-2">
              <Save className="h-4 w-4" />
              {createMutation.isPending ? 'Création...' : 'Créer l\'article'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBlogCreate;
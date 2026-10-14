import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useProperty } from '@/hooks/useProperties';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ImageUploadWithSort } from '@/components/admin/ImageUploadWithSort';

interface ImageItem {
  id: string;
  preview: string;
  file?: File;
  url?: string;
  existingId?: string;
}

const AdminPropertyEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading: loadingProperty } = useProperty(id || '');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  
  const [formData, setFormData] = useState({
    reference: '',
    title_fr: '',
    title_en: '',
    location_fr: '',
    location_en: '',
    price: '',
    description_fr: '',
    description_en: '',
    bedrooms: '',
    bathrooms: '',
    area_m2: '',
    land_area_m2: '',
    property_type: 'Apartment',
    status: 'available' as 'available' | 'sold' | 'reserved',
    video_url: '',
  });

  useEffect(() => {
    if (data?.property) {
      const p = data.property;
      setFormData({
        reference: p.reference,
        title_fr: p.title_fr,
        title_en: p.title_en,
        location_fr: p.location_fr,
        location_en: p.location_en,
        price: p.price.toString(),
        description_fr: p.description_fr || '',
        description_en: p.description_en || '',
        bedrooms: p.bedrooms?.toString() || '',
        bathrooms: p.bathrooms?.toString() || '',
        area_m2: p.area_m2?.toString() || '',
        land_area_m2: p.land_area_m2?.toString() || '',
        property_type: p.property_type || 'Apartment',
        status: p.status,
        video_url: p.video_url || '',
      });

      if (data.images) {
        const existingImages: ImageItem[] = data.images.map((img) => ({
          id: img.id,
          preview: img.image_url,
          url: img.image_url,
          existingId: img.id,
        }));
        setImages(existingImages);
      }
    }
  }, [data]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reference || !formData.title_fr || !formData.price || !id) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);

    try {
      // Update property
      const { error: propertyError } = await supabase
        .from('properties')
        .update({
          reference: formData.reference,
          title_fr: formData.title_fr,
          title_en: formData.title_en || formData.title_fr,
          location_fr: formData.location_fr,
          location_en: formData.location_en || formData.location_fr,
          price: parseFloat(formData.price),
          description_fr: formData.description_fr || null,
          description_en: formData.description_en || null,
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
          area_m2: formData.area_m2 ? parseFloat(formData.area_m2) : null,
          land_area_m2: formData.land_area_m2 ? parseFloat(formData.land_area_m2) : null,
          property_type: formData.property_type,
          status: formData.status,
          video_url: formData.video_url || null,
        })
        .eq('id', id);

      if (propertyError) throw propertyError;

      // Delete removed images
      const existingIds = images.filter(img => img.existingId).map(img => img.existingId);
      const originalIds = data?.images.map(img => img.id) || [];
      const toDelete = originalIds.filter(id => !existingIds.includes(id));

      for (const imageId of toDelete) {
        await supabase.from('property_images').delete().eq('id', imageId);
      }

      // Upload new images and update order
      let displayOrder = 0;
      for (const image of images) {
        if (image.file) {
          // New image - upload it
          const fileExt = image.file.name.split('.').pop();
          const fileName = `${id}/${Date.now()}_${displayOrder}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(fileName, image.file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('property-images')
            .getPublicUrl(fileName);

          const { error: insertError } = await supabase
            .from('property_images')
            .insert({
              property_id: id,
              image_url: publicUrl,
              display_order: displayOrder,
            });

          if (insertError) throw insertError;
        } else if (image.existingId) {
          // Existing image - update order
          await supabase
            .from('property_images')
            .update({ display_order: displayOrder })
            .eq('id', image.existingId);
        }
        displayOrder++;
      }

      // Update main image if needed
      if (images.length > 0) {
        const mainImageUrl = images[0].url || images[0].preview;
        await supabase
          .from('properties')
          .update({ main_image_url: mainImageUrl })
          .eq('id', id);
      }

      toast.success('Propriété mise à jour avec succès');
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  if (loadingProperty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/properties')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Button>

          <h1 className="text-3xl font-bold mb-8">Modifier la propriété</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Informations de base</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reference">Référence *</Label>
                  <Input
                    id="reference"
                    value={formData.reference}
                    onChange={(e) => handleInputChange('reference', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Prix (€) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Title & Location */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Titre et localisation</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title_fr">Titre (FR) *</Label>
                  <Input
                    id="title_fr"
                    value={formData.title_fr}
                    onChange={(e) => handleInputChange('title_fr', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="title_en">Titre (EN)</Label>
                  <Input
                    id="title_en"
                    value={formData.title_en}
                    onChange={(e) => handleInputChange('title_en', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location_fr">Localisation (FR) *</Label>
                  <Input
                    id="location_fr"
                    value={formData.location_fr}
                    onChange={(e) => handleInputChange('location_fr', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location_en">Localisation (EN)</Label>
                  <Input
                    id="location_en"
                    value={formData.location_en}
                    onChange={(e) => handleInputChange('location_en', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Détails</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Chambres</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Salles de bain</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="area_m2">Surface (m²)</Label>
                  <Input
                    id="area_m2"
                    type="number"
                    value={formData.area_m2}
                    onChange={(e) => handleInputChange('area_m2', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="land_area_m2">Terrain (m²)</Label>
                  <Input
                    id="land_area_m2"
                    type="number"
                    value={formData.land_area_m2}
                    onChange={(e) => handleInputChange('land_area_m2', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="property_type">Type de bien</Label>
                  <Select value={formData.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment">Appartement</SelectItem>
                      <SelectItem value="House">Maison</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Land">Terrain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Statut</Label>
                  <Select value={formData.status} onValueChange={(value: any) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponible</SelectItem>
                      <SelectItem value="reserved">Réservé</SelectItem>
                      <SelectItem value="sold">Vendu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <div>
                <Label htmlFor="description_fr">Description (FR)</Label>
                <Textarea
                  id="description_fr"
                  value={formData.description_fr}
                  onChange={(e) => handleInputChange('description_fr', e.target.value)}
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="description_en">Description (EN)</Label>
                <Textarea
                  id="description_en"
                  value={formData.description_en}
                  onChange={(e) => handleInputChange('description_en', e.target.value)}
                  rows={6}
                />
              </div>
            </div>

            {/* Video */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Vidéo</h2>
              <div>
                <Label htmlFor="video_url">URL de la vidéo (optionnel)</Label>
                <Input
                  id="video_url"
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => handleInputChange('video_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Images</h2>
              <ImageUploadWithSort images={images} onImagesChange={setImages} />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  'Mettre à jour'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/properties')}
              >
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPropertyEdit;

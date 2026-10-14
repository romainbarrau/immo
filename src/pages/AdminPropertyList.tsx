import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useProperties } from '@/hooks/useProperties';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Loader2, Plus, Edit, Trash2, Star, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminPropertyList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: properties, isLoading, refetch } = useProperties();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setDeleting(true);
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      // Photos are stored under "<property id>/"; remove them so the storage does not fill up
      const { data: files } = await supabase.storage.from('property-images').list(deleteId, { limit: 1000 });
      if (files && files.length > 0) {
        const { error: storageError } = await supabase.storage
          .from('property-images')
          .remove(files.map((f) => `${deleteId}/${f.name}`));
        if (storageError) console.error('Error deleting property photos:', storageError);
      }
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', deleteId] });

      toast.success('Propriété supprimée avec succès');
      refetch();
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      available: 'bg-green-500',
      sold: 'bg-red-500',
      reserved: 'bg-orange-500',
    };
    const labels = {
      available: 'Disponible',
      sold: 'Vendu',
      reserved: 'Réservé',
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-foreground">Gérer les propriétés</h1>
              <Button onClick={() => navigate('/admin/create')}>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle propriété
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link to="/admin/reviews">
                <Button variant="outline" size="sm">
                  <Star className="w-4 h-4 mr-2" />
                  Avis Google
                </Button>
              </Link>
              <Link to="/admin/videos">
                <Button variant="outline" size="sm">
                  <Video className="w-4 h-4 mr-2" />
                  Vidéos
                </Button>
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : properties && properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="aspect-video relative bg-muted">
                    {property.main_image_url && (
                      <img
                        src={property.main_image_url}
                        alt={property.title_fr}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{property.title_fr}</h3>
                      {getStatusBadge(property.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{property.location_fr}</p>
                    <p className="text-xl font-bold text-primary">
                      {property.price.toLocaleString('fr-FR')} €
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Ref: {property.reference}</p>
                  </CardContent>
                  <CardFooter className="gap-2 pt-0">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate(`/admin/edit/${property.id}`)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setDeleteId(property.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Aucune propriété trouvée</p>
              <Button onClick={() => navigate('/admin/create')}>
                <Plus className="w-4 h-4 mr-2" />
                Créer la première propriété
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette propriété ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleting}
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Supprimer'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminPropertyList;

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useProperties, Property } from '@/hooks/useProperties';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';
import { splitTitle, placeOf } from '@/lib/propertyText';
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

  // Same groups and order as the public Properties page, plus the reserved ones
  const GROUPS: { status: Property['status']; title: string }[] = [
    { status: 'available', title: 'Biens en vente' },
    { status: 'reserved', title: 'Biens réservés' },
    { status: 'sold', title: 'Biens vendus' },
  ];

  const STATUS_LABEL: Partial<Record<Property['status'], string>> = { sold: 'Vendu', reserved: 'Réservé' };

  const LINK = 'text-sm text-[#6B665E] transition-colors hover:text-[#1C1A17]';

  // Same look as the public property card, with the admin actions under it
  const renderCard = (property: Property) => (
    <div key={property.id} className="flex flex-col">
      <Link to={`/admin/edit/${property.id}`} className="group flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#F3EFE8]">
          {property.main_image_url && (
            <img
              src={property.main_image_url}
              alt={property.title_fr}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:group-hover:scale-100"
            />
          )}
          {STATUS_LABEL[property.status] && (
            <span className="absolute top-3 left-3 z-10 rounded-sm bg-primary px-2 py-1 text-sm font-display font-normal leading-none text-primary-foreground">
              {STATUS_LABEL[property.status]}
            </span>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="text-xl font-display font-normal text-foreground transition-colors group-hover:text-[#A4532E]">
            {splitTitle(property.title_fr).type}
          </h3>
          <p className="text-sm text-[#6B665E]">{placeOf(property.title_fr, property.location_fr)}</p>
          <p className="text-base text-[#1C1A17]">{property.price.toLocaleString('fr-FR')}{'\u00A0'}€</p>
        </div>
      </Link>
      <div className="mt-3 flex items-center gap-5">
        <span className="text-xs text-[#6B665E]">Réf. {property.reference}</span>
        <Link to={`/admin/edit/${property.id}`} className={`${LINK} ml-auto`}>
          Modifier
        </Link>
        <button type="button" onClick={() => setDeleteId(property.id)} className={`${LINK} hover:text-destructive`}>
          Supprimer
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navigation />
      {/* same container as the home page sections */}
      <div className="min-h-screen px-4 md:px-8 lg:px-12 pt-32 pb-20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground">Gérer les propriétés</h1>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <Link to="/admin/reviews" className={LINK}>Avis Google</Link>
                <Link to="/admin/videos" className={LINK}>Vidéos</Link>
              </div>
            </div>
            <Button
              size="lg"
              className="self-start md:self-auto bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => navigate('/admin/create')}
            >
              Nouvelle propriété
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : properties && properties.length > 0 ? (
            GROUPS.map(({ status, title }) => {
              const group = properties.filter((p) => p.status === status);
              if (group.length === 0) return null;
              return (
                <section key={status} className="mt-16 md:mt-20">
                  <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground mb-8">
                    {title} <span className="text-[#6B665E] text-xl md:text-2xl font-normal">({group.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {group.map(renderCard)}
                  </div>
                </section>
              );
            })
          ) : (
            <div className="mt-16 md:mt-20">
              <p className="text-base text-[#6B665E] mb-6">Aucune propriété trouvée</p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => navigate('/admin/create')}>
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

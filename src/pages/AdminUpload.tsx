import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { compressImage } from '@/lib/compressImage';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Upload, Loader2 } from 'lucide-react';

const AdminUpload = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('id, reference, title_fr')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (!selectedPropertyId) {
      toast.error('Veuillez sélectionner une propriété');
      return;
    }

    if (!files || files.length === 0) {
      toast.error('Veuillez sélectionner des fichiers');
      return;
    }

    setUploading(true);

    try {
      // Get the current max display_order for this property
      const { data: existingImages } = await supabase
        .from('property_images')
        .select('display_order')
        .eq('property_id', selectedPropertyId)
        .order('display_order', { ascending: false })
        .limit(1);

      let currentOrder = existingImages && existingImages.length > 0 
        ? existingImages[0].display_order 
        : -1;

      for (let i = 0; i < files.length; i++) {
        const file = await compressImage(files[i]);
        const fileExt = file.name.split('.').pop();
        const fileName = `${selectedPropertyId}/${Date.now()}_${i}.${fileExt}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(fileName);

        // Insert into property_images table
        currentOrder++;
        const { error: insertError } = await supabase
          .from('property_images')
          .insert({
            property_id: selectedPropertyId,
            image_url: publicUrl,
            display_order: currentOrder,
          });

        if (insertError) throw insertError;

        // Update main_image_url if it's the first image
        if (i === 0 && (!existingImages || existingImages.length === 0)) {
          await supabase
            .from('properties')
            .update({ main_image_url: publicUrl })
            .eq('id', selectedPropertyId);
        }
      }

      toast.success(`${files.length} photo(s) uploadée(s) avec succès`);
      setFiles(null);
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Upload de photos</h1>
          <p className="text-muted-foreground mt-2">
            Sélectionnez une propriété et uploadez les photos
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Propriété</label>
            <Select value={selectedPropertyId} onValueChange={setSelectedPropertyId}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une propriété" />
              </SelectTrigger>
              <SelectContent>
                {properties?.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.reference} - {property.title_fr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Photos</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-input"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Cliquez pour sélectionner des fichiers
                </p>
                {files && files.length > 0 && (
                  <p className="text-sm font-medium mt-2">
                    {files.length} fichier(s) sélectionné(s)
                  </p>
                )}
              </label>
            </div>
          </div>

          <Button
            onClick={handleUpload}
            disabled={uploading || !selectedPropertyId || !files}
            className="w-full"
            size="lg"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Upload en cours...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Uploader les photos
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;

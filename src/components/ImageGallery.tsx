import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ImageGalleryProps {
  images: Array<{ id: string; image_url: string }>;
  altText: string;
}

const ImageGallery = ({ images, altText }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/10] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Aucune image disponible</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main image */}
        <div 
          className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0].image_url}
            alt={`${altText} 1`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
            <span className="text-background opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold">
              Cliquer pour agrandir
            </span>
          </div>
        </div>

        {/* Thumbnail carousel */}
        {images.length > 1 && (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2">
              {images.map((img, idx) => (
                <CarouselItem key={img.id} className="pl-2 basis-1/2 md:basis-1/4">
                  <div
                    className="relative h-24 overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => openLightbox(idx)}
                  >
                    <img
                      src={img.image_url}
                      alt={`${altText} ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Arrows below the thumbnails, aligned right */}
            <div className="mt-3 flex justify-end gap-2">
              <CarouselPrevious className="static h-8 w-8 translate-y-0" />
              <CarouselNext className="static h-8 w-8 translate-y-0" />
            </div>
          </Carousel>
        )}
      </div>

      {/* Lightbox dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent
          className="max-w-[95vw] max-h-[95vh] p-0 bg-background/95 backdrop-blur [&>button:last-child]:hidden"
          // hide the dialog's built-in close button (the gallery has its own) and don't focus it on open
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="relative w-full h-[95vh] flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-foreground hover:bg-foreground/10"
              onClick={closeLightbox}
              aria-label="Fermer"
            >
              <X className="h-6 w-6" />
            </Button>

            {selectedImageIndex !== null && (
              <>
                <img
                  src={images[selectedImageIndex].image_url}
                  alt={`${altText} ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />

                {selectedImageIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground hover:bg-foreground/10"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                )}

                {selectedImageIndex < images.length - 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground hover:bg-foreground/10"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground text-sm bg-background/80 px-4 py-2 rounded-full">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;

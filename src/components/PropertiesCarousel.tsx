import { useLanguage } from '@/contexts/LanguageContext';
import { useProperties } from '@/hooks/useProperties';
import PropertyCard from './PropertyCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PropertiesCarousel = () => {
  const { t, language } = useLanguage();
  const { data: properties, isLoading } = useProperties('available');

  if (isLoading) {
    return (
      <section className="py-12 px-4 md:px-8 lg:px-12 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display text-foreground">
              {language === 'en' ? 'Our Properties' : 'Nos Propriétés'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 px-4 md:px-8 lg:px-12 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display text-foreground">
            {language === 'en' ? 'Featured Properties' : 'Propriétés en Vedette'}
          </h2>
          <Button 
            variant="ghost" 
            className="group"
            onClick={() => window.location.href = `${import.meta.env.BASE_URL}listings`}
          >
            {language === 'en' ? 'View All' : 'Voir Tout'}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {properties.map((property) => (
              <CarouselItem key={property.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <PropertyCard
                  image={property.main_image_url || `${import.meta.env.BASE_URL}placeholder.svg`}
                  title={language === 'en' ? property.title_en : property.title_fr}
                  location={language === 'en' ? property.location_en : property.location_fr}
                  price={new Intl.NumberFormat('fr-FR').format(property.price)}
                  sold={property.status === 'sold'}
                  onClick={() => window.location.href = `${import.meta.env.BASE_URL}listing/${property.id}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default PropertiesCarousel;

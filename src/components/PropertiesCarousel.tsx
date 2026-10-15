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
import { Link } from 'react-router-dom';

// Carousel arrows: icon only, 44px touch area, same centre as the former 32px circles
const ARROW = 'h-11 w-11 border-0 bg-transparent shadow-none text-[#6B665E] hover:bg-transparent hover:text-[#1C1A17] [&_svg]:size-5';

const PropertiesCarousel = () => {
  const { t, language } = useLanguage();
  const { data: properties, isLoading } = useProperties('available');

  if (isLoading) {
    return (
      <section className="py-20 md:py-24 px-4 md:px-8 lg:px-12 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground">
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
    <section className="py-20 md:py-24 px-4 md:px-8 lg:px-12 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground">
            {language === 'en' ? 'Properties for Sale' : 'Biens en vente'}
          </h2>
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
                  to={`/listings/${property.id}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant="ghost" className={`${ARROW} hidden md:flex -left-[54px]`} />
          <CarouselNext variant="ghost" className={`${ARROW} hidden md:flex -right-[54px]`} />
        </Carousel>

        {/* same button as "Voir mes films" in CreativeVideos */}
        <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link to="/listings">{language === 'en' ? 'View the properties' : 'Voir les biens'}</Link>
        </Button>
      </div>
    </section>
  );
};

export default PropertiesCarousel;

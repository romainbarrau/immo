import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Star, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

const TestimonialsCarousel = () => {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const testimonials = [
    { id: 1, name: 'Nikita Godart', rating: 5, url: 'https://share.google/z4qb8oCGVZCiSvMkN' },
    { id: 2, name: 'Jessica Mendes Pedro', rating: 5, url: 'https://share.google/OJ8K3zlbiKyMnx4Ps' },
    { id: 3, name: 'Jean Sulzer', rating: 5, url: 'https://share.google/s16RPU0zvmKXBexEX' },
    { id: 4, name: 'Chanseau Tara', rating: 5, url: 'https://share.google/GbPxupAp3MN4RaMfn' },
    { id: 5, name: 'Charles Hector Whitmee', rating: 5, url: 'https://share.google/6hauXzWBdFdivkww1' },
    { id: 6, name: 'Diogo Castillo Leitão', rating: 5, url: 'https://share.google/GrJlHakrOz3aqfBUj' },
    { id: 7, name: 'Patricia Remacha', rating: 5, url: 'https://share.google/wKDVz45jN78hsh4ZI' },
    { id: 8, name: 'Nguyen Christian', rating: 5, url: 'https://share.google/qwUjarLM83ucjsWPJ' },
    { id: 9, name: 'Adriana Darling', rating: 5, url: 'https://share.google/62X0KAIDMtj8ziaKW' },
    { id: 10, name: 'Jose Mexia de Almeida', rating: 5, url: 'https://share.google/Zt9yAMi3pGn1BLjl8' },
  ];

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground">
            {t('home.testimonials.title')}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
            {t('home.testimonials.subtitle')}
          </p>
        </div>

        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {testimonials.map((testimonial) => {
              const isExpanded = expandedId === testimonial.id;
              return (
                <CarouselItem key={testimonial.id} className="pl-4 md:pl-6 basis-[90%] sm:basis-[80%] md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 h-full bg-background/60 border-foreground/20 hover:border-foreground/40 hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="flex gap-1 mb-4 md:mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent-warm text-accent-warm" />
                      ))}
                    </div>
                    
                    <p className={`text-base text-foreground/90 leading-relaxed mb-4 md:mb-6 flex-grow ${!isExpanded ? 'line-clamp-5' : ''}`}>
                      {t(`home.testimonials.review${testimonial.id}`)}
                    </p>

                    <div className="mt-auto border-t border-border/40">
                      <p className="mt-4 font-medium text-foreground text-base">
                        {testimonial.name}
                      </p>
                      
                      <div className="mt-3 flex flex-row items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedId(isExpanded ? null : testimonial.id)}
                          className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground hover:bg-transparent"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="h-3 w-3 mr-1" />
                              {t('home.testimonials.readLess')}
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3 w-3 mr-1" />
                              {t('home.testimonials.readMore')}
                            </>
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground hover:bg-transparent"
                        >
                          <a href={testimonial.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {t('home.testimonials.viewOnGoogle')}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        <p className="md:hidden text-center text-xs md:text-sm text-muted-foreground mt-8 md:mt-12">
          {t('home.testimonials.swipe')}
        </p>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;

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
    <section id="testimonials" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container max-w-7xl">
        <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif leading-tight text-foreground">
            {t('home.testimonials.title')}
          </h2>
          <p className="text-base md:text-lg text-foreground/90 max-w-2xl mx-auto">
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
                  <Card className="p-6 md:p-8 h-full bg-background/60 border-foreground/20 hover:border-foreground/40 hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="flex gap-1 mb-4 md:mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-foreground text-foreground" />
                      ))}
                    </div>
                    
                    <p className={`text-sm md:text-base text-foreground/90 leading-relaxed mb-4 md:mb-6 flex-grow ${!isExpanded ? 'line-clamp-6' : ''}`}>
                      {t(`home.testimonials.review${testimonial.id}`)}
                    </p>

                    <div className="space-y-3 md:space-y-4 mt-auto pt-3 md:pt-4 border-t border-border/40">
                      <p className="font-semibold text-foreground text-base md:text-lg">
                        {testimonial.name}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedId(isExpanded ? null : testimonial.id)}
                          className="text-xs text-muted-foreground hover:text-foreground w-full sm:w-auto justify-start sm:justify-center"
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
                          className="text-xs text-muted-foreground hover:text-foreground w-full sm:w-auto justify-start sm:justify-center"
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

        <p className="text-center text-xs md:text-sm text-muted-foreground mt-8 md:mt-12">
          {t('home.testimonials.swipe')}
        </p>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;

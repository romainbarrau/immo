import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

// Carousel arrows: icon only, 44px touch area, same centre as the former 32px circles
const ARROW = 'h-11 w-11 border-0 bg-transparent shadow-none text-[#6B665E] hover:bg-transparent hover:text-[#1C1A17] [&_svg]:size-5';

const TestimonialsCarousel = () => {
  const { t, language } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  // "Lire plus" only for reviews whose text really exceeds the 5-line clamp
  const textRefs = useRef<Record<number, HTMLParagraphElement | null>>({});
  const [overflowing, setOverflowing] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const measure = () => {
      const next: Record<number, boolean> = {};
      for (const [id, el] of Object.entries(textRefs.current)) {
        if (!el) continue;
        // the paragraph is not stretched, so a clamped one is shorter than its content
        next[Number(id)] = el.scrollHeight > el.clientHeight + 1;
      }
      setOverflowing((prev) => {
        // keep "Lire moins" available while a review is expanded
        if (expandedId !== null) next[expandedId] = prev[expandedId] ?? true;
        return next;
      });
    };
    measure();
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    Object.values(textRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [language, expandedId]);

  // Display order: reviews naming Romain without the agency first, then those naming
  // Romain and the agency, then the one that doesn't name him
  const testimonials = [
    { id: 2, name: 'Jessica Mendes Pedro', rating: 5, url: 'https://share.google/OJ8K3zlbiKyMnx4Ps' },
    { id: 3, name: 'Jean Sulzer', rating: 5, url: 'https://share.google/s16RPU0zvmKXBexEX' },
    { id: 4, name: 'Chanseau Tara', rating: 5, url: 'https://share.google/GbPxupAp3MN4RaMfn' },
    { id: 7, name: 'Patricia Remacha', rating: 5, url: 'https://share.google/wKDVz45jN78hsh4ZI' },
    { id: 8, name: 'Nguyen Christian', rating: 5, url: 'https://share.google/qwUjarLM83ucjsWPJ' },
    { id: 1, name: 'Nikita Godart', rating: 5, url: 'https://share.google/z4qb8oCGVZCiSvMkN' },
    { id: 5, name: 'Charles Hector Whitmee', rating: 5, url: 'https://share.google/6hauXzWBdFdivkww1' },
    { id: 6, name: 'Diogo Castillo Leitão', rating: 5, url: 'https://share.google/GrJlHakrOz3aqfBUj' },
    { id: 10, name: 'Jose Mexia de Almeida', rating: 5, url: 'https://share.google/Zt9yAMi3pGn1BLjl8' },
    { id: 9, name: 'Adriana Darling', rating: 5, url: 'https://share.google/62X0KAIDMtj8ziaKW' },
  ];

  return (
    <section className="py-20 md:py-24 bg-[#F3EFE8]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground">
            {t('home.testimonials.title')}
          </h2>
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex gap-0.5" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-accent-warm text-accent-warm" />
              ))}
            </span>
            {t('home.testimonials.subtitle')}
          </p>
        </div>

        <Carousel
          opts={{
            // start on the first review (centered, the last one showed on its left)
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {testimonials.map((testimonial) => {
              const isExpanded = expandedId === testimonial.id;
              return (
                <CarouselItem key={testimonial.id} className="pl-4 md:pl-6 basis-[90%] sm:basis-[80%] md:basis-1/2 lg:basis-1/3">
                  <Card className="p-6 h-full border border-[#E8E3DA] bg-white shadow-none flex flex-col">
                    <div className="flex gap-1 mb-4 md:mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent-warm text-accent-warm" />
                      ))}
                    </div>
                    
                    <div className="mb-4 md:mb-6 flex-grow">
                      <p
                        ref={(el) => { textRefs.current[testimonial.id] = el; }}
                        className={`text-base text-foreground/90 leading-relaxed ${!isExpanded ? 'line-clamp-5' : ''}`}
                      >
                        {t(`home.testimonials.review${testimonial.id}`)}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <p className="mt-4 font-medium text-foreground text-base">
                        {testimonial.name}
                      </p>
                      
                      {(overflowing[testimonial.id] || isExpanded) && (
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
                        </div>
                      )}
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious variant="ghost" className={`${ARROW} hidden md:flex -left-[54px]`} />
          <CarouselNext variant="ghost" className={`${ARROW} hidden md:flex -right-[54px]`} />
        </Carousel>

        <p className="md:hidden text-center text-xs md:text-sm text-muted-foreground mt-8 md:mt-12">
          {t('home.testimonials.swipe')}
        </p>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;

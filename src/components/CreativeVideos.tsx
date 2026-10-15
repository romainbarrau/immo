import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { propertyConceptVideos, renovationSeries } from '@/data/videos';

// Carousel arrows: icon only, 44px touch area, same centre as the former 32px circles
const ARROW = 'h-11 w-11 border-0 bg-transparent shadow-none text-[#6B665E] hover:bg-transparent hover:text-[#1C1A17] [&_svg]:size-5';

// The Renovation Series first, in place of the first property concept
const VIDEOS = [...renovationSeries.slice(0, 1), ...propertyConceptVideos.slice(1, 4)];

// "Mon univers créatif": a one-video-at-a-time YouTube carousel.
// A video starts only when its play button is clicked, with sound and the usual
// YouTube controls. Only the playing video loads an iframe, the others show their thumbnail.
const CreativeVideos = () => {
  const { t, language } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [playing, setPlaying] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);

  // Changing slide unloads the current video
  useEffect(() => {
    if (!api) return;
    const stop = () => {
      setPlaying(null);
      setCurrent(api.selectedScrollSnap());
    };
    api.on('select', stop);
    return () => {
      api.off('select', stop);
    };
  }, [api]);

  return (
    <section className="py-20 md:py-24 px-4 md:px-8 lg:px-12 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-6 text-foreground">
            {t('home.inclusions.title')} <span className="italic font-serif">{t('home.inclusions.creative')}</span>{language === 'en' && ` ${t('home.inclusions.title2')}`}
          </h2>
          <div className="mb-8 space-y-1">
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              {t('home.inclusions.description1')}
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              {t('home.inclusions.description2')}
            </p>
          </div>
        </div>

        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full mx-auto">
          <CarouselContent>
            {VIDEOS.map((video, index) => {
              // a video with a start time plays muted from that moment while its slide is shown
              const autoMuted = video.start !== undefined && index === current && playing !== index;
              const isPlaying = playing === index || autoMuted;
              const startParam = video.start ? `&start=${video.start}` : '';
              return (
                <CarouselItem key={video.id}>
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                    {isPlaying ? (
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1&playsinline=1&rel=0${startParam}${autoMuted ? '&mute=1' : ''}`}
                        title={`${t('home.inclusions.title')} ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg`}
                          onError={(e) => {
                            // not every video has a high-resolution thumbnail
                            const img = e.currentTarget;
                            if (!img.src.includes('hqdefault')) img.src = `https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`;
                          }}
                          onLoad={(e) => {
                            // YouTube answers a 120px grey placeholder when maxres is missing
                            const img = e.currentTarget;
                            if (img.naturalWidth <= 120 && !img.src.includes('hqdefault')) img.src = `https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`;
                          }}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            type="button"
                            aria-label={language === 'fr' ? 'Lire la vidéo' : 'Play the video'}
                            onClick={() => setPlaying(index)}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-background/90 text-primary shadow-lg transition-transform hover:scale-105"
                          >
                            <Play className="ml-1 h-7 w-7 fill-current" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {/* Desktop: arrows outside the video, vertically centred */}
          <CarouselPrevious variant="ghost" className={`${ARROW} hidden md:flex -left-[54px]`} />
          <CarouselNext variant="ghost" className={`${ARROW} hidden md:flex -right-[54px]`} />
          {/* Mobile: arrows below the video, side by side */}
          <div className="mt-[10px] flex justify-center gap-0 md:hidden">
            <CarouselPrevious variant="ghost" className={`${ARROW} static translate-y-0`} />
            <CarouselNext variant="ghost" className={`${ARROW} static translate-y-0`} />
          </div>
        </Carousel>

        <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link to="/videos">{t('home.inclusions.cta')}</Link>
        </Button>
      </div>
    </section>
  );
};

export default CreativeVideos;

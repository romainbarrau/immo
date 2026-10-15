import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { propertyConceptVideos, renovationSeries, propertyVideos } from '@/data/videos';

const Videos = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-20 pt-32">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-medium text-foreground">
            {t('videos.title')}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('videos.description')}
          </p>
        </div>

        {/* Property Concept Videos */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-foreground">{t('videos.concepts')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertyConceptVideos.map((video, index) => (
              <Card 
                key={video.id}
                className="overflow-hidden animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={`Property Concept Video ${video.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* The Renovation Series */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-foreground">The Renovation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {renovationSeries.map((video, index) => (
              <Card 
                key={video.id}
                className="overflow-hidden animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title="The Renovation Series"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Property Videos */}
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-foreground">Property Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertyVideos.map((video, index) => (
              <Card 
                key={video.id}
                className="overflow-hidden animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={`Property Video ${video.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Videos;

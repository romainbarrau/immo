import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';

const Videos = () => {
  const { t } = useLanguage();

  const propertyConceptVideos = [
    { id: 1, embedId: 'v6WfZXmMk4A' },
    { id: 2, embedId: '4yDcD1XFkeA' },
    { id: 3, embedId: 'ObfdTZ29cYE' },
    { id: 4, embedId: 'sWy_1cYImf4' },
    { id: 5, embedId: '5-kQOUX4VSs' },
    { id: 6, embedId: 'p1sCuQsVVXE' },
    { id: 7, embedId: '2xQrBOiqNtA' },
  ];

  const renovationSeries = [
    { id: 9, embedId: '2A8PP0Xgkms' },
  ];

  const propertyVideos = [
    { id: 10, embedId: 'fxN2-HqkM2I' },
    { id: 11, embedId: 'FqxgC8oARTQ' },
    { id: 12, embedId: 'PhwVO0NnXLc' },
    { id: 13, embedId: 'Rx7803_xctA' },
    { id: 14, embedId: 'FrssUO78EHg' },
    { id: 15, embedId: 'nfDBTtLOgcw' },
    { id: 16, embedId: '44yySFRM58U' },
    { id: 17, embedId: 'Ip8Y3dQDiF0' },
    { id: 18, embedId: 'LQcNZzRbqsk' },
    { id: 19, embedId: 'cQJs74VPnLw' },
    { id: 20, embedId: 'eo9WQ6ogq6Q' },
    { id: 21, embedId: 'ThI7Z8H8Uyo' },
    { id: 22, embedId: 'sdggYToVjQM' },
    { id: 23, embedId: 'jEVexef-vks' },
    { id: 24, embedId: 'XBqVsiL7Tsw' },
    { id: 25, embedId: '8RM8Tc0UahU' },
    { id: 26, embedId: 'FvxnyR_btyw' },
    { id: 27, embedId: 'layI4z-dXBk' },
    { id: 28, embedId: 'gJsN_Ln7qD8' },
    { id: 29, embedId: 'ytO2Ku0xbw8' },
    { id: 30, embedId: 'q8ZG01Xc5ZE' },
    { id: 31, embedId: 'RLnu3e87fHc' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-20 pt-32">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-foreground">
            {t('videos.title')}
          </h1>
          <p className="text-2xl font-display text-foreground mb-4">
            {t('videos.subtitle')}
          </p>
          <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
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

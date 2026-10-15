import { useLanguage } from '@/contexts/LanguageContext';
import romainHero from '@/assets/romain-hero.png';
import aboutBackground from '@/assets/about-background.jpg';

// Home page bio: two full-width halves, photo left and text right (stacked on mobile)
const Bio = () => {
  const { t } = useLanguage();
  const paragraphs = t('bio.content').split('\n\n');

  return (
    <section className="bg-[#F3EFE8] md:px-8 lg:px-12">
      {/* Desktop: inside the site's common container (same left edge as the section titles);
          the photo column is as wide as the photo, the text column takes the rest */}
      <div className="grid md:grid-cols-[auto_minmax(0,1fr)] md:container md:mx-auto md:max-w-7xl">
      {/* Photo: the same framing as before (4:5, same layers); on desktop it takes the full height
          of the section, set by the text, and starts on the container's left edge */}
      <div className="relative w-full aspect-[4/5] overflow-hidden md:w-auto md:h-full md:justify-self-start">
        {/* Blurred background */}
        <img
          src={aboutBackground}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
        />
        {/* Romain PNG overlay */}
        <img
          src={romainHero}
          alt="Romain Barrau"
          loading="lazy"
          className="absolute z-10 object-contain w-[108%] bottom-0 left-1/2 -translate-x-1/2"
        />
      </div>

      {/* Text half */}
      <div className="flex flex-col justify-center h-full px-6 py-16 md:pl-16 md:pr-16 md:py-24">
        <div className="max-w-prose">
          <h2 className="font-display font-medium text-3xl md:text-4xl text-foreground mb-6">
            {t('bio.title')}
          </h2>
          {/* the translation keeps three paragraphs; here the first two read as one */}
          <div className="max-w-prose space-y-5">
            {[paragraphs.slice(0, 2).join(' '), ...paragraphs.slice(2)].map((paragraph) => (
              <p
                key={paragraph}
                className="text-justify hyphens-auto font-sans text-base md:text-lg leading-relaxed md:leading-relaxed text-[#1C1A17]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Bio;

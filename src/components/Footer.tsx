import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-4 text-foreground">Romain Barrau</h3>
            <p className="text-foreground/80">
              {t('footer.tagline')}<br />
              Bordeaux
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">{t('nav.contact')}</h4>
            <div className="space-y-2 text-foreground/80">
              <p>romain.barrau@iadfrance.fr</p>
              <p>
                <a href="tel:+33669119336" className="block font-sans text-muted-foreground hover:underline underline-offset-4">
                  +33 6 69 11 93 36
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/33669119336?text=Bonjour%20Romain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-sans text-muted-foreground hover:underline underline-offset-4"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">{t('footer.follow')}</h4>
            <div className="space-y-2">
              <a
                href="https://instagram.com/romainbarrau"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-sans text-muted-foreground hover:underline underline-offset-4"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/romain-barrau-213607110"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-sans text-muted-foreground hover:underline underline-offset-4"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-foreground/80">
          <p>
            © {new Date().getFullYear()} Romain Barrau · {t('footer.independent')} ·{' '}
            <Link to="/mentions-legales" className="underline-offset-4 hover:underline hover:text-foreground">
              {t('footer.legal')}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';

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
              <p>IAD France</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Follow</h4>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/33669119336"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/romainbarrau"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/romainbarrau"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:romain.barrau@iadfrance.fr"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-foreground/80">
          <p>
            © {new Date().getFullYear()} Romain Barrau — {t('footer.rights')} | IAD France
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

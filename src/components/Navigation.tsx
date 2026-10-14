import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const propertyLinks = [
    { path: '/listings', label: t('nav.listings'), desc: language === 'en' ? 'Current properties for sale' : 'Biens actuellement en vente' },
    { path: '/sold', label: t('nav.sold'), desc: language === 'en' ? 'Successfully sold properties' : 'Biens vendus avec succès' },
  ];

  const contentLinks = [
    { path: '/videos', label: t('nav.videos'), desc: language === 'en' ? 'Property tours & stories' : 'Visites et histoires' },
    { path: '/blog', label: t('nav.blog'), desc: language === 'en' ? 'Insights & market trends' : 'Analyses & tendances' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 translate-y-0 opacity-100 bg-background/95 backdrop-blur-lg shadow-[0_1px_0_0_hsl(var(--border))] transition-all duration-700"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link 
            to="/" 
            className="group flex flex-col leading-none transition-opacity hover:opacity-70"
          >
            <span className="text-3xl font-display font-bold tracking-tight">
              Romain Barrau
            </span>
            <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase mt-1">
              {t('brand.subtitle')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    to="/"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === '/' ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {t('nav.home')}
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    {language === 'en' ? 'Properties' : 'Propriétés'}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-6">
                      {propertyLinks.map((item) => (
                        <li key={item.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.path}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
                                location.pathname === item.path && 'bg-secondary text-primary'
                              )}
                            >
                              <div className="text-sm font-medium leading-none mb-2">
                                {item.label}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.desc}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    {language === 'en' ? 'Content' : 'Contenu'}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-6">
                      {contentLinks.map((item) => (
                        <li key={item.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.path}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                location.pathname === item.path && 'bg-secondary text-primary'
                              )}
                            >
                              <div className="text-sm font-medium leading-none mb-2">
                                {item.label}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.desc}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/about"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === '/about' ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {t('nav.about')}
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button asChild variant="default" size="sm" className="ml-2">
              <Link to="/contact">{t('nav.contact')}</Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2 ml-2"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase font-medium">{language}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-1.5"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase text-xs font-medium">{language}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 pt-2 animate-fade-in border-t border-border mt-2">
            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm font-medium transition-colors rounded-md",
                  location.pathname === '/' 
                    ? 'text-primary bg-secondary' 
                    : 'text-foreground hover:text-primary hover:bg-secondary/50'
                )}
              >
                {t('nav.home')}
              </Link>

              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {language === 'en' ? 'Properties' : 'Propriétés'}
              </div>
              {propertyLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium transition-colors rounded-md",
                    location.pathname === item.path
                      ? 'text-primary bg-secondary'
                      : 'text-foreground hover:text-primary hover:bg-secondary/50'
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">
                {language === 'en' ? 'Content' : 'Contenu'}
              </div>
              {contentLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium transition-colors rounded-md",
                    location.pathname === item.path
                      ? 'text-primary bg-secondary'
                      : 'text-foreground hover:text-primary hover:bg-secondary/50'
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm font-medium transition-colors rounded-md mt-2",
                  location.pathname === '/about'
                    ? 'text-primary bg-secondary'
                    : 'text-foreground hover:text-primary hover:bg-secondary/50'
                )}
              >
                {t('nav.about')}
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 mx-4"
              >
                <Button className="w-full" size="sm">
                  {t('nav.contact')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

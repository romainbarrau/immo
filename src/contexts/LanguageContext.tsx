import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.listings': 'Biens en vente',
    'nav.sold': 'Biens vendus',
    'nav.videos': 'Vidéos',
    'nav.testimonials': 'Avis',
    'nav.blog': 'Articles',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    
    // Home
    'home.hero.subtitle': 'Créer les espaces de vie de demain',
    'home.hero.title1': 'L\'expérience d\'un',
    'home.hero.title2': 'agent',
    'home.hero.title3': '.',
    'home.hero.title4': 'L\'énergie d\'un',
    'home.hero.title5': 'entrepreneur',
    'home.hero.title6': '.',
    'home.hero.cta': 'Contacte-moi',
    'home.dream.title': 'L\'expérience d\'un',
    'home.dream.agent': 'agent',
    'home.dream.title2': 'L\'énergie d\'un',
    'home.dream.entrepreneur': 'entrepreneur',
    'home.dream.description': 'Animé par l\'architecture, les histoires et les gens, j\'aide mes clients à acheter, vendre et investir dans des propriétés significatives à travers le Portugal. Mon objectif : rendre chaque parcours immobilier transparent, personnel et inspirant.',
    'home.dream.cta': 'Me contacter',
    'home.inclusions.title': 'Notre univers',
    'home.inclusions.creative': 'créatif',
    'home.inclusions.title2': '',
    'home.inclusions.description1': 'Nous racontons des histoires de maisons, de villes et de rêves à travers le film.',
    'home.inclusions.description2': 'Chaque vidéo est conçue pour inspirer, connecter et donner vie à notre vision de l\'immobilier.',
    'home.inclusions.cta': 'Voir nos films',
    'home.cta.properties': 'Propriétés',
    'home.cta.reviews': 'Avis',
    'home.cta.videos': 'Vidéos',
    'home.cta.contact': 'Me contacter',
    
    // Testimonials
    'home.testimonials.title': 'Ce que mes clients disent',
    'home.testimonials.subtitle': 'Avis Google vérifiés',
    'home.testimonials.swipe': 'Faites glisser pour voir plus d\'avis',
    'home.testimonials.readMore': 'Lire plus',
    'home.testimonials.readLess': 'Lire moins',
    'home.testimonials.viewOnGoogle': 'Voir sur Google',
    'home.testimonials.review1': 'L\'agence immobilière qu\'il faut choisir à Lisbonne pour vendre son bien : très bonne connaissance du marché, estimation juste du prix de notre appartement, nous avons eu une offre, au prix, très rapidement, à l\'arrivée une vente dans les meilleures conditions possibles. Un grand merci à Romain pour votre efficacité, votre professionnalisme et votre implication. Nous avons bénéficié d\'un suivi personnalisé à toutes les étapes de la vente et de conseils toujours très avisés. C\'est très confortable. En résumé, nous recommandons Seed et Romain Barrau, sans aucune hésitation, pour toute opération immobilière à Lisbonne.',
    'home.testimonials.review2': 'Pour mon tout premier achat immobilier, j\'ai eu la chance d\'être accompagnée par Romain BARRAU, et je ne pouvais pas rêver meilleur conseiller. Romain a fait preuve d\'une bienveillance et d\'une patience exceptionnelles tout au long du processus. Il a pris le temps de répondre à chacune de mes questions, parfois nombreuses, toujours avec clarté et gentillesse. Il a été présent à chaque étape, très réactif, et toujours disponible, que ce soit pour organiser des visites de l\'appartement ou pour m\'accompagner dans mes décisions.',
    'home.testimonials.review3': 'Top service ! En plus de son expertise précise sur le marché portugais (appartement vendu au prix estimé) Romain a été très réactif et nous a accompagné pendant tout le processus de vente. Merci encore pour le service 🙂',
    'home.testimonials.review4': 'Merci à Romain d\'avoir organisé la vente de notre appartement lisboète de A à Z ! Un super suivi et une vente des plus rapides! Tout ce dont on rêve :) je recommande !',
    'home.testimonials.review5': 'J\'ai acheté ma première maison via Seed et je suis extrêmement satisfait du service. Même si j\'étais l\'acheteur, j\'ai vraiment eu le sentiment que mon agent, Romain, était là pour moi à chaque étape. Acheter une maison est stressant, mais acheter une maison à l\'étranger peut être assez terrifiant. Je cherchais un logement depuis plus d\'un an et j\'étais à deux doigts d\'abandonner jusqu\'à ce que je trouve Seed. Romain est un homme extraordinairement sympathique, diligent et honnête. J\'ai travaillé dans l\'immobilier toute ma carrière et je peux affirmer avec certitude qu\'on ne peut espérer meilleur agent.',
    'home.testimonials.review6': 'J\'ai vendu deux appartements simultanément grâce à Seed et à Romain. Leur collaboration a été constante, la communication excellente et le service très dynamique. Contrairement à la plupart des agences classiques qui se contentent d\'acquérir des biens, Seed s\'investit réellement pour conclure les ventes ! Je les recommande sans hésiter !',
    'home.testimonials.review7': 'J\'ai acheté ma première maison avec eux et, honnêtement, je n\'ai rien à redire. Un processus totalement simple, personnalisé et efficace 👏🏻. Au fait des tendances du marché, avec des analyses et des recommandations optimales. Si vous souhaitez acheter, je vous recommande vivement de faire appel à eux ! Romain Barrau est un véritable professionnel 💪🏼',
    'home.testimonials.review8': 'J\'ai récemment eu le plaisir de travailler avec Romain comme courtier immobilier, et je ne pourrais pas être plus heureux de l\'expérience. Le professionnalisme, les connaissances et le dévouement de Romain étaient exceptionnels. Il m\'a guidé de manière transparente tout au long du processus, assurant une transaction fluide et sans stress. L\'expertise de Romain sur le marché, ainsi que ses excellentes compétences en communication, m\'ont permis de me sentir en confiance et bien informé à chaque étape du processus.',
    'home.testimonials.review9': 'Service très professionnel et exceptionnel. Seed met tout en œuvre pour personnaliser votre service et répondre à tous vos besoins. Je recommande vivement à tout acheteur ou vendeur.',
    'home.testimonials.review10': 'Agence très professionnelle et super sympa - un merci spécial à Romain Barrau pour toute l\'aide et le travail acharné mis dans la vente de notre appartement !',
    
    // Listings
    'listings.title': 'Biens en vente',
    'listings.subtitle': 'Découvrez une sélection de propriétés exceptionnelles',
    
    // Sold
    'sold.title': 'Biens vendus',
    'sold.subtitle': 'Mes récentes réussites',
    'sold.badge': 'VENDU',
    
    // Videos
    'videos.title': 'Vidéos',
    'videos.subtitle': 'Stories in Motion',
    'videos.description': 'Découvrez quelques-uns de mes biens préférés et projets de rénovation.',
    'video.soundLocked': 'Son verrouillé',
    'video.hoverForSound': 'Survol pour le son',
    'video.lockSound': 'Verrouiller le son',
    
    // Testimonials
    'testimonials.title': 'Avis',
    'testimonials.subtitle': 'Ce que mes clients disent',
    
    // Blog
    'blog.title': 'Articles',
    'blog.subtitle': 'Conseils et expertise immobilière',
    'blog.readmore': 'Lire la suite',
    
    // About
    'about.title': 'À propos',
    'about.content': "Je suis Romain Barrau, conseiller immobilier chez IAD France, le réseau de conseillers immobiliers indépendants.\n\nAujourd'hui, j'aide les investisseurs et les familles à naviguer dans l'immobilier au Portugal en toute confiance, en combinant réflexion stratégique, créativité et passion.\n\nJe suis passionné par l'immobilier car il va bien au-delà des briques et des chiffres : il crée stabilité, confort et sens dans la vie des gens. Mon objectif est d'être un partenaire actif dans la réalisation des projets de mes clients.\n\nOriginaire de France, j'ai étudié et travaillé au Royaume-Uni, à Hong Kong, Amsterdam et Paris avant de choisir Lisbonne comme base. Ce parcours international me donne une vision globale et une perspective unique sur le marché portugais.",
    'about.timeline.title': 'Parcours',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Discutons de votre projet',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    'contact.success': 'Message envoyé avec succès !',
    
    // Footer
    'footer.tagline': 'Conseiller immobilier',
    'footer.rights': 'Tous droits réservés',
    'footer.designed': 'Conçu avec',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.listings': 'Listings',
    'nav.sold': 'Sold Properties',
    'nav.videos': 'Videos',
    'nav.testimonials': 'Testimonials',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Home
    'home.hero.subtitle': 'Crafting Tomorrow\'s Living Spaces',
    'home.hero.title1': 'The experience of an',
    'home.hero.title2': 'agent',
    'home.hero.title3': '.',
    'home.hero.title4': 'The energy of an',
    'home.hero.title5': 'entrepreneur',
    'home.hero.title6': '.',
    'home.hero.cta': 'Contact me',
    'home.dream.title': 'The experience of an',
    'home.dream.agent': 'agent',
    'home.dream.title2': 'The energy of an',
    'home.dream.entrepreneur': 'entrepreneur',
    'home.dream.description': 'Driven by architecture, stories, and people, I help clients buy, sell, and invest in meaningful properties across Portugal. My goal: make every real estate journey transparent, personal, and inspiring.',
    'home.dream.cta': 'Get in touch',
    'home.inclusions.title': 'Our',
    'home.inclusions.creative': 'creative',
    'home.inclusions.title2': 'universe',
    'home.inclusions.description1': 'We tell stories of homes, cities, and dreams through film.',
    'home.inclusions.description2': 'Each video is crafted to inspire, connect, and bring our vision of real estate to life.',
    'home.inclusions.cta': 'View our films',
    'home.cta.properties': 'Properties',
    'home.cta.reviews': 'Reviews',
    'home.cta.videos': 'Videos',
    'home.cta.contact': 'Get in touch',
    
    // Testimonials
    'home.testimonials.title': 'What my clients say',
    'home.testimonials.subtitle': 'Verified Google Reviews',
    'home.testimonials.swipe': 'Swipe to see more reviews',
    'home.testimonials.readMore': 'Read more',
    'home.testimonials.readLess': 'Read less',
    'home.testimonials.viewOnGoogle': 'View on Google',
    'home.testimonials.review1': 'The real estate agency to choose in Lisbon to sell your property: excellent market knowledge, fair price estimation for our apartment, we quickly received an offer at the asking price, resulting in a sale under the best possible conditions. A huge thank you to Romain for your efficiency, professionalism, and commitment. We benefited from personalized support at every stage of the sale and always received very wise advice. It was very comfortable. In summary, we recommend Seed and Romain Barrau without any hesitation for any real estate transaction in Lisbon.',
    'home.testimonials.review2': 'For my very first real estate purchase, I was fortunate to be accompanied by Romain BARRAU, and I couldn\'t have dreamed of a better advisor. Romain showed exceptional kindness and patience throughout the process. He took the time to answer each of my questions, sometimes numerous, always with clarity and kindness. He was present at every step, very responsive, and always available, whether to organize apartment viewings or to accompany me in my decisions.',
    'home.testimonials.review3': 'Top service! In addition to his precise expertise in the Portuguese market (apartment sold at the estimated price), Romain was very responsive and accompanied us throughout the entire sales process. Thanks again for the service 🙂',
    'home.testimonials.review4': 'Thank you to Romain for organizing the sale of our Lisbon apartment from A to Z! Great follow-up and one of the fastest sales! Everything we dream of :) I recommend!',
    'home.testimonials.review5': 'I purchased my first home through Seed and I am extremely satisfied with the service. Even though I was the buyer, I truly felt that my agent, Romain, was there for me at every step. Buying a home is stressful, but buying a home abroad can be quite terrifying. I had been looking for housing for over a year and was on the verge of giving up until I found Seed. Romain is an extraordinarily friendly, diligent, and honest man. I have worked in real estate my entire career and can say with certainty that you cannot hope for a better agent.',
    'home.testimonials.review6': 'I sold two apartments simultaneously thanks to Seed and Romain. Their collaboration was constant, communication excellent, and service very dynamic. Unlike most traditional agencies that merely acquire properties, Seed truly invests in closing sales! I recommend them without hesitation!',
    'home.testimonials.review7': 'I bought my first home with them and honestly, I have nothing to complain about. A totally simple, personalized, and efficient process 👏🏻. Up to date with market trends, with optimal analyses and recommendations. If you want to buy, I highly recommend using them! Romain Barrau is a true professional 💪🏼',
    'home.testimonials.review8': 'I recently had the pleasure of working with Romain as a real estate broker, and I couldn\'t be happier with the experience. Romain\'s professionalism, knowledge, and dedication were exceptional. He guided me seamlessly throughout the process, ensuring a smooth and stress-free transaction. Romain\'s market expertise, along with his excellent communication skills, made me feel confident and well-informed at every stage of the process.',
    'home.testimonials.review9': 'Very professional and exceptional service. Seed goes above and beyond to personalize your service and meet all your needs. I highly recommend to any buyer or seller.',
    'home.testimonials.review10': 'Very professional and super friendly agency - a special thanks to Romain Barrau for all the help and hard work put into selling our apartment!',
    
    // Listings
    'listings.title': 'Active Listings',
    'listings.subtitle': 'Discover exceptional properties',
    
    // Sold
    'sold.title': 'Sold Properties',
    'sold.subtitle': 'Recent Successes',
    'sold.badge': 'SOLD',
    
    // Videos
    'videos.title': 'Videos',
    'videos.subtitle': 'Stories in Motion',
    'videos.description': 'Discover some of my favorite listings and renovation projects.',
    'video.soundLocked': 'Sound locked',
    'video.hoverForSound': 'Hover for sound',
    'video.lockSound': 'Lock sound',
    
    // Testimonials
    'testimonials.title': 'Testimonials',
    'testimonials.subtitle': 'What my clients say',
    
    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Real Estate insights and expertise',
    'blog.readmore': 'Read more',
    
    // About
    'about.title': 'About',
    'about.content': "I'm Romain Barrau, Real Estate advisor at IAD France, the network of independent real estate advisors.\n\nToday, I help investors and families navigate real estate in Portugal with confidence, combining strategic thinking, creativity, and passion.\n\nI'm passionate about real estate because it goes far beyond bricks and numbers—it creates stability, comfort, and meaning in people's lives. My goal is to be an active partner in making my clients' projects come true.\n\nOriginally from France, I've studied and worked across the UK, Hong Kong, Amsterdam, and Paris before choosing Lisbon as my home base. This international path gives me a global mindset and a unique perspective on the Portuguese market.",
    'about.timeline.title': 'Timeline',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': "Let's discuss your project",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.success': 'Message sent successfully!',
    
    // Footer
    'footer.tagline': 'Real Estate Advisor',
    'footer.rights': 'All rights reserved',
    'footer.designed': 'Designed with',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

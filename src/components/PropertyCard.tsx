import { Card } from '@/components/ui/card';
import { MapPin, Euro } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  sold?: boolean;
  onClick?: () => void;
}

const PropertyCard = ({ image, title, location, price, sold, onClick }: PropertyCardProps) => {
  const { t } = useLanguage();

  return (
    <Card 
      className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {sold && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="text-background text-3xl font-display font-bold">{t('sold.badge')}</span>
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-display font-semibold mb-2 text-foreground">{title}</h3>
        <div className="flex items-center text-foreground/80 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center text-foreground font-semibold text-lg mt-auto">
          <Euro className="h-5 w-5 mr-1" />
          <span>{price}</span>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;

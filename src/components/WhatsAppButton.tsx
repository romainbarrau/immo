import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '33669119336';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 animate-fade-in"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle size={28} strokeWidth={2} />
    </a>
  );
};

export default WhatsAppButton;

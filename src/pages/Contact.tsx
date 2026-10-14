import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { EMAIL, INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP_URL } from '@/config/site';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setIsSent(false);
    console.log("Submitting contact form");

    try {
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      });

      if (error) throw error;

      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send the message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container pt-32 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-serif leading-[1.05] tracking-tight mb-4 text-foreground">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-foreground/90">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 animate-slide-up">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                    {t('contact.name')}
                  </label>
                  <Input
                    id="contact-name"
                    required
                    className="rounded-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                    {t('contact.email')}
                  </label>
                  <Input
                    id="contact-email"
                    required
                    className="rounded-sm"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    id="contact-message"
                    required
                    className="rounded-sm"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    rows={6}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? 'Sending...' : t('contact.send')}
                </Button>
                {isSent && (
                  <p role="status" className="flex items-center gap-2 rounded-sm bg-secondary px-4 py-3 text-sm font-medium text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
                    {t('contact.success')}
                  </p>
                )}
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <Card className="p-8">
                <h3 className="text-xl md:text-2xl font-sans font-medium mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-5 w-5" aria-hidden="true" />
                    <span>{EMAIL}</span>
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-xl md:text-2xl font-sans font-medium mb-6">Follow Me</h3>
                <div className="flex gap-4">
                  <a
                    href={INSTAGRAM_URL}
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin className="h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

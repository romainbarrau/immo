import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signIn, signUp } = useAuth();
  const { t } = useLanguage();
  const emailSchema = z.string().email(t('auth.invalidEmail'));
  const passwordSchema = z.string().min(6, t('auth.shortPassword'));

  useEffect(() => {
    if (user) {
      navigate('/admin/properties');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: t('auth.error'),
              description: t('auth.invalidCredentials'),
              variant: 'destructive',
            });
          } else {
            toast({
              title: t('auth.error'),
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: t('auth.success'),
            description: t('auth.loggedIn'),
          });
          navigate('/admin/properties');
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: t('auth.error'),
              description: t('auth.alreadyRegistered'),
              variant: 'destructive',
            });
          } else {
            toast({
              title: t('auth.error'),
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: t('auth.success'),
            description: t('auth.created'),
          });
          setIsLogin(true);
        }
      }
    } catch (err) {
      toast({
        title: t('auth.error'),
        description: t('auth.unexpected'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">
            {isLogin ? t('auth.login') : t('auth.signup')}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isLogin
              ? t('auth.loginSubtitle')
              : t('auth.signupSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="admin@example.com"
              required
              className="bg-card text-foreground border-border"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">{t('auth.password')}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="••••••••"
              required
              className="bg-card text-foreground border-border"
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t('auth.wait')
              : isLogin
              ? t('auth.signIn')
              : t('auth.signup')}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isLogin
              ? t('auth.toSignup')
              : t('auth.toLogin')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

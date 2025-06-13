// app/[locale]/(auth)/login/page.tsx
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { useTranslations } from 'next-intl';

// We need a client component to handle form actions
function LoginForm() {
  const t = useTranslations('LoginPage');
  
  const handleGoogleSignIn = async () => {
    'use server'; // This is a server action
    await signIn('google', { redirectTo: '/files' });
  };
  
  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
      <Card title={t('title')} className="w-full max-w-25rem shadow-2">
        <form action={handleGoogleSignIn} className="p-fluid">
          <Button type="submit" label={t('googleButton')} icon="pi pi-google" className="p-button-secondary mb-3" />
        </form>
        <Divider align="center" className="my-3"><b>{t('or')}</b></Divider>
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="email">{t('emailLabel')}</label>
            <InputText id="email" type="text" />
          </div>
          <div className="field">
            <label htmlFor="password">{t('passwordLabel')}</label>
            <Password id="password" feedback={false} toggleMask />
          </div>
          <Button label={t('loginButton')} className="mt-2" />
          <div className="text-center mt-3">
            <a href="#" className="text-sm text-primary hover:underline">{t('signup')}</a>
            <span className="mx-2">|</span>
            <a href="#" className="text-sm text-primary hover:underline">{t('forgot')}</a>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return <LoginForm />;
}
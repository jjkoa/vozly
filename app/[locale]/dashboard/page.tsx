// app/[locale]/dashboard/page.tsx
import { auth } from '@/lib/auth/auth';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation'; // To redirect if user is not found

export default async function DashboardPage({ params: { locale } }: { params: { locale: string } }) {
  const user = await auth.getLoggedInUser();
  const t = await getTranslations({ locale, namespace: 'DashboardPage' });

  if (!user) {
    // This case should ideally be handled by middleware,
    // but as a safeguard, redirect to login if no user is found.
    // Adjust the redirect path as per your application's routing.
    redirect(`/${locale}/login`);
  }

  // Fallback for username if not available, though 'name' is expected from better-auth
  const username = user?.name || user?.email || 'User';

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('title')}</h1>
      <p>{t('greetingUser', { username: username })}</p>
      <p>{t('helloWorld')}</p>
    </div>
  );
}

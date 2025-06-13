// app/[locale]/dashboard/page.tsx
import { getLoggedInUser } from 'better-auth/next-js'; // Changed import
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { User } from 'better-auth'; // Assuming User type is exported

export default async function DashboardPage({ params: { locale } }: { params: { locale: string } }) {
  const user: User | null = await getLoggedInUser(); // Call the imported function
  const t = await getTranslations({ locale, namespace: 'DashboardPage' });

  if (!user) {
    redirect(`/${locale}/login`);
  }

  const username = user?.name || user?.email || 'User';

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('title')}</h1>
      <p>{t('greetingUser', { username: username })}</p>
      <p>{t('helloWorld')}</p>
    </div>
  );
}

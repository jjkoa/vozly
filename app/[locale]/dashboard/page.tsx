// app/[locale]/dashboard/page.tsx
import { auth } from '@/lib/auth/auth';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers'; // Import headers
import type { User } from 'better-auth'; // Assuming User type can be imported

export default async function DashboardPage({ params: { locale } }: { params: { locale: string } }) {
  const sessionPayload = await auth.api.getSession({ headers: await headers() });
  const t = await getTranslations({ locale, namespace: 'DashboardPage' });

  // The example used session?.session to check for an active session.
  // Let's assume the user object is at sessionPayload.session.user
  const user: User | undefined = sessionPayload?.session?.user;

  if (!user) {
    redirect(`/${locale}/login`);
  }

  // Fallback for username if not available
  const username = user?.name || user?.email || 'User';

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('title')}</h1>
      <p>{t('greetingUser', { username: username })}</p>
      <p>{t('helloWorld')}</p>
    </div>
  );
}

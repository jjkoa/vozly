// app/[locale]/dashboard/page.tsx
import { auth } from '@/lib/auth/auth';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import type { User } from 'better-auth'; // Assuming User type is exported for the user object

export default async function DashboardPage({ params: { locale } }: { params: { locale: string } }) {
  const sessionPayload = await auth.api.getSession({ headers: await headers() });
  const t = await getTranslations({ locale, namespace: 'DashboardPage' });

  let user: User | null = null;

  if (sessionPayload?.session?.userId) {
    // Assuming auth.api.getUser(userId) is the way to fetch user details
    // This is a common pattern for auth libraries.
    // The result of this call should be the User object or null/undefined.
    // If auth.api.getUser can return undefined for a valid ID (e.g., user deleted),
    // or if an error should be handled, further checks might be needed.
    const fetchedUser = await auth.api.getUser(sessionPayload.session.userId);
    if (fetchedUser) { // Ensure fetchedUser is not undefined or null
        user = fetchedUser;
    }
  }

  if (!user) {
    // If no session or no user found for the userId, redirect to login
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

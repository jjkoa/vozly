// app/[locale]/dashboard/page.tsx
import { auth } from '@/lib/auth/auth';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { folders, files } from '@/lib/db/schema';
import { Card } from 'primereact/card';

import Link from 'next/link';
import { eq } from 'drizzle-orm';

interface DashboardParams { locale: string }

export default async function DashboardPage({ params }: { params: Promise<DashboardParams> }) {
  const { locale } = await params;
  const sessionPayload = await auth.api.getSession({ headers: await headers() });
  const t = await getTranslations({ locale, namespace: 'DashboardPage' });

  type User = { id: string; name?: string; email?: string; image?: string };

let user: User | null = null;

if (sessionPayload?.session?.userId) {
  // Fetch user info from DB using the users table
  const usersTable = (await import('@/lib/db/schema')).users;
  const userResult = await db.select().from(usersTable).where(eq(usersTable.id, sessionPayload.session.userId));
  if (userResult.length > 0) {
    user = {
      id: userResult[0].id,
      name: userResult[0].name || undefined,
      email: userResult[0].email || undefined,
      image: userResult[0].image || undefined,
    };
  }
}

if (!user) {
  redirect(`/${locale}/login`);
}

// Username computed for future UI usage
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const username = user?.name || user?.email || 'User';

  // Fetch folder and file counts for the user
  const foldersCount = (await db.select().from(folders).where(eq(folders.userId, user.id)) ).length;
  const filesCount = (await db.select().from(files).where(eq(files.userId, user.id)) ).length;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <Link href={`/${locale}/profile`} className="text-sm text-primary hover:underline">
          {t('profile')}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title={t('totalFolders')} className="shadow-2">
          <div className="text-2xl font-bold">{foldersCount}</div>
        </Card>
        <Card title={t('totalFiles')} className="shadow-2">
          <div className="text-2xl font-bold">{filesCount}</div>
        </Card>
        <Card title={t('totalMinutes')} className="shadow-2">
          <div className="text-2xl font-bold">0</div>
        </Card>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t('recentFiles')}</h2>
        <Link href={`/${locale}/files`} className="text-sm text-primary hover:underline">
          {t('viewAll')}
        </Link>
      </div>
      {/* TODO: Add recent files table/list here */}
    </div>
  );
}

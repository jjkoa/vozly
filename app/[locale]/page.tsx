// app/[locale]/page.tsx
import { redirect } from 'next/navigation';

interface LocaleParams {
  locale: string;
}

// This page acts as the locale root (e.g. /en, /es)
// We immediately forward users to their dashboard or any other desired landing page.
export default async function LocaleIndex({ params }: { params: Promise<LocaleParams> }) {
  const { locale } = await params;
  redirect(`/${locale}/dashboard`);
}
// next-intl.config.ts
// Configuration for next-intl (App Router)
// See: https://next-intl.dev/docs/getting-started/app-router
import { Pathnames } from 'next-intl/routing';

const locales = ['en', 'es'] as const;

export default {
  locales,
  defaultLocale: 'es' as const,

  // (optional) Configure pathnames if you use route translation
  // pathnames: {
  //   '/': '/',
  //   '/about': {
  //     en: '/about',
  //     es: '/acerca-de'
  //   }
  // } satisfies Pathnames<typeof locales>,

  // (optional) Opt-in to App Router support explicitly
  nextjs: {
    appDir: true
  }
} satisfies {
  locales: readonly string[];
  defaultLocale: string;
  pathnames?: Pathnames<typeof locales>;
  nextjs?: { appDir?: boolean };
};
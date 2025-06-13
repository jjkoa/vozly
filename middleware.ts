//middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'es',
});

export default function middleware(req: NextRequest) {
  // Get session cookie to check if user is authenticated
  const sessionCookie = getSessionCookie(req);

  const isAuthenticated = !!sessionCookie;
  const isProtectedRoute = req.nextUrl.pathname.includes('/files');
  const isLoginRoute = req.nextUrl.pathname.includes('/login');

  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated && isProtectedRoute) {
    const locale = req.nextUrl.pathname.split('/')[1] || 'es';
    const newUrl = new URL(`/${locale}/login`, req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  // If user is authenticated and trying to access login page
  if (isAuthenticated && isLoginRoute) {
    const locale = req.nextUrl.pathname.split('/')[1] || 'es';
    const newUrl = new URL(`/${locale}/files`, req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  // Run the i18n middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

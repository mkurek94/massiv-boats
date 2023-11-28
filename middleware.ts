import { withAuth } from "next-auth/middleware";
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from "next/server";
import { ROUTES } from "./constants/routes";
import { LOCALE } from "./constants/locale";

const LOCALES = [LOCALE.PL, LOCALE.EN];
const PUBLIC_PAGES = [ROUTES.SIGN_IN, ROUTES.SIGN_UP, ROUTES.MAIN]
 
export const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: LOCALES,
 
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: LOCALE.PL
});
 
export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({token}) => token != null
    },
    pages: {
      signIn: ROUTES.SIGN_IN,
    }
  }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${LOCALES.join('|')}))?(${PUBLIC_PAGES.join('|')})?/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
 
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}


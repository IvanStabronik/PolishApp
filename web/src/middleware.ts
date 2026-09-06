import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: Parameters<typeof intlMiddleware>[0]) {
  return intlMiddleware(request) as NextResponse;
}

export const config = {
  matcher: ["/", "/(ru|uk|pl)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};

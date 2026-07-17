import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Garde-fou optionnel : ne redirige que si le cookie session est partagé
 * (COOKIE_DOMAIN=.cellulenoire.fr côté API) ET que le flag est activé.
 *
 * Sans ça, le JWT reste sur api.cellulenoire.fr et ce middleware
 * provoquait une boucle 307 /dashboard → /?redirect=/dashboard.
 * L’auth réelle reste dans app/dashboard/layout.tsx.
 */
export function middleware(request: NextRequest) {
  const enforce = process.env.COOKIE_MIDDLEWARE === "true";
  if (!enforce) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token");
  if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

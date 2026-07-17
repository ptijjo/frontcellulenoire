import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  // En production, le cookie doit être partagé via COOKIE_DOMAIN=.cellulenoire.fr
  // En développement, le layout client reste le filet de sécurité (cookie sur l'hôte API).
  if (isDashboard && process.env.NODE_ENV === "production" && !token) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

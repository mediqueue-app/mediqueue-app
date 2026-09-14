import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, type StoredLocale } from "./lib/locale-cookie";

const FILE = /\.[^/]+$/;

function isSkipped(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    FILE.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isSkipped(pathname)) return NextResponse.next();

  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const isTr = pathname === "/tr" || pathname.startsWith("/tr/");
  const lang = request.nextUrl.searchParams.get("lang");

  if (lang === "en" && !isEn) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    url.searchParams.delete("lang");
    return NextResponse.redirect(url);
  }

  if (lang === "tr") {
    const url = request.nextUrl.clone();
    url.searchParams.delete("lang");
    if (isEn) {
      url.pathname = pathname === "/en" ? "/" : pathname.slice(3) || "/";
    }
    return NextResponse.redirect(url);
  }

  if (isTr) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/tr" ? "/" : pathname.slice(3) || "/";
    return NextResponse.redirect(url);
  }

  const locale: StoredLocale = isEn ? "en" : "tr";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  const rewriteUrl = request.nextUrl.clone();
  if (isEn) {
    rewriteUrl.pathname = pathname === "/en" ? "/" : pathname.slice(3) || "/";
  }

  const response = isEn
    ? NextResponse.rewrite(rewriteUrl, { request: { headers: requestHeaders } })
    : NextResponse.next({ request: { headers: requestHeaders } });

  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

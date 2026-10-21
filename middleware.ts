import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

function localeFromPath(pathname: string) {
  const segment = pathname.split("/")[1] ?? "";
  return isLocale(segment) ? segment : null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/icon" ||
    pathname === "/apple-icon" ||
    pathname === "/opengraph-image" ||
    pathname === "/twitter-image" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const locale = localeFromPath(pathname);
  if (!locale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Language", locale === "zh" ? "zh-CN" : "en");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

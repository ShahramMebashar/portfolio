import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLocale } from "@/lib/types";

const defaultLocale = "en";

function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().split("-")[0])
    .find((lang) => isLocale(lang));

  return preferred ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const pathnameSegments = pathname.split("/");
  const firstSegment = pathnameSegments[1];

  if (isLocale(firstSegment)) {
    // Redirect /en/blog* to /ku/blog* (blog is Kurdish-only)
    if (firstSegment === "en" && pathnameSegments[2] === "blog") {
      const blogPath = pathnameSegments.slice(2).join("/");
      request.nextUrl.pathname = `/ku/${blogPath}`;
      return NextResponse.redirect(request.nextUrl);
    }
    return;
  }

  // No locale in path — redirect to detected or default locale
  const locale = getLocaleFromHeaders(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|images|.*\\..*).*)"],
};

import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/types";

/** 站点内的静态路由（对应 app/[locale] 下的页面） */
const STATIC_ROUTES = new Set([
  "",
  "memes",
  "stories",
  "trivia",
  "players",
  "teams",
  "timeline",
  "rankings",
  "tools",
  "submit",
  "search",
  "about",
  "privacy",
  "terms",
]);

/** 带参数的路由前缀，例如 memes/text-me */
const DETAIL_ROUTES = new Set(["memes", "stories", "players", "teams"]);

function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("site-locale")?.value;
  if (cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])) {
    return cookieLocale;
  }
  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const code = part.split(";")[0].trim().toLowerCase();
    if (code.startsWith("zh")) return "zh";
    if (code.startsWith("en")) return "en";
  }
  return defaultLocale;
}

/** 判断路径是否符合站内路由结构，详情页的 id 交给页面自身校验。 */
function isKnownRoute(rest: string): boolean {
  if (!rest) return true;
  const segments = rest.split("/").filter(Boolean);
  if (segments.length === 1) return STATIC_ROUTES.has(segments[0]);
  if (segments.length === 2) return DETAIL_ROUTES.has(segments[0]);
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // public 目录下的静态资源（.html/.css/.png/...）直接放行，不做语言前缀重定向
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  const localePrefix = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (localePrefix) {
    const rest = pathname.slice(localePrefix.length + 1);
    if (isKnownRoute(rest)) return NextResponse.next();

    // 未匹配的路径改写到站内 404 页面，保留站点头尾与统计脚本
    const url = request.nextUrl.clone();
    url.pathname = `/${localePrefix}/players/__not_found__`;
    return NextResponse.rewrite(url);
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)"],
};

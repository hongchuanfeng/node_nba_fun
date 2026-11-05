"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/types";

const navKeys: { key: keyof Dictionary["nav"]; path: string }[] = [
  { key: "home", path: "" },
  { key: "stories", path: "/stories" },
  { key: "memes", path: "/memes" },
  { key: "trivia", path: "/trivia" },
  { key: "players", path: "/players" },
  { key: "teams", path: "/teams" },
  { key: "timeline", path: "/timeline" },
];

export function LocaleSwitcher({ locale, path }: { locale: Locale; path: string }) {
  const pathname = usePathname() ?? path;
  const rest = pathname.replace(/^\/(zh|en)(?=\/|$)/, "") || "";
  return (
    <div className="locale-switch" aria-label="Language switcher">
      <Link className={locale === "zh" ? "active" : ""} href={`/zh${rest}`}>
        中文
      </Link>
      <Link className={locale === "en" ? "active" : ""} href={`/en${rest}`}>
        EN
      </Link>
    </div>
  );
}

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname() ?? "";
  const rest = pathname.replace(/^\/(zh|en)(?=\/|$)/, "");

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={`/${locale}`} className="brand">
          <span className="brand-ball">NBA</span>
          <span>
            {dict.siteName}
            <small>{dict.siteTagline}</small>
          </span>
        </Link>

        <nav className="nav-scroll">
          {navKeys.map(({ key, path }) => {
            const active = path === "" ? rest === "" : rest.startsWith(path);
            return (
              <Link
                key={key}
                href={`/${locale}${path}`}
                className={`nav-link${active ? " active" : ""}`}
              >
                {dict.nav[key]}
              </Link>
            );
          })}
          <a className="nav-link" href="/index.html" target="_blank" rel="noopener noreferrer">
            {dict.nav.moreFun}
          </a>
        </nav>

        <div className="header-actions">
          <LocaleSwitcher locale={locale} path={pathname} />
          <Link className="btn small" href={`/${locale}/search`}>
            {dict.nav.search}
          </Link>
        </div>
      </div>
    </header>
  );
}

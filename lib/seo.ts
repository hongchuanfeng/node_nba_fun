import type { Metadata } from "next";
import type { Locale } from "./types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nbafun.example.com";

export function buildMetadata(options: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
}): Metadata {
  const { locale, title, description, path, keywords = [], type = "website" } = options;
  const url = `${siteUrl}/${locale}${path}`;
  const other = locale === "zh" ? "en" : "zh";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        zh: `${siteUrl}/zh${path}`,
        en: `${siteUrl}/en${path}`,
        "x-default": `${siteUrl}/zh${path}`,
      },
    },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: "NBA Fun",
      locale: locale === "zh" ? "zh_CN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "content-language": locale,
      "alternate-locale": other,
    },
  };
}

export { siteUrl };

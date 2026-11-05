import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnalyticsClientLoader } from "@/components/AnalyticsClientLoader";
import { AnalyticsInit, AnalyticsScripts } from "@/components/AnalyticsScripts";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/types";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return {
    title: {
      default: `${dict.siteName} · ${dict.siteTagline}`,
      template: `%s | ${dict.siteName}`,
    },
    description: dict.home.heroSubtitle,
    applicationName: dict.siteName,
    generator: "Next.js",
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"}>
      <head>
        <AnalyticsInit />
      </head>
      <body>
        <AnalyticsScripts />
        <AnalyticsClientLoader />
        <SiteHeader locale={locale} dict={dict} />
        <main>{children}</main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}

import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { friendLinks } from "@/lib/data";
import type { Locale } from "@/lib/types";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>{dict.siteName}</h4>
            <p style={{ color: "var(--text-soft)", fontSize: 14, margin: 0 }}>
              {dict.home.footerNote}
            </p>
            <p style={{ color: "var(--text-soft)", fontSize: 13, marginTop: 12 }}>
              {locale === "zh" ? "内容合作 / 投稿邮箱" : "Content & submissions"}:{" "}
              <a href="mailto:hcf@foxmail.com" style={{ color: "var(--accent)" }}>
                hcf@foxmail.com
              </a>
            </p>
          </div>
          <div>
            <h4>{dict.footer.links}</h4>
            <div className="friend-links">
              {friendLinks.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer nofollow">
                  {locale === "zh" ? link.name : link.nameEn}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {year} {dict.siteName}. {dict.footer.copyright}
          </span>
          <span>
            <Link href={`/${locale}/about`}>{dict.footer.about}</Link> ·{" "}
            <Link href={`/${locale}/privacy`}>{dict.footer.privacy}</Link> ·{" "}
            <Link href={`/${locale}/terms`}>{dict.footer.terms}</Link> ·{" "}
            <a href="/index.html" target="_blank" rel="noopener noreferrer">
              {dict.nav.moreFun}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

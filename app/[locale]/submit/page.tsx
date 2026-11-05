import { SubmitForm } from "@/components/SubmitForm";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return buildMetadata({
    locale: resolved,
    title: dict.submit.title,
    description: dict.submit.subtitle,
    path: "/submit",
    keywords: ["NBA 投稿", "submit NBA meme"],
  });
}

export default async function SubmitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>{dict.submit.title}</h1>
          <p>{dict.submit.subtitle}</p>
        </div>
      </div>
      <SubmitForm dict={dict} />
    </div>
  );
}
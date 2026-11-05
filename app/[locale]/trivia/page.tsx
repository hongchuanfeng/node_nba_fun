import { trivia } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/types";
import { pick } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return buildMetadata({
    locale: resolved,
    title: dict.nav.trivia,
    description:
      resolved === "zh"
        ? "NBA 历史冷知识：纪录、趣闻、冷门数据与球员轶事，按年代归档。"
        : "NBA cold facts: records, oddities, obscure numbers and player lore.",
    path: "/trivia",
    keywords: ["NBA 冷知识", "NBA trivia", "NBA 纪录"],
  });
}

export default async function TriviaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>{dict.nav.trivia}</h1>
          <p>{dict.trivia.subtitle}</p>
        </div>
      </div>
      <div className="card-grid">
        {trivia.map((item) => (
          <details key={item.id} className="card">
            <summary style={{ cursor: "pointer" }}>
              <h3 style={{ marginBottom: 8 }}>{pick(item.question, resolved)}</h3>
              <span className="badge tag">{dict.trivia.readAnswer}</span>
            </summary>
            <div style={{ marginTop: 12 }}>
              <p>
                <strong>
                  {dict.trivia.answer}: {pick(item.options[item.answerIndex], resolved)}
                </strong>
              </p>
              <p>{pick(item.explanation, resolved)}</p>
            </div>
          </details>
        ))}
      </div>
      <p style={{ marginTop: 20 }}>
        <a className="link-more" href="/index.html" target="_blank" rel="noopener noreferrer">
          {dict.nav.moreFun} →
        </a>
      </p>
    </div>
  );
}
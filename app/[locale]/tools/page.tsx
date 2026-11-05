import { MemeMatch } from "@/components/MemeMatch";
import { TriviaQuiz } from "@/components/TriviaQuiz";
import { memes, trivia } from "@/lib/data";
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
    title: dict.nav.tools,
    description: dict.tools.subtitle,
    path: "/tools",
    keywords: ["NBA 测验", "NBA quiz", "NBA 游戏"],
  });
}

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);

  const pairs = memes.slice(0, 6).map((meme) => ({
    id: meme.id,
    meme: pick(meme.title, resolved),
    scene: pick(meme.scene, resolved),
  }));

  const daily = trivia[Math.floor(Date.now() / 86400000) % trivia.length];

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>{dict.tools.title}</h1>
          <p>{dict.tools.subtitle}</p>
        </div>
      </div>

      <section style={{ marginBottom: 36 }}>
        <h2>{dict.tools.calendar}</h2>
        <p style={{ color: "var(--text-soft)" }}>{dict.tools.calendarHint}</p>
        <div className="panel">
          <h3>{pick(daily.question, resolved)}</h3>
          <p>
            <strong>
              {dict.trivia.answer}: {pick(daily.options[daily.answerIndex], resolved)}
            </strong>
          </p>
          <p style={{ color: "var(--text-soft)" }}>{pick(daily.explanation, resolved)}</p>
        </div>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2>{dict.tools.quiz}</h2>
        <p style={{ color: "var(--text-soft)" }}>{dict.tools.quizHint}</p>
        <TriviaQuiz questions={trivia} locale={resolved} dict={dict} />
      </section>

      <section>
        <h2>{dict.tools.match}</h2>
        <p style={{ color: "var(--text-soft)" }}>{dict.tools.matchHint}</p>
        <MemeMatch pairs={pairs} locale={resolved} dict={dict} />
      </section>
    </div>
  );
}
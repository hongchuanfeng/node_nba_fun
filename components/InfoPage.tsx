import type { Locale } from "@/lib/types";

export interface InfoSection {
  title: { zh: string; en: string };
  body: { zh: string[]; en: string[] };
}

export function InfoPage({
  locale,
  title,
  intro,
  sections,
}: {
  locale: Locale;
  title: string;
  intro: string;
  sections: InfoSection[];
}) {
  return (
    <div className="container">
      <article className="article">
        <h1>{title}</h1>
        <p className="lead">{intro}</p>
        {sections.map((section) => (
          <section key={section.title.zh} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 20 }}>{locale === "zh" ? section.title.zh : section.title.en}</h2>
            {(locale === "zh" ? section.body.zh : section.body.en).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
    </div>
  );
}
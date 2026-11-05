import Link from "next/link";
import { ContentFilters } from "@/components/Filters";
import { getDictionary } from "@/lib/dictionaries";
import { allTags, allYears, searchContent } from "@/lib/search";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return buildMetadata({
    locale: resolved,
    title: dict.search.title,
    description: dict.search.subtitle,
    path: "/search",
    keywords: ["NBA 搜索", "NBA search"],
  });
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  const query = await searchParams;

  const first = (key: string) => {
    const value = query[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const q = first("q") ?? "";
  const player = first("player") ?? "";
  const team = first("team") ?? "";
  const year = first("year") ?? "";
  const tag = first("tag") ?? "";
  const category = first("category") ?? "";

  const results = searchContent(
    {
      query: q,
      playerId: player || undefined,
      teamId: team || undefined,
      year: year ? Number(year) : undefined,
      tag: tag || undefined,
      category: (category || undefined) as never,
    },
    resolved,
  );

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>{dict.search.title}</h1>
          <p>{dict.search.subtitle}</p>
        </div>
      </div>
      <div className="layout-with-aside">
        <ContentFilters
          locale={resolved}
          dict={dict}
          values={{ q, player, team, year, tag, category }}
          tags={allTags()}
          years={allYears()}
          action={`/${resolved}/search`}
        />
        <div>
          <p style={{ color: "var(--text-soft)" }}>
            {dict.list.resultCount.replace("{count}", String(results.length))}
          </p>
          {results.length === 0 ? (
            <div className="empty">{dict.list.empty}</div>
          ) : (
            <div className="rank-list">
              {results.map((result) => (
                <div key={`${result.type}-${result.id}`} className="rank-row">
                  <span className="rank-no">
                    {result.type === "meme" ? "梗" : result.type === "story" ? "文" : "史"}
                  </span>
                  <div className="rank-body">
                    <h3>{result.title}</h3>
                    <p>{result.excerpt}</p>
                    <div className="meta-row" style={{ marginTop: 6 }}>
                      <span className={`badge ${result.category}`}>
                        {dict.category[result.category]}
                      </span>
                      {result.playerNames.map((name) => (
                        <span key={name} className="badge tag">
                          {name}
                        </span>
                      ))}
                      {result.teamNames.map((name) => (
                        <span key={name} className="badge tag">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                  {result.type === "meme" && (
                    <Link className="btn small ghost" href={`/${resolved}/memes/${result.slug}`}>
                      {dict.common.readMore}
                    </Link>
                  )}
                  {result.type === "story" && (
                    <Link className="btn small ghost" href={`/${resolved}/stories/${result.slug}`}>
                      {dict.common.readMore}
                    </Link>
                  )}
                  {result.type === "trivia" && (
                    <Link className="btn small ghost" href={`/${resolved}/trivia`}>
                      {dict.common.readMore}
                    </Link>
                  )}
                  {result.type === "timeline" && (
                    <Link className="btn small ghost" href={`/${resolved}/timeline`}>
                      {dict.common.readMore}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
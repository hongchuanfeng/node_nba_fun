import Link from "next/link";
import { seasons, timeline } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";
import { fetchNbaLatestNews } from "@/lib/nba-news";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/types";
import { pick } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return buildMetadata({
    locale: resolved,
    title: dict.nav.timeline,
    description: dict.timeline.subtitle,
    path: "/timeline",
    keywords: ["NBA 时间线", "NBA timeline", "NBA 赛季"],
  });
}

export default async function TimelinePage({
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

  const season = first("season") ?? "";
  const month = first("month") ?? "";

  const list = timeline
    .filter((event) => (season ? event.season === season : true))
    .filter((event) => (month ? new Date(event.date).getMonth() + 1 === Number(month) : true))
    .sort((a, b) => b.date.localeCompare(a.date));

  const months = Array.from(new Set(timeline.map((event) => new Date(event.date).getMonth() + 1))).sort();

  const nbaNews = await fetchNbaLatestNews(20);

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>{dict.nav.timeline}</h1>
          <p>{dict.timeline.subtitle}</p>
        </div>
      </div>

      <section style={{ marginBottom: 34 }}>
        <div className="section-head">
          <div>
            <h2>{dict.timeline.nbaLatestTitle}</h2>
            <p>{dict.timeline.nbaLatestSubtitle}</p>
          </div>
          <a
            className="link-more"
            href="https://www.nba.com/news"
            target="_blank"
            rel="noopener noreferrer"
          >
            NBA.com →
          </a>
        </div>

        {nbaNews.length === 0 ? (
          <div className="empty">{dict.timeline.nbaLatestEmpty}</div>
        ) : (
          <div className="card-grid">
            {nbaNews.map((item) => (
              <article key={item.id} className="card">
                {item.image ? (
                  <a href={item.permalink} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 10 }}
                    />
                  </a>
                ) : null}
                <div className="card-meta" style={{ marginTop: 12 }}>
                  {item.date ? <span>{item.date.slice(0, 10)}</span> : null}
                  {item.category ? <span className="badge tag">{item.category}</span> : null}
                </div>
                <h3 style={{ margin: "10px 0 8px" }}>
                  <a
                    href={item.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit" }}
                  >
                    {item.title}
                  </a>
                </h3>
                {item.excerpt ? <p style={{ color: "var(--text-soft)", fontSize: 14 }}>{item.excerpt}</p> : null}
                <p style={{ marginTop: 12 }}>
                  <a
                    className="link-more"
                    href={item.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dict.timeline.nbaReadMore} →
                  </a>
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2>{dict.timeline.localTitle}</h2>
            <p>{dict.timeline.subtitle}</p>
          </div>
        </div>

        <form className="panel" method="get" style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div className="field" style={{ marginBottom: 0, minWidth: 180 }}>
              <label htmlFor="season">{dict.timeline.bySeason}</label>
              <select id="season" name="season" defaultValue={season}>
                <option value="">{dict.timeline.allSeasons}</option>
                {seasons.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="field" style={{ marginBottom: 0, minWidth: 180 }}>
              <label htmlFor="month">{dict.timeline.byMonth}</label>
              <select id="month" name="month" defaultValue={month}>
                <option value="">{dict.timeline.allMonths}</option>
                {months.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn small" type="submit">
              {dict.list.filters}
            </button>
            <Link className="btn small ghost" href={`/${resolved}/timeline`}>
              {dict.list.reset}
            </Link>
          </div>
        </form>

        {list.length === 0 ? (
          <div className="empty">{dict.list.empty}</div>
        ) : (
          <div className="timeline">
            {list.map((event) => (
              <div key={event.id} className="timeline-item">
                <div className="meta-row">
                  <span>{event.date}</span>
                  <span className="badge tag">{event.season}</span>
                  <span className={`badge ${event.category}`}>{dict.category[event.category]}</span>
                </div>
                <h3>{pick(event.title, resolved)}</h3>
                <p>{pick(event.description, resolved)}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

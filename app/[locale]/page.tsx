import Link from "next/link";
import { MemeCard, PlayerCard, StoryCard, TeamCard } from "@/components/Cards";
import { memes, players, siteStats, stories, teams, timeline, trivia } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";
import { fetchNbaLatestNews } from "@/lib/nba-news";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/types";
import { formatNumber, pick } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return buildMetadata({
    locale: resolved,
    title: `${dict.siteName} · ${dict.siteTagline}`,
    description: dict.home.heroSubtitle,
    path: "",
    keywords: ["NBA", "NBA memes", "NBA 梗", "NBA 趣事", "basketball trivia"],
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);

  const featuredMemes = [...memes].sort((a, b) => b.views - a.views).slice(0, 4);
  const latestStories = [...stories].sort((a, b) => b.year - a.year || b.views - a.views).slice(0, 6);
  const featuredPlayers = players.slice(0, 4);
  const featuredTeams = teams.slice(0, 4);
  const recentTimeline = timeline.slice(-4).reverse();
  const dailyTrivia = trivia[0];
  const nbaNews = await fetchNbaLatestNews(20);

  return (
    <>
      <section className="container hero">
        <div>
          <h1>{dict.home.heroTitle}</h1>
          <p>{dict.home.heroSubtitle}</p>
          <div className="hero-actions">
            <Link className="btn" href={`/${resolved}/memes`}>
              {dict.home.heroCta}
            </Link>
            <Link className="btn ghost" href={`/${resolved}/submit`}>
              {dict.home.heroSecondary}
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <h3>{dict.home.statsTitle}</h3>
          <div className="stat-grid">
            <div>
              <div className="stat-value">{siteStats.memes}</div>
              <div className="stat-label">{dict.nav.memes}</div>
            </div>
            <div>
              <div className="stat-value">{siteStats.stories}</div>
              <div className="stat-label">{dict.nav.stories}</div>
            </div>
            <div>
              <div className="stat-value">{siteStats.players}</div>
              <div className="stat-label">{dict.nav.players}</div>
            </div>
            <div>
              <div className="stat-value">{formatNumber(siteStats.views)}</div>
              <div className="stat-label">{dict.meme.views}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <h2>{dict.home.featuredTitle}</h2>
            <p>{dict.categoryIntro.iconic}</p>
          </div>
          <Link className="link-more" href={`/${resolved}/memes`}>
            {dict.home.featuredMore} →
          </Link>
        </div>
        <div className="card-grid">
          {featuredMemes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} locale={resolved} dict={dict} />
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <h2>{dict.home.storiesTitle}</h2>
            <p>{dict.categoryIntro.funny}</p>
          </div>
          <Link className="link-more" href={`/${resolved}/stories`}>
            {dict.home.featuredMore} →
          </Link>
        </div>
        <div className="card-grid">
          {latestStories.map((story) => (
            <StoryCard key={story.id} story={story} locale={resolved} dict={dict} />
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <h2>{dict.home.playersTitle}</h2>
            <p>{dict.categoryIntro.warm}</p>
          </div>
          <Link className="link-more" href={`/${resolved}/players`}>
            {dict.home.playersMore} →
          </Link>
        </div>
        <div className="entity-grid">
          {featuredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} locale={resolved} />
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <h2>{dict.home.teamsTitle}</h2>
            <p>{dict.categoryIntro.controversy}</p>
          </div>
          <Link className="link-more" href={`/${resolved}/teams`}>
            {dict.home.teamsMore} →
          </Link>
        </div>
        <div className="entity-grid">
          {featuredTeams.map((team) => (
            <TeamCard key={team.id} team={team} locale={resolved} dict={dict} />
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <h2>{dict.home.timelineTitle}</h2>
            <p>{dict.timeline.subtitle}</p>
          </div>
          <Link className="link-more" href={`/${resolved}/timeline`}>
            {dict.home.timelineMore} →
          </Link>
        </div>
        <div className="timeline">
          {recentTimeline.map((event) => (
            <div key={event.id} className="timeline-item">
              <div className="meta-row">
                <span>{event.date}</span>
                <span className="badge tag">{event.season}</span>
              </div>
              <h3>{pick(event.title, resolved)}</h3>
              <p>{pick(event.description, resolved)}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 26 }}>
          <h3>{dict.timeline.nbaLatestTitle}</h3>
          <p style={{ color: "var(--text-soft)", fontSize: 14 }}>{dict.timeline.nbaLatestSubtitle}</p>
          {nbaNews.length === 0 ? (
            <div className="empty">{dict.timeline.nbaLatestEmpty}</div>
          ) : (
            <div className="card-grid" style={{ marginTop: 14 }}>
              {nbaNews.map((item) => (
                <article key={item.id} className="card">
                  {item.image ? (
                    <a href={item.permalink} target="_blank" rel="noopener noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10 }}
                      />
                    </a>
                  ) : null}
                  <div className="card-meta" style={{ marginTop: 12 }}>
                    {item.date ? <span>{item.date.slice(0, 10)}</span> : null}
                    {item.category ? <span className="badge tag">{item.category}</span> : null}
                  </div>
                  <h3 style={{ margin: "10px 0 8px", fontSize: 17 }}>
                    <a
                      href={item.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit" }}
                    >
                      {item.title}
                    </a>
                  </h3>
                  {item.excerpt ? (
                    <p style={{ color: "var(--text-soft)", fontSize: 14 }}>{item.excerpt}</p>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container section">
        <div className="layout-with-aside">
          <div className="panel">
            <h3>{dict.home.triviaTitle}</h3>
            <p style={{ marginTop: 0 }}>{pick(dailyTrivia.question, resolved)}</p>
            <Link className="btn small" href={`/${resolved}/trivia`}>
              {dict.common.readMore}
            </Link>
          </div>
          <div className="panel">
            <h3>{dict.home.submitTitle}</h3>
            <p style={{ color: "var(--text-soft)", marginTop: 0 }}>{dict.home.submitSubtitle}</p>
            <Link className="btn small" href={`/${resolved}/submit`}>
              {dict.home.submitCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
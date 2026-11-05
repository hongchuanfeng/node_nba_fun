import Link from "next/link";
import { notFound } from "next/navigation";
import { MemeCard, StoryCard } from "@/components/Cards";
import { memes, players, stories, teams, timeline } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale, locales, type Locale } from "@/lib/types";
import { pick } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) => teams.map((team) => ({ locale, id: team.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const team = teams.find((item) => item.id === id);
  if (!team) return {};
  return buildMetadata({
    locale: resolved,
    title: pick(team.name, resolved),
    description: pick(team.bio, resolved),
    path: `/teams/${id}`,
    keywords: [team.shortName, "NBA", pick(team.name, resolved)],
  });
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  const team = teams.find((item) => item.id === id);
  if (!team) notFound();

  const teamPlayers = players.filter((player) => player.teamIds.includes(team.id));
  const teamMemes = memes.filter((meme) => meme.teamIds.includes(team.id));
  const teamStories = stories.filter((story) => story.teamIds.includes(team.id));
  const teamTimeline = timeline.filter((event) =>
    event.relatedIds.some((related) =>
      [...teamMemes, ...teamStories].some((item) => item.id === related),
    ),
  );

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href={`/${resolved}`}>{dict.nav.home}</Link> /{" "}
        <Link href={`/${resolved}/teams`}>{dict.nav.teams}</Link> / {pick(team.name, resolved)}
      </div>
      <article className="article">
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span
            className="avatar"
            style={{ background: team.accent, width: 72, height: 72, fontSize: 24 }}
          >
            {team.shortName.slice(0, 2)}
          </span>
          <div>
            <h1 style={{ margin: 0 }}>{pick(team.name, resolved)}</h1>
            <p className="lead" style={{ margin: "6px 0 0" }}>
              {pick(team.bio, resolved)}
            </p>
          </div>
        </div>

        {team.motto && (
          <p style={{ color: "var(--accent)", fontWeight: 700, marginTop: 12 }}>
            “{pick(team.motto, resolved)}”
          </p>
        )}

        <div className="definition" style={{ marginTop: 22 }}>
          <div className="panel">
            <h3>{dict.team.city}</h3>
            <p>{pick(team.city, resolved)}</p>
          </div>
          <div className="panel">
            <h3>{dict.team.arena}</h3>
            <p>{pick(team.arena, resolved)}</p>
          </div>
          <div className="panel">
            <h3>{dict.team.founded}</h3>
            <p>{team.founded}</p>
          </div>
          <div className="panel">
            <h3>{dict.team.conference}</h3>
            <p>
              {dict.conference[team.conference]}
              <br />
              <span style={{ color: "var(--text-soft)" }}>{dict.division[team.division]}</span>
            </p>
          </div>
          <div className="panel">
            <h3>{dict.team.championships}</h3>
            <p style={{ fontSize: 22, fontWeight: 800, color: "var(--accent)" }}>
              {team.championships}
            </p>
          </div>
          <div className="panel">
            <h3>{dict.team.colors}</h3>
            <p style={{ display: "flex", gap: 8 }}>
              {team.colors.map((color) => (
                <span
                  key={color}
                  style={{
                    display: "inline-block",
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: color,
                    border: "1px solid var(--border)",
                  }}
                />
              ))}
            </p>
          </div>
        </div>

        <h3>{dict.team.titleYears}</h3>
        {team.titleYears.length === 0 ? (
          <p style={{ color: "var(--text-soft)" }}>{dict.team.noTitles}</p>
        ) : (
          <div className="chips" style={{ marginBottom: 26 }}>
            {team.titleYears.map((year) => (
              <span key={year} className="badge iconic">
                {year}
              </span>
            ))}
          </div>
        )}

        <h3>{dict.team.highlights}</h3>
        <div className="chips" style={{ marginBottom: 26 }}>
          {team.highlights.map((highlight) => (
            <span key={highlight.zh} className="chip">
              {pick(highlight, resolved)}
            </span>
          ))}
        </div>

        <h3>{dict.team.notablePlayers}</h3>
        <div className="chips" style={{ marginBottom: 26 }}>
          {team.notablePlayers.map((player) => (
            <span key={player.zh} className="chip">
              {pick(player, resolved)}
            </span>
          ))}
        </div>

        <h3>{dict.team.members}</h3>
        {teamPlayers.length === 0 ? (
          <div className="empty">{dict.team.empty}</div>
        ) : (
          <div className="chips" style={{ marginBottom: 26 }}>
            {teamPlayers.map((player) => (
              <Link key={player.id} className="chip" href={`/${resolved}/players/${player.id}`}>
                {pick(player.name, resolved)}
              </Link>
            ))}
          </div>
        )}

        <h3>{dict.team.timeline}</h3>
        {teamTimeline.length === 0 ? (
          <div className="empty">{dict.team.empty}</div>
        ) : (
          <div className="timeline" style={{ marginBottom: 26 }}>
            {teamTimeline.map((event) => (
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
        )}

        <h3>{dict.team.stories}</h3>
        {teamStories.length === 0 ? (
          <div className="empty">{dict.team.empty}</div>
        ) : (
          <div className="card-grid" style={{ marginBottom: 26 }}>
            {teamStories.map((story) => (
              <StoryCard key={story.id} story={story} locale={resolved} dict={dict} />
            ))}
          </div>
        )}

        <h3>{dict.team.memes}</h3>
        {teamMemes.length === 0 ? (
          <div className="empty">{dict.team.empty}</div>
        ) : (
          <div className="card-grid">
            {teamMemes.map((meme) => (
              <MemeCard key={meme.id} meme={meme} locale={resolved} dict={dict} />
            ))}
          </div>
        )}

        <div style={{ marginTop: 26 }}>
          <Link className="btn small ghost" href={`/${resolved}/teams`}>
            {dict.team.back}
          </Link>
        </div>
      </article>
    </div>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { MemeCard, StoryCard } from "@/components/Cards";
import { memes, players, stories, teams, timeline } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale, locales, type Locale } from "@/lib/types";
import { pick } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) => players.map((player) => ({ locale, id: player.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const player = players.find((item) => item.id === id);
  if (!player) return {};
  return buildMetadata({
    locale: resolved,
    title: pick(player.name, resolved),
    description: pick(player.bio, resolved),
    path: `/players/${id}`,
    keywords: [player.shortName, "NBA"],
  });
}

export default async function PlayerDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  const player = players.find((item) => item.id === id);
  if (!player) notFound();

  const playerTeams = teams.filter((team) => player.teamIds.includes(team.id));
  const playerMemes = memes.filter((meme) => meme.playerIds.includes(player.id));
  const playerStories = stories.filter((story) => story.playerIds.includes(player.id));
  const playerTimeline = timeline.filter((event) =>
    event.relatedIds.some((related) =>
      [...playerMemes, ...playerStories].some((item) => item.id === related),
    ),
  );

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href={`/${resolved}`}>{dict.nav.home}</Link> /{" "}
        <Link href={`/${resolved}/players`}>{dict.nav.players}</Link> / {pick(player.name, resolved)}
      </div>
      <article className="article">
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span className="avatar" style={{ background: player.accent, width: 72, height: 72, fontSize: 24 }}>
            {player.shortName.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <h1 style={{ margin: 0 }}>{pick(player.name, resolved)}</h1>
            <p className="lead" style={{ margin: "6px 0 0" }}>
              {pick(player.bio, resolved)}
            </p>
          </div>
        </div>

        <div className="definition" style={{ marginTop: 22 }}>
          <div className="panel">
            <h3>{dict.player.team}</h3>
            <p>{playerTeams.map((team) => pick(team.name, resolved)).join(" / ") || "—"}</p>
          </div>
          <div className="panel">
            <h3>
              {dict.player.position} · {dict.player.number}
            </h3>
            <p>
              {player.position} · #{player.number}
            </p>
          </div>
          <div className="panel">
            <h3>{dict.player.country}</h3>
            <p>{pick(player.country, resolved)}</p>
          </div>
          <div className="panel">
            <h3>{dict.player.born}</h3>
            <p>{player.birthYear}</p>
          </div>
        </div>

        <h3>{dict.player.highlights}</h3>
        <div className="chips" style={{ marginBottom: 24 }}>
          {player.highlights.map((highlight) => (
            <span key={highlight.zh} className="chip">
              {pick(highlight, resolved)}
            </span>
          ))}
        </div>

        <h3>{dict.player.timeline}</h3>
        {playerTimeline.length === 0 ? (
          <div className="empty">{dict.player.empty}</div>
        ) : (
          <div className="timeline" style={{ marginBottom: 26 }}>
            {playerTimeline.map((event) => (
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

        <h3>{dict.player.stories}</h3>
        {playerStories.length === 0 ? (
          <div className="empty">{dict.player.empty}</div>
        ) : (
          <div className="card-grid" style={{ marginBottom: 26 }}>
            {playerStories.map((story) => (
              <StoryCard key={story.id} story={story} locale={resolved} dict={dict} />
            ))}
          </div>
        )}

        <h3>{dict.player.memes}</h3>
        {playerMemes.length === 0 ? (
          <div className="empty">{dict.player.empty}</div>
        ) : (
          <div className="card-grid">
            {playerMemes.map((meme) => (
              <MemeCard key={meme.id} meme={meme} locale={resolved} dict={dict} />
            ))}
          </div>
        )}

        <div style={{ marginTop: 26 }}>
          <Link className="btn small ghost" href={`/${resolved}/players`}>
            {dict.player.back}
          </Link>
        </div>
      </article>
    </div>
  );
}
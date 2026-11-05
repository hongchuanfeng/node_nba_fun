import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryBadge, MemeCard, StoryCard } from "@/components/Cards";
import { ShareCard } from "@/components/ShareCard";
import { memes, players, stories, teams, timeline } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";
import { getStoryBySlug } from "@/lib/search";
import { buildMetadata } from "@/lib/seo";
import { isLocale, locales, type Locale } from "@/lib/types";
import { formatNumber, pick } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) => stories.map((story) => ({ locale, slug: story.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const story = getStoryBySlug(slug);
  if (!story) return {};
  return buildMetadata({
    locale: resolved,
    title: pick(story.title, resolved),
    description: pick(story.excerpt, resolved),
    path: `/stories/${slug}`,
    keywords: story.tags,
    type: "article",
  });
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const relatedStories = stories
    .filter((item) => item.id !== story.id && item.playerIds.some((id) => story.playerIds.includes(id)))
    .slice(0, 3);
  const relatedMemes = memes
    .filter((item) => item.playerIds.some((id) => story.playerIds.includes(id)))
    .slice(0, 3);
  const relatedPlayers = players.filter((player) => story.playerIds.includes(player.id));
  const relatedTeams = teams.filter((team) => story.teamIds.includes(team.id));
  const events = timeline.filter((event) => event.relatedIds.includes(story.id));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nbafun.example.com";
  const url = `${siteUrl}/${resolved}/stories/${story.slug}`;

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href={`/${resolved}`}>{dict.nav.home}</Link> /{" "}
        <Link href={`/${resolved}/stories`}>{dict.nav.stories}</Link> / {pick(story.title, resolved)}
      </div>
      <article className="article">
        <CategoryBadge category={story.category} dict={dict} />
        <h1>{pick(story.title, resolved)}</h1>
        <p className="lead">{pick(story.excerpt, resolved)}</p>
        <div className="meta-row">
          <span>
            {dict.story.season} {story.season}
          </span>
          <span>
            {dict.story.date} {story.year}-{String(story.month).padStart(2, "0")}-
            {String(story.day).padStart(2, "0")}
          </span>
          <span>👁 {formatNumber(story.views)}</span>
          <span>❤ {formatNumber(story.likes)}</span>
        </div>

        <div className="article-body" style={{ marginTop: 24 }}>
          {story.body.map((paragraph, index) => (
            <p key={index}>{pick(paragraph, resolved)}</p>
          ))}
        </div>

        {story.source && (
          <div className="panel" style={{ marginTop: 8 }}>
            <h3>{dict.story.source}</h3>
            <a href={story.source.url} target="_blank" rel="noopener noreferrer nofollow">
              {pick(story.source.label, resolved)}
            </a>
          </div>
        )}

        {relatedPlayers.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h3>{dict.meme.relatedPlayers}</h3>
            <div className="chips">
              {relatedPlayers.map((player) => (
                <Link key={player.id} className="chip" href={`/${resolved}/players/${player.id}`}>
                  {pick(player.name, resolved)}
                </Link>
              ))}
              {relatedTeams.map((team) => (
                <Link key={team.id} className="chip" href={`/${resolved}/teams/${team.id}`}>
                  {pick(team.name, resolved)}
                </Link>
              ))}
            </div>
          </div>
        )}

        {events.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h3>{dict.story.timeline}</h3>
            <div className="timeline">
              {events.map((event) => (
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
          </div>
        )}

        <div style={{ marginTop: 28 }}>
          <h3>{dict.story.share}</h3>
          <ShareCard
            title={pick(story.title, resolved)}
            summary={pick(story.excerpt, resolved)}
            url={url}
            siteName={dict.siteName}
            dict={dict}
          />
        </div>

        {relatedStories.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <h3>{dict.story.related}</h3>
            <div className="card-grid">
              {relatedStories.map((item) => (
                <StoryCard key={item.id} story={item} locale={resolved} dict={dict} />
              ))}
            </div>
          </div>
        )}

        {relatedMemes.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <h3>{dict.nav.memes}</h3>
            <div className="card-grid">
              {relatedMemes.map((item) => (
                <MemeCard key={item.id} meme={item} locale={resolved} dict={dict} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
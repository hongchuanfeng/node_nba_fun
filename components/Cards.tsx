import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Category, Locale, Meme, Player, Story, Team } from "@/lib/types";
import { formatDate, formatNumber, pick } from "@/lib/utils";

export function CategoryBadge({
  category,
  dict,
}: {
  category: Category;
  dict: Dictionary;
}) {
  return <span className={`badge ${category}`}>{dict.category[category]}</span>;
}

export function MemeCard({
  meme,
  locale,
  dict,
}: {
  meme: Meme;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Link href={`/${locale}/memes/${meme.slug}`} className="card">
      <CategoryBadge category={meme.category} dict={dict} />
      <h3>{pick(meme.title, locale)}</h3>
      <p>{pick(meme.summary, locale)}</p>
      <div className="chips">
        {meme.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="badge tag">
            #{tag}
          </span>
        ))}
      </div>
      <div className="card-meta">
        <span>👁 {formatNumber(meme.views)}</span>
        <span>❤ {formatNumber(meme.likes)}</span>
        <span>{formatDate(meme.updatedAt, locale)}</span>
      </div>
    </Link>
  );
}

export function StoryCard({
  story,
  locale,
  dict,
}: {
  story: Story;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Link href={`/${locale}/stories/${story.slug}`} className="card">
      <CategoryBadge category={story.category} dict={dict} />
      <h3>{pick(story.title, locale)}</h3>
      <p>{pick(story.excerpt, locale)}</p>
      <div className="chips">
        {story.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="badge tag">
            #{tag}
          </span>
        ))}
      </div>
      <div className="card-meta">
        <span>
          {dict.story.season} {story.season}
        </span>
        <span>
          {story.year}-{String(story.month).padStart(2, "0")}-{String(story.day).padStart(2, "0")}
        </span>
        <span>👁 {formatNumber(story.views)}</span>
      </div>
    </Link>
  );
}

export function PlayerCard({
  player,
  locale,
}: {
  player: Player;
  locale: Locale;
}) {
  return (
    <Link href={`/${locale}/players/${player.id}`} className="entity-card">
      <span className="avatar" style={{ background: player.accent }}>
        {player.shortName.slice(0, 2).toUpperCase()}
      </span>
      <span>
        <h3>{pick(player.name, locale)}</h3>
        <p>
          {player.position} · #{player.number} · {player.birthYear}
        </p>
      </span>
    </Link>
  );
}

export function TeamCard({
  team,
  locale,
  dict,
}: {
  team: Team;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Link href={`/${locale}/teams/${team.id}`} className="entity-card" style={{ alignItems: "flex-start" }}>
      <span className="avatar" style={{ background: team.accent }}>
        {team.shortName.slice(0, 2)}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <h3>{pick(team.name, locale)}</h3>
        <p>
          {pick(team.city, locale)} · {dict.team.founded} {team.founded}
        </p>
        <p>
          {dict.conference[team.conference]} · {dict.division[team.division]}
        </p>
        <p>
          {dict.team.championships} {team.championships}
          {team.championships > 0 && (
            <span style={{ color: "var(--text-soft)" }}> · {team.titleYears.join(" / ")}</span>
          )}
        </p>
        <span className="team-stripe">
          <span style={{ background: team.colors[0] }} />
          <span style={{ background: team.colors[1] }} />
        </span>
      </span>
    </Link>
  );
}

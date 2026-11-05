import { memes, players, stories, teams, trivia, timeline } from "./data";
import type { Category, ContentType, Locale, Meme, SearchFilters, Story, Trivia } from "./types";
import { pick } from "./utils";

export interface SearchResult {
  type: ContentType;
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  tags: string[];
  views: number;
  likes: number;
  date: string;
  year: number;
  playerNames: string[];
  teamNames: string[];
}

function matchesQuery(text: string, query: string): boolean {
  if (!query) return true;
  return text.toLowerCase().includes(query.toLowerCase());
}

export function searchContent(filters: SearchFilters, locale: Locale): SearchResult[] {
  const query = (filters.query ?? "").trim();
  const results: SearchResult[] = [];

  if (filters.type !== "story") {
    for (const meme of memes) {
      const haystack = [
        pick(meme.title, locale),
        pick(meme.summary, locale),
        pick(meme.quote, locale),
        meme.tags.join(" "),
        ...meme.playerIds.map((id) => players.find((p) => p.id === id)?.shortName ?? ""),
      ].join(" ");
      const ok =
        matchesQuery(haystack, query) &&
        (!filters.playerId || meme.playerIds.includes(filters.playerId)) &&
        (!filters.teamId || meme.teamIds.includes(filters.teamId)) &&
        (!filters.tag || meme.tags.includes(filters.tag)) &&
        (!filters.category || meme.category === filters.category) &&
        (!filters.year || new Date(meme.updatedAt).getFullYear() === filters.year);
      if (!ok) continue;
      results.push({
        type: "meme",
        id: meme.id,
        slug: meme.slug,
        title: pick(meme.title, locale),
        excerpt: pick(meme.summary, locale),
        category: meme.category,
        tags: meme.tags,
        views: meme.views,
        likes: meme.likes,
        date: meme.updatedAt,
        year: new Date(meme.updatedAt).getFullYear(),
        playerNames: meme.playerIds.map((id) => players.find((p) => p.id === id)?.shortName ?? ""),
        teamNames: meme.teamIds.map((id) => teams.find((t) => t.id === id)?.shortName ?? ""),
      });
    }
  }

  if (filters.type !== "meme") {
    for (const story of stories) {
      const haystack = [
        pick(story.title, locale),
        pick(story.excerpt, locale),
        story.body.map((b) => pick(b, locale)).join(" "),
        story.tags.join(" "),
        ...story.playerIds.map((id) => players.find((p) => p.id === id)?.shortName ?? ""),
      ].join(" ");
      const ok =
        matchesQuery(haystack, query) &&
        (!filters.playerId || story.playerIds.includes(filters.playerId)) &&
        (!filters.teamId || story.teamIds.includes(filters.teamId)) &&
        (!filters.tag || story.tags.includes(filters.tag)) &&
        (!filters.category || story.category === filters.category) &&
        (!filters.year || story.year === filters.year);
      if (!ok) continue;
      results.push({
        type: "story",
        id: story.id,
        slug: story.slug,
        title: pick(story.title, locale),
        excerpt: pick(story.excerpt, locale),
        category: story.category,
        tags: story.tags,
        views: story.views,
        likes: story.likes,
        date: `${story.year}-${String(story.month).padStart(2, "0")}-${String(story.day).padStart(2, "0")}`,
        year: story.year,
        playerNames: story.playerIds.map((id) => players.find((p) => p.id === id)?.shortName ?? ""),
        teamNames: story.teamIds.map((id) => teams.find((t) => t.id === id)?.shortName ?? ""),
      });
    }
  }

  if (filters.type === "trivia") {
    for (const item of trivia) {
      const haystack = [pick(item.question, locale), ...item.options.map((o) => pick(o, locale))].join(" ");
      if (!matchesQuery(haystack, query)) continue;
      results.push({
        type: "trivia",
        id: item.id,
        slug: item.id,
        title: pick(item.question, locale),
        excerpt: pick(item.explanation, locale),
        category: "iconic",
        tags: ["trivia"],
        views: 0,
        likes: 0,
        date: "",
        year: 0,
        playerNames: [],
        teamNames: [],
      });
    }
  }

  if (filters.type === "timeline") {
    for (const event of timeline) {
      const haystack = [pick(event.title, locale), pick(event.description, locale), event.season].join(" ");
      if (!matchesQuery(haystack, query)) continue;
      results.push({
        type: "timeline",
        id: event.id,
        slug: event.id,
        title: pick(event.title, locale),
        excerpt: pick(event.description, locale),
        category: event.category,
        tags: [event.season],
        views: 0,
        likes: 0,
        date: event.date,
        year: new Date(event.date).getFullYear(),
        playerNames: [],
        teamNames: [],
      });
    }
  }

  return results;
}

export function getMemeBySlug(slug: string): Meme | undefined {
  return memes.find((m) => m.slug === slug);
}

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getTriviaById(id: string): Trivia | undefined {
  return trivia.find((t) => t.id === id);
}

export function allTags(): string[] {
  const tags = new Set<string>();
  for (const meme of memes) meme.tags.forEach((t) => tags.add(t));
  for (const story of stories) story.tags.forEach((t) => tags.add(t));
  return Array.from(tags).sort();
}

export function allYears(): number[] {
  const years = new Set<number>();
  for (const story of stories) years.add(story.year);
  for (const meme of memes) years.add(new Date(meme.updatedAt).getFullYear());
  return Array.from(years).sort((a, b) => b - a);
}

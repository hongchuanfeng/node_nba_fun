import { StoryCard } from "@/components/Cards";
import { ContentFilters } from "@/components/Filters";
import { stories } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";
import { allTags, allYears } from "@/lib/search";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return buildMetadata({
    locale: resolved,
    title: dict.nav.stories,
    description:
      resolved === "zh"
        ? "NBA 趣事与名场面频道：段子花絮、赛后发布会名梗、赛场神操作、失误集锦与庆祝动作。"
        : "Stories and iconic moments: bloopers, press conference classics, on-court magic and celebrations.",
    path: "/stories",
    keywords: ["NBA 趣事", "NBA 名场面", "NBA bloopers"],
  });
}

export default async function StoriesPage({
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
  const sort = first("sort") ?? "latest";

  let list = [...stories];
  if (q) {
    const needle = q.toLowerCase();
    list = list.filter((story) =>
      [story.title.zh, story.title.en, story.excerpt.zh, story.excerpt.en, story.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }
  if (player) list = list.filter((story) => story.playerIds.includes(player));
  if (team) list = list.filter((story) => story.teamIds.includes(team));
  if (tag) list = list.filter((story) => story.tags.includes(tag));
  if (category) list = list.filter((story) => story.category === category);
  if (year) list = list.filter((story) => story.year === Number(year));

  if (sort === "popular") list.sort((a, b) => b.views - a.views);
  else if (sort === "oldest") list.sort((a, b) => a.year - b.year);
  else list.sort((a, b) => b.year - a.year || b.month - a.month);

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>{dict.nav.stories}</h1>
          <p>{dict.list.resultCount.replace("{count}", String(list.length))}</p>
        </div>
      </div>
      <div className="layout-with-aside">
        <ContentFilters
          locale={resolved}
          dict={dict}
          values={{ q, player, team, year, tag, category }}
          tags={allTags()}
          years={allYears()}
          action={`/${resolved}/stories`}
        />
        <div>
          {list.length === 0 ? (
            <div className="empty">{dict.list.empty}</div>
          ) : (
            <div className="card-grid">
              {list.map((story) => (
                <StoryCard key={story.id} story={story} locale={resolved} dict={dict} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
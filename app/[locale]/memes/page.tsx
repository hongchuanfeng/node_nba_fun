import { MemeCard } from "@/components/Cards";
import { ContentFilters } from "@/components/Filters";
import { memes } from "@/lib/data";
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
    title: dict.nav.memes,
    description:
      resolved === "zh"
        ? "NBA 梗百科：起源、经典名场面、代表语录与后续演化，全部收录并标注出处。"
        : "The NBA meme wiki: origins, iconic scenes, signature quotes and how each meme evolved.",
    path: "/memes",
    keywords: ["NBA 梗", "NBA meme", "meme wiki"],
  });
}

export default async function MemesPage({
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
  const sort = first("sort") ?? "popular";

  let list = [...memes];
  if (q) {
    const needle = q.toLowerCase();
    list = list.filter((meme) =>
      [meme.title.zh, meme.title.en, meme.summary.zh, meme.summary.en, meme.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }
  if (player) list = list.filter((meme) => meme.playerIds.includes(player));
  if (team) list = list.filter((meme) => meme.teamIds.includes(team));
  if (tag) list = list.filter((meme) => meme.tags.includes(tag));
  if (category) list = list.filter((meme) => meme.category === category);
  if (year) list = list.filter((meme) => new Date(meme.updatedAt).getFullYear() === Number(year));

  if (sort === "popular") list.sort((a, b) => b.views - a.views);
  else if (sort === "likes") list.sort((a, b) => b.likes - a.likes);
  else list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>{dict.nav.memes}</h1>
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
          action={`/${resolved}/memes`}
        />
        <div>
          {list.length === 0 ? (
            <div className="empty">{dict.list.empty}</div>
          ) : (
            <div className="card-grid">
              {list.map((meme) => (
                <MemeCard key={meme.id} meme={meme} locale={resolved} dict={dict} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
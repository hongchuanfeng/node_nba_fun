import Link from "next/link";
import { PlayerCard } from "@/components/Cards";
import { players, teams } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/types";
import { pick } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return buildMetadata({
    locale: resolved,
    title: dict.nav.players,
    description:
      resolved === "zh"
        ? "球员档案：聚合每位 NBA 球员的趣事、梗、名场面与专属时间线。"
        : "Player archives: every story, meme and moment tied to each player.",
    path: "/players",
    keywords: ["NBA 球员档案", "NBA players"],
  });
}

export default async function PlayersPage({
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

  const q = (first("q") ?? "").trim();
  const team = first("team") ?? "";

  const teamMap = new Map(teams.map((item) => [item.id, item]));
  const filtered = players.filter((player) => {
    if (team && !player.teamIds.includes(team)) return false;
    if (!q) return true;
    const haystack = [
      player.shortName,
      pick(player.name, resolved),
      player.name.zh,
      player.name.en,
      player.position,
      pick(player.country, resolved),
      ...player.teamIds.map((id) => {
        const item = teamMap.get(id);
        return item ? `${pick(item.name, resolved)} ${item.shortName}` : "";
      }),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q.toLowerCase());
  });

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>{dict.nav.players}</h1>
          <p>{dict.player.profile}</p>
        </div>
      </div>

      <form className="panel" method="get" action={`/${resolved}/players`}>
        <div className="field">
          <label htmlFor="q">{dict.list.keyword}</label>
          <input
            id="q"
            type="text"
            name="q"
            defaultValue={q}
            placeholder={resolved === "zh" ? "搜索球员、球队或位置…" : "Search players, teams or positions…"}
          />
        </div>
        <div className="field">
          <label htmlFor="team">{dict.list.team}</label>
          <select id="team" name="team" defaultValue={team}>
            <option value="">{dict.list.all}</option>
            {teams.map((item) => (
              <option key={item.id} value={item.id}>
                {pick(item.name, resolved)}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-actions">
          <button className="btn small" type="submit">
            {dict.list.filters}
          </button>
          <Link className="btn small ghost" href={`/${resolved}/players`}>
            {dict.list.reset}
          </Link>
        </div>
      </form>

      <p style={{ color: "var(--text-soft)", margin: "14px 0" }}>
        {dict.list.resultCount.replace("{count}", String(filtered.length))}
      </p>

      {filtered.length === 0 ? (
        <div className="empty">{dict.list.empty}</div>
      ) : (
        <div className="entity-grid">
          {filtered.map((player) => (
            <PlayerCard key={player.id} player={player} locale={resolved} />
          ))}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { TeamCard } from "@/components/Cards";
import { teams } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale, type Team } from "@/lib/types";

const divisionOrder = [
  "Atlantic",
  "Central",
  "Southeast",
  "Northwest",
  "Pacific",
  "Southwest",
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return buildMetadata({
    locale: resolved,
    title: dict.nav.teams,
    description:
      resolved === "zh"
        ? "30 支 NBA 球队完整档案：主场球馆、联盟分区、夺冠年份、代表球员与相关名场面。"
        : "Complete NBA team archives: arena, conference, title years, notable players and moments.",
    path: "/teams",
    keywords: ["NBA 球队", "NBA teams", "NBA 球队档案"],
  });
}

export default async function TeamsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);

  const groups = (["East", "West"] as const).map((conference) => ({
    conference,
    divisions: divisionOrder
      .map((division) => ({
        division,
        teams: teams.filter(
          (team) => team.conference === conference && team.division === division,
        ),
      }))
      .filter((group) => group.teams.length > 0),
  }));

  const totalTitles = teams.reduce((sum, team) => sum + team.championships, 0);

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>{dict.nav.teams}</h1>
          <p>
            {dict.team.profile} · {teams.length} {resolved === "zh" ? "支球队" : "teams"} ·{" "}
            {totalTitles} {resolved === "zh" ? "座总冠军奖杯" : "championship banners"}
          </p>
        </div>
      </div>

      {groups.map((group) => (
        <section key={group.conference} style={{ marginBottom: 40 }}>
          <div className="section-head">
            <div>
              <h2>{dict.conference[group.conference]}</h2>
              <p>
                {group.divisions.reduce((sum, division) => sum + division.teams.length, 0)}{" "}
                {resolved === "zh" ? "支球队" : "teams"}
              </p>
            </div>
          </div>
          {group.divisions.map((division) => (
            <div key={division.division} style={{ marginBottom: 26 }}>
              <h3 style={{ color: "var(--accent-2)", fontSize: 15, margin: "0 0 12px" }}>
                {dict.division[division.division]}
              </h3>
              <div className="entity-grid">
                {division.teams.map((team: Team) => (
                  <TeamCard key={team.id} team={team} locale={resolved} dict={dict} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}

      <div className="panel" style={{ marginTop: 8 }}>
        <h3>{dict.team.notablePlayers}</h3>
        <p style={{ color: "var(--text-soft)", marginTop: 0 }}>
          {resolved === "zh"
            ? "想看某位球员的专属档案？可以从上方球队进入，或直接访问球员页。"
            : "Looking for a player archive? Pick a franchise above or go straight to the player pages."}
        </p>
        <Link className="btn small" href={`/${resolved}/players`}>
          {dict.nav.players}
        </Link>
      </div>
    </div>
  );
}
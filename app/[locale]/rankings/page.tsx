import { VoteButton } from "@/components/VoteButton";
import { ballotOptions, memes } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";
import { ballotTally } from "@/lib/store";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/types";
import { formatNumber, pick } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return buildMetadata({
    locale: resolved,
    title: dict.nav.rankings,
    description: dict.rankings.title,
    path: "/rankings",
    keywords: ["NBA 榜单", "NBA rankings", "NBA 投票"],
  });
}

export default async function RankingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);

  const tally = ballotTally();
  const hotMemes = [...memes].sort((a, b) => b.views - a.views).slice(0, 8);
  const funniest = [...memes].sort((a, b) => b.likes - a.likes).slice(0, 8);

  const maxVotes = Math.max(
    1,
    ...ballotOptions.flatMap((ballot) => ballot.items.map((item) => tally[item.id] ?? 0)),
  );

  return (
    <div className="container section">
      <div className="section-head">
        <div>
          <h1>{dict.rankings.title}</h1>
          <p>{dict.rankings.byPeriod}</p>
        </div>
      </div>

      <section style={{ marginBottom: 36 }}>
        <h2>{dict.rankings.hotMemes}</h2>
        <div className="rank-list">
          {hotMemes.map((meme, index) => (
            <div key={meme.id} className="rank-row">
              <span className="rank-no">{index + 1}</span>
              <div className="rank-body">
                <h3>{pick(meme.title, resolved)}</h3>
                <p>{pick(meme.summary, resolved)}</p>
                <div className="bar">
                  <span style={{ width: `${Math.round((meme.views / hotMemes[0].views) * 100)}%` }} />
                </div>
              </div>
              <span style={{ color: "var(--text-soft)", fontSize: 13 }}>
                {dict.meme.views} {formatNumber(meme.views)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 36 }}>
        <h2>{dict.rankings.funniestScenes}</h2>
        <div className="rank-list">
          {funniest.map((meme, index) => (
            <div key={meme.id} className="rank-row">
              <span className="rank-no">{index + 1}</span>
              <div className="rank-body">
                <h3>{pick(meme.title, resolved)}</h3>
                <p>{pick(meme.quote, resolved)}</p>
                <div className="bar">
                  <span style={{ width: `${Math.round((meme.likes / funniest[0].likes) * 100)}%` }} />
                </div>
              </div>
              <span style={{ color: "var(--text-soft)", fontSize: 13 }}>
                {dict.meme.likes} {formatNumber(meme.likes)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>{dict.rankings.ballot}</h2>
        {ballotOptions.map((ballot) => (
          <div key={ballot.id} style={{ marginBottom: 28 }}>
            <h3>{pick(ballot.title, resolved)}</h3>
            <div className="rank-list">
              {ballot.items
                .map((item) => ({ ...item, votes: tally[item.id] ?? 0 }))
                .sort((a, b) => b.votes - a.votes)
                .map((item, index) => (
                  <div key={item.id} className="rank-row">
                    <span className="rank-no">{index + 1}</span>
                    <div className="rank-body">
                      <h3>{pick(item.label, resolved)}</h3>
                      <div className="bar">
                        <span style={{ width: `${Math.round((item.votes / maxVotes) * 100)}%` }} />
                      </div>
                    </div>
                    <VoteButton
                      targetId={item.id}
                      targetType="meme"
                      label={`${dict.rankings.votes} ${item.votes}`}
                      dict={dict}
                      initialVotes={item.votes}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryBadge, MemeCard } from "@/components/Cards";
import { ShareCard } from "@/components/ShareCard";
import { memes, players, teams } from "@/lib/data";
import { getDictionary } from "@/lib/dictionaries";
import { getMemeBySlug } from "@/lib/search";
import { buildMetadata } from "@/lib/seo";
import { isLocale, locales, type Locale } from "@/lib/types";
import { formatDate, formatNumber, pick } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) => memes.map((meme) => ({ locale, slug: meme.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const meme = getMemeBySlug(slug);
  if (!meme) return {};
  const title = pick(meme.title, resolved);
  return buildMetadata({
    locale: resolved,
    title,
    description: pick(meme.summary, resolved),
    path: `/memes/${slug}`,
    keywords: meme.tags,
    type: "article",
  });
}

export default async function MemeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  const meme = getMemeBySlug(slug);
  if (!meme) notFound();

  const relatedMemes = meme.relatedMemeIds
    .map((id) => memes.find((m) => m.id === id))
    .filter((m): m is (typeof memes)[number] => Boolean(m));
  const relatedPlayers = meme.playerIds
    .map((id) => players.find((p) => p.id === id))
    .filter((p): p is (typeof players)[number] => Boolean(p));
  const relatedTeams = meme.teamIds
    .map((id) => teams.find((t) => t.id === id))
    .filter((t): t is (typeof teams)[number] => Boolean(t));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nbafun.example.com";
  const url = `${siteUrl}/${resolved}/memes/${meme.slug}`;

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href={`/${resolved}`}>{dict.nav.home}</Link> /{" "}
        <Link href={`/${resolved}/memes`}>{dict.nav.memes}</Link> / {pick(meme.title, resolved)}
      </div>
      <article className="article">
        <CategoryBadge category={meme.category} dict={dict} />
        <h1>{pick(meme.title, resolved)}</h1>
        <p className="lead">{pick(meme.summary, resolved)}</p>
        <div className="meta-row">
          <span>👁 {formatNumber(meme.views)}</span>
          <span>❤ {formatNumber(meme.likes)}</span>
          <span>
            {dict.meme.updatedAt} {formatDate(meme.updatedAt, resolved)}
          </span>
        </div>

        <div className="quote-block">“{pick(meme.quote, resolved)}”</div>

        <div className="definition">
          <div className="panel">
            <h3>{dict.meme.origin}</h3>
            <p>{pick(meme.origin, resolved)}</p>
          </div>
          <div className="panel">
            <h3>{dict.meme.scene}</h3>
            <p>{pick(meme.scene, resolved)}</p>
          </div>
          <div className="panel">
            <h3>{dict.meme.evolution}</h3>
            <p>{pick(meme.evolution, resolved)}</p>
          </div>
          <div className="panel">
            <h3>{dict.meme.quote}</h3>
            <p>{pick(meme.quote, resolved)}</p>
          </div>
        </div>

        <div className="chips" style={{ marginBottom: 22 }}>
          {meme.tags.map((tag) => (
            <span key={tag} className="badge tag">
              #{tag}
            </span>
          ))}
        </div>

        {relatedPlayers.length > 0 && (
          <>
            <h3>{dict.meme.relatedPlayers}</h3>
            <div className="chips" style={{ marginBottom: 18 }}>
              {relatedPlayers.map((player) => (
                <Link key={player.id} className="chip" href={`/${resolved}/players/${player.id}`}>
                  {pick(player.name, resolved)}
                </Link>
              ))}
            </div>
          </>
        )}

        {relatedTeams.length > 0 && (
          <>
            <h3>{dict.meme.relatedTeams}</h3>
            <div className="chips" style={{ marginBottom: 18 }}>
              {relatedTeams.map((team) => (
                <Link key={team.id} className="chip" href={`/${resolved}/teams/${team.id}`}>
                  {pick(team.name, resolved)}
                </Link>
              ))}
            </div>
          </>
        )}

        <h3>{dict.meme.share}</h3>
        <p style={{ color: "var(--text-soft)" }}>{dict.meme.shareHint}</p>
        <ShareCard
          title={pick(meme.title, resolved)}
          summary={pick(meme.summary, resolved)}
          url={url}
          siteName={dict.siteName}
          dict={dict}
        />

        {relatedMemes.length > 0 && (
          <>
            <h3 style={{ marginTop: 32 }}>{dict.meme.related}</h3>
            <div className="card-grid">
              {relatedMemes.map((item) => (
                <MemeCard key={item.id} meme={item} locale={resolved} dict={dict} />
              ))}
            </div>
          </>
        )}
      </article>
    </div>
  );
}
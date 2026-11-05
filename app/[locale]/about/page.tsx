import { InfoPage, type InfoSection } from "@/components/InfoPage";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/types";

const sections: InfoSection[] = [
  {
    title: { zh: "我们做什么", en: "What we do" },
    body: {
      zh: [
        "本站是一个 NBA 趣事与名场面内容库，专注于梗百科、球员与球队档案、赛季时间线与多维检索。",
        "所有内容均标注来源出处，用于科普与娱乐，不搬运完整版权视频，不参与任何博彩或违规业务。",
      ],
      en: [
        "We are an archive of NBA stories and iconic moments: a meme wiki, player and team profiles, season timelines and multi-dimensional search.",
        "Every entry credits its source. The site is for education and entertainment, hosts no copyrighted footage, and is not affiliated with any gambling operation.",
      ],
    },
  },
  {
    title: { zh: "内容审核", en: "Editorial review" },
    body: {
      zh: [
        "用户投稿需经人工审核与敏感内容过滤后才会上线；涉及第三方素材的内容仅保留文字描述与链接。",
        "若权利人认为内容侵犯其著作权，可通过页脚邮箱联系我们，我们会在 7 个工作日内处理。",
      ],
      en: [
        "User submissions go through manual review and sensitive-content filtering before publication. Third-party footage is referenced by description and link only.",
        "Rights holders who believe an entry infringes their copyright can contact us via the footer email; we respond within seven working days.",
      ],
    },
  },
  {
    title: { zh: "联系我们", en: "Contact" },
    body: {
      zh: ["内容合作、投稿与广告洽谈：hello@nbafun.example。", "我们使用中文和英文双语沟通。"],
      en: [
        "Content partnership, submissions and advertising: hello@nbafun.example.",
        "We reply in both Chinese and English.",
      ],
    },
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return buildMetadata({
    locale: resolved,
    title: dict.footer.about,
    description:
      resolved === "zh"
        ? "关于 NBA 趣事站：定位、内容来源与审核机制。"
        : "About NBA Fun: what we do, sourcing and review policy.",
    path: "/about",
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return (
    <InfoPage
      locale={resolved}
      title={dict.footer.about}
      intro={
        resolved === "zh"
          ? "我们想把 NBA 的名场面、梗和逸闻，整理成一个可检索、可考证的档案。"
          : "We turn NBA moments, memes and lore into an archive you can search and verify."
      }
      sections={sections}
    />
  );
}
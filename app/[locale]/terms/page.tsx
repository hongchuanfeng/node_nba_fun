import { InfoPage, type InfoSection } from "@/components/InfoPage";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/types";

const sections: InfoSection[] = [
  {
    title: { zh: "使用说明", en: "House rules" },
    body: {
      zh: [
        "本站内容用于科普与娱乐，观点属于作者本人，不代表 NBA、球队或球员立场。",
        "禁止提交涉及仇恨、歧视、诽谤、色情、暴力或侵犯他人隐私的内容；一经发现将下架并封禁相关投稿。",
      ],
      en: [
        "Content is for education and entertainment; opinions belong to the authors and do not represent the NBA, any franchise or any player.",
        "Submissions involving hate, discrimination, defamation, explicit material, violence or privacy violations will be removed and the contributor blocked.",
      ],
    },
  },
  {
    title: { zh: "版权与转载", en: "Copyright and reposting" },
    body: {
      zh: [
        "所有条目均标注原始来源，我们只提供文字整理与链接跳转，不提供完整视频或音频。",
        "如需转载我们的整理内容，请注明来源链接；原始素材的版权归原作者与权利人所有。",
      ],
      en: [
        "Every entry links back to its original source. We provide written summaries and links, never full video or audio files.",
        "Reposting our write-ups is fine with attribution; the underlying material remains the property of its original owners.",
      ],
    },
  },
  {
    title: { zh: "免责声明", en: "Disclaimer" },
    body: {
      zh: [
        "本站与 NBA 及其下属球队没有从属或赞助关系。",
        "对内容的准确性我们尽力而为，但历史事件仍以官方记录为准。",
      ],
      en: [
        "This site is not affiliated with, endorsed by, or sponsored by the NBA or any of its teams.",
        "We do our best on accuracy, but official records remain the source of truth for historical events.",
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
    title: dict.footer.terms,
    description:
      resolved === "zh"
        ? "使用条款：内容规范、版权与免责声明。"
        : "Terms of use: content rules, copyright and disclaimer.",
    path: "/terms",
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return (
    <InfoPage
      locale={resolved}
      title={dict.footer.terms}
      intro={
        resolved === "zh"
          ? "使用本站即表示你同意以下条款。"
          : "By using this site you agree to the terms below."
      }
      sections={sections}
    />
  );
}
import { InfoPage, type InfoSection } from "@/components/InfoPage";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/types";

const sections: InfoSection[] = [
  {
    title: { zh: "我们收集什么", en: "What we collect" },
    body: {
      zh: [
        "当你使用投稿表单时，我们会收集你填写的标题、内容描述、来源链接以及可选的联系方式。",
        "投票与互动功能会使用本地存储记录你的选择，用于统计榜单，不会用于广告画像。",
      ],
      en: [
        "When you use the submission form we collect the title, description, source link and an optional contact you provide.",
        "Votes and lightweight interactions are stored locally to compute rankings; they are never used for advertising profiles.",
      ],
    },
  },
  {
    title: { zh: "Cookie 与分析", en: "Cookies and analytics" },
    body: {
      zh: [
        "在欧盟及其他要求同意的地区，加载非必要 Cookie 之前会展示同意提示，你可以随时在页脚修改选择。",
        "我们使用匿名化统计了解页面访问量与热门内容，不采集精确位置信息。",
      ],
      en: [
        "In the EU and other consent-required regions, a consent prompt appears before non-essential cookies are loaded; you can change your choice from the footer at any time.",
        "We use anonymised analytics to understand page views and popular entries, and do not collect precise location data.",
      ],
    },
  },
  {
    title: { zh: "你的权利", en: "Your rights" },
    body: {
      zh: [
        "依据 GDPR、CCPA 与《个人信息保护法》，你可以请求访问、更正或删除自己的数据，也可以撤回同意。",
        "请求请发送至 hello@nbafun.example，我们将在 30 天内响应。",
      ],
      en: [
        "Under the GDPR, the CCPA and China's Personal Information Protection Law, you may request access to, correction of, or deletion of your data, and may withdraw consent at any time.",
        "Send requests to hello@nbafun.example; we respond within 30 days.",
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
    title: dict.footer.privacy,
    description:
      resolved === "zh"
        ? "隐私政策：数据收集范围、Cookie 使用与 GDPR/CCPA 权利说明。"
        : "Privacy policy: what we collect, cookies, and GDPR/CCPA rights.",
    path: "/privacy",
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) ? locale : "zh";
  const dict = getDictionary(resolved);
  return (
    <InfoPage
      locale={resolved}
      title={dict.footer.privacy}
      intro={
        resolved === "zh"
          ? "我们尽量少收集数据，并明确说明用途。"
          : "We collect as little as possible and state exactly why."
      }
      sections={sections}
    />
  );
}
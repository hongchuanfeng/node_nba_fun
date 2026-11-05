import { AnalyticsClientLoader } from "@/components/AnalyticsClientLoader";
import { AnalyticsInit, AnalyticsScripts } from "@/components/AnalyticsScripts";

export const metadata = {
  title: "404: This page could not be found.",
  robots: { index: false, follow: false },
};

/**
 * 根级 404 页面。
 *
 * 命中场景：不在 [locale] 路由下、又没有被中间件改写的路径，
 * 例如不存在的静态文件（/foo.png）。这类请求由 Next.js 的根布局兜底渲染，
 * 因此这里只输出 body 内的内容，统计脚本同样要带上，
 * 保证任何 404 响应也能记录到 GA4 / AdSense。
 */
export default function RootNotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        background: "#0d1117",
        color: "#e8eef7",
        fontFamily: "system-ui, -apple-system, 'Segoe UI', 'Microsoft YaHei', sans-serif",
        textAlign: "center",
        padding: 24,
      }}
    >
      <AnalyticsInit />
      <AnalyticsScripts />
      <AnalyticsClientLoader />
      <h1 style={{ margin: 0, fontSize: 40 }}>404</h1>
      <p style={{ margin: 0, color: "#9fb0c3" }}>
        页面不存在 / This page could not be found.
      </p>
      <a
        href="/zh"
        style={{
          background: "#f97316",
          color: "#0d1117",
          borderRadius: 999,
          padding: "10px 22px",
          fontSize: 15,
          textDecoration: "none",
        }}
      >
        返回首页 / Back home
      </a>
    </main>
  );
}

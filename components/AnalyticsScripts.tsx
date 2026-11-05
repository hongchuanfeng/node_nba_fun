import { ADS_SRC, GA_INIT, GA_SRC } from "@/lib/analytics";

/**
 * GA4 初始化代码（内联），放在 <head> 中。
 */
export function AnalyticsInit() {
  return <script dangerouslySetInnerHTML={{ __html: GA_INIT }} />;
}

/**
 * GA4 与 AdSense 的外部脚本。
 *
 * 放在布局的 <body> 中：React 19 会把带 async 的 <script src> 自动提升到 <head>，
 * 从而保证服务端渲染出的 HTML 里就包含真实的脚本标签（而不是仅 preload 链接）。
 */
export function AnalyticsScripts() {
  return (
    <>
      <script async src={GA_SRC} />
      <script async src={ADS_SRC} crossOrigin="anonymous" />
    </>
  );
}

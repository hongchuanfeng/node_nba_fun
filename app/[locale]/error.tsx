"use client";

import { useEffect } from "react";
import { AnalyticsClientLoader } from "@/components/AnalyticsClientLoader";

/**
 * [locale] 段内的错误边界。
 *
 * 页面抛错时由它兜底，渲染在 [locale]/layout.tsx 内部，
 * 因此布局 <head> 里的 GA4 初始化与 <body> 里的 AdSense 脚本依然会输出，
 * 500 响应同样能被统计到。
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container">
      <AnalyticsClientLoader />
      <article
        className="article"
        style={{ textAlign: "center", padding: "48px 0" }}
      >
        <h1>500</h1>
        <p className="lead">
          页面出错了，刷新一下再试试。
          <br />
          Something went wrong, please try again.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn small" type="button" onClick={() => reset()}>
            重新加载 / Retry
          </button>
          <a className="btn small ghost" href="/zh">
            返回首页 / Back home
          </a>
        </div>
      </article>
    </div>
  );
}

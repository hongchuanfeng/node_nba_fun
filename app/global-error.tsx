"use client";

import { useEffect } from "react";
import { AnalyticsClientLoader } from "@/components/AnalyticsClientLoader";

/**
 * 全局错误兜底页（Next.js 在根布局渲染失败时使用）。
 *
 * 这个页面会替换掉根布局，因此 <head> / <body> 都由本组件自己输出，
 * 同时用客户端补加载 GA4 与 AdSense 脚本，
 * 保证 500 响应同样能被统计到。
 */
export default function GlobalError({
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
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <title>500: 页面出错了</title>
      </head>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "#0d1117",
          color: "#e8eef7",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', 'Microsoft YaHei', sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <AnalyticsClientLoader />
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <h1 style={{ margin: 0, fontSize: 32 }}>500</h1>
          <p style={{ margin: 0, color: "#9fb0c3" }}>
            页面出错了，刷新一下再试试。 / Something went wrong, please try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#f97316",
              color: "#0d1117",
              border: 0,
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            重新加载 / Retry
          </button>
        </main>
      </body>
    </html>
  );
}

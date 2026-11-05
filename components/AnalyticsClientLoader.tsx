"use client";

import { useEffect } from "react";
import { ADS_SRC, GA_INIT, GA_SRC } from "@/lib/analytics";

/**
 * 客户端兜底加载 GA4 与 AdSense 脚本。
 *
 * 正常页面的脚本由服务端布局直接输出；这里做的是幂等补齐：
 * 当页面走了客户端渲染的错误 / 404 边界（服务端 HTML 里没有脚本标签）时，
 * 由本组件在挂载后用 DOM API 插入脚本，确保这些页面同样能被统计。
 */
export function AnalyticsClientLoader() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const hasScript = (src: string) =>
      Array.from(document.querySelectorAll("script[src]")).some((el) =>
        el.getAttribute("src")?.includes(src),
      );

    if (!document.querySelector("script[data-ga4-init]")) {
      const init = document.createElement("script");
      init.setAttribute("data-ga4-init", "true");
      init.text = GA_INIT;
      document.head.appendChild(init);
    }

    if (!hasScript(GA_SRC)) {
      const ga = document.createElement("script");
      ga.async = true;
      ga.src = GA_SRC;
      document.head.appendChild(ga);
    }

    if (!hasScript(ADS_SRC)) {
      const ads = document.createElement("script");
      ads.async = true;
      ads.crossOrigin = "anonymous";
      ads.src = ADS_SRC;
      document.head.appendChild(ads);
    }
  }, []);

  return null;
}

"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";

export function ShareCard({
  title,
  summary,
  url,
  siteName,
  dict,
}: {
  title: string;
  summary: string;
  url: string;
  siteName: string;
  dict: Dictionary;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <div className="share-card">
        <div className="share-kicker">{siteName}</div>
        <div className="share-title">{title}</div>
        <p style={{ color: "var(--text-soft)", fontSize: 14, margin: "0 0 14px" }}>{summary}</p>
        <div className="share-foot">
          <span>{siteName}</span>
          <span>{url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn small" onClick={copy}>
          {copied ? dict.meme.copied : dict.meme.copyLink}
        </button>
        <a
          className="btn small ghost"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title + " " + url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          X / Twitter
        </a>
        <a
          className="btn small ghost"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
    </div>
  );
}

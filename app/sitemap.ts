import type { MetadataRoute } from "next";
import { memes, players, stories, teams } from "@/lib/data";
import { listPublicPages } from "@/lib/public-pages";
import { locales } from "@/lib/types";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const staticPaths = [
    "",
    "/memes",
    "/stories",
    "/trivia",
    "/players",
    "/teams",
    "/timeline",
    "/rankings",
    "/tools",
    "/submit",
    "/search",
    "/about",
    "/privacy",
    "/terms",
  ];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const meme of memes) {
      entries.push({
        url: `${siteUrl}/${locale}/memes/${meme.slug}`,
        lastModified: new Date(meme.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
    for (const story of stories) {
      entries.push({
        url: `${siteUrl}/${locale}/stories/${story.slug}`,
        lastModified: new Date(story.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
    for (const player of players) {
      entries.push({
        url: `${siteUrl}/${locale}/players/${player.id}`,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
    for (const team of teams) {
      entries.push({
        url: `${siteUrl}/${locale}/teams/${team.id}`,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // public 目录下的静态 HTML 页面（两种语言站点共用同一份）
  for (const page of listPublicPages()) {
    entries.push({
      url: `${siteUrl}${page.url}`,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
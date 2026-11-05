export type NbaNewsItem = {
  id: string;
  title: string;
  excerpt: string;
  permalink: string;
  date: string;
  image: string;
  category: string;
  author: string;
};

const NEWS_API = "https://content-api-prod.nba.com/public/1/content/news";

const HEADERS = {
  Accept: "application/json",
  Referer: "https://www.nba.com/",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
};

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/**
 * 抓取 NBA 官网（nba.com）最新新闻列表，返回最多 count 条。
 * 官网接口偶发超时或返回异常结构时返回空数组，页面据此显示占位提示。
 */
export async function fetchNbaLatestNews(count = 20): Promise<NbaNewsItem[]> {
  const url = `${NEWS_API}?count=${count}&types=post&excludeMeta-exclude_from_indexes=true`;

  try {
    const response = await fetch(url, {
      headers: HEADERS,
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as {
      results?: { items?: unknown[] };
    };
    const items = payload.results?.items;

    if (!Array.isArray(items)) {
      return [];
    }

    return items
      .map((raw): NbaNewsItem | null => {
        const item = raw as Record<string, unknown>;
        const permalink = asString(item.permalink);
        const title = asString(item.title);

        if (!permalink || !title) {
          return null;
        }

        const primary = item.categoryPrimary as { name?: unknown } | undefined;
        const author = item.author as { name?: unknown } | undefined;

        return {
          id: asString(item.id) || permalink,
          title,
          excerpt: asString(item.excerpt),
          permalink,
          date: asString(item.date),
          image: asString(item.featuredImage),
          category: asString(primary?.name),
          author: asString(author?.name),
        };
      })
      .filter((item): item is NbaNewsItem => item !== null)
      .slice(0, count);
  } catch {
    return [];
  }
}

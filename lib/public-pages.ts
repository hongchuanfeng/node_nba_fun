import fs from "node:fs";
import path from "node:path";

export interface PublicPage {
  /** 相对 public 目录的路径，例如 nba_1.html */
  file: string;
  /** 站点内访问路径，例如 /nba_1.html */
  url: string;
  /** 页面 <title>，取不到时回退为文件名 */
  title: string;
  /** 文件大小（字节） */
  size: number;
}

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IGNORED_FILES = new Set(["index.html"]);

let cache: PublicPage[] | null = null;

function readTitle(html: string): string {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) return "";
  return match[1]
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function walk(dir: string, prefix: string, out: PublicPage[]): void {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      walk(path.join(dir, entry.name), `${prefix}${entry.name}/`, out);
      continue;
    }
    if (!entry.name.toLowerCase().endsWith(".html")) continue;

    const relative = `${prefix}${entry.name}`;
    if (IGNORED_FILES.has(relative)) continue;

    let title = "";
    let size = 0;
    try {
      const content = fs.readFileSync(path.join(dir, entry.name), "utf8");
      title = readTitle(content);
      size = Buffer.byteLength(content);
    } catch {
      continue;
    }

    out.push({
      file: relative,
      url: `/${relative}`,
      title: title || relative,
      size,
    });
  }
}

/** 列出 public 目录下的所有静态 HTML 页面（构建期或服务端调用）。 */
export function listPublicPages(): PublicPage[] {
  if (cache) return cache;
  const pages: PublicPage[] = [];
  walk(PUBLIC_DIR, "", pages);
  pages.sort((a, b) => a.file.localeCompare(b.file, "en", { numeric: true }));
  cache = pages;
  return pages;
}

/** 把 nba_1.html 这类文件名整理成 nba 1 这类可读前缀，用于分组。 */
export function publicPageGroup(file: string): string {
  const base = file.replace(/\.html$/i, "");
  if (/^start_\d+$/i.test(base)) return "start";
  if (/^nba_\d+$/i.test(base)) return "nba";
  if (/^prediction/i.test(base)) return "prediction";
  return "other";
}

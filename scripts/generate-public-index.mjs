#!/usr/bin/env node
/**
 * 生成 public/index.html —— public 目录所有静态 HTML 页面的索引页。
 *
 * 用法：
 *   node scripts/generate-public-index.mjs
 *
 * 每次往 public 目录里新增或删除 HTML 页面后，重新执行一次即可。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(rootDir, "public");
const outputFile = path.join(publicDir, "index.html");

const GROUP_LABELS = {
  nba: { zh: "NBA 趣闻", en: "NBA facts" },
  start: { zh: "开局故事", en: "Opening stories" },
  prediction: { zh: "2025 预测", en: "2025 predictions" },
  other: { zh: "其他页面", en: "Other pages" },
};

function readTitle(html) {
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

function groupOf(file) {
  const base = file.replace(/\.html$/i, "");
  if (/^start_\d+$/i.test(base)) return "start";
  if (/^nba_\d+$/i.test(base)) return "nba";
  if (/^prediction/i.test(base)) return "prediction";
  return "other";
}

function collect(dir, prefix = "", out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      collect(path.join(dir, entry.name), `${prefix}${entry.name}/`, out);
      continue;
    }
    if (!entry.name.toLowerCase().endsWith(".html")) continue;
    const relative = `${prefix}${entry.name}`;
    if (relative === "index.html") continue;
    const content = fs.readFileSync(path.join(dir, entry.name), "utf8");
    out.push({
      file: relative,
      url: `/${relative}`,
      title: readTitle(content) || relative,
      group: groupOf(relative),
    });
  }
  return out;
}

const pages = collect(publicDir).sort((a, b) =>
  a.file.localeCompare(b.file, "en", { numeric: true }),
);

const groups = new Map();
for (const page of pages) {
  if (!groups.has(page.group)) groups.set(page.group, []);
  groups.get(page.group).push(page);
}

const renderGroup = (key, items) => `
        <section class="mb-10" data-group="${key}">
          <h2 class="text-2xl font-bold text-nba-dark mb-4 flex items-center gap-2">
            <i class="fa fa-folder-open text-nba-purple"></i>
            ${GROUP_LABELS[key].en}
            <span class="text-sm font-normal text-gray-500">(${items.length})</span>
          </h2>
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            ${items
              .map(
                (item) => `
            <a href="${item.url}" class="block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition">
              <div class="text-xs text-nba-purple font-mono mb-1">${item.file}</div>
              <div class="text-sm text-gray-700 leading-snug">${item.title}</div>
            </a>`,
              )
              .join("\n")}
          </div>
        </section>`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Static Pages Index - NBAFun Facts</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8WF0S87W7F"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-8WF0S87W7F');
    </script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7274710287377352"
         crossorigin="anonymous"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        nba: {
                            purple: '#552583',
                            gold: '#FDB927',
                            dark: '#171717',
                            light: '#F5F5F5'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    },
                }
            }
        }
    </script>
</head>
<body class="bg-gray-100 font-sans">
    <nav class="bg-nba-purple text-white shadow-md">
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
            <div class="flex items-center space-x-2">
                <i class="fa fa-basketball-ball text-2xl text-nba-gold"></i>
                <span class="font-bold text-lg">NBAFun Facts</span>
            </div>
            <a href="/zh" class="text-sm hover:text-nba-gold">中文站 / Main Site</a>
        </div>
    </nav>

    <main class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-nba-dark mb-2">Static Pages Index</h1>
        <p class="text-gray-600 mb-6">
            ${pages.length} static HTML pages served from <code class="font-mono">/public</code>.
            静态页面索引 · 共 ${pages.length} 页。
        </p>

        <div class="mb-6">
            <input id="filter" type="search" placeholder="Filter by title or file name…  按标题或文件名筛选"
                   class="w-full max-w-xl px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nba-purple">
        </div>

        <div id="sections">
${[...groups.entries()]
  .map(([key, items]) => renderGroup(key, items))
  .join("\n")}
        </div>

        <p id="empty" class="hidden text-gray-500 mt-6">No matching pages. 没有匹配的页面。</p>
    </main>

    <footer class="bg-nba-dark text-gray-300 mt-10">
        <div class="container mx-auto px-4 py-6 text-sm">
            NBAFun Facts · static pages index generated by
            <code class="font-mono">scripts/generate-public-index.mjs</code>
        </div>
    </footer>

    <script>
        const filterInput = document.getElementById('filter');
        const emptyHint = document.getElementById('empty');
        const sections = Array.from(document.querySelectorAll('#sections section'));
        const cards = Array.from(document.querySelectorAll('#sections a'));

        function applyFilter() {
            const keyword = filterInput.value.trim().toLowerCase();
            let visible = 0;
            cards.forEach((card) => {
                const match = !keyword || card.textContent.toLowerCase().includes(keyword);
                card.classList.toggle('hidden', !match);
                if (match) visible += 1;
            });
            sections.forEach((section) => {
                const hasVisible = section.querySelectorAll('a:not(.hidden)').length > 0;
                section.classList.toggle('hidden', !hasVisible);
            });
            emptyHint.classList.toggle('hidden', visible > 0);
        }

        filterInput.addEventListener('input', applyFilter);
    </script>
</body>
</html>
`;

fs.writeFileSync(outputFile, html, "utf8");
console.log(`Generated ${outputFile} with ${pages.length} static pages.`);

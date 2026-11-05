# NBA Fun · NBA 趣事网站

基于 Next.js（App Router）实现的中英双语 NBA 趣事 / 梗百科站点，对应项目根目录 `文档/需求.md` 中的 MVP 范围。

## 快速开始

```bash
npm install
npm run dev     # 开发模式 http://localhost:3000
npm run build   # 生产构建
npm start       # 运行生产服务
npm run typecheck
```

访问 `/` 会根据浏览器语言自动跳转到 `/zh` 或 `/en`，也可以直接访问 `/zh`、`/en`。

## 目录结构

```
app/
  [locale]/            根布局（html/body、站点头尾）+ 全站页面
    page.tsx           首页
    memes/             梗百科列表与详情
    stories/           趣事 / 名场面列表与详情
    trivia/            历史冷知识
    players/ teams/    球员、球队档案
    timeline/          赛季时间线
    rankings/          榜单与投票
    tools/             趣闻日历、随机测验、梗配对
    search/            多维搜索
    submit/            UGC 投稿
    about/ privacy/ terms/
  api/
    search/            GET  多维搜索接口
    submissions/       POST 投稿（待审核队列）
    votes/             POST 投票
  sitemap.ts robots.ts
components/            站点头尾、卡片、筛选、投票、分享卡片、小游戏等
lib/
  data.ts              内容数据（球员、梗、趣事、时间线、冷知识、友情链接）
  teams.ts             30 支 NBA 球队完整档案
  dictionaries.ts     中英文案字典
  search.ts            组合筛选与检索
  store.ts             投稿 / 投票运行时存储
  seo.ts utils.ts types.ts
middleware.ts          语言协商与重定向
public/                静态资源目录（可直接访问的独立 HTML 页面）
scripts/
  generate-public-index.mjs   生成 public/index.html 静态页面索引
```

## 静态页面（public 目录）

`public/` 下的 HTML 文件由 Next.js 作为静态资源直接输出，访问路径与文件名一致，例如
`/nba_1.html`、`/start_1.html`、`/prediction_2025.html`、`/tools/scoreboard.html`。

- **不会做语言前缀重定向**：`middleware.ts` 会放行带扩展名的路径，静态页面保持原路径访问。
- **索引页**：`public/index.html` 列出全部静态页面并支持即时筛选。新增或删除静态页面后执行
  `npm run generate:index` 重新生成。
- **站点入口**：顶栏与页脚均有「静态页面 / Static Pages」链接指向 `/index.html`。
- **SEO**：`app/sitemap.ts` 会把 `public/` 下的静态页面一并写入 sitemap。
- **注意**：`public/` 下不要放与 `app/` 路由同名的文件（例如 `robots.txt`），否则构建会报
  *conflicting public file and page file* 错误；站点已用 `app/robots.ts` 生成 robots.txt。

## 已实现功能

- **中英双语**：`/zh`、`/en` 双路由，全站文案、SEO 元信息、`hreflang` 与 sitemap 均本地化；顶栏可一键切换。
- **响应式**：PC / 平板 / 移动端自适应，导航在移动端转为横向滚动。
- **核心内容**：梗百科词条（起源 / 名场面 / 演化 / 语录 + 关联推荐）、趣事与名场面频道（带来源标注）、历史冷知识、球员档案（聚合时间线）、30 支 NBA 球队完整档案（主场球馆、联盟分区、夺冠年份、代表球员、球队名场面）、赛季时间线。
- **检索与工具**：关键词 + 球员 + 球队 + 年份 + 标签 + 分类组合筛选，本地搜索接口 `/api/search`，榜单排行、分享卡片生成、冷知识测验与梗配对小游戏。
- **互动与社区**：点赞 / 投票（写入运行时存储）、UGC 投稿表单与审核队列（`POST /api/submissions`，状态为 `pending`）。
- **合规基线**：隐私政策、使用条款、关于页（来源标注、版权与 DMCA 处理）、关于 GDPR / CCPA / PIPL 的说明；页脚包含需求指定的友情链接。

## 说明

内容数据集中在 `lib/data.ts`，当前为内置示例数据；接入数据库或 CMS 时，只需替换该文件导出的集合与 `lib/search.ts` 的读取来源，页面与接口无需改动。投稿与投票保存在进程内存中，重启后重置，正式环境建议替换 `lib/store.ts` 为持久化实现。

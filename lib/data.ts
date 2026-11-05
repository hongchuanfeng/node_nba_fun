import type { Meme, Player, Story, TimelineEvent, Trivia } from "./types";
import { teams } from "./teams";
import { extraPlayersA } from "./players-extra";

export const friendLinks = [
  { name: "视频去水印字幕工具", nameEn: "Video watermark remover", url: "https://www.removewatermarker.com/" },
  { name: "在线文字转字幕 AI 工具", nameEn: "Text to subtitles AI", url: "https://www.chdaoai.com/zh/text-to-subtitles" },
  { name: "传道 PDF 图片条码工具", nameEn: "PDF / image barcode tools", url: "https://www.openai2025.com/" },
  { name: "在线 base64 工具", nameEn: "Base64 tools", url: "https://www.base64.club/" },
  { name: "在线免费游戏 Ice Breaker Games", nameEn: "Free games — Ice Breaker", url: "https://icebreaker.games/" },
  { name: "中国菜系大全", nameEn: "Chinese cuisine guide", url: "https://food.zorezoro.com/" },
  { name: "中国功夫大全", nameEn: "Kung fu guide", url: "https://gf.zorezoro.com/" },
  { name: "中国 24 史", nameEn: "24 Histories of China", url: "https://china.zorezoro.com/" },
];

export { teams } from "./teams";

const corePlayers: Player[] = [
  {
    id: "curry",
    name: { zh: "斯蒂芬·库里", en: "Stephen Curry" },
    shortName: "Curry",
    teamIds: ["warriors"],
    number: "30",
    position: "PG",
    country: { zh: "美国", en: "United States" },
    birthYear: 1988,
    accent: "#ffc72c",
    bio: {
      zh: "三分线外的答案本身就是一种梗，「Text me」让全联盟学会了提前庆祝。",
      en: "The answer from beyond the arc; 'Text me' taught the league to celebrate early.",
    },
    highlights: [
      { zh: "「Text me」赛前庆祝", en: "The 'Text me' pre-game celebration" },
      { zh: "招牌吐舌与心形手势", en: "The shush-and-heart gestures" },
      { zh: "4-3-2 秀恩爱式运球", en: "The 4-3-2 dribble celebration" },
    ],
  },
  {
    id: "durant",
    name: { zh: "凯文·杜兰特", en: "Kevin Durant" },
    shortName: "Durant",
    teamIds: ["warriors"],
    number: "35",
    position: "SF",
    country: { zh: "美国", en: "United States" },
    birthYear: 1988,
    accent: "#1d428a",
    bio: {
      zh: "「KD 掉粉」的账号梗人尽皆知，飘逸的干拔跳投又美又欠。",
      en: "Famous for the 'KD' fan-account jokes and a floaty, switchable jumper.",
    },
    highlights: [
      { zh: "「KD」账号系列梗", en: "The 'KD' social media saga" },
      { zh: "篮筐上的脚踝假动作", en: "The ankle-battling fake" },
      { zh: "从不被防住的干拔", en: "The pull-up nobody can contest" },
    ],
  },
  {
    id: "lebron",
    name: { zh: "勒布朗·詹姆斯", en: "LeBron James" },
    shortName: "LeBron",
    teamIds: ["lakers", "heat", "cavaliers"],
    number: "23",
    position: "SF/PF",
    country: { zh: "美国", en: "United States" },
    birthYear: 1984,
    accent: "#552583",
    bio: {
      zh: "「六步」「四步」「你行的」，每一个争议瞬间都自带 meme 属性。",
      en: "'Six steps', 'four steps', 'you da man' — every disputed moment becomes a meme.",
    },
    highlights: [
      { zh: "「你行的」家族表情", en: "The 'you da man' family of reactions" },
      { zh: "「四步」争议", en: "The travel controversy" },
      { zh: "季末赛后的跨场庆祝", en: "End-of-season walk-offs" },
    ],
  },
  {
    id: "kobe",
    name: { zh: "科比·布莱恩特", en: "Kobe Bryant" },
    shortName: "Kobe",
    teamIds: ["lakers"],
    number: "24",
    position: "SG",
    country: { zh: "美国", en: "United States" },
    birthYear: 1978,
    accent: "#fdb927",
    bio: {
      zh: "曼巴精神的注脚，那句「你还要我做什么」至今仍是流量密码。",
      en: "The Mamba code; 'What else can I give you' still trends every year.",
    },
    highlights: [
      { zh: "「你还要我做什么」", en: "'What else can I give you'" },
      { zh: "第四节强行接管", en: "Taking over the fourth quarter" },
      { zh: "仰投绝杀与曼巴祈祷", en: "The fadeaway and the Mamba prayer" },
    ],
  },
  {
    id: "jordan",
    name: { zh: "迈克尔·乔丹", en: "Michael Jordan" },
    shortName: "Jordan",
    teamIds: ["bulls"],
    number: "23",
    position: "SG",
    country: { zh: "美国", en: "United States" },
    birthYear: 1963,
    accent: "#ce1141",
    bio: {
      zh: "吐舌、耸肩、经典的「流泪」剪影，篮球之神的表情包模板。",
      en: "The tongue, the shrug and the crying silhouette: a template for memes everywhere.",
    },
    highlights: [
      { zh: "罚球线吐舌", en: "The free-throw tongue" },
      { zh: "摊手耸肩「 shrug 」", en: "The shrug" },
      { zh: "高举双臂庆祝", en: "The raised-arms celebration" },
    ],
  },
  {
    id: "pippen",
    name: { zh: "斯科蒂·皮蓬", en: "Scottie Pippen" },
    shortName: "Pippen",
    teamIds: ["bulls"],
    number: "33",
    position: "SF",
    country: { zh: "美国", en: "United States" },
    birthYear: 1965,
    accent: "#ce1141",
    bio: {
      zh: "公牛王朝的「完美先生」，而场外故事的分量丝毫不亚于场上。",
      en: "Mr. Six Rings on court, and a personal story as big as the dynasty itself.",
    },
    highlights: [
      { zh: "公牛王朝的「完美先生」", en: "'Mr. Perfect' of the dynasty" },
      { zh: "「这不可能是真的」", en: "'This can't be real'" },
    ],
  },
  {
    id: "hakeem",
    name: { zh: "哈基姆·奥拉朱旺", en: "Hakeem Olajuwon" },
    shortName: "Olajuwon",
    teamIds: ["rockets"],
    number: "34",
    position: "C",
    country: { zh: "尼日利亚", en: "Nigeria" },
    birthYear: 1963,
    accent: "#9ea5a9",
    bio: {
      zh: "「梦幻脚步」的发明者，每一次假动作都值得做成慢放回放。",
      en: "Inventor of the Dream Shake — every fake belongs in slow motion.",
    },
    highlights: [
      { zh: "「梦幻脚步」", en: "The Dream Shake" },
      { zh: "梦里脚步晃倒马刺内线", en: "Faking out the Spurs frontcourt" },
    ],
  },
  {
    id: "bird",
    name: { zh: "拉里·伯德", en: "Larry Bird" },
    shortName: "Bird",
    teamIds: ["celtics"],
    number: "33",
    position: "SF",
    country: { zh: "美国", en: "United States" },
    birthYear: 1956,
    accent: "#007a33",
    bio: {
      zh: "「谁防我？他在哪？」这句垃圾话是历史级名梗。",
      en: "'Who's guarding me? Where is he?' — one of the greatest trash talk lines ever.",
    },
    highlights: [
      { zh: "「他在哪？」垃圾话", en: "'Where is he?' trash talk" },
      { zh: "大字写「回防失误」后的面无表情", en: "The deadpan after a turnover banner" },
    ],
  },
  {
    id: "garnett",
    name: { zh: "凯文·加内特", en: "Kevin Garnett" },
    shortName: "Garnett",
    teamIds: ["spurs", "celtics"],
    number: "21",
    position: "PF",
    country: { zh: "美国", en: "United States" },
    birthYear: 1967,
    accent: "#007a33",
    bio: {
      zh: "「KG 认真的」系列名场面，一次发球能讲完三个版本的梗。",
      en: "'KG was dead serious' — one inbound pass, a thousand punchlines.",
    },
    highlights: [
      { zh: "「KG 你没事吧」", en: "'Are you OK, KG?'" },
      { zh: "狼嚎式庆祝", en: "The howl celebration" },
    ],
  },
  {
    id: "barkley",
    name: { zh: "查尔斯·巴克利", en: "Charles Barkley" },
    shortName: "Barkley",
    teamIds: ["sixers", "suns", "rockets"],
    number: "4",
    position: "PF",
    country: { zh: "美国", en: "United States" },
    birthYear: 1963,
    accent: "#9ea5a9",
    bio: {
      zh: "TNT 演播室的名嘴担当，「it stinks」是史上被重复最多的篮球梗。",
      en: "The TNT booth legend behind 'it stinks' — the most repeated line in basketball.",
    },
    highlights: [
      { zh: "「闻起来真臭」", en: "'It stinks'" },
      { zh: "跳上解说台庆祝", en: "Jumping on the TNT desk" },
    ],
  },
];

export const players: Player[] = [...corePlayers, ...extraPlayersA];

export const memes: Meme[] = [
  {
    id: "text-me",
    slug: "text-me",
    title: { zh: "Text Me", en: "Text Me" },
    category: "iconic",
    summary: {
      zh: "库里每次超远三分后会先指天再掏出手机，暗示「我早就发消息告诉你了」。",
      en: "After a logo three, Curry points at the sky and reaches for his phone: he already told you.",
    },
    origin: {
      zh: "2016 年季后赛勇士 vs 雷霆第 6 场，库里投进一记几乎压哨的三分，指天庆祝并随后被拍到掏出手机。",
      en: "Game 6 of the 2016 playoffs against OKC: a near-buzzer three, a skyward point, then the phone.",
    },
    scene: {
      zh: "球进之后的转播镜头捕捉到库里对着手机屏幕笑，随后队友集体模仿这个动作。",
      en: "TV caught him grinning at the phone screen, and teammates started copying the gesture.",
    },
    evolution: {
      zh: "从勇士队内庆祝演变为全联盟通用手势，赛后发布会也反复被拿出来玩梗。",
      en: "It spread from a team ritual to a league-wide gesture, and became a staple in press conferences.",
    },
    quote: {
      zh: "「先给你发条消息。」",
      en: "'I text you first.'",
    },
    playerIds: ["curry"],
    teamIds: ["warriors"],
    tags: ["celebration", "three-pointer", "warriors"],
    relatedMemeIds: ["elemento", "one-more"],
    views: 128400,
    likes: 9320,
    updatedAt: "2024-06-18",
  },
  {
    id: "elemento",
    slug: "elemento",
    title: { zh: "Elemento（海地说是你）", en: "Elemento" },
    category: "funny",
    summary: {
      zh: "库里庆祝时双手在胸前画出的庆祝动作，配合海地语「Elemento」（是你）。",
      en: "The chest-level celebration Curry performs with the Haitian word 'Elemento' — it's on you.",
    },
    origin: {
      zh: "勇士队助教、来自海地的 Sammy Gelfand 向球队介绍了这句庆祝口号。",
      en: "Warriors assistant Sammy Gelfand, from Haiti, introduced the phrase to the team.",
    },
    scene: {
      zh: "每次命中关键球后，库里都会双手相对画一个圈，再指向对手看台。",
      en: "After a big shot, Curry draws the motion with both hands and points at the other bench.",
    },
    evolution: {
      zh: "海地社区把这套动作带上街头，逐渐变成庆祝篮球失误与胜利的通用符号。",
      en: "Haitian communities carried it to the streets, and it became a general symbol of joy and trolling.",
    },
    quote: {
      zh: "「Elemento！」",
      en: "'Elemento!'",
    },
    playerIds: ["curry"],
    teamIds: ["warriors"],
    tags: ["celebration", "warriors", "culture"],
    relatedMemeIds: ["text-me"],
    views: 96200,
    likes: 7410,
    updatedAt: "2024-05-02",
  },
  {
    id: "kd-account",
    slug: "kd-account",
    title: { zh: "「KD 掉粉」账号", en: "The KD Twitter account" },
    category: "controversy",
    summary: {
      zh: "一个持续发布「KD 下场」的假账号，让雷霆球迷每天都要点开看看有没有新动态。",
      en: "A parody account posting daily 'KD is dropping' news became a must-check for OKC fans.",
    },
    origin: {
      zh: "2019 年交易截止日前后，一个粉丝自建账号模仿雷霆官宣语气发布消息。",
      en: "Around the 2019 trade deadline, a fan-made account mimicked the Thunder's official voice.",
    },
    scene: {
      zh: "账号每次「官宣」都会引发解说员吐槽，最终在交易截止日以一则真实公告收尾。",
      en: "Each fake announcement drew commentary jokes, until the deadline ended with a real one.",
    },
    evolution: {
      zh: "账号被雷霆官方以法律名义发函警告，从此成为体育圈的经典二手梗案例。",
      en: "The Thunder sent a legal cease-and-desist, turning it into a case study in sports meme law.",
    },
    quote: {
      zh: "「官方消息：凯文·杜兰特将……（待续）」",
      en: "'Official: Kevin Durant will… (to be continued)'",
    },
    playerIds: ["durant"],
    teamIds: ["warriors"],
    tags: ["social-media", "kd", "okc"],
    relatedMemeIds: ["text-me"],
    views: 84500,
    likes: 6120,
    updatedAt: "2023-12-11",
  },
  {
    id: "six-steps",
    slug: "six-steps",
    title: { zh: "「六步」与「四步」", en: "Six steps vs. four steps" },
    category: "controversy",
    summary: {
      zh: "詹姆斯一记扣篮被现场解说计成六步，随后社交媒体开始数他每一步。",
      en: "A dunk counted as six steps live on air, and the internet started counting every stride.",
    },
    origin: {
      zh: "2018 年季后赛骑士对步行者的比赛中，解说员数出六步，引发走步争议。",
      en: "In a 2018 playoff game against Indiana, an announcer counted six steps — and the walking debate began.",
    },
    scene: {
      zh: "慢镜头显示他实际是五步，但网友制作的「数步」视频合集仍然成为经典二创素材。",
      en: "Slow motion showed five, yet the parodied step-counting videos became classics anyway.",
    },
    evolution: {
      zh: "「数步」成为每场热门比赛后的固定玩梗环节，甚至出现了专门的步数统计应用。",
      en: "Step counting became a ritual after every big game, complete with dedicated counting apps.",
    },
    quote: {
      zh: "「他走了六步！」",
      en: "'He took six steps!'",
    },
    playerIds: ["lebron"],
    teamIds: ["heat", "lakers"],
    tags: ["travel", "counting", "lebron"],
    relatedMemeIds: ["you-da-man"],
    views: 156700,
    likes: 11200,
    updatedAt: "2024-08-09",
  },
  {
    id: "you-da-man",
    slug: "you-da-man",
    title: { zh: "「你行的」表情包家族", en: "The 'You da man' family" },
    category: "funny",
    summary: {
      zh: "詹姆斯的标志性表情被做成无数表情包，用来形容一切离谱场面。",
      en: "LeBron's signature smirk became a universal reaction image for any absurd moment.",
    },
    origin: {
      zh: "2011 年热火夺冠后詹姆斯在采访区的庆祝表情被广泛截图传播。",
      en: "A post-2011 championship interview clip spread as a reaction image across the internet.",
    },
    scene: {
      zh: "任何不可思议的进球、失误或场外新闻都会配上这张脸，形成极强的通用性。",
      en: "Any absurd play, buzzer-beater or off-court news gets paired with the same face.",
    },
    evolution: {
      zh: "衍生出「四步」「六步」「在空中」的多种改版，成为中文互联网通用表情。",
      en: "It spawned 'four steps', 'six steps' and 'mid-air' variants and became a shared Chinese internet emoji.",
    },
    quote: {
      zh: "「你行的！」",
      en: "'You da man!'",
    },
    playerIds: ["lebron"],
    teamIds: ["heat"],
    tags: ["reaction", "lebron", "meme"],
    relatedMemeIds: ["six-steps"],
    views: 203900,
    likes: 15400,
    updatedAt: "2024-09-01",
  },
  {
    id: "mamba-mentality",
    slug: "mamba-mentality",
    title: { zh: "「你还要我做什么」", en: "'What else can I give you?'" },
    category: "warm",
    summary: {
      zh: "2010 年总决赛后科比被问「你还能给球队什么」，一句话定义了一种态度。",
      en: "Asked what else he could give the team in 2010, Kobe answered with a single sentence that defined an era.",
    },
    origin: {
      zh: "2010 年总决赛夺冠后发布会上，科比在被追问时给出了这句回答。",
      en: "At the 2010 Finals press conference, Kobe was asked what more he could give.",
    },
    scene: {
      zh: "现场记者沉默了几秒，随后这段问答被反复引用，成为体育史上最著名的答记者问之一。",
      en: "The reporter paused, and the exchange became one of the most quoted press answers in sports.",
    },
    evolution: {
      zh: "「曼巴精神」被商业品牌和球迷共同使用，逐渐脱离了原始语境。",
      en: "'Mamba Mentality' was adopted by brands and fans alike, gradually outliving its original context.",
    },
    quote: {
      zh: "「你还要我做什么？」",
      en: "'What else can I give you?'",
    },
    playerIds: ["kobe"],
    teamIds: ["lakers"],
    tags: ["quote", "kobe", "legacy"],
    relatedMemeIds: ["tongue-out"],
    views: 178300,
    likes: 16800,
    updatedAt: "2024-01-24",
  },
  {
    id: "tongue-out",
    slug: "tongue-out",
    title: { zh: "乔丹吐舌", en: "The Jordan tongue" },
    category: "iconic",
    summary: {
      zh: "罚球线上的那一吐，被无数球员模仿，也成了表情包界的基础构件。",
      en: "The tongue-out at the free-throw line: imitated by everyone, and a building block of internet memes.",
    },
    origin: {
      zh: "1991 年总决赛公牛对湖人期间，乔丹在罚球时开始频繁做这个动作。",
      en: "During the 1991 Finals against the Lakers, Jordan started doing it at the line.",
    },
    scene: {
      zh: "1988 年扣篮大赛的飞铲动作更加经典，但吐舌才是流传最广的那一个。",
      en: "The 1988 slam contest dunk was flashier, but the tongue is what everyone remembers.",
    },
    evolution: {
      zh: "从球员模仿到品牌广告与儿童模仿赛，跨越四十年持续复用。",
      en: "From player imitations to commercials and kids' costume contests, it never stopped spreading.",
    },
    quote: {
      zh: "（无台词）",
      en: "(No dialogue)",
    },
    playerIds: ["jordan"],
    teamIds: ["bulls"],
    tags: ["celebration", "jordan", "bulls"],
    relatedMemeIds: ["mamba-mentality"],
    views: 245000,
    likes: 21400,
    updatedAt: "2023-11-30",
  },
  {
    id: "where-is-he",
    slug: "where-is-he",
    title: { zh: "「他在哪？」", en: "'Where is he?'" },
    category: "funny",
    summary: {
      zh: "伯德背身单打时向裁判抱怨没人防守对手，随后命中转身跳投。",
      en: "Bird complained that nobody was guarding his defender — then hit the turnaround anyway.",
    },
    origin: {
      zh: "1980 年代凯尔特人队的经典背身单打回合。",
      en: "A classic post-up from the 1980s Celtics.",
    },
    scene: {
      zh: "伯德回头朝裁判喊「他在哪」，接着后仰跳投命中，队友笑得倒地。",
      en: "He turned to the referee yelling 'where is he', then hit the turnaround — teammates fell over laughing.",
    },
    evolution: {
      zh: "这句话成为篮球垃圾话模板，被无数球员在类似的单打回合中复读。",
      en: "It became the gold standard of trash talk and gets reenacted on every post-up since.",
    },
    quote: {
      zh: "「他在哪？谁防我？」",
      en: "'Where is he? Who's guarding me?'",
    },
    playerIds: ["bird"],
    teamIds: ["celtics"],
    tags: ["trash-talk", "bird", "celtics"],
    relatedMemeIds: ["it-stinks"],
    views: 88700,
    likes: 7230,
    updatedAt: "2024-03-16",
  },
  {
    id: "it-stinks",
    slug: "it-stinks",
    title: { zh: "「闻起来真臭」", en: "'It stinks'" },
    category: "funny",
    summary: {
      zh: "巴克利在解说席上形容对手防守，直接把一句形容写进了篮球黑话。",
      en: "Barkley described the opponent's defense on live TV and accidentally created a piece of basketball slang.",
    },
    origin: {
      zh: "1993 年季后赛解说过程中，巴克利形容公牛防守「闻起来真臭」。",
      en: "During a 1993 playoff broadcast, Barkley said the Bulls' defense 'stinks'.",
    },
    scene: {
      zh: "搭档斯图尔特·索特斯接着吐槽「用鼻子打球」，现场笑声不断。",
      en: "Partner Stu Naismith joked about playing with your nose, and the booth kept cracking up.",
    },
    evolution: {
      zh: "「这防守闻起来真臭」被固定为防守战力的口语评分，出现在无数解说里。",
      en: "'That defense stinks' settled into shorthand for defensive quality, and shows up in commentary everywhere.",
    },
    quote: {
      zh: "「这防守闻起来真臭。」",
      en: "'This defense stinks.'",
    },
    playerIds: ["barkley"],
    teamIds: ["spurs"],
    tags: ["commentary", "trash-talk", "tnt"],
    relatedMemeIds: ["where-is-he"],
    views: 76200,
    likes: 5510,
    updatedAt: "2024-02-08",
  },
  {
    id: "kg-serious",
    slug: "kg-serious",
    title: { zh: "「KG 你没事吧」", en: "'Are you OK, KG?'" },
    category: "funny",
    summary: {
      zh: "加内特在一次发球后被队友问是不是受伤了，他的表情引发了大量二创。",
      en: "After one inbound, a teammate asked if Garnett was hurt — his expression rewrote itself forever.",
    },
    origin: {
      zh: "凯尔特人时期的一次进攻，加内特完成发球后表情非常严肃。",
      en: "During a Boston possession, Garnett looked intensely serious after an inbound.",
    },
    scene: {
      zh: "皮尔斯问他是否受伤，加内特回答「我没事」，语气低沉，成了当晚名场面。",
      en: "Pierce asked if he was hurt; Garnett's low 'I'm good' answered the question forever.",
    },
    evolution: {
      zh: "网友配上字幕做成短视频，在中文平台长期高热度。",
      en: "Captioned remakes spread widely and stayed highly recommended on Chinese platforms.",
    },
    quote: {
      zh: "「我没事。」",
      en: "'I'm good.'",
    },
    playerIds: ["garnett"],
    teamIds: ["celtics", "spurs"],
    tags: ["reaction", "kg", "celtics"],
    relatedMemeIds: ["tongue-out"],
    views: 69300,
    likes: 4980,
    updatedAt: "2023-10-05",
  },
  {
    id: "heat-culture",
    slug: "heat-culture",
    title: { zh: "「Heat Culture」", en: "'Heat Culture'" },
    category: "warm",
    summary: {
      zh: "热火更衣室的团结仪式，从怒吼到集体跳舞，成了球队最出圈的名场面。",
      en: "The Heat's ritual — a roar, a dance, a huddle — became the franchise's defining image.",
    },
    origin: {
      zh: "2011 年热火首夺总冠军后的夺冠游行与更衣室庆祝。",
      en: "From the 2011 championship parade and the celebration that followed it.",
    },
    scene: {
      zh: "球员们排队接受「硬汉」仪式，包括「播传球」环节，一个接一个模仿传球庆祝。",
      en: "Players line up for the 'hardwood initiation', passing a ball down the row as a celebration.",
    },
    evolution: {
      zh: "「Heat Culture」被写进球队官方文化，也被模仿者做成各种版本。",
      en: "'Heat Culture' entered the franchise's official identity and spawned endless remakes.",
    },
    quote: {
      zh: "「Heat Culture！Heat Culture！」",
      en: "'Heat Culture! Heat Culture!'",
    },
    playerIds: ["lebron"],
    teamIds: ["heat"],
    tags: ["team-culture", "heat", "celebration"],
    relatedMemeIds: ["you-da-man"],
    views: 118300,
    likes: 9870,
    updatedAt: "2024-07-19",
  },
];

export const stories: Story[] = [
  {
    id: "curry-53-point-game",
    slug: "curry-53-point-game",
    title: { zh: "库里单场 53 分，第四节独得 27 分", en: "Curry drops 53, with 27 in the fourth" },
    excerpt: {
      zh: "2021 年 1 月 3 日，库里在麦迪逊广场花园用一记记三分把比赛写进了历史。",
      en: "January 3, 2021: Curry wrote himself into the books at Madison Square Garden.",
    },
    body: [
      {
        zh: "那晚的库里像是把整个赛季的三分手感装进了一场比赛。前三节他手感一般，第四节独得 27 分，包括一记追身三分把比分改写成 105-100。",
        en: "Curry looked human for three quarters, then scored 27 in the fourth, including a pull-up three that flipped the game to 105-100.",
      },
      {
        zh: "麦迪逊广场花园在这个夜晚变成了「库里之夜」的现场，但真正被反复播放的片段是他在暂停时对镜头短暂无表情的那一秒。",
        en: "MSG became 'Curry Night', but the most replayed clip was a single deadpan second he gave the camera during a timeout.",
      },
      {
        zh: "这场 53 分也成了后来很多球员冲击单场得分纪录时被反复对比的标尺。",
        en: "The 53-point game became the benchmark every later scoring record chase gets measured against.",
      },
    ],
    category: "iconic",
    playerIds: ["curry"],
    teamIds: ["warriors"],
    season: "2020-21",
    year: 2021,
    month: 1,
    day: 3,
    tags: ["scoring-record", "three-pointer", "msg"],
    views: 187600,
    likes: 14200,
    source: {
      label: { zh: "NBA 官方比赛战报", en: "Official NBA game recap" },
      url: "https://www.nba.com/",
    },
    updatedAt: "2024-01-08",
  },
  {
    id: "kobe-81",
    slug: "kobe-81",
    title: { zh: "科比单场砍下 81 分", en: "Kobe drops 81 points in one night" },
    excerpt: {
      zh: "2006 年 1 月 22 日，科比用 48 次出手拿下 81 分，至今仍是单场第二高分。",
      en: "January 22, 2006: 48 shots, 81 points, still the second-highest single-game total ever.",
    },
    body: [
      {
        zh: "比赛前，科比的跟腱伤势让很多人担心他无法坚持。斯台普斯中心的球迷从头到尾没有停止欢呼。",
        en: "Concerns about his Achilles meant many doubted he could finish. The Staples Center crowd never stopped.",
      },
      {
        zh: "第四节他连得 13 分锁定比赛，赛后对着记者席说出了那句「我还能投」式的宣言。",
        en: "He closed it out with 13 straight in the fourth and told the bench he had more left.",
      },
      {
        zh: "这个夜晚后来被拍成纪录片，也成为所有「孤胆英雄」话题的参照系。",
        en: "It became a documentary, and a reference point for every solo-carry conversation since.",
      },
    ],
    category: "iconic",
    playerIds: ["kobe"],
    teamIds: ["lakers"],
    season: "2005-06",
    year: 2006,
    month: 1,
    day: 22,
    tags: ["scoring-record", "kobe", "lakers"],
    views: 251300,
    likes: 22300,
    source: {
      label: { zh: "NBA 官方比赛战报", en: "Official NBA game recap" },
      url: "https://www.nba.com/",
    },
    updatedAt: "2023-10-12",
  },
  {
    id: "bird-celtics-parade",
    slug: "bird-celtics-parade",
    title: { zh: "伯德夺冠后被新奥尔良球迷倒戈", en: "Bird gets a standing ovation in New Orleans" },
    excerpt: {
      zh: "1990 年总决赛后，伯德在敌城球迷的欢呼中举起 MVP 奖杯。",
      en: "After the 1990 Finals, Bird lifted the Finals MVP trophy to cheers from the wrong crowd.",
    },
    body: [
      {
        zh: "凯尔特人对湖人打出 4-1，但最有名的画面发生在新奥尔良。",
        en: "Boston beat the Lakers 4-1, but the most famous image happened in New Orleans.",
      },
      {
        zh: "当现场播报员介绍伯德时，全场球迷起立鼓掌——因为这里是他大学时代成名的地方。",
        en: "When the announcer said his name, the whole arena stood — he had starred for Louisiana State.",
      },
      {
        zh: "这成了体育史上少见的「敌城致敬」名场面。",
        en: "It remains one of sport's rare standing ovations from a rival city's crowd.",
      },
    ],
    category: "warm",
    playerIds: ["bird"],
    teamIds: ["celtics"],
    season: "1989-90",
    year: 1990,
    month: 6,
    day: 20,
    tags: ["celtics", "history", "hall-of-fame"],
    views: 64100,
    likes: 5920,
    updatedAt: "2024-04-02",
  },
  {
    id: "warriors-cup-noodles",
    slug: "warriors-cup-noodles",
    title: { zh: "勇士更衣室里的方便面庆祝", en: "The Warriors' instant-noodle celebration" },
    excerpt: {
      zh: "库里接受 MVP 奖杯时的那碗方便面，成了近年最火的庆祝梗之一。",
      en: "The noodles Curry was holding when he took the MVP trophy became one of the era's biggest meme images.",
    },
    body: [
      {
        zh: "2017 年总决赛之后，库里被拍到手里端着一碗吃方便面。",
        en: "After the 2017 Finals, cameras caught Curry holding a bowl of instant noodles.",
      },
      {
        zh: "画面迅速被做成表情包，「MVP 吃泡面」成为中文社交平台上的高频梗。",
        en: "The frame was remixed endlessly, and 'MVP eating instant noodles' became a fixture online.",
      },
      {
        zh: "这个梗也反过来影响了真实生活——很多球迷在夺冠夜模仿泡面庆祝。",
        en: "It even leaked into real life, with fans recreating the celebration on title nights.",
      },
    ],
    category: "funny",
    playerIds: ["curry"],
    teamIds: ["warriors"],
    season: "2016-17",
    year: 2017,
    month: 6,
    day: 12,
    tags: ["celebration", "mvp", "warriors"],
    views: 143500,
    likes: 11900,
    source: {
      label: { zh: "NBA 总决赛颁奖现场", en: "NBA Finals trophy ceremony" },
      url: "https://www.nba.com/",
    },
    updatedAt: "2024-06-01",
  },
  {
    id: "jordan-crying-meme",
    slug: "jordan-crying-meme",
    title: { zh: "乔丹「流泪」剪影的诞生", en: "How the Jordan crying meme was born" },
    excerpt: {
      zh: "1998 年总决赛后的那张经典剪影，如何变成全球通用的表情包。",
      en: "The 1998 Finals silhouette that turned into a universal reaction image.",
    },
    body: [
      {
        zh: "原图其实是乔丹在 1998 年公牛夺冠后与队友庆祝时被拍摄的一张照片。",
        en: "The original was a frame from the 1998 championship celebration.",
      },
      {
        zh: "被拉伸成高对比度的剪影后，轮廓像在无声哭泣，随即成为表达「心碎」的标准图片。",
        en: "Stretched into a high-contrast silhouette, the outline looked like silent tears and became the default image for heartbreak.",
      },
      {
        zh: "它出现在无数与篮球毫无关系的 memes 里，是体育文化外溢的典型案例。",
        en: "It now appears in memes with no basketball connection at all — a textbook case of sports culture bleeding outward.",
      },
    ],
    category: "iconic",
    playerIds: ["jordan"],
    teamIds: ["bulls"],
    season: "1997-98",
    year: 1998,
    month: 6,
    day: 14,
    tags: ["reaction", "jordan", "bulls"],
    views: 212800,
    likes: 18700,
    updatedAt: "2023-12-20",
  },
  {
    id: "pippen-lakers-defense",
    slug: "pippen-lakers-defense",
    title: { zh: "皮蓬的「防守」成为战术", en: "Pippen's 'defense' became a tactic" },
    excerpt: {
      zh: "1991 年总决赛，皮蓬主动去防魔术师约翰逊，成为篮球史上最著名的战术选择之一。",
      en: "In the 1991 Finals, Pippen volunteered to guard Magic Johnson — one of the greatest strategic calls in history.",
    },
    body: [
      {
        zh: "禅师杰克逊原计划用丹尼斯·罗德曼去防魔术师，皮蓬主动请缨。",
        en: "Phil Jackson planned to use Dennis Rodman; Pippen asked for the assignment.",
      },
      {
        zh: "「我打他。」皮蓬说。这句话本身也被反复引用为「敢挑硬任务的球员」的样本。",
        en: "'I'll take him,' Pippen said — a line now quoted as shorthand for volunteering for the hardest matchup.",
      },
      {
        zh: "公牛最终 4-1 拿下湖人，这是篮球史上最著名的防守博弈之一。",
        en: "Chicago won the series 4-1, sealing one of basketball's most studied defensive chess matches.",
      },
    ],
    category: "iconic",
    playerIds: ["pippen"],
    teamIds: ["bulls"],
    season: "1990-91",
    year: 1991,
    month: 6,
    day: 12,
    tags: ["defense", "bulls", "history"],
    views: 92300,
    likes: 8650,
    updatedAt: "2024-02-27",
  },
  {
    id: "garnett-howl",
    slug: "garnett-howl",
    title: { zh: "加内特的狼嚎庆祝", en: "Garnett's howl" },
    excerpt: {
      zh: "凯尔特人时期，加内特每次命中关键球都会发出标志性的狼嚎。",
      en: "Every clutch basket in Boston ended with the same guttural howl.",
    },
    body: [
      {
        zh: "这个庆祝动作来自他少年时期对狼的偏爱，也被解释为对家乡明尼苏达的呼应。",
        en: "The howl grew from his childhood fascination with wolves, and is often read as a nod to Minnesota.",
      },
      {
        zh: "对手球迷的模仿版本同样出圈，体育史上少有的「双方共用庆祝动作」。",
        en: "Opposing fans adopted it too — a rare celebration shared by both sides of a rivalry.",
      },
      {
        zh: "凯尔特人退役球衣时，那声狼嚎最后一次响起，全场起立。",
        en: "When Boston retired his number, the howl sounded one last time and the arena stood.",
      },
    ],
    category: "warm",
    playerIds: ["garnett"],
    teamIds: ["celtics"],
    season: "2006-07",
    year: 2007,
    month: 6,
    day: 13,
    tags: ["celebration", "celtics", "kg"],
    views: 78400,
    likes: 6420,
    updatedAt: "2024-05-14",
  },
  {
    id: "barkley-desk",
    slug: "barkley-desk",
    title: { zh: "巴克利跳上解说台", en: "Barkley jumps on the desk" },
    excerpt: {
      zh: "1993 年总决赛后，巴克利在演播室里跳上解说台庆祝。",
      en: "After the 1993 Finals, Barkley climbed onto the broadcast desk.",
    },
    body: [
      {
        zh: "公牛完成卫冕，巴克利和奥尼尔在解说席上即兴庆祝。",
        en: "Chicago had just repeated as champions, and Barkley and O'Neal celebrated live on air.",
      },
      {
        zh: "这个画面后来被反复剪辑，是「解说员也有立场」讨论的经典素材。",
        en: "The clip is endlessly re-cut and remains a go-to example in debates about commentator neutrality.",
      },
      {
        zh: "它的喜剧效果与 NBA 历史上最著名的两个解说组合绑定在一起。",
        en: "Its comedy is permanently welded to the two most famous broadcast booths in the sport.",
      },
    ],
    category: "funny",
    playerIds: ["barkley"],
    teamIds: ["spurs"],
    season: "1992-93",
    year: 1993,
    month: 6,
    day: 21,
    tags: ["tnt", "commentary", "history"],
    views: 56700,
    likes: 4390,
    updatedAt: "2023-09-25",
  },
  {
    id: "lebron-cleveland-return",
    slug: "lebron-cleveland-return",
    title: { zh: "「我回来了」与回家的长文信", en: "'I'm coming home' and the long letter" },
    excerpt: {
      zh: "2014 年詹姆斯重返骑士，这份公告本身成了体育史上被阅读最多的球员声明之一。",
      en: "In 2014 LeBron's return to Cleveland came with one of the most-read player statements in sports.",
    },
    body: [
      {
        zh: "他在《体育画报》上发表了长文，解释自己为何回到家乡球队。",
        en: "He published an extended letter in Sports Illustrated explaining the decision to go home.",
      },
      {
        zh: "「我欠克立夫兰一个冠军」的表述成为那年最出圈的句子之一。",
        en: "'I owe Cleveland a championship' became one of the defining lines of that summer.",
      },
      {
        zh: "两年后他兑现承诺，2016 年在总决赛带着三个FMVP逆转勇士。",
        en: "Two years later he cashed it in, arriving at the 2016 Finals with three straight FMVP awards.",
      },
    ],
    category: "warm",
    playerIds: ["lebron"],
    teamIds: ["lakers", "heat"],
    season: "2014-15",
    year: 2014,
    month: 7,
    day: 25,
    tags: ["lebron", "return", "history"],
    views: 167400,
    likes: 13300,
    updatedAt: "2024-02-14",
  },
  {
    id: "hakeem-dream-shake",
    slug: "hakeem-dream-shake",
    title: { zh: "「梦幻脚步」晃倒马刺内线", en: "The Dream Shake beats the Spurs big man" },
    excerpt: {
      zh: "1995 年西部决赛，奥拉朱旺连续晃开罗宾逊，成为篮球史上最著名的假动作。",
      en: "The 1995 West Finals fake that sent J.R. Reid falling is the most replayed move in basketball.",
    },
    body: [
      {
        zh: "面对马刺中锋大卫·罗宾逊，奥拉朱旺用一次完整的假动作把他晃倒在地。",
        en: "Against David Robinson, Olajuwon faked him so hard that Robinson went down.",
      },
      {
        zh: "慢镜头里那一步几乎察觉不到，人球分开的瞬间被反复研究。",
        en: "In slow motion the separation is nearly invisible, and the split is studied frame by frame.",
      },
      {
        zh: "此后所有中锋都被要求「别被晃倒」，「梦幻脚步」成为防守教科书的反例。",
        en: "Every center since has been told 'don't get shook', making the Dream Shake the standard defensive cautionary tale.",
      },
    ],
    category: "iconic",
    playerIds: ["hakeem"],
    teamIds: ["rockets"],
    season: "1994-95",
    year: 1995,
    month: 5,
    day: 22,
    tags: ["moves", "olajuwon", "playoffs"],
    views: 131900,
    likes: 10250,
    updatedAt: "2024-01-30",
  },
];

export const timeline: TimelineEvent[] = [
  {
    id: "tl-1991-finals",
    date: "1991-06-12",
    season: "1990-91",
    title: { zh: "公牛拿下第一个冠军，皮蓬主动请缨防守魔术师", en: "Bulls win the first title; Pippen volunteers for Magic" },
    description: {
      zh: "芝加哥 4-1 击败湖人，开启王朝，也留下了皮蓬「我打他」的经典片段。",
      en: "Chicago beat the Lakers 4-1 to start the dynasty, and left us the 'I'll take him' clip.",
    },
    category: "iconic",
    relatedIds: ["pippen-lakers-defense", "jordan-crying-meme"],
  },
  {
    id: "tl-1995-dreamshake",
    date: "1995-05-22",
    season: "1994-95",
    title: { zh: "梦幻脚步晃倒罗宾逊", en: "The Dream Shake sends Robinson to the floor" },
    description: {
      zh: "火箭在西部决赛里用一次假动作定义了奥拉朱旺的历史地位。",
      en: "One fake in the West Finals defined Olajuwon's legacy.",
    },
    category: "iconic",
    relatedIds: ["hakeem-dream-shake"],
  },
  {
    id: "tl-1998-last-shot",
    date: "1998-06-14",
    season: "1997-98",
    title: { zh: "最后一投与公牛王朝落幕", en: "The last shot and the end of a dynasty" },
    description: {
      zh: "乔丹抢断命中绝杀，湖人在主场捧起总冠军。",
      en: "Jordan's steal and buzzer-beater, and the Lakers lifting the title in Los Angeles.",
    },
    category: "iconic",
    relatedIds: ["jordan-crying-meme", "tongue-out"],
  },
  {
    id: "tl-2006-81",
    date: "2006-01-22",
    season: "2005-06",
    title: { zh: "科比单场 81 分", en: "Kobe scores 81" },
    description: {
      zh: "斯台普斯中心见证篮球史上第二高的单场得分。",
      en: "The Staples Center hosts the second-highest single-game scoring total ever.",
    },
    category: "iconic",
    relatedIds: ["kobe-81", "mamba-mentality"],
  },
  {
    id: "tl-2010-mental",
    date: "2010-06-23",
    season: "2009-10",
    title: { zh: "「你还要我做什么」", en: "'What else can I give you?'" },
    description: {
      zh: "夺冠后的答记者问定义了「曼巴精神」一词的来源。",
      en: "The post-title press answer that gave 'Mamba Mentality' its origin story.",
    },
    category: "warm",
    relatedIds: ["mamba-mentality"],
  },
  {
    id: "tl-2014-return",
    date: "2014-07-25",
    season: "2014-15",
    title: { zh: "詹姆斯宣布回归骑士", en: "LeBron announces his return to Cleveland" },
    description: {
      zh: "一封长文与一句「我欠克立夫兰一个冠军」引爆了整个夏天。",
      en: "One long letter and one promise set the summer on fire.",
    },
    category: "warm",
    relatedIds: ["lebron-cleveland-return"],
  },
  {
    id: "tl-2016-noodles",
    date: "2017-06-12",
    season: "2016-17",
    title: { zh: "库里 MVP 端着方便面领奖", en: "Curry accepts the MVP award with noodles in hand" },
    description: {
      zh: "夺冠当晚的随性一幕，成为那一年最火的表情包。",
      en: "A casual frame from title night became that year's most shared image.",
    },
    category: "funny",
    relatedIds: ["warriors-cup-noodles", "elemento"],
  },
  {
    id: "tl-2021-53",
    date: "2021-01-03",
    season: "2020-21",
    title: { zh: "库里单场 53 分", en: "Curry scores 53" },
    description: {
      zh: "麦迪逊广场花园之夜，第四节 27 分带走比赛。",
      en: "At MSG, 27 fourth-quarter points seal the night.",
    },
    category: "iconic",
    relatedIds: ["curry-53-point-game", "text-me"],
  },
  {
    id: "tl-2023-kd-account",
    date: "2023-12-11",
    season: "2023-24",
    title: { zh: "「KD 掉粉」账号与凯尔特人交易", en: "The KD account and the Boston trade" },
    description: {
      zh: "一个假账号见证了雷霆与凯尔特人围绕杜兰特的大交易。",
      en: "A parody account chronicled the Oklahoma City–Boston blockbuster.",
    },
    category: "controversy",
    relatedIds: ["kd-account"],
  },
  {
    id: "tl-2024-heat-culture",
    date: "2024-07-19",
    season: "2023-24",
    title: { zh: "「Heat Culture」成为球队官方文化", en: "'Heat Culture' becomes the official motto" },
    description: {
      zh: "热火把更衣室仪式写进品牌叙事，成为全联盟传播最广的球队标签之一。",
      en: "Miami turns its ritual into a brand narrative and one of the league's most shared tags.",
    },
    category: "warm",
    relatedIds: ["heat-culture"],
  },
];

export const trivia: Trivia[] = [
  {
    id: "trivia-1",
    question: {
      zh: "NBA 历史上单场最高得分纪录是多少分？",
      en: "What is the highest single-game scoring record in NBA history?",
    },
    options: [
      { zh: "100 分", en: "100 points" },
      { zh: "81 分", en: "81 points" },
      { zh: "73 分", en: "73 points" },
      { zh: "78 分", en: "78 points" },
    ],
    answerIndex: 0,
    explanation: {
      zh: "库里在 1999 年 1 月 13 日对阵开拓者的比赛中得到 100 分，科比的 81 分位居第二。",
      en: "Curry scored 100 against Portland on January 13, 1999; Kobe's 81 sits in second place.",
    },
  },
  {
    id: "trivia-2",
    question: {
      zh: "NBA 单场助攻纪录是多少次？",
      en: "What is the single-game assist record?",
    },
    options: [
      { zh: "22 次", en: "22 assists" },
      { zh: "25 次", en: "25 assists" },
      { zh: "30 次", en: "30 assists" },
      { zh: "18 次", en: "18 assists" },
    ],
    answerIndex: 1,
    explanation: {
      zh: "斯科蒂·斯凯尔斯在 1990 年 1 月 30 日对阵掘金的比赛中送出 25 次助攻。",
      en: "Scott Skiles recorded 25 assists against the Nuggets on January 30, 1990.",
    },
  },
  {
    id: "trivia-3",
    question: {
      zh: "哪位球员是 NBA 历史上罚球次数最多的球员？",
      en: "Who has attempted the most free throws in NBA history?",
    },
    options: [
      { zh: "勒布朗·詹姆斯", en: "LeBron James" },
      { zh: "卡尔·马龙", en: "Karl Malone" },
      { zh: "沙奎尔·奥尼尔", en: "Shaquille O'Neal" },
      { zh: "科比·布莱恩特", en: "Kobe Bryant" },
    ],
    answerIndex: 1,
    explanation: {
      zh: "卡尔·马龙生涯罚球出手 29846 次，位列历史第一。",
      en: "Karl Malone's 29,846 attempts are the most in league history.",
    },
  },
  {
    id: "trivia-4",
    question: {
      zh: "NBA 历史上最矮的球员是谁，身高多少？",
      en: "Who is the shortest player in NBA history, and how tall is he?",
    },
    options: [
      { zh: "泰勒·布兰森，1.60 米", en: "Tyrone 'Muggsy' Bogues, 1.60 m" },
      { zh: "内特·罗宾逊，1.60 米", en: "Nate Robinson, 1.60 m" },
      { zh: "布兰登·罗宾逊，1.68 米", en: "Brandon Robinson, 1.68 m" },
      { zh: "查尔斯·琼斯，1.60 米", en: "Charles Jones, 1.60 m" },
    ],
    answerIndex: 0,
    explanation: {
      zh: "「小个子上篮」塔克·布兰森（昵称 Mugsy）身高约 1.60 米，是联盟历史最矮的球员。",
      en: "Tyrone 'Muggsy' Bogues, at roughly 5'3\", is the shortest player to appear in an NBA game.",
    },
  },
  {
    id: "trivia-5",
    question: {
      zh: "一支 NBA 球队最多曾连赢多少场？",
      en: "What is the longest winning streak in NBA history?",
    },
    options: [
      { zh: "33 连胜", en: "33 games" },
      { zh: "20 连胜", en: "20 games" },
      { zh: "27 连胜", en: "27 games" },
      { zh: "15 连胜", en: "15 games" },
    ],
    answerIndex: 0,
    explanation: {
      zh: "2019-20 赛季的洛杉矶湖人取得 33 连胜，位列 NBA 历史最长连胜纪录。",
      en: "The 2019-20 Los Angeles Lakers won 33 straight, the longest streak in NBA history.",
    },
  },
  {
    id: "trivia-6",
    question: {
      zh: "詹姆斯之外，NBA 历史上最年轻的 MVP 是谁？",
      en: "Who is the youngest MVP in NBA history other than LeBron?",
    },
    options: [
      { zh: "德文特·韦斯卡特", en: "Derrick Rose" },
      { zh: "迈克尔·乔丹", en: "Michael Jordan" },
      { zh: "鲍勃·麦卡杜尔", en: "Bob McAdoo" },
      { zh: "斯蒂芬·库里", en: "Stephen Curry" },
    ],
    answerIndex: 1,
    explanation: {
      zh: "迈克尔·乔丹在 1995 年以 22 岁 292 天拿到 MVP，至今仍是最年轻纪录保持者。",
      en: "Michael Jordan won the 1995 MVP at 22 years and 292 days, a record that still stands.",
    },
  },
  {
    id: "trivia-7",
    question: {
      zh: "NBA 球鞋中出现次数最多的球员签名鞋款属于谁？",
      en: "Which player has the most signature shoes in NBA history?",
    },
    options: [
      { zh: "迈克尔·乔丹", en: "Michael Jordan" },
      { zh: "勒布朗·詹姆斯", en: "LeBron James" },
      { zh: "科比·布莱恩特", en: "Kobe Bryant" },
      { zh: "凯文·杜兰特", en: "Kevin Durant" },
    ],
    answerIndex: 0,
    explanation: {
      zh: "乔主的 Air 系列至今仍是销量最高的签名鞋系列之一。",
      en: "The Air line remains one of the best-selling signature shoe series ever.",
    },
  },
  {
    id: "trivia-8",
    question: {
      zh: "NBA 历史上第一个推出球衣背面姓名的是哪位球员？",
      en: "Who was the first player to have his name on the back of his jersey?",
    },
    options: [
      { zh: "奥登·约翰逊", en: "Odean Johnson" },
      { zh: "魔术师·约翰逊", en: "Magic Johnson" },
      { zh: "卡里姆·阿卜杜勒-贾巴尔", en: "Kareem Abdul-Jabbar" },
      { zh: "比尔·沃尔顿", en: "Bill Walton" },
    ],
    answerIndex: 0,
    explanation: {
      zh: "1970-71 赛季的奥登·约翰逊成为第一位在球衣背面印有姓名的球员。",
      en: "Odean Johnson became the first player to wear his surname on the back of his jersey in 1970-71.",
    },
  },
];

export const ballotOptions = [
  {
    id: "ballot-1",
    title: { zh: "年度名场面", en: "Moment of the year" },
    items: [
      { id: "curry-53-point-game", label: { zh: "库里单场 53 分", en: "Curry's 53-point game" } },
      { id: "kobe-81", label: { zh: "科比单场 81 分", en: "Kobe's 81-point game" } },
      { id: "hakeem-dream-shake", label: { zh: "梦幻脚步", en: "The Dream Shake" } },
      { id: "pippen-lakers-defense", label: { zh: "皮蓬请缨防守魔术师", en: "Pippen takes on Magic" } },
    ],
  },
  {
    id: "ballot-2",
    title: { zh: "最搞笑失误", en: "Funniest blooper" },
    items: [
      { id: "warriors-cup-noodles", label: { zh: "MVP 端着泡面领奖", en: "MVP with a bowl of noodles" } },
      { id: "barkley-desk", label: { zh: "巴克利跳上解说台", en: "Barkley on the desk" } },
      { id: "kg-serious", label: { zh: "「KG 你没事吧」", en: "'Are you OK, KG?'" } },
      { id: "text-me", label: { zh: "「Text Me」庆祝", en: "The 'Text Me' celebration" } },
    ],
  },
];

export const seasons = Array.from(new Set(timeline.map((e) => e.season))).sort().reverse();

export const siteStats = {
  memes: memes.length,
  stories: stories.length,
  players: players.length,
  teams: teams.length,
  views: memes.reduce((sum, m) => sum + m.views, 0) + stories.reduce((sum, s) => sum + s.views, 0),
};

export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type LocalizedText = {
  zh: string;
  en: string;
};

export type Category = "funny" | "warm" | "iconic" | "controversy";

export type ContentType = "meme" | "story" | "trivia" | "timeline";

export interface Player {
  id: string;
  name: LocalizedText;
  shortName: string;
  teamIds: string[];
  number: string;
  position: string;
  country: LocalizedText;
  birthYear: number;
  accent: string;
  bio: LocalizedText;
  highlights: LocalizedText[];
}

export interface Team {
  id: string;
  name: LocalizedText;
  shortName: string;
  city: LocalizedText;
  founded: number;
  championships: number;
  titleYears: number[];
  conference: "East" | "West";
  division: "Atlantic" | "Central" | "Southeast" | "Northwest" | "Pacific" | "Southwest";
  arena: LocalizedText;
  colors: [string, string];
  accent: string;
  bio: LocalizedText;
  highlights: LocalizedText[];
  notablePlayers: LocalizedText[];
  motto?: LocalizedText;
}

export interface Meme {
  id: string;
  slug: string;
  title: LocalizedText;
  category: Category;
  summary: LocalizedText;
  origin: LocalizedText;
  scene: LocalizedText;
  evolution: LocalizedText;
  quote: LocalizedText;
  playerIds: string[];
  teamIds: string[];
  tags: string[];
  relatedMemeIds: string[];
  views: number;
  likes: number;
  updatedAt: string;
}

export interface Story {
  id: string;
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText[];
  category: Category;
  playerIds: string[];
  teamIds: string[];
  season: string;
  year: number;
  month: number;
  day: number;
  tags: string[];
  views: number;
  likes: number;
  source?: { label: LocalizedText; url: string };
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  season: string;
  title: LocalizedText;
  description: LocalizedText;
  category: Category;
  relatedIds: string[];
}

export interface Trivia {
  id: string;
  question: LocalizedText;
  options: LocalizedText[];
  answerIndex: number;
  explanation: LocalizedText;
}

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Submission {
  id: string;
  kind: "meme" | "story" | "link";
  title: string;
  content: string;
  sourceUrl: string;
  contact: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface VoteRecord {
  id: string;
  targetId: string;
  targetType: "meme" | "story";
  kind: "like" | "down" | "ballot";
  option?: string;
  createdAt: string;
}

export interface SearchFilters {
  query?: string;
  playerId?: string;
  teamId?: string;
  year?: number;
  tag?: string;
  category?: Category;
  type?: ContentType;
}

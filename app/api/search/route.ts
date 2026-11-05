import { NextResponse } from "next/server";
import { searchContent } from "@/lib/search";
import { isLocale, type Category } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const localeParam = searchParams.get("locale") ?? "zh";
  const locale = isLocale(localeParam) ? localeParam : "zh";
  const typeParam = searchParams.get("type");
  const categoryParam = searchParams.get("category");

  const results = searchContent(
    {
      query: searchParams.get("q") ?? "",
      playerId: searchParams.get("player") ?? undefined,
      teamId: searchParams.get("team") ?? undefined,
      year: searchParams.get("year") ? Number(searchParams.get("year")) : undefined,
      tag: searchParams.get("tag") ?? undefined,
      category: (categoryParam as Category | null) ?? undefined,
      type: (typeParam as never) ?? undefined,
    },
    locale,
  );

  return NextResponse.json({ ok: true, count: results.length, results });
}
import { NextResponse } from "next/server";
import { addVote, voteCount } from "@/lib/store";

export async function POST(request: Request) {
  let payload: { targetId?: string; targetType?: string; kind?: string };
  try {
    payload = (await request.json()) as { targetId?: string; targetType?: string; kind?: string };
  } catch {
    return NextResponse.json({ ok: false, message: "invalid json" }, { status: 400 });
  }

  if (!payload.targetId) {
    return NextResponse.json({ ok: false, message: "targetId is required" }, { status: 400 });
  }

  const targetType = payload.targetType === "story" ? "story" : "meme";
  const kind = payload.kind === "like" ? "like" : payload.kind === "down" ? "down" : "ballot";

  addVote({ targetId: payload.targetId, targetType, kind });

  return NextResponse.json({
    ok: true,
    votes: voteCount(payload.targetId, kind),
    total: voteCount(payload.targetId),
  });
}
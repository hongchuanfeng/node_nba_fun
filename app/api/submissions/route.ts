import { NextResponse } from "next/server";
import type { Submission } from "@/lib/types";
import { addSubmission } from "@/lib/store";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "POST { kind, title, content, sourceUrl, contact } to submit a story or meme.",
  });
}

export async function POST(request: Request) {
  let payload: Partial<Submission>;
  try {
    payload = (await request.json()) as Partial<Submission>;
  } catch {
    return NextResponse.json({ ok: false, message: "invalid json" }, { status: 400 });
  }

  const kind: Submission["kind"] =
    payload.kind === "story" || payload.kind === "link" ? payload.kind : "meme";
  const title = (payload.title ?? "").trim().slice(0, 200);
  const content = (payload.content ?? "").trim().slice(0, 5000);
  const sourceUrl = (payload.sourceUrl ?? "").trim().slice(0, 500);
  const contact = (payload.contact ?? "").trim().slice(0, 200);

  if (!title || !content) {
    return NextResponse.json({ ok: false, message: "title and content are required" }, { status: 400 });
  }

  const submission = addSubmission({ kind, title, content, sourceUrl, contact });
  return NextResponse.json({ ok: true, submission }, { status: 201 });
}
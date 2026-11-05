"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";

export function VoteButton({
  targetId,
  targetType,
  label,
  dict,
  initialVotes,
}: {
  targetId: string;
  targetType: "meme" | "story";
  label: string;
  dict: Dictionary;
  initialVotes?: number;
}) {
  const [votes, setVotes] = useState(initialVotes ?? 0);
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  async function handleVote() {
    if (state === "done") return;
    setState("idle");
    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId, targetType, kind: "ballot" }),
      });
      if (!res.ok) throw new Error("vote failed");
      const data = (await res.json()) as { votes: number };
      setVotes(data.votes);
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <button className="btn small" onClick={handleVote} disabled={state === "done"}>
        {state === "done" ? dict.rankings.voted : dict.rankings.vote}
      </button>
      <span style={{ color: "var(--text-soft)", fontSize: 14 }}>
        {label} · {dict.rankings.votes} {votes}
      </span>
      {state === "done" && (
        <span style={{ color: "#4ade80", fontSize: 13 }}>{dict.rankings.thanks}</span>
      )}
      {state === "error" && (
        <span style={{ color: "#f87171", fontSize: 13 }}>{dict.tools.retry}</span>
      )}
    </div>
  );
}

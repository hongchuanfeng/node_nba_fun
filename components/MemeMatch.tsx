"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/types";

export interface MatchPair {
  id: string;
  meme: string;
  scene: string;
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function MemeMatch({
  pairs,
  locale,
  dict,
}: {
  pairs: MatchPair[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState<{ side: "meme" | "scene"; id: string } | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const sceneOrder = useMemo(() => shuffle(pairs), [pairs]);

  function choose(side: "meme" | "scene", id: string) {
    if (!started || matched.includes(id)) return;
    if (!selected) {
      setSelected({ side, id });
      return;
    }
    if (selected.side === side) {
      setSelected({ side, id });
      return;
    }
    const left = selected.side === "meme" ? selected.id : id;
    const right = selected.side === "scene" ? selected.id : id;
    if (left === right) {
      setMatched((m) => [...m, left]);
      setScore((s) => s + 1);
      setSelected(null);
    } else {
      setWrong(id);
      setTimeout(() => setWrong(null), 700);
      setSelected(null);
    }
  }

  function reset() {
    setStarted(true);
    setMatched([]);
    setSelected(null);
    setScore(0);
  }

  if (!started) {
    return (
      <div className="panel">
        <p style={{ color: "var(--text-soft)", marginTop: 0 }}>{dict.tools.matchHint}</p>
        <button className="btn" onClick={reset}>
          {dict.tools.startMatch}
        </button>
      </div>
    );
  }

  const done = matched.length === pairs.length;

  return (
    <div className="panel">
      <div className="meta-row" style={{ marginBottom: 12 }}>
        <span>
          {dict.tools.score}: {score}/{pairs.length}
        </span>
        {done && <span style={{ color: "#4ade80" }}>{dict.tools.finished}</span>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          {pairs.map((pair) => (
            <button
              key={pair.id}
              className={`quiz-option${matched.includes(pair.id) ? " correct" : ""}`}
              onClick={() => choose("meme", pair.id)}
            >
              {pair.meme}
            </button>
          ))}
        </div>
        <div>
          {sceneOrder.map((pair) => (
            <button
              key={pair.id}
              className={`quiz-option${matched.includes(pair.id) ? " correct" : ""}${wrong === pair.id ? " wrong" : ""}`}
              onClick={() => choose("scene", pair.id)}
            >
              {pair.scene}
            </button>
          ))}
        </div>
      </div>
      <button className="btn small ghost" style={{ marginTop: 14 }} onClick={reset}>
        {dict.tools.retry}
      </button>
    </div>
  );
}

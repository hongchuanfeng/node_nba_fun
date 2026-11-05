"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale, Trivia } from "@/lib/types";
import { pick } from "@/lib/utils";

export function TriviaQuiz({
  questions,
  locale,
  dict,
}: {
  questions: Trivia[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const current = questions[index % questions.length];

  function choose(optionIndex: number) {
    if (picked !== null) return;
    setPicked(optionIndex);
    if (optionIndex === current.answerIndex) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    setIndex((i) => (i + 1) % questions.length);
  }

  function random() {
    setPicked(null);
    setIndex(Math.floor(Math.random() * questions.length));
  }

  if (!current) return null;

  return (
    <div className="panel">
      <div className="meta-row" style={{ marginBottom: 12 }}>
        <span>
          {index + 1} / {questions.length}
        </span>
        <span>
          {dict.tools.score}: {score}
        </span>
      </div>
      <h3 style={{ fontSize: 18, margin: "0 0 16px" }}>{pick(current.question, locale)}</h3>
      {current.options.map((option, optionIndex) => {
        const classes = ["quiz-option"];
        if (picked !== null) {
          if (optionIndex === current.answerIndex) classes.push("correct");
          else if (optionIndex === picked) classes.push("wrong");
        }
        return (
          <button key={optionIndex} className={classes.join(" ")} onClick={() => choose(optionIndex)}>
            {pick(option, locale)}
          </button>
        );
      })}
      {picked !== null && (
        <div className="notice success">
          <strong>{dict.trivia.answer}:</strong> {pick(current.options[current.answerIndex], locale)}
          <br />
          {pick(current.explanation, locale)}
        </div>
      )}
      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <button className="btn small" onClick={next} disabled={picked === null}>
          {dict.trivia.next}
        </button>
        <button className="btn small ghost" onClick={random}>
          {dict.trivia.random}
        </button>
      </div>
    </div>
  );
}

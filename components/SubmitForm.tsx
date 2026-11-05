"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";

export function SubmitForm({ dict }: { dict: Dictionary }) {
  const [kind, setKind] = useState<"meme" | "story" | "link">("meme");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setStatus("error");
      setMessage(dict.submit.required);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, title, content, sourceUrl, contact }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) throw new Error(data.message ?? "failed");
      setStatus("success");
      setMessage(dict.submit.success);
      setTitle("");
      setContent("");
      setSourceUrl("");
      setContact("");
    } catch {
      setStatus("error");
      setMessage(dict.submit.error);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="kind">{dict.submit.kind}</label>
        <select id="kind" value={kind} onChange={(e) => setKind(e.target.value as typeof kind)}>
          <option value="meme">{dict.submit.kinds.meme}</option>
          <option value="story">{dict.submit.kinds.story}</option>
          <option value="link">{dict.submit.kinds.link}</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="title">{dict.submit.titleField}</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={dict.submit.titleField}
        />
      </div>
      <div className="field">
        <label htmlFor="content">{dict.submit.contentField}</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={dict.submit.contentField}
        />
      </div>
      <div className="field">
        <label htmlFor="source">{dict.submit.sourceField}</label>
        <input
          id="source"
          type="url"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          placeholder="https://"
        />
      </div>
      <div className="field">
        <label htmlFor="contact">{dict.submit.contactField}</label>
        <input
          id="contact"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="email / wechat"
        />
      </div>
      <button className="btn" type="submit" disabled={status === "loading"}>
        {status === "loading" ? dict.submit.submitting : dict.submit.submitCta}
      </button>
      {status === "success" && <div className="notice success">{message}</div>}
      {status === "error" && <div className="notice error">{message}</div>}
      <p style={{ color: "var(--text-soft)", fontSize: 13, marginTop: 16 }}>{dict.submit.policy}</p>
    </form>
  );
}

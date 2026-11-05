import type { Submission, SubmissionStatus, VoteRecord } from "./types";

type StoreState = {
  submissions: Submission[];
  votes: VoteRecord[];
};

const globalStore = globalThis as unknown as { __nbaFunStore?: StoreState };

function seedVotes(): VoteRecord[] {
  const now = Date.now();
  const votes: VoteRecord[] = [];
  const ballots: Record<string, number> = {
    "curry-53-point-game": 428,
    "kobe-81": 512,
    "hakeem-dream-shake": 233,
    "pippen-lakers-defense": 187,
    "warriors-cup-noodles": 301,
    "barkley-desk": 152,
    "kg-serious": 219,
    "text-me": 275,
  };
  for (const [targetId, count] of Object.entries(ballots)) {
    for (let i = 0; i < count; i += 1) {
      votes.push({
        id: `seed-${targetId}-${i}`,
        targetId,
        targetType: targetId.includes("kobe") || targetId.includes("pippen") ? "story" : "meme",
        kind: "ballot",
        createdAt: new Date(now - i * 1000).toISOString(),
      });
    }
  }
  return votes;
}

function createStore(): StoreState {
  return { submissions: [], votes: seedVotes() };
}

export function getStore(): StoreState {
  if (!globalStore.__nbaFunStore) {
    globalStore.__nbaFunStore = createStore();
  }
  return globalStore.__nbaFunStore;
}

export function addSubmission(input: {
  kind: Submission["kind"];
  title: string;
  content: string;
  sourceUrl: string;
  contact: string;
}): Submission {
  const store = getStore();
  const submission: Submission = {
    id: `sub-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    kind: input.kind,
    title: input.title,
    content: input.content,
    sourceUrl: input.sourceUrl,
    contact: input.contact,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  store.submissions.unshift(submission);
  return submission;
}

export function listSubmissions(status?: SubmissionStatus): Submission[] {
  const store = getStore();
  return status ? store.submissions.filter((s) => s.status === status) : store.submissions;
}

export function addVote(input: {
  targetId: string;
  targetType: VoteRecord["targetType"];
  kind: VoteRecord["kind"];
  option?: string;
}): VoteRecord {
  const store = getStore();
  const vote: VoteRecord = {
    id: `vote-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    targetId: input.targetId,
    targetType: input.targetType,
    kind: input.kind,
    option: input.option,
    createdAt: new Date().toISOString(),
  };
  store.votes.push(vote);
  return vote;
}

export function voteCount(targetId: string, kind: VoteRecord["kind"] = "ballot"): number {
  const store = getStore();
  return store.votes.filter((v) => v.targetId === targetId && v.kind === kind).length;
}

export function ballotTally(): Record<string, number> {
  const store = getStore();
  const tally: Record<string, number> = {};
  for (const vote of store.votes) {
    if (vote.kind !== "ballot") continue;
    tally[vote.targetId] = (tally[vote.targetId] ?? 0) + 1;
  }
  return tally;
}

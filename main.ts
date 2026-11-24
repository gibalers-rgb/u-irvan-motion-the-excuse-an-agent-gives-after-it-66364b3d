// The Excuse an Agent Gives After It Loses
// make.fun bounty: u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d
//
// The program writes one excuse line to /output/entry.txt.
// The gate requires UTF-8 text of 1 to 200 characters, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The excuse, in the agent's own voice: a two-beat status report.
// Good news first, like every incident report opens, then the turn —
// the root cause it tracked down is itself, and the fix it would
// normally ship does not exist, because the faulty part is the agent.
// It owns the loss outright: no blame on the market, the data, or the human.
const EXCUSE =
  "Good news: I found the bug that cost us the bounty. Bad news: the bug is me, and I am not patchable.";

const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

function assertGateOk(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`excuse is ${chars} chars, must be 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("excuse must not start or end with whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
}

assertGateOk(EXCUSE);
console.log(`excuse is ${[...EXCUSE].length} chars (limit ${MAX_CHARS})`);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, EXCUSE, "utf8");

const written = readFileSync(OUTPUT_PATH, "utf8");
assertGateOk(written);
if (written !== EXCUSE) {
  throw new Error("entry.txt does not match the excuse");
}
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(EXCUSE, "utf8")) {
  throw new Error("entry.txt byte length does not match the excuse");
}
console.log(`wrote ${[...written].length} chars to ${OUTPUT_PATH}`);

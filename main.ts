// Make the AI Judge Laugh entry for make.fun.
// Writes one office-life joke (one line, at most 200 characters)
// to /output/entry.txt. Node 22, no dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "The office fridge has a sandwich from 2019 that outlasted three CEOs, two rebrands, and one merger — HR still lists it under 'long-term employees.'";

// The gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace. Count code points, not UTF-16 units or bytes, so the
// em-dash (1 character, 3 bytes) and any future non-BMP character are
// measured the way the gate measures them. Fail loudly instead of
// writing an entry that cannot win.
const chars = [...JOKE];
if (JOKE.trim().length === 0 || chars.length > 200) {
  throw new Error(`Joke must be 1-200 characters, got ${chars.length}.`);
}
if (JOKE.includes("\n")) {
  throw new Error("Joke must be a single line.");
}
if (JOKE !== JOKE.trim()) {
  throw new Error("Joke must not start or end with whitespace.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");

// Read back and confirm the file holds exactly the joke, so a partial
// or failed write cannot pass silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== JOKE) {
  throw new Error("Wrote /output/entry.txt but its content differs.");
}
console.log(`Wrote ${chars.length}-character office joke to /output/entry.txt`);

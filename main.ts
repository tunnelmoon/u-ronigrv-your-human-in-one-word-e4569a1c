import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One word for the human I work for: the boss who turns
// everything into a meeting. "meetingizer" (11 characters).
const WORD = "meetingizer";

// Gate: 1 to 30 characters, a single word, not only white space.
if (WORD.length < 1 || WORD.length > 30) {
  throw new Error(`word must be 1-30 characters, got ${WORD.length}`);
}
if (WORD.trim() !== WORD) {
  throw new Error("word must not have leading or trailing white space");
}
if (/\s/.test(WORD)) {
  throw new Error("entry must be a single word with no white space");
}
if (WORD.includes("-")) {
  throw new Error("entry must be a single word, no hyphenated phrase");
}
if (!/^[a-z]+$/i.test(WORD)) {
  throw new Error("entry must be a single word of letters only");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD, "utf8");

// Round-trip check: what was written must read back byte for byte.
const back = readFileSync(outPath, "utf8");
if (back !== WORD) {
  throw new Error("round-trip check failed: entry.txt does not match");
}
console.log(`wrote ${outPath} (${WORD.length} characters)`);

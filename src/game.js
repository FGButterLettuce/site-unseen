export function normalizeGuess(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\.(com|org|net|io|co)(\/.*)?$/, "")
    .replace(/[^a-z0-9]/g, "");
}

export function levenshtein(a, b) {
  const rows = Array.from({ length: a.length + 1 }, (_, index) => [index]);
  for (let column = 0; column <= b.length; column += 1) rows[0][column] = column;
  for (let row = 1; row <= a.length; row += 1) {
    for (let column = 1; column <= b.length; column += 1) {
      const cost = a[row - 1] === b[column - 1] ? 0 : 1;
      rows[row][column] = Math.min(
        rows[row - 1][column] + 1,
        rows[row][column - 1] + 1,
        rows[row - 1][column - 1] + cost,
      );
    }
  }
  return rows[a.length][b.length];
}

export function matchesAnswer(guess, clue) {
  const candidate = normalizeGuess(guess);
  if (!candidate) return false;
  return [clue.answer, ...clue.aliases].some((answer) => {
    const normalized = normalizeGuess(answer);
    const tolerance = normalized.length >= 8 ? 2 : normalized.length >= 5 ? 1 : 0;
    return candidate === normalized || levenshtein(candidate, normalized) <= tolerance;
  });
}

export function scoreRound({ revealIndex, wrongGuesses, elapsedSeconds, solved }) {
  if (!solved) return 0;
  return Math.max(100, 1000 - revealIndex * 225 - wrongGuesses * 75 - Math.min(elapsedSeconds * 3, 240));
}

export function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function seededShuffle(items, seed) {
  const shuffled = [...items];
  let state = seed || 1;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function dailyClues(clues, date = new Date()) {
  const key = date.toISOString().slice(0, 10);
  return seededShuffle(clues, hashString(key)).slice(0, 5);
}

export function buildShareText(results, score, url) {
  const blocks = results.map((result) => (result.solved ? ["🟩", "🟨", "🟧"][Math.min(result.revealIndex, 2)] : "⬛")).join("");
  const solved = results.filter((result) => result.solved).length;
  return `Site Unseen ${solved}/${results.length} · ${score.toLocaleString()} pts\n${blocks}\n${url}`;
}

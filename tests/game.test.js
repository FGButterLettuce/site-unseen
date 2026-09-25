import { describe, expect, it } from "vitest";
import { buildShareText, dailyClues, matchesAnswer, normalizeGuess, scoreRound } from "../src/game.js";

const clue = { answer: "YouTube", aliases: ["youtube.com", "yt"] };

describe("game helpers", () => {
  it("normalizes domains and punctuation", () => {
    expect(normalizeGuess("https://www.YouTube.com/watch")).toBe("youtube");
  });

  it("accepts aliases and small typos", () => {
    expect(matchesAnswer("you tube", clue)).toBe(true);
    expect(matchesAnswer("youtub", clue)).toBe(true);
    expect(matchesAnswer("vimeo", clue)).toBe(false);
  });

  it("reduces points for reveals, misses, and time", () => {
    expect(scoreRound({ revealIndex: 0, wrongGuesses: 0, elapsedSeconds: 0, solved: true })).toBe(1000);
    expect(scoreRound({ revealIndex: 2, wrongGuesses: 2, elapsedSeconds: 10, solved: true })).toBe(370);
    expect(scoreRound({ revealIndex: 0, wrongGuesses: 0, elapsedSeconds: 0, solved: false })).toBe(0);
  });

  it("returns a stable daily set", () => {
    const data = Array.from({ length: 10 }, (_, id) => ({ id }));
    const day = new Date("2026-09-25T00:00:00Z");
    expect(dailyClues(data, day).map(({ id }) => id)).toEqual(dailyClues(data, day).map(({ id }) => id));
    expect(dailyClues(data, day)).toHaveLength(5);
  });

  it("builds spoiler-free share text", () => {
    const text = buildShareText([{ solved: true, revealIndex: 1 }, { solved: false, revealIndex: 2 }], 700, "https://example.test");
    expect(text).toContain("Site Unseen 1/2 · 700 pts");
    expect(text).not.toContain("YouTube");
  });
});

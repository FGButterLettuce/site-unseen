import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "public", "clues");

const captures = [
  { id: "google", url: "https://www.google.com/?hl=en&gl=us&pws=0", wait: 2500 },
  { id: "youtube", url: "https://www.youtube.com/?hl=en&gl=us", wait: 3500 },
  { id: "wikipedia", url: "https://en.wikipedia.org/wiki/World_Wide_Web", wait: 1500 },
  { id: "github", url: "https://github.com/openai/openai-python", wait: 3000 },
  {
    id: "stackoverflow",
    url: "https://stackoverflow.com/users/login",
    wait: 2500,
    prepare: async (page) => {
      const necessaryOnly = page.getByRole("button", { name: /necessary cookies only/i });
      if (await necessaryOnly.isVisible().catch(() => false)) await necessaryOnly.click();
    },
  },
  { id: "spotify", url: "https://open.spotify.com/", wait: 5000 },
  { id: "airbnb", url: "https://www.airbnb.com/login", wait: 8000 },
  { id: "amazon", url: "https://www.amazon.com/", wait: 4000 },
  {
    id: "canva",
    url: "https://www.canva.com/login/",
    wait: 5000,
    prepare: async (page) => {
      const acceptAll = page.getByRole("button", { name: /accept all cookies/i });
      if (await acceptAll.isVisible().catch(() => false)) await acceptAll.click();
    },
  },
  { id: "slack", url: "https://slack.com/signin#/signin", wait: 3500 },
];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const capture of captures) {
    const context = await browser.newContext({
      viewport: { width: 1200, height: 720 },
      locale: "en-US",
      timezoneId: "UTC",
      colorScheme: "light",
      reducedMotion: "reduce",
      extraHTTPHeaders: { DNT: "1", "Accept-Language": "en-US,en;q=0.9" },
    });
    const page = await context.newPage();
    const response = await page.goto(capture.url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    if (!response || response.status() >= 400) {
      throw new Error(`${capture.id} returned HTTP ${response?.status() ?? "unknown"}`);
    }
    await page.waitForTimeout(capture.wait);
    if (capture.prepare) {
      await capture.prepare(page);
      await page.waitForTimeout(750);
    }
    await page.screenshot({
      path: path.join(outputDirectory, `${capture.id}.jpg`),
      type: "jpeg",
      quality: 88,
      animations: "disabled",
    });
    console.log(`${capture.id}: ${response.status()} · ${await page.title()}`);
    await context.close();
  }
} finally {
  await browser.close();
}

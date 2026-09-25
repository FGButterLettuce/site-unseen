import { expect, test } from "@playwright/test";

test("plays a round and reveals more context after a miss", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "How well do you know the web?" })).toBeVisible();
  await page.getByRole("button", { name: "Play today’s five" }).click();
  await expect(page.getByText("Round 1 of 5")).toBeVisible();
  await page.getByLabel("Website name").fill("definitely wrong");
  await page.getByRole("button", { name: "Guess" }).click();
  await expect(page.getByText(/Not that one/)).toBeVisible();
  await expect(page.getByText("Reveal 2 of 3")).toBeVisible();
});

test("opens the rules dialog and supports a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  await page.getByRole("button", { name: "How to play" }).click();
  await expect(page.getByRole("dialog", { name: "How to play" })).toBeVisible();
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  expect(bodyWidth).toBeLessThanOrEqual(320);
});

for (const width of [320, 375, 414, 768]) {
  test(`keeps the home screen inside a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      primaryWraps: document.querySelector('[data-action="start-daily"]').getClientRects().length > 1,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    expect(dimensions.primaryWraps).toBe(false);
  });
}

test("keeps the complete hero action visible at 1280 × 800", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Play today’s five" })).toBeInViewport();
});

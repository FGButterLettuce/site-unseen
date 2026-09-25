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

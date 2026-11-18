import { expect, test } from "@playwright/test";

test("the Pages catalog works without API requests", async ({ page }) => {
  const unexpected: string[] = [];
  page.on("pageerror", (error) => unexpected.push(error.message));
  await page.route(/api\.probe\.gg|\/(?:api|classic)\//, (route) => {
    unexpected.push(route.request().url());
    return route.abort();
  });

  await page.goto("./");
  await expect(page.getByText("프로브하세요", { exact: true })).toBeVisible();
  await page
    .getByRole("textbox", { name: "신발명, 브랜드 검색하세요." })
    .last()
    .fill("Butter");
  await page
    .getByRole("region", { name: "검색 결과" })
    .getByRole("link")
    .filter({ hasText: "이지 부스트 350 V2 버터" })
    .click();
  await expect(
    page.getByText("카탈로그 보기 전용", { exact: true }),
  ).toBeDisabled();
  await page.reload();
  await expect(
    page.getByText("Yeezy Boost 350 V2 Butter", { exact: true }).first(),
  ).toBeVisible();

  await page.goto("./#/news");
  await expect(page.getByText("조회수 120", { exact: true })).toBeVisible();
  expect(unexpected).toEqual([]);
});

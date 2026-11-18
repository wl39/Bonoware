import { test, expect, type Page } from "@playwright/test";
async function login(page: Page, isMobile: boolean) {
  const email = `collector-${crypto.randomUUID()}@example.com`;
  await page.request.post("/api/auth/register", {
    data: { email, password: "Testing123!", name: "테스트 컬렉터" },
  });
  await page.request.post("/api/auth/logout");
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "open drawer" }).click();
    await page
      .getByRole("button", { name: "로그인/회원가입", exact: true })
      .click();
  } else await page.getByRole("button", { name: "Login", exact: true }).click();
  await expect(page.getByLabel("이메일", { exact: true })).toHaveValue(
    "demo@probe.local",
  );
  await page.getByLabel("이메일", { exact: true }).fill(email);
  await page.getByLabel("비밀번호", { exact: true }).fill("Testing123!");
  await page.getByRole("button", { name: "로그인", exact: true }).click();
  await expect(page.getByLabel("이메일", { exact: true })).toHaveCount(0);
  await page.goto("/#/profile/recap");
  await expect(page.getByText(email, { exact: true })).toBeVisible();
  return email;
}
test("original home and catalog layout, local images and route navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByText("당신의 특별한 신발을", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("프로브하세요", { exact: true })).toBeVisible();
  await expect(page.locator('img[alt="logo"]')).toBeVisible();
  await expect(page.locator("body")).not.toContainText("취향은 선명하게");
  await page.goto("/#/products");
  await expect(page.getByText("Release Years", { exact: true })).toBeAttached();
  await expect(page.locator('a[href*="/products/"]')).toHaveCount(8);
  await page.locator('a[href*="/products/"]').first().click();
  await expect(
    page.getByText("사이즈별 최저가로 구매하기", { exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("original search panel finds a model", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.getByText("프로브하세요", { exact: true })).toBeVisible();
  if (isMobile)
    await page.getByRole("button", { name: "Delete", exact: true }).click();
  const search = isMobile
    ? page.getByPlaceholder("검색", { exact: true })
    : page.getByRole("textbox", { name: "신발명, 브랜드 검색하세요." }).last();
  await search.click();
  await search.fill("Butter");
  await expect(
    page
      .locator('a[href*="/products/"]')
      .filter({ hasText: "이지 부스트 350 V2 버터" })
      .last(),
  ).toBeVisible();
  await page
    .locator('a[href*="/products/"]')
    .filter({ hasText: "이지 부스트 350 V2 버터" })
    .last()
    .click();
  await expect(page).toHaveURL(/products\//);
  await expect(
    page.getByText("사이즈별 최저가로 구매하기", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Yeezy Boost 350 V2 Butter", { exact: true }).first(),
  ).toBeVisible();
});
test("original login modal persists session on reload", async ({
  page,
  isMobile,
}) => {
  const email = await login(page, isMobile);
  await page.reload();
  await expect(page.getByText(email, { exact: true })).toBeVisible();
});
test("original news and release pages render without runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/#/news");
  await expect(page.getByText("조회수 120", { exact: true })).toBeVisible();
  await page.locator('a[href*="/news/"]').first().click();
  await expect(
    page.getByText("By PROBE,", { exact: false }).first(),
  ).toBeVisible();
  await page.goto("/#/new-releases");
  await expect(page.getByText("출시 예정 신발", { exact: true })).toBeVisible();
  await expect(
    page.getByText("나이키 에어 포스 1 오프화이트 볼트", { exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("original purchase stepper creates a persisted mock order", async ({
  page,
  isMobile,
}) => {
  await login(page, isMobile);
  const size =
    240 +
    ["desktop", "mobile", "safari", "iphone-safari", "firefox"].indexOf(
      test.info().project.name,
    ) *
      5;
  await page.goto("/#/products/jordan-unc");
  await page.getByText("사이즈별 최저가로 구매하기", { exact: true }).click();
  await page.getByText(String(size), { exact: true }).click();
  await page.getByRole("button", { name: "다음", exact: true }).click();
  await page.getByRole("button", { name: "주소 검색", exact: true }).click();
  await page.getByPlaceholder("상세 주소", { exact: true }).fill("데모 101호");
  await page.getByRole("button", { name: "다음", exact: true }).click();
  await page
    .getByRole("button", { name: "모의 주문하기", exact: true })
    .click();
  await expect(page).toHaveURL(/payments\/complete/);
  await page.goto("/#/profile/buying");
  await expect(
    page.getByText("에어 조던 1 오프화이트 유니버시티 블루", { exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByText("에어 조던 1 오프화이트 유니버시티 블루", { exact: true }),
  ).toBeVisible();
  await page
    .getByText("에어 조던 1 오프화이트 유니버시티 블루", { exact: true })
    .click();
  page.once("dialog", (dialog) => dialog.accept());
  await page
    .getByRole("button", { name: "모의 주문 취소", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "모의 주문 취소", exact: true }),
  ).toHaveCount(0);
});
test("original sell form registers and cancels a listing", async ({
  page,
  isMobile,
}) => {
  await login(page, isMobile);
  await page.goto("/#/sell");
  await page.getByRole("checkbox").last().check();
  await page.getByRole("button", { name: "다음", exact: true }).click();
  await page.getByLabel("판매 모델", { exact: true }).fill("Butter");
  await page.getByText("Yeezy Boost 350 V2 Butter", { exact: true }).click();
  await page.getByLabel("판매 사이즈", { exact: true }).fill("260");
  await page.getByLabel("판매 금액", { exact: true }).fill("220000");
  await page.getByRole("button", { name: "판매 등록", exact: true }).click();
  await expect(page).toHaveURL(/profile\/selling/);
  await expect(
    page.getByText("이지 부스트 350 V2 버터", { exact: true }),
  ).toBeVisible();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "판매 취소", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "판매 취소", exact: true }),
  ).toHaveCount(0);
});

test("repeated search, filter buttons, logo and navigation keep the page alive without service workers", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#/products");
  if (!isMobile) {
    await page.getByPlaceholder("신발명, 브랜드 검색하세요.").fill("Jordan");
    const result = page
      .locator('a[href*="/products/"]')
      .filter({ hasText: "에어 조던 1 오프화이트 유니버시티 블루" })
      .first();
    await result.click();
    await expect(
      page.getByText("사이즈별 최저가로 구매하기", { exact: true }),
    ).toBeVisible();
  }
  await page.getByRole("link", { name: "logo", exact: true }).click();
  await expect(page.getByText("프로브하세요", { exact: true })).toBeVisible();
  await page.goto("/#/products");
  if (!isMobile) {
    await page.getByText("정렬 방식", { exact: true }).click();
    await page.getByText("가격순", { exact: true }).click();
    await page.getByText("260", { exact: true }).first().click();
  }
  await expect(page.locator('img[alt="logo"]')).toBeVisible();
  await page.goto("/#/products/not-a-product");
  await expect(page.getByRole("alert")).toContainText(
    "상품을 찾을 수 없습니다.",
  );
  await page.getByRole("link", { name: "logo", exact: true }).click();
  await expect(page.getByText("프로브하세요", { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

import { test, expect, type Page } from "@playwright/test";
async function demoLogin(page: Page) {
  await page.goto("/#/login");
  await page.getByRole("button", { name: "데모 계정으로 바로 시작" }).click();
  await expect(page.getByRole("heading", { name: /반가워요/ })).toBeVisible();
}
test("catalog search, filters, sorting and empty results", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "스니커즈 검색" }).fill("350");
  await page.getByRole("button", { name: "검색", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByLabel("정렬", { exact: true }).selectOption("price-asc");
  await expect(page.locator(".product-card").first()).toContainText("Antlia");
  await page.getByRole("button", { name: "Jordan", exact: true }).click();
  await expect(page.getByText("아직 만날 스니커즈가 없어요.")).toBeVisible();
  await page.getByRole("button", { name: "필터 초기화" }).click();
  await expect(page.locator(".product-card")).toHaveCount(8);
  await page.goto("/#/new-releases");
  await expect(page.locator(".product-card")).toHaveCount(2);
  await expect(
    page.getByText("가상 발매 일정", { exact: true }).first(),
  ).toBeVisible();
});
test("login errors, persisted wishlist, comments and logout", async ({
  page,
}) => {
  await page.goto("/#/login");
  await page.getByLabel("이메일", { exact: true }).fill("demo@probe.local");
  await page.getByLabel("비밀번호", { exact: true }).fill("wrong");
  await page.getByRole("button", { name: "로그인", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("올바르지 않습니다");
  await page.getByRole("button", { name: "데모 계정으로 바로 시작" }).click();
  await expect(page.getByRole("heading", { name: /반가워요/ })).toBeVisible();
  await page.goto("/#/products/jordan-unc");
  await page.getByRole("button", { name: "관심 저장", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "관심 상품에 저장됨" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "관심 상품에 저장됨" }),
  ).toBeVisible();
  await page
    .getByLabel("댓글 남기기", { exact: true })
    .fill("나의 아카이브 테스트 <b>text</b>");
  await page.getByRole("button", { name: "댓글 등록" }).click();
  await expect(page.locator(".comment").first()).toContainText(
    "나의 아카이브 테스트 <b>text</b>",
  );
  await page.goto("/#/profile/following");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByRole("button", { name: "로그아웃" }).click();
  await expect(page).toHaveURL(/#\/$/);
  await page.goto("/#/profile/following");
  await expect(
    page.getByRole("button", { name: "데모 계정으로 바로 시작" }),
  ).toBeVisible();
});
test("buy, verify totals, persist order, cancel and restore stock", async ({
  page,
}) => {
  await demoLogin(page);
  await page.goto("/#/products/jordan-unc");
  await page.getByRole("button", { name: "260", exact: true }).click();
  const count = await page.locator("#offer option:not([disabled])").count();
  await page.getByRole("button", { name: "구매 체험하기" }).click();
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  await modal.getByLabel("받는 분", { exact: true }).fill("가상 구매자");
  await modal
    .getByLabel("배송 주소", { exact: true })
    .fill("서울시 데모구 테스트로 123");
  await modal.getByRole("checkbox").check();
  await modal.getByRole("button", { name: "모의 주문 확정" }).click();
  await expect(page).toHaveURL(/#\/profile\/orders$/);
  await expect(page.locator(".activity-card")).toHaveCount(1);
  await expect(page.locator(".activity-card")).toContainText("가상 구매자");
  await expect(page.locator(".activity-card")).toContainText("1,383,000원");
  await page.reload();
  await expect(page.locator(".activity-card")).toHaveCount(1);
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "주문 취소", exact: true }).click();
  await expect(page.locator(".activity-card .pill")).toContainText("주문 취소");
  await page.goto("/#/products/jordan-unc");
  await page.getByRole("button", { name: "260", exact: true }).click();
  await expect(page.locator("#offer option:not([disabled])")).toHaveCount(
    count,
  );
});
test("register, sell, prevent self purchase and cancel listing", async ({
  page,
}) => {
  await page.goto("/#/register");
  await page.getByLabel("닉네임", { exact: true }).fill("테스트 컬렉터");
  await page.getByLabel("이메일", { exact: true }).fill("test@example.com");
  await page.getByLabel("비밀번호", { exact: true }).fill("Testing123!");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "가입하고 시작하기" }).click();
  await expect(
    page.getByRole("heading", { name: /테스트 컬렉터/ }),
  ).toBeVisible();
  await page.goto("/#/sell");
  await page
    .getByRole("combobox", { name: "판매할 상품" })
    .selectOption("jordan-unc");
  await page.getByLabel("사이즈", { exact: true }).selectOption("260");
  await page.getByLabel("상품 상태", { exact: true }).selectOption("used");
  await page.getByLabel("판매 금액 (원)", { exact: true }).fill("120000");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "판매 등록하기" }).click();
  await expect(page).toHaveURL(/#\/profile\/selling$/);
  await expect(page.locator(".activity-card")).toContainText("120,000원");
  await page.goto("/#/products/jordan-unc");
  await page.getByRole("button", { name: "260", exact: true }).click();
  await expect(
    page.locator("#offer option").filter({ hasText: "내 매물" }),
  ).toBeDisabled();
  await page.goto("/#/profile/selling");
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "판매 취소", exact: true }).click();
  await expect(page.locator(".activity-card .pill")).toContainText("판매 취소");
});
test("journal, missing routes, responsive layout and no legacy API calls", async ({
  page,
}) => {
  const errors: string[] = [],
    external: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (
      /api\.probe\.gg|amazonaws\.com|cognito|bootpay|iamport/.test(
        request.url(),
      )
    )
      external.push(request.url());
  });
  await page.goto("/");
  await expect(page.locator(".product-card")).toHaveCount(4);
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
  await page.goto("/#/news");
  await page.locator(".news-card").first().click();
  await expect(page.locator(".prose")).toContainText("가상 데이터");
  await page.goto("/#/products/missing");
  await expect(page.getByRole("alert")).toContainText(
    "상품을 찾을 수 없습니다",
  );
  await page.goto("/#/missing");
  await expect(
    page.getByRole("heading", { name: "길을 조금 벗어났네요." }),
  ).toBeVisible();
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
test("reset clears persisted mock session", async ({ page }) => {
  await demoLogin(page);
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "데모 초기화", exact: true }).click();
  await expect(page).toHaveURL(/#\/$/);
  await page.goto("/#/profile");
  await expect(
    page.getByRole("button", { name: "데모 계정으로 바로 시작" }),
  ).toBeVisible();
});

test("synchronizes wishlist and logout between browser tabs", async ({
  page,
  context,
}) => {
  await demoLogin(page);
  const other = await context.newPage();
  await other.goto("/#/profile/following");
  await expect(other.getByText("취향을 하나씩 담아보세요.")).toBeVisible();
  await page.goto("/#/products/jordan-unc");
  await page.getByRole("button", { name: "관심 저장", exact: true }).click();
  await expect(other.locator(".product-card")).toHaveCount(1);
  await page.goto("/#/profile");
  await page.getByRole("button", { name: "로그아웃" }).click();
  await expect(
    other.getByRole("button", { name: "데모 계정으로 바로 시작" }),
  ).toBeVisible();
  await other.close();
});

test("recovers a corrupted local database and keyboard skip link keeps route intact", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem("corruption-test")) {
      localStorage.setItem("probe.database.v2", "{broken");
      sessionStorage.setItem("corruption-test", "done");
    }
  });
  await page.goto("/");
  await expect(page.getByRole("alert")).toContainText(
    "저장된 데모 데이터를 읽을 수 없습니다",
  );
  page.once("dialog", (dialog) => dialog.accept());
  await page
    .getByRole("button", { name: "데모 데이터 초기화", exact: true })
    .click();
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "본문으로 이동" });
  await skip.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  expect(page.url()).not.toContain("main-content");
});

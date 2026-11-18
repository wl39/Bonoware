import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { createDatabase, DB_KEY, type StorageLike } from "../src/app/database";
import { createHandlers } from "../src/app/handlers";
import { DEMO_EMAIL, DEMO_PASSWORD } from "../src/app/seed";
import type { Database, Order, Product, Session } from "../src/app/types";
import type { Detail } from "../src/app/api";

let values: Map<string, string>;
let storage: StorageLike;
let server: ReturnType<typeof setupServer>;
beforeEach(async () => {
  values = new Map();
  storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
  };
  server = setupServer(...createHandlers(createDatabase(storage), 0));
  await server.listen({ onUnhandledFrame: "error" });
});
afterEach(async () => {
  await server.close();
});
async function request<T = any>(path: string, method = "GET", data?: unknown) {
  const response = await fetch(`http://localhost/api${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    ...(data === undefined ? {} : { body: JSON.stringify(data) }),
  });
  return { status: response.status, data: (await response.json()) as T };
}
const login = () =>
  request<Session>("/auth/login", "POST", {
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
  });
const register = (email = "collector@example.com") =>
  request<Session>("/auth/register", "POST", {
    email,
    password: "Password123!",
    name: "컬렉터",
  });
const buy = (offerId = "stock-jordan-unc-260", extra = {}) =>
  request<Order>("/orders", "POST", {
    offerId,
    recipient: "프로브",
    address: "서울시 가상구 테스트로 123",
    ...extra,
  });

describe("catalog and account API", () => {
  it("searches model numbers, combines filters, sorts prices, and keeps releases separate", async () => {
    const all = await request<Product[]>("/products");
    expect(all.data).toHaveLength(1516);
    expect(
      new Set(
        all.data.map((p) => p.model.toLowerCase().replace(/[^a-z0-9]/g, "")),
      ).size,
    ).toBe(1516);
    expect(
      all.data.filter(
        (p) =>
          p.id.startsWith("sx-") &&
          p.image.startsWith("https://images.stockx.com/images/"),
      ),
    ).toHaveLength(1500);
    const filtered = await request<Product[]>(
      "/products?q=350&brand=Adidas&size=260&sort=price-asc",
    );
    expect(filtered.data.map((p) => p.id)).toEqual(
      expect.arrayContaining([
        "yeezy-antlia",
        "yeezy-butter",
        "yeezy-zebra",
        "yeezy-pirate-black",
        "yeezy-oxford-tan",
      ]),
    );
    expect(
      filtered.data.every((p) => p.brand === "Adidas" && p.sizes.includes(260)),
    ).toBe(true);
    const prices = filtered.data.map((p) => p.price!);
    expect(prices).toEqual(prices.toSorted((a, b) => a - b));
    expect(
      (await request<Product[]>("/products?q=AQ0818-148")).data[0].id,
    ).toBe("jordan-unc");
    expect(
      (await request<Product[]>("/products?upcoming=true")).data,
    ).toHaveLength(2);
    expect((await request<Product[]>("/products?q=nonexistent")).data).toEqual(
      [],
    );
    expect((await request("/products/missing")).status).toBe(404);
  });
  it("rejects anonymous protected requests and incorrect credentials", async () => {
    expect((await request("/profile")).status).toBe(401);
    expect(
      (
        await request("/auth/login", "POST", {
          email: DEMO_EMAIL,
          password: "incorrect",
        })
      ).status,
    ).toBe(401);
    expect((await login()).status).toBe(200);
    const session = await request<Session>("/session");
    expect(session.data.user?.email).toBe(DEMO_EMAIL);
    expect(JSON.stringify(session.data)).not.toMatch(/passwordHash|salt/);
    await request("/auth/logout", "POST");
    expect((await request<Session>("/session")).data.user).toBeNull();
  });
  it("validates registration and prevents duplicate accounts", async () => {
    expect(
      (
        await request("/auth/register", "POST", {
          email: "bad",
          password: "short",
          name: "a",
        })
      ).status,
    ).toBe(400);
    expect((await register()).status).toBe(201);
    expect((await register("COLLECTOR@example.com")).status).toBe(409);
  });
  it("persists account data across repository recreation and isolates wishlists", async () => {
    await login();
    await request("/following/jordan-unc", "PUT", { saved: true });
    await request("/following/jordan-unc", "PUT", { saved: true });
    expect((await request<Session>("/session")).data.following).toEqual([
      "jordan-unc",
    ]);
    await server.close();
    server = setupServer(...createHandlers(createDatabase(storage), 0));
    await server.listen();
    expect((await request<Session>("/session")).data.following).toEqual([
      "jordan-unc",
    ]);
    await register();
    expect((await request<Session>("/session")).data.following).toEqual([]);
    await login();
    await request("/following/jordan-unc", "PUT", { saved: false });
    expect((await request<Session>("/session")).data.following).toEqual([]);
  });
  it("requires authentication for comments, validates length, and stores literal text", async () => {
    expect(
      (
        await request("/products/jordan-unc/comments", "POST", {
          text: "hello",
        })
      ).status,
    ).toBe(401);
    await login();
    expect(
      (await request("/products/jordan-unc/comments", "POST", { text: " " }))
        .status,
    ).toBe(400);
    expect(
      (
        await request("/products/jordan-unc/comments", "POST", {
          text: "a".repeat(501),
        })
      ).status,
    ).toBe(400);
    await request("/products/jordan-unc/comments", "POST", {
      text: "<script>alert(1)</script>",
    });
    const detail = await request<Detail>("/products/jordan-unc");
    expect(detail.data.comments.at(-1)?.text).toBe("<script>alert(1)</script>");
  });
});
describe("orders and stock", () => {
  it("prices orders on the API, prevents duplicate purchases, and restores cancelled stock", async () => {
    await login();
    const result = await buy(undefined, { price: 1, total: 1 });
    expect(result.status).toBe(201);
    expect(result.data.total).toBe(result.data.price + 3000);
    expect(result.data.price).toBeGreaterThan(1);
    expect((await buy()).status).toBe(409);
    expect(
      (await request(`/orders/${result.data.id}/cancel`, "POST")).status,
    ).toBe(200);
    expect(
      (await request(`/orders/${result.data.id}/cancel`, "POST")).status,
    ).toBe(409);
    expect((await buy()).status).toBe(201);
  });
  it("serializes simultaneous purchases of the same stock", async () => {
    await login();
    const results = await Promise.all([buy(), buy()]);
    expect(results.map((r) => r.status).sort()).toEqual([201, 409]);
  });
  it("does not expose or cancel another account’s orders", async () => {
    await login();
    const order = (await buy()).data;
    await register();
    expect((await request("/profile")).data.orders).toEqual([]);
    expect((await request(`/orders/${order.id}/cancel`, "POST")).status).toBe(
      404,
    );
  });
  it("validates sale data, blocks buying own stock, and supports another account buying it", async () => {
    await login();
    const listing = {
      productId: "jordan-unc",
      price: 220000,
      size: 260,
      condition: "used",
    };
    expect(
      (await request("/listings", "POST", { ...listing, price: -1 })).status,
    ).toBe(400);
    expect(
      (await request("/listings", "POST", { ...listing, size: 999 })).status,
    ).toBe(400);
    expect(
      (
        await request("/listings", "POST", {
          ...listing,
          productId: "force-volt",
        })
      ).status,
    ).toBe(400);
    const sale = await request("/listings", "POST", listing);
    expect(sale.status).toBe(201);
    expect((await buy(sale.data.id)).status).toBe(400);
    await register();
    expect((await request(`/listings/${sale.data.id}`, "DELETE")).status).toBe(
      404,
    );
    const order = await buy(sale.data.id);
    expect(order.status).toBe(201);
    expect(order.data.price).toBe(220000);
    await login();
    expect((await request("/profile")).data.listings[0].status).toBe("sold");
    expect((await request(`/listings/${sale.data.id}`, "DELETE")).status).toBe(
      409,
    );
    await register("another@example.com");
    expect(
      (await request(`/orders/${order.data.id}/cancel`, "POST")).status,
    ).toBe(404);
    await request("/auth/login", "POST", {
      email: "collector@example.com",
      password: "Password123!",
    });
    await request(`/orders/${order.data.id}/cancel`, "POST");
    await login();
    expect((await request("/profile")).data.listings[0].status).toBe("on_sale");
    expect((await request(`/listings/${sale.data.id}`, "DELETE")).status).toBe(
      200,
    );
  });
});
describe("recovery", () => {
  it("adds the StockX catalog to an existing store without resetting or duplicating inventory", async () => {
    await login();
    const order = (await buy()).data;
    const old = JSON.parse(values.get(DB_KEY)!) as Database;
    old.catalogRevision = 1;
    const originalIds = new Set(
      old.products.filter((p) => !p.id.startsWith("sx-")).map((p) => p.id),
    );
    old.products = old.products.filter((p) => originalIds.has(p.id));
    old.offers = old.offers.filter((o) => originalIds.has(o.productId));
    values.set(DB_KEY, JSON.stringify(old));
    const additions = (await request<Product[]>("/products")).data.filter((p) =>
      p.id.startsWith("sx-"),
    );
    expect(additions).toHaveLength(1500);
    const model = additions[0].model;
    const newShoe = await request<Detail>(`/products/${model}`);
    expect(newShoe.data.product.sourceUrl).toMatch(/^https:\/\/stockx\.com\//);
    expect(
      (
        await request<Product[]>(`/products?q=${model.replace(/-/g, "")}`)
      ).data.some((p) => p.id === newShoe.data.product.id),
    ).toBe(true);
    expect(newShoe.data.offers).toHaveLength(11);
    expect((await request("/profile")).data.orders[0].id).toBe(order.id);
    expect((await buy()).status).toBe(409);
    expect(
      (await request<Detail>(`/products/${model}`)).data.offers,
    ).toHaveLength(11);
    expect((await request<Product[]>("/products?q=지브라")).data[0].model).toBe(
      "CP9654",
    );
  });
  it("returns useful errors for invalid JSON and unknown API routes", async () => {
    const invalid = await fetch("http://localhost/api/auth/login", {
      method: "POST",
      body: "{",
    });
    expect(invalid.status).toBe(400);
    expect((await request("/unknown")).status).toBe(404);
  });
  it("can reset corrupted storage and removes all user transactions", async () => {
    await login();
    await buy();
    values.set(DB_KEY, "invalid JSON");
    expect((await request("/session")).status).toBe(503);
    expect((await request("/demo/reset", "POST")).status).toBe(200);
    expect((await request<Session>("/session")).data.user).toBeNull();
    await login();
    expect((await request("/profile")).data.orders).toEqual([]);
  });
  it("reports blocked storage without pretending writes succeeded", async () => {
    await server.close();
    server = setupServer(
      ...createHandlers(
        createDatabase({
          getItem: () => {
            throw new Error("blocked");
          },
          setItem: () => {},
        }),
        0,
      ),
    );
    await server.listen();
    expect((await request("/session")).status).toBe(503);
  });
});

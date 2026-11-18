import { releaseCalendarDay } from "./archive-drops";
import { http, HttpResponse, delay, type JsonBodyType } from "msw";
import {
  ApiError,
  passwordHash,
  publicUser,
  requireUser,
  type Repository,
} from "./database";
import { news, SIZES } from "./seed";
import type { Database, Offer, Product } from "./types";
import { marketIndex, matchesStyleCode } from "./product-index";

const text = (value: unknown, name: string, min = 1, max = 200) => {
  if (
    typeof value !== "string" ||
    value.trim().length < min ||
    value.trim().length > max
  )
    throw new ApiError(400, `${name}을(를) ${min}~${max}자로 입력해주세요.`);
  return value.trim();
};
const body = async (request: Request): Promise<Record<string, unknown>> => {
  try {
    const value = await request.json();
    if (!value || Array.isArray(value) || typeof value !== "object")
      throw new Error();
    return value;
  } catch {
    throw new ApiError(400, "올바른 JSON 요청이 필요합니다.");
  }
};
const productIn = (db: Database, id: string) => {
  const product = db.products.find((p) => p.id === id || p.model === id);
  if (!product) throw new ApiError(404, "상품을 찾을 수 없습니다.");
  return product;
};
const withMarket = (p: Product, offers: Offer[] = []) => {
  return {
    ...p,
    price: offers.length ? Math.min(...offers.map((o) => o.price)) : null,
    sizes: [...new Set(offers.map((o) => o.size))].sort((a, b) => a - b),
  };
};

export function createHandlers(repository: Repository, latency = 100) {
  const respond = async (
    work: () => unknown | Promise<unknown>,
    status = 200,
  ) => {
    await delay(latency);
    try {
      return HttpResponse.json((await work()) as JsonBodyType, { status });
    } catch (error) {
      if (error instanceof ApiError)
        return HttpResponse.json(
          { message: error.message },
          { status: error.status },
        );
      console.error("Mock API failed:", error);
      return HttpResponse.json(
        { message: "요청을 처리하지 못했습니다. 다시 시도해주세요." },
        { status: 500 },
      );
    }
  };
  return [
    http.get("*/api/products", ({ request }) =>
      respond(() =>
        repository.transaction((db) => {
          const query = new URL(request.url).searchParams;
          const q = (query.get("q") || "").trim().toLocaleLowerCase();
          const brand = query.get("brand");
          const size = query.get("size");
          const { stock } = marketIndex(db);
          const upcomingOnly = query.get("upcoming") === "true";
          const today = releaseCalendarDay();
          let products = db.products
            .map((p) => withMarket(p, stock.get(p.id)))
            .filter(
              (p) =>
                (`${p.brand} ${p.name} ${p.subtitle} ${p.model} ${p.koreanName ?? ""} ${p.colorway ?? ""}`
                  .toLocaleLowerCase()
                  .includes(q) ||
                  matchesStyleCode(p.model, q)) &&
                (!brand || p.brand === brand) &&
                (!size || p.sizes.includes(Number(size))) &&
                (upcomingOnly
                  ? p.upcoming && p.releaseDate.slice(0, 10) >= today
                  : !p.upcoming),
            );
          switch (query.get("sort")) {
            case "price-asc":
              products.sort(
                (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity),
              );
              break;
            case "price-desc":
              products.sort(
                (a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity),
              );
              break;
            case "recent":
              products.sort((a, b) =>
                b.releaseDate.localeCompare(a.releaseDate),
              );
              break;
            default:
              products.sort(
                upcomingOnly
                  ? (a, b) => a.releaseDate.localeCompare(b.releaseDate)
                  : (a, b) => b.popular - a.popular,
              );
          }
          if (query.get("view") === "filters") {
            return products.map(({ price, releaseDate }) => ({
              price,
              releaseDate,
            }));
          }
          return products;
        }),
      ),
    ),
    http.get("*/api/products/:id", ({ params }) =>
      respond(() =>
        repository.transaction((db) => {
          const product = productIn(db, String(params.id));
          return {
            product: withMarket(product, marketIndex(db).stock.get(product.id)),
            offers: db.offers
              .filter(
                (o) => o.productId === product.id && o.status === "on_sale",
              )
              .map(({ userId, ...offer }) => ({
                ...offer,
                own: userId === db.session,
              })),
            comments: db.comments.filter((c) => c.productId === product.id),
          };
        }),
      ),
    ),
    http.get("*/api/session", () =>
      respond(() =>
        repository.transaction((db) => {
          const user = db.accounts.find((a) => a.id === db.session);
          return {
            user: user ? publicUser(user) : null,
            following: user?.following ?? [],
          };
        }),
      ),
    ),
    http.post("*/api/auth/login", ({ request }) =>
      respond(async () => {
        const input = await body(request);
        const email = text(input.email, "이메일", 3).toLowerCase();
        const password = text(input.password, "비밀번호", 1, 128);
        return repository.transaction(async (db) => {
          const account = db.accounts.find((a) => a.email === email);
          if (
            !account ||
            (await passwordHash(password, account.salt)) !==
              account.passwordHash
          )
            throw new ApiError(
              401,
              "이메일 또는 비밀번호가 올바르지 않습니다.",
            );
          db.session = account.id;
          return { user: publicUser(account), following: account.following };
        });
      }),
    ),
    http.post("*/api/auth/register", ({ request }) =>
      respond(async () => {
        const input = await body(request);
        const email = text(input.email, "이메일", 3).toLowerCase();
        const name = text(input.name, "닉네임", 2, 20);
        const password = text(input.password, "비밀번호", 8, 128);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          throw new ApiError(400, "올바른 이메일을 입력해주세요.");
        return repository.transaction(async (db) => {
          if (db.accounts.some((a) => a.email === email))
            throw new ApiError(409, "이미 가입된 이메일입니다.");
          const salt = crypto.randomUUID();
          const account = {
            id: crypto.randomUUID(),
            email,
            name,
            salt,
            passwordHash: await passwordHash(password, salt),
            following: [],
          };
          db.accounts.push(account);
          db.session = account.id;
          return { user: publicUser(account), following: [] };
        });
      }, 201),
    ),
    http.post("*/api/auth/logout", () =>
      respond(() =>
        repository.transaction((db) => {
          db.session = null;
          return { ok: true };
        }),
      ),
    ),
    http.put("*/api/following/:id", ({ request, params }) =>
      respond(async () => {
        const input = await body(request);
        if (typeof input.saved !== "boolean")
          throw new ApiError(400, "관심 상품 저장 여부가 필요합니다.");
        return repository.transaction((db) => {
          const user = requireUser(db);
          const product = productIn(db, String(params.id));
          user.following = user.following.filter((id) => id !== product.id);
          if (input.saved) user.following.push(product.id);
          return { following: user.following };
        });
      }),
    ),
    http.get("*/api/profile", () =>
      respond(() =>
        repository.transaction((db) => {
          const user = requireUser(db);
          return {
            orders: db.orders.filter((o) => o.userId === user.id).reverse(),
            listings: db.offers.filter((o) => o.userId === user.id).reverse(),
          };
        }),
      ),
    ),
    http.post("*/api/orders", ({ request }) =>
      respond(async () => {
        const input = await body(request);
        const offerId = text(input.offerId, "매물");
        const recipient = text(input.recipient, "받는 분", 2, 40);
        const address = text(input.address, "배송 주소", 5, 200);
        return repository.transaction((db) => {
          const user = requireUser(db);
          const offer = db.offers.find((o) => o.id === offerId);
          if (!offer || offer.status !== "on_sale")
            throw new ApiError(
              409,
              "이미 판매되었거나 판매가 종료된 매물입니다.",
            );
          if (offer.userId === user.id)
            throw new ApiError(400, "본인이 등록한 매물은 구매할 수 없습니다.");
          if (productIn(db, offer.productId).upcoming)
            throw new ApiError(400, "발매 전 상품은 구매할 수 없습니다.");
          const order = {
            id: crypto.randomUUID(),
            userId: user.id,
            productId: offer.productId,
            offerId,
            size: offer.size,
            price: offer.price,
            shipping: 3000,
            total: offer.price + 3000,
            recipient,
            address,
            status: "confirmed" as const,
            createdAt: new Date().toISOString(),
          };
          offer.status = "sold";
          db.orders.push(order);
          return order;
        });
      }, 201),
    ),
    http.post("*/api/orders/:id/cancel", ({ params }) =>
      respond(() =>
        repository.transaction((db) => {
          const user = requireUser(db);
          const order = db.orders.find(
            (o) => o.id === params.id && o.userId === user.id,
          );
          if (!order) throw new ApiError(404, "주문을 찾을 수 없습니다.");
          if (order.status === "cancelled")
            throw new ApiError(409, "이미 취소된 주문입니다.");
          order.status = "cancelled";
          const offer = db.offers.find((o) => o.id === order.offerId);
          if (offer) offer.status = "on_sale";
          return order;
        }),
      ),
    ),
    http.post("*/api/listings", ({ request }) =>
      respond(async () => {
        const input = await body(request);
        if (
          !SIZES.includes(Number(input.size)) ||
          typeof input.size !== "number"
        )
          throw new ApiError(400, "올바른 사이즈를 선택해주세요.");
        if (
          typeof input.price !== "number" ||
          !Number.isInteger(input.price) ||
          input.price < 10000 ||
          input.price > 10000000
        )
          throw new ApiError(
            400,
            "판매가는 10,000~10,000,000원 사이의 정수여야 합니다.",
          );
        if (input.condition !== "new" && input.condition !== "used")
          throw new ApiError(400, "상품 상태를 선택해주세요.");
        return repository.transaction((db) => {
          const user = requireUser(db);
          const product = productIn(db, String(input.productId));
          if (product.upcoming)
            throw new ApiError(400, "발매 전 상품은 등록할 수 없습니다.");
          const offer = {
            id: crypto.randomUUID(),
            productId: product.id,
            userId: user.id,
            size: input.size as number,
            price: input.price as number,
            condition: input.condition as "new" | "used",
            status: "on_sale" as const,
            createdAt: new Date().toISOString(),
          };
          db.offers.push(offer);
          return offer;
        });
      }, 201),
    ),
    http.delete("*/api/listings/:id", ({ params }) =>
      respond(() =>
        repository.transaction((db) => {
          const user = requireUser(db);
          const offer = db.offers.find(
            (o) => o.id === params.id && o.userId === user.id,
          );
          if (!offer) throw new ApiError(404, "매물을 찾을 수 없습니다.");
          if (offer.status !== "on_sale")
            throw new ApiError(409, "판매 중인 매물만 취소할 수 있습니다.");
          offer.status = "cancelled";
          return offer;
        }),
      ),
    ),
    http.post("*/api/products/:id/comments", ({ request, params }) =>
      respond(async () => {
        const input = await body(request);
        const message = text(input.text, "댓글", 1, 500);
        return repository.transaction((db) => {
          const user = requireUser(db);
          const product = productIn(db, String(params.id));
          const comment = {
            id: crypto.randomUUID(),
            productId: product.id,
            userId: user.id,
            author: user.name,
            text: message,
            createdAt: new Date().toISOString(),
          };
          db.comments.push(comment);
          return comment;
        });
      }, 201),
    ),
    http.get("*/api/news", () => respond(() => news)),
    http.get("*/api/news/:id", ({ params }) =>
      respond(() => {
        const article = news.find((n) => n.id === params.id);
        if (!article) throw new ApiError(404, "기사를 찾을 수 없습니다.");
        return article;
      }),
    ),
    http.post("*/api/demo/reset", () => respond(() => repository.reset())),
    http.all("*/api/*", () =>
      HttpResponse.json(
        { message: "지원하지 않는 API 요청입니다." },
        { status: 404 },
      ),
    ),
  ];
}

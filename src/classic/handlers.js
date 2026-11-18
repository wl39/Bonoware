import { http, HttpResponse } from "msw";
import {
  ApiError,
  requireUser,
  passwordHash,
  publicUser,
} from "../app/database";
import { classicProduct, classicAccount, classicNews } from "./models";
import { imagePath } from "../app/seed";
const background = imagePath("original-bg.jpg");
const banner = imagePath("original-banner.png");
const mobileBanner = imagePath("original-banner-mobile.png");
function matchesBrand(product, filter) {
  const brand = product.brand.toLowerCase();
  switch (filter.toLowerCase()) {
    case "airjordan":
    case "jordan":
      return brand === "jordan";
    case "yeezy":
      return /yeezy/i.test(product.name);
    case "other":
      return !["nike", "jordan", "adidas"].includes(brand);
    default:
      return brand === filter.toLowerCase();
  }
}

export function classicHandlers(repository) {
  return [
    http.all("*/classic/*", async ({ request }) => {
      try {
        const url = new URL(request.url),
          route = url.pathname.split("/classic")[1],
          q = url.searchParams;
        const body =
          request.method === "GET"
            ? {}
            : await request.json().catch(() => ({}));
        const forward = async (path, method = "GET", input) => {
          const response = await fetch(
            new URL(`${import.meta.env.BASE_URL}api${path}`, request.url),
            {
              method,
              headers: {
                "Content-Type": "application/json",
                ...(request.headers.get("cookie")
                  ? { Cookie: request.headers.get("cookie") }
                  : {}),
              },
              ...(input ? { body: JSON.stringify(input) } : {}),
            },
          );
          const data = await response.json();
          if (!response.ok) throw new ApiError(response.status, data.message);
          return data;
        };
        // Commands go through the same validated API as the existing persistence tests.
        if (route === "/auth/login" || route === "/auth/register") {
          try {
            const session = await forward(route, "POST", {
              ...body,
              name: body.nick_name || body.name,
            });
            return HttpResponse.json(
              classicAccount(session.user, session.following),
            );
          } catch (error) {
            return HttpResponse.json({ error: error.message });
          }
        }
        if (route === "/auth/logout") {
          await forward("/auth/logout", "POST");
          return HttpResponse.json({ ok: true });
        }
        if (route === "/protected/follow" || route === "/protected/unfollow")
          return HttpResponse.json(
            await forward(
              `/following/${encodeURIComponent(body.shoe)}`,
              "PUT",
              { saved: route.endsWith("/follow") },
            ),
          );
        if (route === "/protected/post_shoe_comment")
          return HttpResponse.json(
            await forward(
              `/products/${encodeURIComponent(body.shoe)}/comments`,
              "POST",
              { text: body.comment },
            ),
          );
        if (route === "/protected/createListing") {
          const id = await repository.transaction(
            (db) =>
              db.products.find(
                (p) =>
                  p.id === body.productId ||
                  classicProduct(db, p).name === body.productId,
              )?.id,
          );
          if (!id)
            throw new ApiError(404, "검색 결과에서 상품을 선택해주세요.");
          return HttpResponse.json(
            await forward("/listings", "POST", { ...body, productId: id }),
          );
        }
        if (route === "/protected/cancelOrder")
          return HttpResponse.json(
            await forward(
              `/orders/${encodeURIComponent(body.id)}/cancel`,
              "POST",
            ),
          );
        if (route === "/protected/cancelListing")
          return HttpResponse.json(
            await forward(`/listings/${encodeURIComponent(body.id)}`, "DELETE"),
          );
        if (route === "/protected/buy") {
          const detail = await forward(
            `/products/${encodeURIComponent(body.shoe)}`,
          );
          const offer = detail.offers
            .filter((o) => o.size === Number(body.shoeSize) && !o.own)
            .sort((a, b) => a.price - b.price)[0];
          if (!offer) throw new ApiError(409, "구매 가능한 매물이 없습니다.");
          const session = await forward("/session");
          return HttpResponse.json(
            await forward("/orders", "POST", {
              offerId: offer.id,
              recipient: session.user?.name || "프로브",
              address: body.address,
            }),
          );
        }
        const result = await repository.transaction(async (db) => {
          const all = db.products.map((p) => classicProduct(db, p));
          const find = (value) =>
            all.find(
              (p) => p._id === value || p.name === value || p.model === value,
            );
          const current = all.filter(
            (p) => !db.products.find((x) => x.id === p._id)?.upcoming,
          );
          const upcoming = all.filter(
            (p) => db.products.find((x) => x.id === p._id)?.upcoming,
          );
          const wrapper = (p) => ({ ...p, data: [p] });
          if (route === "/open") {
            const popularity = new Map(
              db.products.map((p) => [p.id, p.popular]),
            );
            const rec = [...current]
              .sort((a, b) => popularity.get(b._id) - popularity.get(a._id))
              .slice(0, 6);
            const recent = [...current]
              .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
              .slice(0, 6);
            const affordable = current
              .filter((p) => p.stockCount > 0)
              .sort((a, b) => a.lowestPrice - b.lowestPrice)
              .slice(0, 6);
            return [
              {
                mainpageimages: {
                  item: [
                    { images: background },
                    { images: [banner, banner, banner] },
                    { images: [mobileBanner, mobileBanner, mobileBanner] },
                  ],
                },
              },
              {
                graph: ["nike", "adidas", "others"].map((graphName) => ({
                  graphName,
                  date: [],
                })),
              },
              ...Array.from({ length: 4 }, () => ({ orderby: { item: rec } })),
              { item: rec.map(wrapper) },
              { orderby: { item: recent } },
              { item: affordable.map(wrapper) },
              { shoeNews: { item: classicNews() } },
              { orderby: { item: upcoming } },
              rec.map((p, i) => ({
                id: p._id,
                name: p.name,
                ticker: p.model,
                price: p.lowestPrice,
                lowHigh: i % 2 === 0,
              })),
            ];
          }
          if (
            [
              "/open/products",
              "/open/search",
              "/open/search_option",
              "/open/unreleasedShoe",
            ].includes(route)
          ) {
            let rows = route.endsWith("unreleasedShoe") ? upcoming : current;
            if (route.endsWith("/search")) {
              const value = (q.get("shoe") || "").toLowerCase();
              rows = rows.filter((p) =>
                `${p.name} ${p.brand} ${p.model}`.toLowerCase().includes(value),
              );
            }
            if (q.get("brand"))
              rows = rows.filter((p) => matchesBrand(p, q.get("brand")));
            if (q.get("year")) {
              const years = q.get("year").split(",");
              rows = rows.filter((p) =>
                years.includes(p.releaseDate.slice(0, 4)),
              );
            }
            if (q.get("price")) {
              const [min, max] = q.get("price").split(",").map(Number);
              rows = rows.filter(
                (p) => p.lowestPrice >= min && p.lowestPrice <= max,
              );
            }
            if (q.get("size")) {
              const sizes = q
                .get("size")
                .split(",")
                .filter(Boolean)
                .map(Number);
              rows = rows.filter((p) =>
                db.offers.some(
                  (o) =>
                    o.productId === p._id &&
                    o.status === "on_sale" &&
                    sizes.includes(o.size),
                ),
              );
            }
            if (q.has("lowestPrice"))
              rows.sort((a, b) => a.lowestPrice - b.lowestPrice);
            if (q.has("mostRecent"))
              rows.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
            if (q.has("mostPopular")) {
              const popularity = new Map(
                db.products.map((p) => [p.id, p.popular]),
              );
              rows.sort(
                (a, b) => popularity.get(b._id) - popularity.get(a._id),
              );
            }
            const limit =
              route === "/open/search" && q.get("limit") === "6" ? 6 : 12;
            const start =
              Math.max(0, Number.parseInt(q.get("skip"), 10) || 0) * limit;
            rows = rows.slice(start, start + limit + 1);
            return route.endsWith("/unreleasedShoe")
              ? { orderby: { item: rows } }
              : route.endsWith("/search_option")
                ? rows.map(wrapper)
                : rows;
          }
          if (["/open/shoe", "/open/shoeChangedData"].includes(route)) {
            const product = find(q.get("shoe"));
            if (!product) throw new ApiError(404, "상품을 찾을 수 없습니다.");
            return [
              { data: product },
              current.filter((p) => p._id !== product._id).slice(0, 6),
            ];
          }
          if (route === "/open/shoeSizePrice") {
            const p = find(q.get("shoe"));
            if (!p) throw new ApiError(404, "상품을 찾을 수 없습니다.");
            const offers = db.offers.filter(
              (o) => o.productId === p._id && o.status === "on_sale",
            );
            return [...new Set(offers.map((o) => o.size))].map((size) => ({
              _id: size,
              lowestPrice: Math.min(
                ...offers.filter((o) => o.size === size).map((o) => o.price),
              ),
            }));
          }
          if (route === "/open/allShoeSizePrice") {
            return db.orders
              .filter(
                (o) =>
                  o.productId === q.get("shoe") && o.status === "confirmed",
              )
              .map((o) => ({
                _id: { size: o.size, price: o.price },
                count: 1,
              }));
          }
          if (route === "/open/list_news") return { data: classicNews() };
          if (route === "/open/news") {
            const article = classicNews().find(
              (n) => n.title === q.get("news") || n._id === q.get("news"),
            );
            if (!article) throw new ApiError(404, "기사를 찾을 수 없습니다.");
            return { data: article };
          }
          if (route === "/open/findComments")
            return {
              comments: db.comments
                .filter((c) => c.productId === q.get("shoe"))
                .map((c) => ({
                  _id: c.id,
                  time: c.createdAt,
                  comment: c.text,
                  likeCount: 0,
                  correspondingUser: [{ nick_name: c.author }],
                })),
            };
          if (route === "/open/checkEmailInUse") {
            const used = db.accounts.some((a) => a.email === body.email);
            return used ? { error: true } : { success: true };
          }
          if (route === "/open/checkNickNameInUse") {
            const used = db.accounts.some((a) => a.name === body.nick_name);
            return used ? { error: true } : { success: true };
          }
          const user = requireUser(db);
          if (
            ["/protected/checkLogin", "/protected/getUserData"].includes(route)
          )
            return classicAccount(publicUser(user), user.following);
          if (route === "/protected/following")
            return {
              following: all.filter((p) => user.following.includes(p._id)),
            };
          if (route === "/protected/user_buying") {
            const rows = db.orders
              .filter((o) => o.userId === user.id)
              .map((o) => ({
                ...o,
                _id: o.id,
                shoe: [find(o.productId)],
                time: o.createdAt,
                paymentData: JSON.stringify({
                  p_at: o.createdAt,
                  tid: o.id,
                  card_name: "데모",
                  card_no: "0000",
                  pm: "모의 결제",
                  p: o.total,
                }),
                price: o.total,
                onSale: o.status === "confirmed" ? 1 : 0,
              }));
            return { data: rows, count: rows.length };
          }
          if (route.startsWith("/protected/user_selling")) {
            const rows = db.offers
              .filter((o) => o.userId === user.id)
              .map((o) => ({
                ...o,
                _id: o.id,
                shoe: [find(o.productId)],
                sentTime: o.createdAt,
                onSale:
                  o.status === "on_sale" ? 1 : o.status === "sold" ? 2 : 0,
                lowestPrice: find(o.productId)?.lowestPrice,
              }));
            return { data: rows, count: rows.length };
          }
          if (
            ["/protected/changePrice", "/protected/initializePrice"].includes(
              route,
            )
          ) {
            const offer = db.offers.find(
              (o) => o.id === body.shoe && o.userId === user.id,
            );
            if (!offer) throw new ApiError(404, "매물을 찾을 수 없습니다.");
            if (offer.status !== "on_sale")
              throw new ApiError(409, "판매 중인 매물만 수정할 수 있습니다.");
            const price = Number(body.price);
            if (!Number.isInteger(price) || price < 10000 || price > 10000000)
              throw new ApiError(
                400,
                "판매가는 10,000~10,000,000원이어야 합니다.",
              );
            offer.price = price;
            return { ok: true };
          }
          if (route.startsWith("/protected/changeProfile")) {
            Object.assign(
              user,
              Object.fromEntries(
                Object.entries(body).filter(([key]) =>
                  [
                    "shoe_size",
                    "address",
                    "detail",
                    "phone",
                    "nick_name",
                  ].includes(key),
                ),
              ),
            );
            return { ok: true };
          }
          throw new ApiError(404, "지원하지 않는 데모 API입니다.");
        });
        return HttpResponse.json(result);
      } catch (error) {
        if (error instanceof ApiError)
          return HttpResponse.json(
            { message: error.message },
            { status: error.status },
          );
        console.error(error);
        return HttpResponse.json(
          { message: "데모 요청을 처리하지 못했습니다." },
          { status: 500 },
        );
      }
    }),
  ];
}

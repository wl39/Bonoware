import { releaseCalendarDay } from "../app/archive-drops";
import { ApiError } from "../app/database";
import { marketIndex, matchesStyleCode } from "../app/product-index";
import { imagePath } from "../app/seed";
import { classicProduct, classicNews } from "./models";
const background = imagePath("original-bg.jpg");
const banners = [
  "banner-canvas.jpg",
  "banner-butter.jpg",
  "original-banner.png",
].map(imagePath);
const mobileBanners = [
  "banner-canvas.jpg",
  "banner-butter-mobile.jpg",
  "original-banner-mobile.png",
].map(imagePath);
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

function releaseFamily(product) {
  if (product.brand === "jordan") return "airJordan";
  const name = product.name.toLowerCase();
  if (product.brand === "nike") {
    if (name.includes("air force")) return "airForce";
    if (name.includes("air max")) return "airMax";
    return "nOther";
  }
  if (product.brand === "adidas") {
    if (name.includes("yeezy")) return "yeezy";
    if (/ultra ?boost/.test(name)) return "ultraBoost";
    if (name.includes("nmd")) return "nmd";
    if (name.includes("iniki")) return "iniki";
    return "aOther";
  }
  return "other";
}

export function catalogIndex(db) {
  const market = marketIndex(db);
  const all = db.products.map((p) => classicProduct(db, p, market));
  const find = (value) =>
    all.find((p) => p._id === value || p.name === value || p.model === value);
  return { market, all, find };
}

export function readCatalog(
  db,
  route,
  q,
  { market, all, find } = catalogIndex(db),
  publishedAt,
) {
  const upcomingIds = new Set(
    db.products.filter((p) => p.upcoming).map((p) => p.id),
  );
  const current = all.filter((p) => !upcomingIds.has(p._id));
  const today = releaseCalendarDay();
  const upcoming = all
    .filter(
      (p) => upcomingIds.has(p._id) && p.releaseDate.slice(0, 10) >= today,
    )
    .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
  const wrapper = (p) => ({ ...p, data: [p] });
  if (route === "/open") {
    const popularity = new Map(db.products.map((p) => [p.id, p.popular]));
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
            { images: banners },
            { images: mobileBanners },
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
      { shoeNews: { item: classicNews(publishedAt) } },
      { orderby: { item: upcoming.slice(0, 4) } },
      rec.map((p, i) => ({
        id: p._id,
        name: p.name,
        ticker: p.model,
        price: p.lowestPrice,
        lowHigh: i % 2 === 0,
      })),
    ];
  }
  if (route === "/open/unreleasedShoe") {
    const calendar =
      q.get("period") === "past"
        ? all
            .filter((p) => p.releaseDate && p.releaseDate.slice(0, 10) < today)
            .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
        : upcoming;
    const months = [...new Set(calendar.map((p) => p.releaseDate.slice(0, 7)))];
    const families = (q.get("subBrand") || "").split(",").filter(Boolean);
    const month = q.get("month");
    const rows = calendar.filter(
      (p) =>
        (!month || p.releaseDate.startsWith(month + "-")) &&
        (!families.length || families.includes(releaseFamily(p))),
    );
    const limit = 12;
    const start = Math.max(0, parseInt(q.get("skip"), 10) || 0) * limit;
    return {
      orderby: { item: rows.slice(start, start + limit) },
      months,
      total: rows.length,
      hasMore: start + limit < rows.length,
    };
  }
  if (
    ["/open/products", "/open/search", "/open/search_option"].includes(route)
  ) {
    let rows = current;
    if (route.endsWith("/search")) {
      const value = (q.get("shoe") || "").trim().toLowerCase();
      rows = rows.filter(
        (p) =>
          `${p.name} ${p.brand} ${p.model}`.toLowerCase().includes(value) ||
          matchesStyleCode(p.model, value),
      );
    }
    if (q.get("brand"))
      rows = rows.filter((p) => matchesBrand(p, q.get("brand")));
    if (q.get("year")) {
      const years = q.get("year").split(",");
      rows = rows.filter((p) => years.includes(p.releaseDate.slice(0, 4)));
    }
    if (q.get("price")) {
      const [min, max] = q.get("price").split(",").map(Number);
      rows = rows.filter((p) => p.lowestPrice >= min && p.lowestPrice <= max);
    }
    if (q.get("size")) {
      const sizes = q.get("size").split(",").filter(Boolean).map(Number);
      rows = rows.filter((p) =>
        market.stock.get(p._id)?.some((o) => sizes.includes(o.size)),
      );
    }
    if (q.has("lowestPrice"))
      rows.sort((a, b) => a.lowestPrice - b.lowestPrice);
    if (q.has("mostRecent"))
      rows.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
    if (q.has("mostPopular")) {
      const popularity = new Map(db.products.map((p) => [p.id, p.popular]));
      rows.sort((a, b) => popularity.get(b._id) - popularity.get(a._id));
    }
    const limit = route === "/open/search" && q.get("limit") === "6" ? 6 : 12;
    const start = Math.max(0, Number.parseInt(q.get("skip"), 10) || 0) * limit;
    rows = rows.slice(start, start + limit + 1);
    return route.endsWith("/search_option") ? rows.map(wrapper) : rows;
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
      .filter((o) => o.productId === q.get("shoe") && o.status === "confirmed")
      .map((o) => ({
        _id: { size: o.size, price: o.price },
        count: 1,
      }));
  }
  if (route === "/open/list_news") return { data: classicNews(publishedAt) };
  if (route === "/open/news") {
    const article = classicNews(publishedAt).find(
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
  throw new ApiError(404, "상품 자료를 찾을 수 없습니다.");
}

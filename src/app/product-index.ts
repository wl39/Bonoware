import type { Database, Offer, Order } from "./types";

export function marketIndex(db: Database) {
  const stock = new Map<string, Offer[]>();
  for (const offer of db.offers) {
    if (offer.status !== "on_sale") continue;
    const offers = stock.get(offer.productId);
    if (offers) offers.push(offer);
    else stock.set(offer.productId, [offer]);
  }

  const latestSales = new Map<string, Order>();
  for (const order of db.orders) {
    if (order.status !== "confirmed") continue;
    const latest = latestSales.get(order.productId);
    if (!latest || order.createdAt >= latest.createdAt) {
      latestSales.set(order.productId, order);
    }
  }
  return { stock, latestSales };
}

export const normalizeStyleCode = (code: string) =>
  code.toLowerCase().replace(/[^a-z0-9]/g, "");

export function matchesStyleCode(model: string, query: string) {
  // Support searches with or without the hyphen in a manufacturer's SKU.
  const code = normalizeStyleCode(query);
  return (
    code.length >= 4 &&
    /\d/.test(code) &&
    normalizeStyleCode(model).includes(code)
  );
}

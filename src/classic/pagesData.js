import { createSeed } from "../app/seed";
import { catalogIndex, readCatalog } from "./catalog";

// Publish only the repository's sample data. Never read a running server's store.
const publishedAt = Date.parse("2026-11-18T03:00:00Z");
const data = createSeed(new Date(publishedAt));
const index = catalogIndex(data);
export const filterValues = data.products
  .filter((p) => !p.upcoming)
  .map(({ price, releaseDate }) => ({ price, releaseDate }));

export function getPageData(path, params = {}) {
  const url = new URL(path, window.location.origin);
  for (const [key, value] of Object.entries(params))
    if (value != null) url.searchParams.set(key, value);
  return readCatalog(data, url.pathname, url.searchParams, index, publishedAt);
}

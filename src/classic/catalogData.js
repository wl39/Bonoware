import { api } from "../app/api";
import axios from "axios";
import { staticPages } from "./mode";

export async function catalogData(path, options = {}) {
  if (!staticPages) return axios.get("https://api.probe.gg" + path, options);
  const { getPageData } = await import("./pagesData");
  options.signal?.throwIfAborted();
  return { data: getPageData(path, options.params) };
}

export async function catalogFilters(signal) {
  if (!staticPages) return api("/products?view=filters", { signal });
  const { filterValues } = await import("./pagesData");
  signal?.throwIfAborted();
  return filterValues;
}

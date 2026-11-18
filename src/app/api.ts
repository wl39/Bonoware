import type { Session, Product, Comment } from "./types";
export const mockMode = import.meta.env.VITE_API_MODE !== "remote";
const base = mockMode
  ? `${import.meta.env.BASE_URL}api`
  : (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");
export class RequestError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${base}${path}`, {
      credentials: "include",
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  } catch {
    throw new RequestError(
      0,
      "연결할 수 없습니다. 네트워크 상태를 확인한 뒤 다시 시도해주세요.",
    );
  }
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new RequestError(
      response.status,
      "서버 응답을 읽을 수 없습니다. API 설정을 확인해주세요.",
    );
  }
  if (!response.ok)
    throw new RequestError(
      response.status,
      (data as { message?: string }).message || "요청을 처리하지 못했습니다.",
    );
  return data as T;
}
export const json = (data: unknown) => JSON.stringify(data);
export type Detail = {
  product: Product;
  offers: {
    id: string;
    size: number;
    price: number;
    condition: "new" | "used";
    own: boolean;
  }[];
  comments: Comment[];
};
export const getSession = () => api<Session>("/session");

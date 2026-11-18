import { createSeed, DEMO_EMAIL, DEMO_PASSWORD, upgradeCatalog } from "./seed";
import type { Account, Database } from "./types";

import { DB_KEY } from "./storage-key";
export { DB_KEY } from "./storage-key";
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
const hex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), (n) =>
    n.toString(16).padStart(2, "0"),
  ).join("");
export async function passwordHash(password: string, salt: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  return hex(
    await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: new TextEncoder().encode(salt),
        iterations: 100000,
        hash: "SHA-256",
      },
      key,
      256,
    ),
  );
}
export const publicUser = ({ id, email, name }: Account) => ({
  id,
  email,
  name,
});

export function createDatabase(storage: StorageLike) {
  let queue: Promise<unknown> = Promise.resolve();
  async function initial() {
    const db = createSeed();
    const salt = crypto.randomUUID();
    db.accounts.push({
      id: "demo-user",
      email: DEMO_EMAIL,
      name: "스니커즈 탐험가",
      salt,
      passwordHash: await passwordHash(DEMO_PASSWORD, salt),
      following: [],
    });
    return db;
  }
  async function read() {
    let raw: string | null;
    try {
      raw = storage.getItem(DB_KEY);
    } catch {
      throw new ApiError(
        503,
        "브라우저 저장소를 사용할 수 없습니다. 사이트 데이터 저장을 허용해주세요.",
      );
    }
    if (!raw) return initial();
    try {
      const db = JSON.parse(raw) as Database;
      if (
        db.version !== 2 ||
        !["products", "accounts", "offers", "orders", "comments"].every((k) =>
          Array.isArray(db[k as keyof Database]),
        )
      )
        throw new Error();
      upgradeCatalog(db);
      return db;
    } catch {
      throw new ApiError(
        503,
        "저장된 데모 데이터를 읽을 수 없습니다. 데모 초기화를 실행해주세요.",
      );
    }
  }
  async function write(db: Database) {
    try {
      storage.setItem(DB_KEY, JSON.stringify(db));
    } catch {
      throw new ApiError(
        503,
        "브라우저 저장 공간이 부족하거나 저장이 차단되어 있습니다.",
      );
    }
  }
  function transaction<T>(
    fn: (db: Database) => T | Promise<T>,
    reset = false,
  ): Promise<T> {
    const run = async () => {
      const work = async () => {
        const db = reset ? await initial() : await read();
        const result = await fn(db);
        await write(db);
        return result;
      };
      if (typeof navigator !== "undefined" && navigator.locks)
        return navigator.locks.request(DB_KEY, work);
      return work();
    };
    const result = queue.then(run, run);
    queue = result.catch(() => undefined);
    return result;
  }
  return { transaction, reset: () => transaction(() => ({ ok: true }), true) };
}
export type Repository = ReturnType<typeof createDatabase>;
export const requireUser = (db: Database) => {
  const account = db.accounts.find((a) => a.id === db.session);
  if (!account) throw new ApiError(401, "로그인 후 이용해주세요.");
  return account;
};

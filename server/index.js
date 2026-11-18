import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { AsyncLocalStorage } from "node:async_hooks";
import { getResponse } from "msw";
import { createHandlers } from "../src/app/handlers";
import { createDatabase, DB_KEY } from "../src/app/database";
import { classicHandlers } from "../src/classic/handlers";

const port = Number(process.env.PORT || 4173);
const root = path.resolve(process.env.PROBE_DIST || "dist");
const stateFile = path.resolve(
  process.env.PROBE_DATA_FILE || ".probe/state.json",
);
const requests = new AsyncLocalStorage();
let state = { database: null, sessions: {} };
if (fs.existsSync(stateFile))
  state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
const persist = () => {
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.writeFileSync(`${stateFile}.tmp`, JSON.stringify(state));
  fs.renameSync(`${stateFile}.tmp`, stateFile);
};
const storage = {
  getItem: (key) => (key === DB_KEY ? state.database : null),
  setItem: (key, value) => {
    if (key === DB_KEY) {
      state.database = value;
      persist();
    }
  },
};
const database = createDatabase(storage);
const repository = {
  transaction: (fn) =>
    database.transaction(async (db) => {
      const token = requests.getStore();
      db.session = state.sessions[token] ?? null;
      try {
        const result = await fn(db);
        state.sessions[token] = db.session;
        return result;
      } finally {
        db.session = null;
      }
    }),
  reset: async () => {
    await database.reset();
    state.sessions = {};
    persist();
    return { ok: true };
  },
};
const handlers = [
  ...classicHandlers(repository),
  ...createHandlers(repository, 0),
];
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".otf": "font/otf",
};
const send = (response, status, message) => {
  response.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(message);
};

const server = http.createServer(async (incoming, outgoing) => {
  try {
    const url = new URL(incoming.url, `http://127.0.0.1:${port}`);
    if (url.pathname.endsWith("/api/health") && incoming.method === "GET") {
      outgoing.writeHead(200, {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      });
      outgoing.end(JSON.stringify({ ok: true, runtime: "probe-node-mock" }));
      return;
    }
    if (/\/(api|classic)(\/|$)/.test(url.pathname)) {
      if (
        incoming.headers.origin &&
        !["GET", "HEAD"].includes(incoming.method)
      ) {
        if (new URL(incoming.headers.origin).host !== incoming.headers.host)
          return send(outgoing, 403, "요청 출처를 확인해주세요.");
      }
      const chunks = [];
      let length = 0;
      for await (const chunk of incoming) {
        length += chunk.length;
        if (length > 1048576)
          return send(outgoing, 413, "요청 크기가 너무 큽니다.");
        chunks.push(chunk);
      }
      const existing = /(?:^|;\s*)probe_session=([a-f0-9-]{36})(?:;|$)/.exec(
        incoming.headers.cookie || "",
      )?.[1];
      const token = existing || randomUUID();
      const headers = new Headers();
      for (const [key, value] of Object.entries(incoming.headers)) {
        if (value !== undefined)
          headers.set(key, Array.isArray(value) ? value.join(", ") : value);
      }
      headers.set("cookie", `probe_session=${token}`);
      const body = Buffer.concat(chunks).toString("utf8");
      const request = new Request(url, {
        method: incoming.method,
        headers,
        ...(body ? { body } : {}),
      });
      const response = await requests.run(token, () =>
        getResponse(handlers, request),
      );
      if (!response) return send(outgoing, 404, "API를 찾을 수 없습니다.");
      outgoing.statusCode = response.status;
      response.headers.forEach((value, key) => outgoing.setHeader(key, value));
      outgoing.setHeader("Cache-Control", "no-store");
      outgoing.setHeader(
        "Set-Cookie",
        `probe_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${incoming.headers["x-forwarded-proto"] === "https" ? "; Secure" : ""}`,
      );
      outgoing.end(Buffer.from(await response.arrayBuffer()));
      return;
    }
    if (incoming.method !== "GET" && incoming.method !== "HEAD")
      return send(outgoing, 405, "허용하지 않는 요청입니다.");
    const base = import.meta.env.BASE_URL;
    let relative = decodeURIComponent(url.pathname);
    if (base !== "/" && relative.startsWith(base))
      relative = relative.slice(base.length);
    relative = relative.replace(/^\/+/, "") || "index.html";
    const file = path.resolve(root, relative);
    if (!file.startsWith(root + path.sep))
      return send(outgoing, 403, "접근할 수 없는 파일입니다.");
    let source = file;
    if (!fs.existsSync(source) && relative.startsWith("assets/"))
      source = path.resolve(
        ".probe/asset-cache",
        relative.slice("assets/".length),
      );
    if (!fs.existsSync(source) || !fs.statSync(source).isFile())
      return send(outgoing, 404, "파일을 찾을 수 없습니다. 새로고침해주세요.");
    outgoing.writeHead(200, {
      "Content-Type": mime[path.extname(source)] || "application/octet-stream",
      "Cache-Control": relative.startsWith("assets/")
        ? "public, max-age=31536000, immutable"
        : "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    if (incoming.method === "HEAD") outgoing.end();
    else fs.createReadStream(source).pipe(outgoing);
  } catch (error) {
    console.error(error);
    if (!outgoing.headersSent)
      send(outgoing, 500, "요청 처리 중 오류가 발생했습니다.");
    else outgoing.end();
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`PROBE local API + app: http://127.0.0.1:${port}`),
);

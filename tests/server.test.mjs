import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import fs from "node:fs/promises";
import path from "node:path";

test("HTTP sessions stay isolated, orders survive restart, and old chunks remain available", async () => {
  await fs.mkdir(".probe", { recursive: true });
  const directory = await fs.mkdtemp(path.resolve(".probe/server-test-"));
  const port = 4192;
  const origin = `http://127.0.0.1:${port}`;
  let child;
  async function start() {
    child = spawn(process.execPath, ["server-build/index.mjs"], {
      env: {
        ...process.env,
        PORT: String(port),
        PROBE_DATA_FILE: path.join(directory, "state.json"),
        PROBE_DIST: directory,
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
    await Promise.race([
      once(child.stdout, "data"),
      once(child, "exit").then(() => {
        throw new Error("HTTP test server exited before startup");
      }),
    ]);
    assert.equal((await fetch(`${origin}/api/health`)).status, 200);
  }
  async function stop() {
    if (!child || child.exitCode !== null) return;
    child.kill();
    await once(child, "exit");
  }
  function client() {
    let cookie = "";
    return async (route, method = "GET", input) => {
      const response = await fetch(`${origin}${route}`, {
        method,
        headers: { Cookie: cookie, "Content-Type": "application/json" },
        ...(input ? { body: JSON.stringify(input) } : {}),
      });
      cookie = response.headers.get("set-cookie")?.split(";")[0] || cookie;
      return { status: response.status, data: await response.json() };
    };
  }
  try {
    await fs.writeFile(path.join(directory, "index.html"), "PROBE");
    await start();
    const a = client(),
      b = client(),
      guest = client();
    await a("/api/auth/register", "POST", {
      email: "alice@example.com",
      name: "앨리스",
      password: "Testing123!",
    });
    await b("/api/auth/register", "POST", {
      email: "bob@example.com",
      name: "보브",
      password: "Testing123!",
    });
    const [alice, bob, anonymous] = await Promise.all([
      a("/api/session"),
      b("/api/session"),
      guest("/api/session"),
    ]);
    assert.equal(alice.data.user.email, "alice@example.com");
    assert.equal(bob.data.user.email, "bob@example.com");
    assert.equal(anonymous.data.user, null);
    assert.equal((await guest("/api/profile")).status, 401);
    const purchase = {
      offerId: "stock-jordan-unc-260",
      recipient: "프로브",
      address: "서울시 가상구 테스트로 123",
    };
    const results = await Promise.all([
      a("/api/orders", "POST", purchase),
      b("/api/orders", "POST", purchase),
    ]);
    assert.deepEqual(results.map((r) => r.status).sort(), [201, 409]);
    const owner = results[0].status === 201 ? a : b;
    const other = owner === a ? b : a;
    const id = results.find((r) => r.status === 201).data.id;
    assert.equal((await other(`/api/orders/${id}/cancel`, "POST")).status, 404);
    await stop();
    await start();
    assert.equal((await owner("/api/profile")).data.orders[0].id, id);
    assert.equal((await owner(`/api/orders/${id}/cancel`, "POST")).status, 200);
    const home = await fetch(origin);
    assert.equal(home.headers.get("cache-control"), "no-store");
    assert.equal(await home.text(), "PROBE");
    // A tab opened before deployment can still import an archived lazy chunk.
    const archive = path.resolve(".probe/asset-cache/server-test-old-chunk.js");
    await fs.mkdir(path.dirname(archive), { recursive: true });
    await fs.writeFile(archive, "export const oldChunk = true;");
    try {
      const chunk = await fetch(`${origin}/assets/server-test-old-chunk.js`);
      assert.equal(chunk.status, 200);
      assert.match(chunk.headers.get("content-type"), /javascript/);
      assert.match(await chunk.text(), /oldChunk/);
      assert.equal((await fetch(`${origin}/assets/missing.js`)).status, 404);
    } finally {
      await fs.rm(archive, { force: true });
    }
  } finally {
    await stop();
    await fs.rm(directory, { recursive: true, force: true });
  }
});

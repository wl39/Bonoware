import { spawn } from "node:child_process";
import { once } from "node:events";

const children = [];
const backend = "http://127.0.0.1:4173/api/health";
let existing = false;
try {
  const response = await fetch(backend, { signal: AbortSignal.timeout(1000) });
  existing =
    response.ok && (await response.json()).runtime === "probe-node-mock";
} catch {}
function run(args) {
  const child = spawn(process.execPath, args, { stdio: "inherit" });
  children.push(child);
  child.on("exit", (code) => {
    if (code) stop(code);
  });
  return child;
}
function stop(code = 0) {
  for (const child of children) child.kill("SIGTERM");
  process.exit(code);
}
process.once("SIGINT", () => stop());
process.once("SIGTERM", () => stop());
if (!existing) {
  const child = run(["server-build/index.mjs"]);
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      if ((await fetch(backend)).ok) break;
    } catch {}
    if (child.exitCode !== null)
      throw new Error("로컬 API 서버를 시작하지 못했습니다.");
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (attempt === 49) stop(1);
  }
} else console.log("실행 중인 PROBE 로컬 API를 사용합니다 (4173).");
const vite = run([
  "node_modules/vite/bin/vite.js",
  "--host",
  "127.0.0.1",
  ...process.argv.slice(2),
]);
await once(vite, "exit");
stop();

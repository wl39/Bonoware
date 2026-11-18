import fs from "node:fs";
import path from "node:path";
// Keep already-open tabs working while a new build is published.
const source = path.resolve("dist/assets"),
  target = path.resolve(".probe/asset-cache");
if (fs.existsSync(source)) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source)) {
    const file = path.join(source, entry);
    if (fs.statSync(file).isFile())
      fs.copyFileSync(file, path.join(target, entry));
  }
}

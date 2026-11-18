// Recover a stale lazy import once, without depending on browser storage access.
let lastRecovery = 0;
function recoverModuleLoad() {
  const key = "probe.chunk-recovery";
  try {
    lastRecovery = Number(sessionStorage.getItem(key) || 0);
  } catch {}
  if (Date.now() - lastRecovery > 15000) {
    lastRecovery = Date.now();
    try {
      sessionStorage.setItem(key, String(lastRecovery));
    } catch {}
    window.location.reload();
  }
}
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();
  recoverModuleLoad();
});
window.addEventListener(
  "error",
  (event) => {
    if (
      event.target instanceof HTMLScriptElement &&
      event.target.type === "module"
    )
      recoverModuleLoad();
  },
  true,
);

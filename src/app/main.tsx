import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { mockMode } from "./api";
import "./styles.css";

async function start() {
  if (mockMode) {
    const [{ setupWorker }, { createHandlers }, { createDatabase }] =
      await Promise.all([
        import("msw/browser"),
        import("./handlers"),
        import("./database"),
      ]);
    const storage = {
      getItem: (key: string) => localStorage.getItem(key),
      setItem: (key: string, value: string) => localStorage.setItem(key, value),
    };
    const worker = setupWorker(...createHandlers(createDatabase(storage)));
    await worker.start({
      serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
      onUnhandledFrame: "bypass",
      quiet: true,
    });
  } else if ("serviceWorker" in navigator) {
    // A previous mock-mode build may have left an inactive worker at this base path.
    const registration = await navigator.serviceWorker.getRegistration(
      import.meta.env.BASE_URL,
    );
    if (registration?.active?.scriptURL.endsWith("/mockServiceWorker.js"))
      await registration.unregister();
  }
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>,
  );
}
start().catch((error) => {
  console.error(error);
  const root = document.getElementById("root")!;
  const message = document.createElement("main");
  message.className = "startup-error";
  message.textContent =
    "PROBE를 시작하지 못했습니다. localhost 또는 HTTPS로 접속하고, 브라우저의 서비스 워커 및 저장소 허용 설정을 확인한 후 새로고침해주세요.";
  root.appendChild(message);
});

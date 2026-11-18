import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "store/reducer/reducer";
import * as actions from "store/actions/actions";
import App from "./App";
import axios from "axios";
import "assets/scss/material-kit-react.css";
import { api, mockMode } from "../app/api";
async function start() {
  if (mockMode) {
    const [
      { setupWorker },
      { createHandlers },
      { createDatabase },
      { classicHandlers },
    ] = await Promise.all([
      import("msw/browser"),
      import("../app/handlers"),
      import("../app/database"),
      import("./handlers"),
    ]);
    const repository = createDatabase(localStorage);
    const worker = setupWorker(
      ...classicHandlers(repository),
      ...createHandlers(repository),
    );
    await worker.start({
      serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
      onUnhandledFrame: "bypass",
      quiet: true,
    });
  } else if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration(
      import.meta.env.BASE_URL,
    );
    if (registration?.active?.scriptURL.endsWith("/mockServiceWorker.js"))
      await registration.unregister();
  }
  axios.interceptors.request.use((config) => {
    const url = new URL(config.url, location.origin);
    if (url.hostname === "api.probe.gg") {
      config.url = mockMode
        ? `${import.meta.env.BASE_URL}classic${url.pathname}${url.search}`
        : `${import.meta.env.VITE_API_BASE_URL || "/api"}${url.pathname}${url.search}`;
      delete config.headers["Access-Control-Allow-Origin"];
    }
    return config;
  });
  const store = createStore(
    reducer,
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
      applyMiddleware(thunk),
    ),
  );
  store.dispatch(actions.getId("demo@probe.local"));
  store.dispatch(actions.getPw("Probe1234!"));
  const session = await api("/session");
  if (session.user) {
    const { classicAccount } = await import("./models");
    store.dispatch(
      actions.setAuth(
        true,
        session.user.name,
        classicAccount(session.user, session.following),
      ),
    );
  }
  createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>,
  );
}
start().catch((error) => {
  console.error(error);
  document.getElementById("root").textContent = error.message;
});

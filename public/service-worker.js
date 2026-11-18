// Retire the CRA precache for clients returning to the original Pages URL.
self.addEventListener("install", event => event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const scope = self.registration.scope;
    await caches.delete("sw-precache-v3-sw-precache-webpack-plugin-" + scope);
    await self.registration.unregister();
    const tabs = await self.clients.matchAll({ type: "window" });
    await Promise.all(tabs.filter(tab => tab.url.startsWith(scope)).map(tab => tab.navigate(tab.url)));
  })());
});

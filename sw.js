const CACHE_NAME = "sauls-podship-evangelism-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./i18n.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  // Field Library — guides, tools, and their assets.
  "./library/",
  "./library/index.html",
  "./library/library.css",
  "./library/library.js",
  "./library/goal-planner.html",
  "./library/goal-planner.js",
  "./library/prayer-notes.html",
  "./library/prayer-notes.js",
  "./library/biblical-mentoring.html",
  "./library/communicating-the-gospel.html",
  "./library/five-myths-about-youth.html",
  "./library/setting-goals-for-evangelism.html",
  "./library/key-characteristics-of-gen-z.html",
  "./library/biblical-stewardship.html",
  "./library/tools-to-engage-gen-z.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // Each entry is cached on its own so one unavailable file cannot
      // leave the whole library without an offline copy.
      .then((cache) => Promise.all(
        APP_SHELL.map((url) => cache.add(new Request(url, { cache: "reload" })).catch(() => null))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("sauls-podship-evangelism-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network first keeps the guide current; the precached shell is the offline fallback.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response.ok) return response;
        const copy = response.clone();
        return caches.open(CACHE_NAME)
          .then((cache) => cache.put(request, copy))
          .then(() => response);
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") {
          // Send offline visitors to the closest precached page: the field
          // library if they were in it, otherwise the main guide.
          const fallback = url.pathname.includes("/library")
            ? "./library/index.html"
            : "./index.html";
          return (await caches.match(fallback)) || (await caches.match("./index.html")) || Response.error();
        }
        return Response.error();
      })
  );
});

"use strict";

const CACHE_VERSION = "v1";
const CACHE_PREFIX = "beacon-hub-";
const CACHE_NAME = `${CACHE_PREFIX}${CACHE_VERSION}`;
const PRECACHE_PATHS = [
  "./",
  "./index.html",
  "./phone.html",
  "./computer.html",
  "./channels.html",
  "./css/style.css",
  "./js/settings.js",
  "./js/i18n.js",
  "./js/pwa.js",
  "./manifest.webmanifest",
  "./images/beacon-hub-mark.svg",
  "./images/icons/icon-192.png",
  "./images/icons/icon-512.png",
  "./images/icons/icon-512-maskable.png",
  "./images/icons/apple-touch-icon-180.png",
];
const PRECACHE_URLS = PRECACHE_PATHS.map((path) => new URL(path, self.location).href);
const OFFLINE_URL = new URL("./index.html", self.location).href;

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await cache.match(request)) || (await cache.match(OFFLINE_URL));
  }
}

async function staleWhileRevalidate(event, request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  const networkResponse = fetch(request)
    .then(async (response) => {
      if (response.ok) {
        await cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cachedResponse);

  if (cachedResponse) {
    event.waitUntil(networkResponse);
    return cachedResponse;
  }

  return networkResponse;
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(event, request));
});

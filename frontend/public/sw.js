// install event
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Installed");
});

// activate event
self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activated");
  return self.clients.claim();
});

// fetch event
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// push event - 백엔드에서 받은 공지사항을 푸시 알림으로 표시
self.addEventListener("push", (event) => {
  console.log("Push event received");
  if (event.data && Notification.permission === "granted") {
    const data = event.data.json();
    console.log(data);

    const options = {
      body: data.content,
      data: {
        url: data.url, // 클릭 시 이동할 URL
      },
    };

    // 알림 표시 시도
    event.waitUntil(
      self.registration
        .showNotification(data.title, options)
        .then(() => console.log("Notification displayed successfully"))
        .catch((error) => console.error("Notification display failed:", error))
    );
  } else {
    console.warn("Notification permission is not granted.");
  }
});

// notificationclick event - 알림 클릭 시 URL 이동
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const targetUrl = event.notification.data.url;
        for (const client of clientList) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      })
  );
});

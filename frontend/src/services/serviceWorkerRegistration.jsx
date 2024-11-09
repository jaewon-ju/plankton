// services/serviceWorkerRegistration.js
async function registerPushSubscription() {
  const registration = await navigator.serviceWorker.ready;

  const publicVapidKey =
    "BB4P3QAB6tIVb0DBufMf3YQXIpZqPpT30l5YHsevtR09AUvFDQ9cOgIADZa_it1NUAjJeFAx6lRlXhZvPhr42Zo";
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  const formattedSubscription = {
    endpoint: subscription.endpoint,
    expirationTime: subscription.expirationTime,
    keys: {
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    },
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/posts/save-subscription`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedSubscription),
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to send subscription data:",
        response.status,
        response.statusText
      );
    } else {
      console.log("Subscription data sent successfully.");
    }
  } catch (error) {
    console.error("Error sending subscription data:", error);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

export default registerPushSubscription;

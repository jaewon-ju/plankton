async function registerPushSubscription() {
  const registration = await navigator.serviceWorker.ready;

  const publicVapidKey =
    "BB4P3QAB6tIVb0DBufMf3YQXIpZqPpT30l5YHsevtR09AUvFDQ9cOgIADZa_it1NUAjJeFAx6lRlXhZvPhr42Zo";

  // 재시도 함수
  async function attemptSubscription(retries = 3) {
    let subscription = null;

    // 재시도 루프
    for (let i = 0; i < retries; i++) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      // 키가 존재하는지 확인
      if (
        subscription.keys &&
        subscription.keys.p256dh &&
        subscription.keys.auth
      ) {
        return subscription;
      }

      console.warn("Subscription keys missing, retrying...");
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기
    }

    throw new Error("Failed to retrieve subscription keys after retries.");
  }

  try {
    const subscription = await attemptSubscription();

    const formattedSubscription = {
      endpoint: subscription.endpoint,
      expirationTime: subscription.expirationTime,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
    };

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
    console.error("Failed to subscribe to push notifications:", error);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

export default registerPushSubscription;

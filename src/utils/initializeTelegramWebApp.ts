import { BASE_API_URL } from "../../constants";

export const initializeTelegramWebApp = () => {
  try {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg: any = window.Telegram.WebApp;
      
      // Ensure WebApp is ready
      tg.ready();
      
      // Get the data after WebApp is ready
      const safeData = tg.initData || "";
      const initDataUnsafe = tg.initDataUnsafe || {};

      if (!safeData || !initDataUnsafe.user) {
        console.warn("Failed to get Telegram user data");
        return;
      }

      const url = `${BASE_API_URL}api/validateTelegramUser`;
      const params = new URLSearchParams({ data: safeData });
      const fullURL = `${url}?${params}`;

      fetch(fullURL)
        .then((response) => response.json())
        .then((data) => console.log("Sent data to Strapi:", data))
        .catch((error) => console.error("Error:", error));
    } else {
      console.warn("Telegram WebApp is not available");
    }
  } catch (error) {
    console.error("Error initializing Telegram WebApp:", error);
  }
};
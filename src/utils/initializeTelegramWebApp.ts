import { BASE_API_URL } from "../../constants";

export const initializeTelegramWebApp = () => {
  try {
    if (typeof window === 'undefined') return;

    // Wait for Telegram WebApp to be available
    if (!window.Telegram?.WebApp) {
      console.warn("Telegram WebApp is not available");
      return;
    }

    const tg: any = window.Telegram.WebApp;

    // Ensure we're in a Telegram WebApp environment
    if (!tg.initData) {
      console.warn("Not in Telegram WebApp environment");
      return;
    }

    // Initialize the WebApp
    tg.ready();

    // Get user data after WebApp is ready
    const initDataUnsafe = tg.initDataUnsafe || {};
    const safeData = tg.initData;

    if (!initDataUnsafe.user) {
      console.warn("No user data available");
      return;
    }

    console.log("Telegram user data:", initDataUnsafe.user);

    const url = `${BASE_API_URL}api/validateTelegramUser`;
    const params = new URLSearchParams({ data: safeData });
    const fullURL = `${url}?${params}`;

    fetch(fullURL)
      .then((response) => response.json())
      .then((data) => console.log("Sent data to Strapi:", data))
      .catch((error) => console.error("Error:", error));

  } catch (error) {
    console.error("Error initializing Telegram WebApp:", error);
  }
};
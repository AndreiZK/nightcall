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

    // Log the raw data for debugging
    console.log("Raw WebApp data:", {
      initData: tg.initData,
      initDataUnsafe: tg.initDataUnsafe
    });

    // Initialize the WebApp
    tg.ready();

    // Get user data after WebApp is ready
    const initDataUnsafe = tg.initDataUnsafe || {};
    const safeData = tg.initData;

    console.log("Safe data:", safeData);
    console.log("Init data unsafe:", initDataUnsafe);

    if (!initDataUnsafe.user) {
      console.warn("No user data available");
      return;
    }

    // Parse the init data if it's a string
    let parsedData;
    try {
      parsedData = typeof safeData === 'string' ? JSON.parse(safeData) : safeData;
    } catch (e) {
      console.warn("Failed to parse initData:", e);
      parsedData = safeData;
    }

    const url = `${BASE_API_URL}api/validateTelegramUser`;
    const params = new URLSearchParams({ 
      data: typeof parsedData === 'string' ? parsedData : JSON.stringify(parsedData) 
    });
    const fullURL = `${url}?${params}`;

    fetch(fullURL)
      .then((response) => response.json())
      .then((data) => console.log("Sent data to Strapi:", data))
      .catch((error) => console.error("Error:", error));

  } catch (error) {
    console.error("Error initializing Telegram WebApp:", error);
  }
};
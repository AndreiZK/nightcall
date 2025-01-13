import { BASE_API_URL } from "../../constants";

export const initializeTelegramWebApp = () => {
  try {
    if (typeof window === 'undefined') return;

    const tg: any = window.Telegram.WebApp;
    if (!tg) {
      console.warn("Telegram WebApp is not available yet fdfd");
      return;
    }

    // Initialize the WebApp first
    tg.ready();

    // Get user data after WebApp is ready
    const initDataUnsafe = tg.initDataUnsafe || {};
    const safeData = tg.initData;

    // Log the raw data for debugging
    console.log("Telegram WebApp initialized with data:", {
      initData: safeData,
      initDataUnsafe: initDataUnsafe
    });

    if (!initDataUnsafe.user) {
      console.warn("No user data available in Telegram WebApp");
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

    // Send data to your backend
    const url = `${BASE_API_URL}api/validateTelegramUser`;
    const params = new URLSearchParams({ 
      data: typeof parsedData === 'string' ? parsedData : JSON.stringify(parsedData) 
    });
    const fullURL = `${url}?${params}`;

    fetch(fullURL)
      .then((response) => response.json())
      .then((data) => console.log("Successfully validated Telegram user:", data))
      .catch((error) => console.error("Error validating Telegram user:", error));

  } catch (error) {
    console.error("Error initializing Telegram WebApp:", error);
  }
};
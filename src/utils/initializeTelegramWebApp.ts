import { BASE_API_URL } from "../../constants";

export const initializeTelegramWebApp = () => {
  try {
    if (typeof window === 'undefined') return;

    // Check if Telegram object exists
    if (!window.Telegram) {
      console.warn("Telegram object not found. Make sure you're running this in Telegram WebApp");
      return;
    }

    // Check if WebApp exists
    if (!window.Telegram.WebApp) {
      console.warn("WebApp not found. Make sure you're running this in Telegram WebApp");
      return;
    }

    const tg: any = window.Telegram.WebApp;

    // Initialize the WebApp first
    tg.ready();

    // Log the raw data for debugging
    console.log("Telegram WebApp initialized with data:", {
      initData: tg.initData,
      initDataUnsafe: tg.initDataUnsafe
    });

    if (!tg.initDataUnsafe.user) {
      console.warn("No user data available in Telegram WebApp");
      return;
    }

    // Parse the init data if it's a string
    let parsedData;
    try {
      parsedData = typeof tg.initData === 'string' ? JSON.parse(tg.initData) : tg.initData;
    } catch (e) {
      console.warn("Failed to parse initData:", e);
      parsedData = tg.initData;
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

    console.log('Window Telegram object:', window.Telegram);
    console.log('User Agent:', navigator.userAgent);
    console.log('Is in Telegram:', window.Telegram?.WebApp ? 'Yes' : 'No');

  } catch (error) {
    console.error("Error initializing Telegram WebApp:", error);
  }
};
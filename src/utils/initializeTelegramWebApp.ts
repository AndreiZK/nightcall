import { BASE_API_URL } from "../../constants";

export const initializeTelegramWebApp = () => {
  try {
    if (typeof window === 'undefined') {
      console.log("Debug: Window is undefined");
      return;
    }

    console.log("Debug: Window object available");
    
    // Log the entire window object state regarding Telegram
    const telegramState = {
      hasTelegramObject: !!window.Telegram,
      hasWebAppObject: !!(window.Telegram?.WebApp),
      fullTelegramObject: window.Telegram
    };
    
    console.log("Debug: Telegram state:", telegramState);

    const tg: any = window.Telegram?.WebApp;
    if (!tg) {
      console.warn("Debug: WebApp object not found in Telegram object");
      return;
    }

    console.log("Debug: Successfully got WebApp object");
    
    tg.ready();
    console.log("Debug: WebApp ready called");
    
    console.log("Debug: Full WebApp data:", {
      initData: tg.initData,
      initDataUnsafe: tg.initDataUnsafe,
      version: tg.version,
      platform: tg.platform,
      colorScheme: tg.colorScheme
    });

  } catch (error) {
    console.error("Debug: Error in initialization:", error);
  }
};
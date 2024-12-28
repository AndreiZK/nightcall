import { BASE_API_URL } from "../../constants";

export const initializeTelegramWebApp = () => {
  // Wait a small amount of time to ensure script is loaded
  setTimeout(() => {
    if (!window.Telegram?.WebApp) {
      console.warn("Telegram WebApp is not available");
      return;
    }

    try {
      const tg: any = window.Telegram.WebApp;
      tg.ready();

      const safeData = tg.initData || "";
      const initDataUnsafe = tg.initDataUnsafe || {};

      if (!safeData || !initDataUnsafe.user) {
        console.warn("Failed to get Telegram user data");
        return;
      }

      const url = `${BASE_API_URL}api/validateTelegramUser`;
      const params = new URLSearchParams({ data: safeData });
      const fullURL = `${url}?${params}`;

      console.log("ссылка полная", fullURL);
      console.log("safeData:", safeData);

      fetch(fullURL)
        .then((response) => response.json())
        .then((data) => console.log("Отправили дату в страпи", data))
        .catch((error) => console.error("Error:", error));

      //fetch к бэку с safeData на получение пользователя
      //Варианты ответа - user: null, user: User, error - если appData не прошла валидацию
    } catch (error) {
      console.error("Error initializing Telegram WebApp:", error);
    }
  }, 1000);
};
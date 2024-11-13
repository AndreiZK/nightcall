import { BASE_API_URL } from "../../constants";

export const initializeTelegramWebApp = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      console.log("Проверка выполнения в Telegram WebApp");

      let tg: any = window.Telegram.WebApp;
      tg.ready();

      const safeData = tg.initData || "";
      const initDataUnsafe = tg.initDataUnsafe || {};

      if (!safeData || !initDataUnsafe.user) {
        console.warn("Не удалось получить данные пользователя Telegram");
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
    }
  };
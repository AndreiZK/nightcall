import { setTelegramId } from "./setTelegramId";

export const validateTelegramId = async (token: string) => {
    if (window.Telegram && window.Telegram.WebApp) {

        let tg: any = window.Telegram.WebApp;
        tg.ready();

        const safeData = tg.initData || "";
        const initDataUnsafe = tg.initDataUnsafe || {};

        if (!safeData || !initDataUnsafe.user) {
            await setTelegramId(token, null);
            return;
        }

        // Извлекаем telegramId из initDataUnsafe.user
        const telegramId = initDataUnsafe.user.id;

        await setTelegramId(token, telegramId);
    }
};

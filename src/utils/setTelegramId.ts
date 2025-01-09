import { BASE_API_URL } from "../../constants";

export async function setTelegramId(token: string, telegramId: any) {
  const url = `${BASE_API_URL}api/validateTelegramId`;

 let finalTelegramId: any = telegramId

if(!telegramId) {
    finalTelegramId = null
}

 const raw = JSON.stringify({
    "telegram_id": JSON.stringify(finalTelegramId)
  });

  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: raw,
    });


    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    

    return data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return [];
  }
}
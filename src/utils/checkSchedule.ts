import { BASE_API_URL } from "../../constants";


export async function checkSchedule() {
    const url = `${BASE_API_URL}api/schedules/1`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();


        return data;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return [];
    }
}

import { Product } from "@/store/store";
import { BASE_API_URL } from "../../constants";

export async function getCategories() {
    const url = `${BASE_API_URL}api/getCategories`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return [];
    }
}

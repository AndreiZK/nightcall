import { Product } from "@/store/store";
import { BASE_API_URL } from "../../constants";

export async function getSearchResult(
    keyword: string,
    category: string = "all"
) {
    const url = `${BASE_API_URL}api/search`;

    const raw = JSON.stringify({
        keyword,
        category,
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            },
            body: raw,
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

import { BASE_API_URL } from "../../constants";
import { Product } from "@/store/store";

export async function getProductsByIds(products: Array<Product>) {
    const url = `${BASE_API_URL}api/products/getProductsByIds`;

    const raw = JSON.stringify({
        order: products,
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

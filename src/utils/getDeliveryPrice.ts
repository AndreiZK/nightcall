import { Product } from "@/store/store";
import { BASE_API_URL } from "../../constants";

export async function getDeliveryPrice(order: Array<Product>) {
    const url = `${BASE_API_URL}api/payment/getDeliveryPrice`;

    const raw = JSON.stringify({
        order,
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

        console.log("Полученные данные цены:", data);

        return data;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return [];
    }
}

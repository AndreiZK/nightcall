import { Product } from "@/store/store";
import { BASE_API_URL } from "../../constants";

export async function getOrderPrice(order: Array<Product>) {
    const url = `${BASE_API_URL}api/payment/getPriceFromOrder`;

    const raw = JSON.stringify({
        order,
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        return { totalPrice: 0 };
    }
}

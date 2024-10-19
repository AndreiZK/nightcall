import { BASE_API_URL } from "../../constants";

export async function getProductsFromMerchant(merchantId: any) {
    const urlWithParams = `${BASE_API_URL}api/getProductsById?merchantId=${merchantId}`;

    try {
        const response = await fetch(urlWithParams, {
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
        console.error("Error fetching data:", error);
        return [];
    }
}

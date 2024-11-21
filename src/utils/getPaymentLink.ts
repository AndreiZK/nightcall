import { BASE_API_URL } from "../../constants";

export async function getPaymentLink(orderId: any, promocode: string, jwt: string) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`);
    
    const paymentData = JSON.stringify({
        orderId,
        promocode: promocode || '',
    });

    try {
        const response = await fetch(
            `${BASE_API_URL}api/payment/getPaymentUrl`,
            {
                method: "POST",
                headers: myHeaders,
                body: paymentData,
                redirect: "follow",
            }
        );

        const result = await response.text();
        console.log('API Response:', result);

        const parsedResult = JSON.parse(result);

        if (parsedResult.paymentUrl && parsedResult.hashId) {
            return {
                paymentLink: parsedResult.paymentUrl,
                hashIds: parsedResult.hashId,
                error: null
            };
        } else {
            return {
                paymentLink: null,
                hashIds: null,
                error: "В данный момент свободных курьеров нет, повторите немного позже. Мы работаем с пятницы по воскресенье с 22.00-4.00"
            };
        }
    } catch (error) {
        console.error('Request error:', error);
        return {
            paymentLink: null,
            hashIds: null,
            error: "An error occurred while processing your request"
        };
    }
}
import { BASE_API_URL } from "../../constants";

const requestOptions: any = (raw: any, jwt: string) => {
    const myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${jwt}`);

  return {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
}

export async function createOrder(orderData: any, jwt: string) {
    try {
        const response = await fetch(`${BASE_API_URL}api/order/createOrder`, requestOptions(orderData, jwt));
        const result = await response.json();
        const orderId = result.data.id;
        return orderId;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

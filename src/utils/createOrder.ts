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

export function createOrder(orderData: any, jwt: string) {
 
    let orderId: any = null;

    fetch(`${BASE_API_URL}api/order/createOrder`, requestOptions(orderData, jwt))
    .then((response) => response.text())
    .then((result) => {
      console.log("результат", JSON.parse(result));

      orderId = JSON.parse(result).data.id;

      if (orderId) {
        return orderId;
      }
    })
    .catch((error) => console.error(error));
}

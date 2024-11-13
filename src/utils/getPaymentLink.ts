import { BASE_API_URL } from "../../constants";


export function getPaymentLink(orderId: any, promocode: string, jwt: string) {
  const requestOptions: any = (raw: any, jwt: string) => {
    const myHeaders = new Headers();

      myHeaders.append("Authorization", `Bearer ${jwt}`);

    return {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  };

    const paymentData = JSON.stringify({
      orderId: orderId,
      promocode: promocode,
    });

    let paymentLink: any = null;
    let hashIds: any = null;
    let error: any = null;

    console.log('jwtToken in paymentLink get', jwt)

    fetch(
      `${BASE_API_URL}api/payment/getPaymentUrl`,
      requestOptions(paymentData)
    )
      .then((response) => response.text())
      .then((result) => {
        const link = JSON.parse(result).paymentUrl;
        const hashId = JSON.parse(result).hashId;
        if (link && hashId) {
            paymentLink = link;
            hashIds = hashId;
            console.log('data', result)
          // console.log('link', link)
          // console.log('paymentData', JSON.parse(result).hashId)
          // setPaymentLink(link);
        } else {
          error = "В данный момент свободных курьеров нет, повторите немного позже. Мы работаем с пятницы по воскресенье с 22.00-4.00";
        }
      })
      .catch((error) => console.error(error));

    return { paymentLink, hashIds, error };
  }
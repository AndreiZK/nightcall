import { Product } from "@/store/store";
import { BASE_API_URL } from "../../constants";
import {toast} from 'react-toastify'

export async function getDiscountedPrice(order: Array<Product>, promocode: string) {
  const url = `${BASE_API_URL}api/payment/getDiscountedPrice`;


  const raw = JSON.stringify({
    order,
    promocode
  });

  console.log(raw)

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

    console.log("Цена с дискаунтом:", data);

    if (data.discountedPrice) {
      toast.success("Промокод применен");
    } else {
      toast.error("Проверьте правильность промокода");
    }

    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    toast.error("Проверьте правильность промокода");
    return [];
  }
}

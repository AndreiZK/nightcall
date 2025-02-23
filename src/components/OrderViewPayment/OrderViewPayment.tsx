import styled from "styled-components";
import Textfield from "../UI/Textfield";
import Button from "../UI/Button";
import { colors, media, rm } from "@/styles";
import useStore from "@/store/store";
import { useEffect, useState } from "react";
import { getOrderPrice } from "@/utils/getOrderPrice";
import { getDeliveryPrice } from "@/utils/getDeliveryPrice";
import { getProductsByIds } from "@/requests/getProductsByIds";
import { getDiscountedPrice } from "@/utils/getDiscountedPrice";
import { createOrder } from "@/utils/createOrder";
import { getPaymentLink } from "@/utils/getPaymentLink";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createGuestAccount } from "@/utils/createGuestAccount";
import { BASE_API_URL } from "../../../constants";
import { setCookie } from "@/utils/cookieUtils";
import { heightLvh } from "@/styles/utils";
import OrderView from "../UI/Modal/components/OrderView";
import { checkCourierAvailability } from "@/utils/checkIsCourierAvailable";
import { checkSchedule } from "@/utils/checkSchedule";
import { isOpen } from "@/utils/isOpen";
import { getAdress } from "@/utils/getAdress";

const StyledContainer = styled.div`
    display: flex;
    gap: ${rm(20)};
    flex-direction: column-reverse;
    padding-bottom: ${rm(150)};

    .textfields {
        display: flex;
        flex-direction: column;
        gap: ${rm(12)};

        .info {
            display: flex;
            flex-direction: column;
            gap: ${rm(12)};
        }
    }

    .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: ${rm(24)};

        p {
            font-size: ${rm(22)};
            font-weight: 600;
            line-height: 100%;
        }

        button {
            width: auto;
            height: ${rm(60)};
            font-size: ${rm(24)};
            margin-top: ${rm(24)};
        }
    }
`;

const StyledBottomContainer = styled.div`
    display: flex;
    gap: ${rm(40)};
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    min-width: ${rm(300)};

    .promo {
        display: flex;
        gap: ${rm(20)};
        flex-direction: column;

        > :last-child {
            align-self: flex-end;

            ${media.xsm`
                align-self: flex-start;
            `}
        }
    }

    .price {
        display: flex;
        flex-direction: column;
        gap: ${rm(8)};

        .priceContainer {
            display: flex;
            justify-content: space-between;

            p {
                color: ${colors.white100};
                font-size: ${rm(20)};
            }
        }
    }

    button {
        font-size: ${rm(20)};
    }
`;

const StyledSubTitle = styled.p`
    font-size: ${rm(24)};
    color: ${colors.white100};
`;

const StyledTitle = styled.p`
    font-size: ${rm(48)};
    color: ${colors.purple};
    margin-bottom: ${rm(0)};
    margin-top: ${rm(40)};

    ${media.xsm`
        font-size: ${rm(30)};
    `}
`;


const StyledOrderView = styled.div`
    padding-block: ${rm(55)};
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${rm(24)};
    align-items: center;
    justify-content: center;
`

const phoneRegex = /^\+375\s*(17|25|29|33|44)\s*\d{7}$/;

const OrderViewPayment = () => {
    const [home, setHome] = useState<string>("");
    const [entrance, setEntrance] = useState<string>("");
    const [flat, setFlat] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("+375");
    const [street, setStreet] = useState<string>("");
    const [promocode, setPromocode] = useState<string>("");
    const [orderPrice, setOrderPrice] = useState<number>(0);
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [discountPrice, setDiscountPrice] = useState<any>(undefined);

    const [isDiscountAcitvated, setIsDiscountAcitvated] = useState<boolean>(false);

    const jwt = useStore((state: any) => state.jwtToken);
    const checkAuth = useStore((state: any) => state.checkAuth);
    const order = useStore((state: any) => state.order);
    const amounts = useStore((state: any) => state.amounts);

    const clearOrder = useStore((state: any) => state.clearOrder);

    const router = useRouter();

    const getProductsForCart = async () => {
        const products = await getProductsByIds(order);
    };

    const getPrice = async () => {
        const finalOrder: any = [];

        for (const [key, value] of amounts.entries()) {
            for (let i = 0; i < value; i++) {
                finalOrder.push(key);
            }
        }

        const price = await getOrderPrice(finalOrder);
        const deliveryPrice = await getDeliveryPrice(finalOrder);

        useStore.setState({ price: price.totalPrice });
        setDeliveryPrice(deliveryPrice);

        setPrice(price.totalPrice + deliveryPrice);

        setOrderPrice(price.totalPrice);
    };


    const handleGuestAccount = async () => {
        const guestAccount = await createGuestAccount();
        if (guestAccount?.jwt) {
            // Store in both Zustand and localStorage
            localStorage.setItem("jwt", guestAccount.jwt);
            setCookie('jwt', guestAccount.jwt);
            useStore.setState({ jwtToken: guestAccount.jwt });
            return guestAccount;
        }
        return null;
    };

    const getAuthHeaders = (token: string) => {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);
        return headers;
    };


    const handlePay = async () => {
        const schedule = await checkSchedule();

        const isNightcallOpen = isOpen(schedule.data.attributes.nightcall_schedule)

        if(!isNightcallOpen) {
            toast.error('Судя по всему мы закрыты😢. Мы работаем с пятницы по воскресенье с 22.00-4.00');
            return;
        }


        const isCourierAvailable = await checkCourierAvailability();

        if(!isCourierAvailable) {
            toast.error("В данный момент нет свободных курьеров");
            return;
        }

        try {
            if(checkAuth()){
                const adress = await getAdress(jwt);

                if(!adress.phone) {
                    toast.error('Проверьте ваш профиль на наличие номера телефона')
                    return;
                }
                if(!adress.street) {
                    toast.error('Проверьте ваш профиль на наличие адреса')
                    return;
                }
                if(!adress.house_number) {
                    toast.error('Проверьте ваш профиль на наличие номера дома')
                    return;
                }
            } else {
                const validationErrors = {
                    street: !street.trim() && "Укажите улицу",
                    home: !home.trim() && "Укажите номер дома",
                    name: !name.trim() && "Укажите ваше имя",
                    phone: !phone.trim() && "Укажите номер телефона",
                    phoneFormat: phone.trim() && !phoneRegex.test(phone) && "Неверный формат номера телефона",
                };
    
                const error = Object.values(validationErrors).find((error) => error);
                if (error) {
                    toast.error(error);
                    return;
                }
            }

            // Handle authentication
            let authToken = jwt?.length > 10 ? jwt : (await handleGuestAccount())?.jwt;

            if (!authToken) {
                toast.error("Что-то пошло не так😢. Попробуйте позже");
                return;
            }

            const isGuestAccount = authToken !== jwt;

            if (isGuestAccount) {
                try {
                    const response = await fetch(`${BASE_API_URL}api/addAdress`, {
                        method: "POST",
                        headers: getAuthHeaders(authToken),
                        body: JSON.stringify({
                            phone,
                            street,
                            entrance: entrance || "-",
                            flat_number: flat || "-",
                            house_number: home,
                            name,
                        }),
                    });
                    const result = await response.json();
                    toast.success("Данные успешно добавлены");
                } catch (error) {
                    console.error("Failed to save address:", error);
                    toast.error("Ошибка при сохранении адреса");
                    return;
                }
            }

            const finalOrder: any = [];

            for (const [key, value] of amounts.entries()) {
                for (let i = 0; i < value; i++) {
                    finalOrder.push(key);
                }
            }

            // Create and process order
            const orderData = JSON.stringify({
                comment: "none",
                cart: finalOrder,
            });

            const orderId = await createOrder(orderData, authToken);
            const {
                paymentLink,
                hashIds,
                error: paymentError,
            } = await getPaymentLink(orderId, promocode, authToken);

            if (paymentError) {
                toast.error(paymentError);
                return;
            }

            // Handle Telegram integration
            const tg: any = window.Telegram?.WebApp;
            if (tg && paymentLink && hashIds) {
                try {
                    const tgData = { orderId, paymentLink, hashId: hashIds };
                    tg.sendData(JSON.stringify(tgData));
                } catch (error) {
                    console.error("Failed to send data to Telegram:", error);
                    toast.error("Ошибка при отправке данных в Telegram");
                }
            }

            // Redirect to payment
            if (paymentLink && hashIds) {
                clearOrder();
                router.push(paymentLink);
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("Произошла ошибка при оформлении заказа");
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.startsWith("+375")) {
            setPhone(value);
        } else {
            setPhone("+375");
        }
    };

    const handleDiscount = async () => {
        const finalOrder: any = [];

        for (const [key, value] of amounts.entries()) {
            for (let i = 0; i < value; i++) {
                finalOrder.push(key);
            }
        }

        const discountedPrice = await getDiscountedPrice(finalOrder, promocode);

        if (
            discountedPrice?.discountedPrice?.discountedPrice != undefined &&
            discountedPrice?.discountedPrice?.discountedPrice != null
        ) {
            setIsDiscountAcitvated(true);
            setPrice(discountedPrice.discountedPrice.discountedPrice);
            setDiscountPrice(discountedPrice.discountedPrice.discountAmount);
        }
    };

    useEffect(() => {
        getProductsForCart();
        getPrice();
    }, [amounts, order]);

    return (
        <StyledOrderView>
            <StyledTitle>Оформление заказа</StyledTitle>
            <StyledContainer>
                <div className="left">
                    <OrderView />
                    <Button onClick={handlePay}>
                        <p>Перейти к оплате</p>
                    </Button>
                </div>
                <StyledBottomContainer>
                    {!jwt?.length && (
                        <div className="textfields">
                            <Textfield
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                                label="Улица"
                            />
                            <div className="info">
                                <Textfield
                                    value={home}
                                    onChange={(e) => setHome(e.target.value)}
                                    required
                                    label="Дом"
                                />
                                <Textfield
                                    value={flat}
                                    onChange={(e) => setFlat(e.target.value)}
                                    label="Квартира"
                                />
                                <Textfield
                                    value={entrance}
                                    onChange={(e) =>
                                        setEntrance(e.target.value)
                                    }
                                    label="Подьезд"
                                />
                            </div>
                            <Textfield
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                label="имя"
                            />
                            <Textfield
                                value={phone}
                                onChange={handlePhoneChange}
                                required
                                label="Телефонный номер"
                            />
                        </div>
                    )}
                    <div className="promo">
                        <Textfield
                            value={promocode}
                            onChange={(e) => setPromocode(e.target.value)}
                            label="Промокод"
                        />
                        <Button onClick={handleDiscount}>Подтвердить</Button>
                    </div>
                    {orderPrice && (
                        <div className="price">
                            {!discountPrice && (
                                <div className="priceContainer">
                                    <p>Сумма заказа</p>
                                    <p>{orderPrice.toFixed(2)}BYN</p>
                                </div>
                            )}

                            {!discountPrice && (
                                <div className="priceContainer">
                                    <p>Стоимость доставки</p>
                                    <p>{deliveryPrice}BYN</p>
                                </div>
                            )}
                            {discountPrice > 0 && (
                                <div className="priceContainer">
                                    <p>Сумма скидки</p>
                                    <p>{discountPrice}BYN</p>
                                </div>
                            )}
                            {!isDiscountAcitvated && <div className="priceContainer">
                                <p>Итоговая стоимость</p>
                                <p>{price}BYN</p>
                            </div>}
                        </div>
                    )}
                </StyledBottomContainer>
            </StyledContainer>
        </StyledOrderView>
    );
};

export default OrderViewPayment;

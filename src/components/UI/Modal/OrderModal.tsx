import styled from "styled-components";
import Modal, { ModalProps } from ".";
import ModalTitle from "./ModalTitle";
import Textfield from "../Textfield";
import Button from "../Button";
import { colors, media, rm } from "@/styles";
import { BASE_API_URL } from "../../../../constants";
import { requestOptions } from "../../../../constants";
import { validateTelegramId } from "@/utils/validateTelegramId";
import useStore from "../../../store/store";
import { useEffect, useState } from "react";
import { fontNotoSans } from "@/styles/fonts";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getUser } from "@/utils/getUser";
import { getAdress } from "@/utils/getAdress";
import OrderView from "./components/OrderView";
import { getOrderPrice } from "@/utils/getOrderPrice";
import { getDeliveryPrice } from "@/utils/getDeliveryPrice";
import { getProductsByIds } from "@/requests/getProductsByIds";
import { getDiscountedPrice } from "@/utils/getDiscountedPrice";
import { createOrder } from "@/utils/createOrder";
import { getPaymentLink } from "@/utils/getPaymentLink";

const StyledContainer = styled.div`
    padding-block: ${rm(55)};
    display: flex;
    gap: ${rm(100)};

    .left {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        justify-content: space-between;
        gap: ${rm(24)};

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

    .promo {
        display: flex;
        gap: ${rm(20)};
        flex-direction: column;

        > :last-child {
            align-self: flex-end;
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
`;

const OrderModal = (props: Omit<ModalProps, "children">) => {
    const setOrderModal = useStore((state: any) => state.setOrderModal);
    const isOrderModalOpen = useStore((state: any) => state.isOrderModalOpen);

    const [home, setHome] = useState<string>("");
    const [entrance, setEntrance] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [flat, setFlat] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [promocode, setPromocode] = useState<string>("");
    const [orderPrice, setOrderPrice] = useState<number>(0);
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [discountPrice, setDiscountPrice] = useState<number>(0);

    const jwt = useStore((state: any) => state.jwtToken);

    const paymentLink = useStore((state: any) => state.paymentLink);
    const order = useStore((state: any) => state.order);
    const amounts = useStore((state: any) => state.amounts);

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

    const handlePay = async () => {
        // useStore.setState({ isOver: true, promocode: promocode });

        const finalOrder: any = [];

        for (const [key, value] of amounts.entries()) {
            for (let i = 0; i < value; i++) {
                finalOrder.push(key);
            }
        }

        const orderData = JSON.stringify({
            comment: "none",
            cart: finalOrder,
        });

        const orderId = await createOrder(orderData, jwt);

        console.log("token", jwt);

        const { paymentLink, hashIds, error } = await getPaymentLink(
            orderId,
            promocode,
            jwt
        );


        console.log("paymentLink", paymentLink)

        // if(!error){
        //     let tg: any = window.Telegram.WebApp;

        //     const tgData = {
        //       orderId: orderId,
        //       paymentLink: paymentLink,
        //       hashId: hashIds,
        //     };

        //     useStore.setState({ paymentLink: paymentLink, hashId: hashIds });

        //     tg.sendData(JSON.stringify(tgData));
        // } else {
        //     console.log("error", error);
        // }
    };

    const handleDiscount = async () => {
        const finalOrder: any = [];

        for (const [key, value] of amounts.entries()) {
            for (let i = 0; i < value; i++) {
                finalOrder.push(key);
            }
        }

        const discountedPrice = await getDiscountedPrice(finalOrder, promocode);

        setDiscountPrice(discountedPrice);
    };

    useEffect(() => {
        console.log("paymentLink", paymentLink);
    }, [paymentLink]);

    useEffect(() => {
        getProductsForCart();
        getPrice();
    }, [amounts, order]);

    return (
        <Modal isOpen={isOrderModalOpen} onClose={() => setOrderModal(false)}>
            <StyledTitle>Оформление заказа</StyledTitle>
            <StyledContainer>
                <div className="left">
                    <OrderView />
                    <Button onClick={handlePay}>Перейти к оплате</Button>
                </div>
                <StyledBottomContainer>
                    <div className="promo">
                        <Textfield
                            value={promocode}
                            onChange={(e) => setPromocode(e.target.value)}
                            label="Промокод"
                        />
                        <Button onClick={handleDiscount}>Подтвердить</Button>
                    </div>
                    {orderPrice && <div className="price">
                        <div className="priceContainer">
                            <p>Сумма заказа</p>
                            <p>{orderPrice.toFixed(2)}BYN</p>
                        </div>
                        <div className="priceContainer">
                            <p>Стоимость доставки</p>
                            <p>{deliveryPrice}BYN</p>
                        </div>
                        {/* <div className="priceContainer">
                            <p>
                                Скидка по промокоду
                            </p>
                            <p>
                                {discountPrice}BYN
                            </p>
                        </div> */}
                        {discountPrice > 0 && (
                            <div className="priceContainer">
                                <p>Сумма скидки</p>
                                <p>{discountPrice}BYN</p>
                            </div>
                        )}
                        <div className="priceContainer">
                            <p>Итоговая стоимость</p>
                            <p>{typeof discountPrice === 'number' && discountPrice ? (price - discountPrice).toFixed(2) : price.toFixed(2)}BYN</p>
                        </div>
                    </div>}
                </StyledBottomContainer>
            </StyledContainer>
        </Modal>
    );
};

export default OrderModal;

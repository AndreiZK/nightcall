import styled from "styled-components";
import Modal, { ModalProps } from ".";
import Textfield from "../Textfield";
import Button from "../Button";
import { colors, media, rm } from "@/styles";
import useStore from "../../../store/store";
import { useEffect, useState } from "react";
import OrderView from "./components/OrderView";
import { getOrderPrice } from "@/utils/getOrderPrice";
import { getDeliveryPrice } from "@/utils/getDeliveryPrice";
import { getProductsByIds } from "@/requests/getProductsByIds";
import { getDiscountedPrice } from "@/utils/getDiscountedPrice";
import { createOrder } from "@/utils/createOrder";
import { getPaymentLink } from "@/utils/getPaymentLink";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { checkSchedule } from "@/utils/checkSchedule";
import { isOpen } from "@/utils/isOpen";

const StyledContainer = styled.div`
    padding-block: ${rm(55)};
    display: flex;
    gap: ${rm(100)};

    ${media.xsm`
        flex-direction: column-reverse;
        gap: ${rm(24)};
    `}

    .left {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        justify-content: space-between;
        gap: ${rm(24)};

        p{
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
    const [discountPrice, setDiscountPrice] = useState<any>(undefined);

    const jwt = useStore((state: any) => state.jwtToken);

    const paymentLink = useStore((state: any) => state.paymentLink);
    const order = useStore((state: any) => state.order);
    const amounts = useStore((state: any) => state.amounts);

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


    
    const handlePay = async () => {
        const schedule = await checkSchedule();

        const isNightcallOpen = isOpen(schedule.data.attributes.nightcall_schedule)

        if(!isNightcallOpen) {
            toast.error('Судя по всему мы закрыты😢. Мы работаем с пятницы по воскресенье с 22.00-4.00');
            return;
        }

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

        const { paymentLink, hashIds, error } = await getPaymentLink(
            orderId,
            promocode,
            jwt
        );

        if(!error){
            let tg: any = window.Telegram.WebApp;

            if(tg){
                const tgData = {
                    orderId: orderId,
                    paymentLink: paymentLink,
                    hashId: hashIds,
                };

                console.log('tgData', tgData);

                tg.sendData(JSON.stringify(tgData));
            }
        }

        console.log(paymentLink, hashIds, error);

        if(!error && paymentLink && hashIds){
            router.push(paymentLink);
        } else {
            toast.error(error);
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

        if(discountedPrice?.discountedPrice?.discountedPrice != undefined && discountedPrice?.discountedPrice?.discountedPrice != null){
            setPrice(discountedPrice.discountedPrice.discountedPrice);
            setDiscountPrice(discountedPrice.discountedPrice.discountAmount);
        }
    };

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
                    <Button onClick={handlePay}><p>Перейти к оплате</p></Button>
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
                        {!discountPrice && <div className="priceContainer">
                            <p>Сумма заказа</p>
                            <p>{orderPrice.toFixed(2)}BYN</p>
                        </div>}

                        {!discountPrice && <div className="priceContainer">
                            <p>Стоимость доставки</p>
                            <p>{deliveryPrice}BYN</p>
                        </div>}
                        {discountPrice > 0 && (
                            <div className="priceContainer">
                                <p>Сумма скидки</p>
                                <p>{discountPrice}BYN</p>
                            </div>
                        )}
                        <div className="priceContainer">
                            <p>Итоговая стоимость</p>
                            <p>{price}BYN</p>
                        </div>
                    </div>}
                </StyledBottomContainer>
            </StyledContainer>
        </Modal>
    );
};

export default OrderModal;

import { colors, media, rm } from "@/styles";
import styled from "styled-components";
import { Icons } from "../UI/Icons";
import { useEffect, useState } from "react";
import { getProductsByIds } from "@/requests/getProductsByIds";
import useStore from "@/store/store";
import CartItem from "./CartItem";
import { getOrderPrice } from "@/utils/getOrderPrice";
import { getDeliveryPrice } from "@/utils/getDeliveryPrice";
import Button from "../UI/Button";

const StyledCart = styled.div`
    grid-column: 10 / 13;
    grid-row: 1/ 3;
    min-height: ${rm(450)};
    height: auto;
    border-top-right-radius: ${rm(24)};
    position: sticky;
    align-self: start;
    top: ${rm(140)};
    left: 0;
    padding: ${rm(20)} ${rm(14)};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${rm(80)};

    .order {
        display: flex;
        flex-direction: column;
        gap: ${rm(15)};
    }

    .cart-title {
        font-size: ${rm(30)};
        color: ${colors.purple};
    }

    .cart-empty {
        margin-top: 300px;
        font-size: ${rm(16)};
    }

    .orderBlock {
        display: flex;
        flex-direction: column;
        gap: ${rm(22)};

        .deliveryPrice {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .bag {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    ${media.md`
            display: none;
        `}

    background: #d9d9d90c;
    border-radius: ${rm(8)};

    ${media.md`
        border-radius: ${rm(4)};
        `}
`;

const Cart = () => {
    const order = useStore((state: any) => state.order);
    const amounts = useStore((state: any) => state.amounts);

    const [price, setPrice] = useState<number>(0);
    const [deliveryPrice, setDeliveryPrice] = useState<number>(8);
    const [dataToRender, setDataToRender] = useState([]);

    const setOrderModal = useStore((state: any) => state.setOrderModal);

    const token = useStore((state: any) => state.jwtToken);

    const clearInstitution = useStore((state: any) => state.clearInstitution);

    const getProductsForCart = async () => {
        const products = await getProductsByIds(order);

        setDataToRender(products);
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

        const roundedPrice = Number(price.totalPrice.toFixed(2));

        useStore.setState({ price: roundedPrice });
        setPrice(roundedPrice);
        setDeliveryPrice(deliveryPrice);
    };

    const handleOrder = () => {
        // if (token?.length > 7) {
        setOrderModal(true);
        // } else {
        //     // toast.error('Авторизуйтесь')
        // }
    };

    useEffect(() => {
        getProductsForCart();
        getPrice();

        if(order.length === 0) {
            clearInstitution()
        }
    }, [amounts, order]);

    useEffect(() => {
        const savedInstitution = localStorage.getItem("institution");
        if (savedInstitution) {
            useStore.setState({ institution: savedInstitution });
        }
    }, []);

    return (
        <StyledCart className="">
            <div className="mainContainer">
                <span className="cart-title">Ваш заказ</span>
                {!order.length && <Icons.cartDesktop className="bag" />}
                <div className="order">
                    {dataToRender.length > 0 &&
                        dataToRender.map((element: any, index: number) => (
                            <CartItem
                                key={index}
                                calculatedPrice={element.calculatedPrice}
                                extra={element.extra}
                                type={element.type}
                                product={element.product}
                            />
                        ))}
                </div>
            </div>
            {!order.length ? (
                <span className="cart-empty">
                    Вы еще ничего не выбрали. Когда вы добавите товар, он
                    появится здесь!
                </span>
            ) : (
                <div className="orderBlock">
                    <div className="deliveryPrice">
                        <p>Стоимость доставки:</p>
                        <p>{deliveryPrice} BYN</p>
                    </div>
                    <Button onClick={handleOrder}>
                        Заказать за {price.toFixed(2)} BYN
                    </Button>
                </div>
            )}
        </StyledCart>
    );
};

export default Cart;

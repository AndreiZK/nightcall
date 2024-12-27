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
import { heightLvh } from "@/styles/utils";
import { toast } from "react-toastify";

const StyledCart = styled.div`
    position: relative;
    ${heightLvh(100)};
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(100%);
    transition: transform 0.5s ease-out;
    display: flex;
    flex-direction: column;
    padding-inline: ${rm(26)};
    padding-block: ${rm(44)} ${rm(24)};
    gap: ${rm(80)};
    padding-bottom: ${rm(100)};

    .order {
        display: flex;
        flex-direction: column;
        max-height: ${rm(500)};
        overflow-y: auto;
        gap: ${rm(15)};
    }

    .cross {
        position: absolute;
        top: ${rm(16)};
        right: ${rm(16)};
    }

    &.open {
        transform: translateX(0%);
    }

    .order {
        display: flex;
        flex-direction: column;
        gap: ${rm(15)};
    }

    .cart-title {
        font-size: ${rm(36)};
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
        height: ${rm(200)};
        width: ${rm(200)};
    }

    .order-button {
        font-size: ${rm(24)};
    }

    background: ${colors.black100};
    z-index: 10000;
`;

const MobileCart = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const order = useStore((state: any) => state.order);
    const amounts = useStore((state: any) => state.amounts);

    const [price, setPrice] = useState<number>(0);
    const [deliveryPrice, setDeliveryPrice] = useState<number>(8);
    const [dataToRender, setDataToRender] = useState([]);

    const setOrderModal = useStore((state: any) => state.setOrderModal);

    const token = useStore((state: any) => (state.jwtToken));

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

        useStore.setState({ price: price.totalPrice });
        setPrice(price.totalPrice);

        setDeliveryPrice(deliveryPrice);
    };

    const handleOrder = () => {
        if (token?.length > 7) {
            setOrderModal(true);
            onClose();
        } else {
            toast.error('Авторизуйтесь')
        }
    };

    useEffect(() => {
        getProductsForCart();
        getPrice();
    }, [amounts, order]);

    const handleClose = () => onClose();

    return (
        <StyledCart className={open ? "open" : ""}>
            <Icons.cross onClick={handleClose} className="cross" />
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
                    <Button className="order-button" onClick={handleOrder}>
                        Заказать за {price} BYN
                    </Button>
                </div>
            )}
        </StyledCart>
    );
};

export default MobileCart;

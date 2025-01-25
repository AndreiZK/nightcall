import { colors, media, rm } from "@/styles";
import styled from "styled-components";
import { Icons } from "../UI/Icons";
import { useEffect, useState, useRef } from "react";
import { getProductsByIds } from "@/requests/getProductsByIds";
import useStore from "@/store/store";
import CartItem from "./CartItem";
import { getOrderPrice } from "@/utils/getOrderPrice";
import { getDeliveryPrice } from "@/utils/getDeliveryPrice";
import Button from "../UI/Button";
import { heightLvh } from "@/styles/utils";
import { toast } from "react-toastify";
import { useDrag } from "@use-gesture/react";
import { useRouter } from "next/navigation";

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
        height: ${rm(340)};
        touch-action: pan-y;
        overflow: hidden;
        position: relative;
        gap: ${rm(15)};
    }

    .order-content {
        position: absolute;
        left: 0;
        right: 0;
        will-change: transform;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .cross {
        position: absolute;
        top: ${rm(16)};
        right: ${rm(16)};
    }

    &.open {
        transform: translateX(0%);
    }

    .cart-title {
        font-size: ${rm(36)};
        color: ${colors.purple};
    }

    .cart-empty {
        margin-top: 30%;
        font-size: ${rm(16)};
        text-align: center;
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
    const orderContentRef = useRef<HTMLDivElement>(null);
    const scrollYRef = useRef(0);
    const router = useRouter()
    const clearInstitution = useStore((state: any) => state.clearInstitution);

    const checkAndCleanStorage = useStore(
        (state: any) => state.checkAndCleanStorage
    );
    const setOrderModal = useStore((state: any) => state.setOrderModal);
    const token = useStore((state: any) => state.jwtToken);

    useEffect(() => {
        const savedOrder = checkAndCleanStorage("order");
        const savedLoadedIds = checkAndCleanStorage("loadedIds");
        const savedAmounts = checkAndCleanStorage("amounts");

        if (savedOrder && savedLoadedIds && savedAmounts) {
            useStore.setState({
                order: savedOrder,
                loadedIds: new Set(savedLoadedIds),
                amounts: new Map(
                    Array.isArray(savedAmounts) ? savedAmounts : []
                ),
            });
        }
    }, []);

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
        // setOrderModal(true);
        onClose();
        router.push('/order')
        // } else {
        //     toast.error('Авторизуйтесь')
        // }
    };

    useEffect(() => {
        getProductsForCart();
        getPrice();

        if(order.length === 0) {
            clearInstitution()
        }
    }, [amounts, order]);

    const handleClose = () => onClose();

    const bindDrag = useDrag(
        ({ movement: [mx, y], direction: [dx, dy] }) => {
            const newY = y * 0.6 + scrollYRef.current;
            const containerHeight = 340;
            const contentHeight = dataToRender.length * 100;
            const maxScroll = Math.min(0, containerHeight - contentHeight);

            scrollYRef.current = Math.max(maxScroll, Math.min(0, newY));

            if (orderContentRef.current) {
                orderContentRef.current.style.transform = `translateY(${scrollYRef.current}px)`;
            }
        },
        {
            from: () => [0, scrollYRef.current],
            bounds: {
                top: Math.min(0, 340 - dataToRender.length * 100),
                bottom: 0,
            },
            rubberband: true,
            filterTaps: true,
            pointer: { touch: true },
        }
    );

    return (
        <StyledCart className={open ? "open" : ""}>
            <Icons.cross onClick={handleClose} className="cross" />
            <div className="mainContainer">
                <span className="cart-title">Ваш заказ</span>
                {!order.length && <Icons.cartDesktop className="bag" />}
                <div className="order">
                    <div
                        ref={orderContentRef}
                        className="order-content"
                        {...bindDrag()}
                    >
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
                        Заказать за {price.toFixed(2)} BYN
                    </Button>
                </div>
            )}
        </StyledCart>
    );
};

export default MobileCart;

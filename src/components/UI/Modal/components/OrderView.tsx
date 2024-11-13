import { colors, media, rm } from "@/styles";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getProductsByIds } from "@/requests/getProductsByIds";
import useStore from "@/store/store";
import CartItem from "@/components/Cart/CartItem";

const StyledCart = styled.div`
    grid-column: 10 / 13;
    grid-row: 1/ 3;
    height: auto;
    border-top-right-radius: ${rm(24)};
    position: sticky;
    align-self: start;
    top: ${rm(140)};
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${rm(80)};

    .order{
        display: flex;
        flex-direction: column;
        gap: ${rm(15)};
    }

    .cart-title {
        font-size: ${rm(30)};
        color: ${colors.white100};
        opacity: 0.8;
        margin-bottom: ${rm(20)};
    }

    .cart-empty {
        margin-top: 300px;
        font-size: ${rm(16)};
    }

    .orderBlock{
        display: flex;
        flex-direction: column;
        gap: ${rm(22)};

        .deliveryPrice{
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

    // background: #d9d9d90c;
    border-radius: ${rm(8)};

    ${media.md`
        border-radius: ${rm(4)};
        `}
`;

const OrderView = () => {
    const order = useStore((state: any) => state.order);
    const amounts = useStore((state: any) => state.amounts);

    const [dataToRender, setDataToRender] = useState([]);

    const getProductsForCart = async () => {
        const products = await getProductsByIds(order);

        setDataToRender(products);
    };

    useEffect(() => {
        getProductsForCart();
    }, [amounts, order]);

    return (
        <StyledCart className="">
            <div className="mainContainer">
                <p className="cart-title">Выбранные продукты</p>
                <div className="order">
                    {dataToRender.length > 0 &&
                        dataToRender.map((element: any, index: number) => (
                            <CartItem key={index} calculatedPrice={element.calculatedPrice} extra={element.extra} type={element.type} product={element.product}/>
                    ))}
                </div>
            </div>
        </StyledCart>
    );
};

export default OrderView;

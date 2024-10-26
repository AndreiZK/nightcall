import { colors, media, rm } from "@/styles";
import styled from "styled-components";
import { Icons } from "../UI/Icons";
import { useEffect, useState } from "react";
import { getProductsByIds } from "@/requests/getProductsByIds";
import useStore from "@/store/store";

const StyledCart = styled.div`
    grid-column: 10 / 13;
    grid-row: 1/ 3;
    height: ${rm(450)};
    border-top-right-radius: ${rm(24)};
    position: sticky;
    align-self: start;
    top: ${rm(140)};
    left: 0;
    padding: ${rm(20)} ${rm(14)};

    .cart-title {
        font-size: ${rm(30)};
        color: ${colors.purple};
    }

    .cart-empty {
        margin-top: 300px;
        font-size: ${rm(16)};
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

    const [dataToRender, setDataToRender] = useState([]);

    const getProductsForCart = async () => {
        const products = await getProductsByIds(order);

        console.log(products);

        setDataToRender(products);
    };

    useEffect(() => {
        getProductsForCart();
    }, [amounts, order]);

    return (
        <StyledCart className="">
            <span className="cart-title">Ваш заказ</span>
            <Icons.cartDesktop className="bag" />
            <span className="cart-empty">
                Вы еще ничего не выбрали. Когда вы добавите товар, он появится
                здесь!
            </span>
        </StyledCart>
    );
};

export default Cart;

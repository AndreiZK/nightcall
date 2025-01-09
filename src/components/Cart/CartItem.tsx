import styled from "styled-components";
import { IProduct, IProductExtra, IProductType } from "../../../types";
import { media, rm } from "@/styles";
import { useEffect, useState } from "react";
import useStore, { Product } from "@/store/store";
import { Icons } from "../UI/Icons";

const StyledCartItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${rm(10)};
    margin-top: ${rm(20)};
    position: relative;

    ${media.xsm`
        width: 97%;
    `}

    .top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .amount{
            width: ${rm(30)};
        }

        .title{
            width: 100%;
            text-align: center;
        }

        .price{
            width: ${rm(30)};
            text-align: right;
        }
    }

    .bottom-row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .counter-button {
            cursor: pointer;
            height: ${rm(46)};
            width: ${rm(46)};
            border-radius: 50%;
            line-height: 1;
            text-align: center;
            background-color: rgba(164, 63, 253, 0.3);
            font-size: ${rm(46)};

            color: rgba(130, 93, 217, 1);

            span{
                display: flex;
                justify-content: center;
                align-items: center;
                height: ${rm(37)};
            }

            &.disabled {
                background-color: rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.5);
            }
    }
`;

const StyledDeleteButton = styled.div`
    position: absolute;
    top: ${rm(-20)};
    right: ${rm(-10)};
    width: ${rm(20)};
    height: ${rm(20)};
    cursor: pointer;

    transition: transform .5s ease-in-out;

    &:hover{
        transform: translateY(-3px);
    }


    svg{
        width: 100%;
        height: 100%;
    }
`

interface CartItemProps {
    calculatedPrice: number;
    type: IProductType[];
    extra: IProductExtra[];
    product: IProduct;
}

const CartItem = (props: CartItemProps) => {
    const amounts: Map<Product, number> = useStore(
        (state: any) => state.amounts
    );
    const removeFromOrder = useStore((state: any) => state.removeFromOrder);
    const updateAmount = useStore((state: any) => state.updateAmount);
    const [amount, setAmount] = useState(1);
    const [extrasString, setExtrasString] = useState("");

    const product = {
        id: props.product.id,

        type: props.type.map((i: IProductType) => i.id),
        extra: props.extra.map((i: IProductExtra) => i.id),
    };

    useEffect(() => {
        const amountsEntries = Array.from(amounts.entries());
        const productEntry = amountsEntries.find(
            ([k, v]) => JSON.stringify(k) === JSON.stringify(product)
        );
        setAmount(productEntry ? productEntry[1] : 1);
    }, []);

    useEffect(() => {
        const typesNames = props.type.map((i: any) => i.typeName);
        const typesString =
            typesNames.length > 0 ? " (" + typesNames.join(", ") + ")" : "";
        const extrasNames = props.extra.map((i: any) => i.extraName);
        const extrasString =
            extrasNames.length > 0 ? " + " + extrasNames.join(", ") : "";
        const extrasFull = `${typesString}${extrasString}`;
        setExtrasString(extrasFull);
    }, []);

    const handleAdd = (e: any) => {
        e.stopPropagation();
        const newAmount = amount + 1;
        //here data = product
        updateAmount(product, newAmount);

        setAmount(newAmount);
    };

    const handleRemove = (e: any) => {
        e.stopPropagation();
        if (amount > 1) {
            const newAmount = amount - 1;

            updateAmount(product, newAmount);

            setAmount(newAmount);
        }
    };

    const handleDelete = (e: any) => {
        e.stopPropagation();
        removeFromOrder(product);
        updateAmount(product, 0);
    };

    return (
        <StyledCartItem>
            <StyledDeleteButton onClick={handleDelete}>
                <Icons.deleteButton/>
            </StyledDeleteButton>
            <div className="top-row">
                <span className="amount">{amount}x</span>
                <span className="title">{props.product.title}</span>
                <span className="price">{props.calculatedPrice}</span>
            </div>
            <div className="bottom-row">
                <span 
                    onClick={
                        handleRemove
                    }
                    className={`counter-button minus ${
                        amount === 1 ? "disabled" : ""
                    }`}
                ><span>-</span></span>
                <span className="extras-string">{extrasString}</span>
                <span 
                        onClick={handleAdd}
                        className="counter-button"
                >+</span>
            </div>
        </StyledCartItem>
    );
};

export default CartItem;

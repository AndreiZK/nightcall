import styled from "styled-components";
import { IProduct, IProductExtra, IProductType } from "../../../types";
import { rm } from "@/styles";
import { useEffect, useState } from "react";
import useStore, { Product } from "@/store/store";

const StyledCartItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${rm(10)};
    .top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .bottom-row {
    }
`;

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

        console.log(123123);
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
            <div className="top-row">
                <span className="amount">{amount}x</span>
                <span className="title">{props.product.title}</span>
                <span className="price">{props.calculatedPrice}</span>
            </div>
            <div className="bottom-row">
                <span className="counter-button">-</span>
                <span className="extras-string">{extrasString}</span>
                <span className="counter-button">+</span>
            </div>
        </StyledCartItem>
    );
};

export default CartItem;

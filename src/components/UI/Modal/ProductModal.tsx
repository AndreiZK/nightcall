import styled from "styled-components";
import Modal, { ModalProps } from ".";
import ModalTitle from "./ModalTitle";
import Textfield from "../Textfield";
import Button from "../Button";
import { colors, rm } from "@/styles";
import { IProduct } from "../../../../types";
import { BASE_IMAGE_URL } from "../../../../constants";
import { useState } from "react";
import useStore from "@/store/store";

const StyledContainer = styled.div`
    padding-block: ${rm(50)};

    display: flex;
    flex-direction: column;
    gap: ${rm(32)};

    .description {
        width: 40vw;
        display: flex;
        margin-left: auto;
        gap: ${rm(24)};
        img {
            border-radius: ${rm(16)};
            height: ${rm(180)};
            width: ${rm(180)};
            object-fit: cover;
        }

        .text {
            display: flex;
            flex-direction: column;
            gap: ${rm(20)};
            .title {
                font-size: ${rm(32)};
                color: ${colors.purple};
            }
            .info,
            .weight {
                font-size: ${rm(20)};
            }
            .weight {
                opacity: 0.7;
            }
        }
    }
    button {
        font-size: ${rm(20)};
    }

    .bottom {
        display: flex;
        gap: ${rm(40)};

        .counter {
            display: flex;
            align-items: center;
            gap: ${rm(12)};

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

                &.disabled {
                    background-color: rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.5);
                }
            }

            .count {
                font-size: ${rm(32)};
            }
        }
    }
`;

interface ProductModalProps extends Omit<ModalProps, "children"> {
    productData: IProduct;
}

const ProductModal = (props: ProductModalProps) => {
    const [count, setCount] = useState(1);
    const [selectedExtra, setSelectedExtra] = useState(0);
    const [selectedType, setSelectedType] = useState(0);

    const institution = useStore((state: any) => state.institution);
    const order = useStore((state: any) => state.order);
    const addToOrder = useStore((state: any) => state.addToOrder);
    const updateAmount = useStore((state: any) => state.updateAmount);

    const handleAdd = () => {
        let inst;

        const letter = props.productData.merchant.unique_prefix;

        if (institution === null) {
            useStore.setState({ institution: letter });
            inst = letter;
        } else {
            inst = institution;
        }

        if (inst != letter) {
            //   toast.error("Вы уже выбрали товары в другом заведении");
            return;
        }
        let type: Array<number> = [];
        let extra: Array<number> = [];
        if (
            selectedType
                ? props.productData.product_types[selectedType]?.id
                : props.productData.product_types[0]?.id
        ) {
            type = [
                selectedType
                    ? props.productData.product_types[selectedType].id
                    : props.productData.product_types[0].id,
            ];
        }
        if (
            selectedExtra
                ? props.productData.product_extras[selectedExtra]?.id
                : props.productData.product_extras[0]?.id
        ) {
            extra = [
                selectedExtra
                    ? props.productData.product_extras[selectedExtra].id
                    : props.productData.product_extras[0].id,
            ];
        }
        const product = {
            id: props.productData.id,
            type,
            extra,
        };
        if (
            order.some(
                (i: any) => JSON.stringify(i) === JSON.stringify(product)
            )
        ) {
            //   toast.error(
            //     "Вы уже добавили этот товар, количество можно изменить в корзине"
            //   );
            return;
        }
        for (let i = 0; i < count; i++) {
            addToOrder(product);
        }
        updateAmount(product, count);
    };

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <StyledContainer>
                <div className="description">
                    <img
                        src={BASE_IMAGE_URL + props.productData.image[0].url}
                        alt=""
                    />
                    <div className="text">
                        <p className="title">{props.productData.title}</p>
                        <p className="info">{props.productData.discription}</p>
                        {props.productData.weight && (
                            <p className="weight">
                                {props.productData.weight} г
                            </p>
                        )}
                    </div>
                </div>
                <div className="bottom">
                    <Button>
                        Добавить {count} за{" "}
                        {(props.productData.product_types.length > 0
                            ? props.productData?.product_types[selectedType]
                                  ?.newPrice * count
                            : Math.round(
                                  props.productData.price * count * 100
                              ) / 100) +
                            (props.productData.product_extras.length > 0
                                ? props.productData?.product_extras[
                                      selectedExtra
                                  ]?.additionalPrice * count
                                : 0)}{" "}
                        BYN
                    </Button>
                    <div className="counter">
                        <span
                            onClick={() =>
                                setCount((prev) => (prev > 1 ? prev - 1 : 1))
                            }
                            className={`counter-button ${
                                count === 1 ? "disabled" : ""
                            }`}
                        >
                            -
                        </span>
                        <span className="count">{count}</span>
                        <span
                            onClick={() => setCount((prev) => prev + 1)}
                            className="counter-button"
                        >
                            +
                        </span>
                    </div>
                </div>
            </StyledContainer>
        </Modal>
    );
};

export default ProductModal;

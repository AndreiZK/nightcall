import { useState } from "react";
import BaseModal from "./BaseModal";
import styled from "styled-components";
import { colors, media, rm } from "@/styles";
import ModalTitle from "./ModalTitle";
import Button from "../Button";
import Select from "../Select";
import useStore from "@/store/store";
import { IProduct } from "../../../../types";
import { BASE_IMAGE_URL } from "../../../../constants";
import { toast } from "react-toastify";

const StyledContainer = styled.div`
    padding-block: ${rm(50)};
    display: flex;
    flex-direction: column;
    gap: ${rm(32)};

    ${media.md`
        padding-block: ${rm(20)};
    `}

    .description {
        width: 40vw;
        display: flex;
        margin-left: auto;
        gap: ${rm(24)};

        ${media.md`
            flex-direction: column;
            width: 100%;
            margin-left: 0;
        `}

        img {
            border-radius: ${rm(16)};
            height: ${rm(180)};
            width: ${rm(180)};
            object-fit: cover;

            ${media.md`
                width: 100%;
                order: 2;
            `}
        }

        .text {
            display: flex;
            flex-direction: column;
            gap: ${rm(20)};

            ${media.xsm`
                gap: ${rm(10)};
            `}

            .title {
                font-size: ${rm(32)};
                color: ${colors.purple};

                ${media.xsm`
                    font-size: ${rm(22)};
                `}
            }

            .info, .weight {
                font-size: ${rm(20)};

                ${media.xsm`
                    font-size: ${rm(14)};
                `}
            }

            .weight {
                opacity: 0.7;
            }
        }
    }

    .bottom {
        display: flex;
        gap: ${rm(40)};

        ${media.md`
            gap: ${rm(16)};
            flex-direction: column-reverse;
        `}

        .counter {
            display: flex;
            align-items: center;
            gap: ${rm(12)};
            position: relative;

            .counter-button {
                cursor: pointer;
                height: ${rm(46)};
                width: ${rm(46)};
                border-radius: 50%;
                line-height: 1;
                text-align: center;
                background-color: rgba(164, 63, 253, 0.3);
                font-size: ${rm(46)};
                position: relative;
                color: rgba(130, 93, 217, 1);

                span {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -58%);
                }

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

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    productData: IProduct;
}

const ProductModal = ({ isOpen, onClose, productData }: ProductModalProps) => {
    const [count, setCount] = useState(1);
    const [selectedExtra, setSelectedExtra] = useState(0);
    const [selectedType, setSelectedType] = useState(0);

    const institution = useStore((state: any) => state.institution);
    const setInstitution = useStore((state: any) => state.setInstitution);
    const order = useStore((state: any) => state.order);
    const addToOrder = useStore((state: any) => state.addToOrder);
    const updateAmount = useStore((state: any) => state.updateAmount);

    const handleAdd = () => {
        const letter = productData.merchant.unique_prefix;
        let inst = institution;

        if (institution === null) {
            setInstitution(letter);
            inst = letter;
        }

        if (inst !== letter) {
            toast.error("Вы уже выбрали товары в другом заведении");
            return;
        }

        let type: Array<number> = [];
        let extra: Array<number> = [];

        if (selectedType ? productData.product_types[selectedType]?.id : productData.product_types[0]?.id) {
            type = [selectedType ? productData.product_types[selectedType].id : productData.product_types[0].id];
        }
        
        if (selectedExtra ? productData.product_extras[selectedExtra]?.id : productData.product_extras[0]?.id) {
            extra = [selectedExtra ? productData.product_extras[selectedExtra].id : productData.product_extras[0].id];
        }

        const product = {
            id: productData.id,
            type,
            extra,
        };

        if (order.some((i: any) => JSON.stringify(i) === JSON.stringify(product))) {
            toast.error("Вы уже добавили этот товар, количество можно изменить в корзине");
            return;
        }

        for (let i = 0; i < count; i++) {
            addToOrder(product);
        }
        updateAmount(product, count);
        onClose();
    };

    const handleExtraSelect = (val: string) => {
        setSelectedExtra(Number(val));
    };

    const handleTypeSelect = (val: string) => {
        setSelectedType(Number(val));
    };

    const extrasOptions = productData?.product_extras.map((i, index) => ({
        value: String(index),
        label: i.extraName,
    }));

    const typesOptions = productData?.product_types.map((i, index) => ({
        value: String(index),
        label: i.description,
    }));

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <StyledContainer>
                <div className="description">
                    <img
                        //@ts-expect-error
                        src={BASE_IMAGE_URL + productData?.image[0]?.url}
                        alt={productData.title}
                    />
                    <div className="text">
                        <p className="title">{productData.title}</p>
                        <p className="info">{productData.discription}</p>
                        {productData.weight && (
                            <p className="weight">{productData.weight} г</p>
                        )}
                    </div>
                </div>

                {productData?.product_types?.length > 0 && (
                    <Select
                        placeholder="Размер"
                        onChange={handleTypeSelect}
                        options={typesOptions}
                    />
                )}

                {productData?.product_extras?.length > 0 && (
                    <Select
                        placeholder="Соус на выбор"
                        onChange={handleExtraSelect}
                        options={extrasOptions}
                    />
                )}

                <div className="bottom">
                    <div className="counter">
                        <div
                            className={`counter-button ${count === 1 ? 'disabled' : ''}`}
                            onClick={() => count > 1 && setCount(count - 1)}
                        >
                            <span>-</span>
                        </div>
                        <span className="count">{count}</span>
                        <div
                            className="counter-button"
                            onClick={() => setCount(count + 1)}
                        >
                            <span>+</span>
                        </div>
                    </div>
                    <Button onClick={handleAdd}>
                        Добавить {count} за{" "}
                        {(productData.product_types.length > 0
                            ? productData?.product_types[Number(selectedType)]?.newPrice * count
                            : Math.round(productData.price * count * 100) / 100) +
                            (productData.product_extras.length > 0
                                ? productData?.product_extras[Number(selectedExtra)]?.additionalPrice * count
                                : 0)}{" "}
                        BYN
                    </Button>
                </div>
            </StyledContainer>
        </BaseModal>
    );
};

export default ProductModal;

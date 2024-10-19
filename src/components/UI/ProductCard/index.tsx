import { colors, media, rm } from "@/styles";
import styled from "styled-components";
import Button from "../Button";
import { IProduct } from "../../../../types";
import { BASE_IMAGE_URL } from "../../../../constants";
import ProductModal from "../Modal/ProductModal";
import { useState } from "react";

const StyledContainer = styled.div`
    background: ${colors.black200};
    border-radius: ${rm(24)};
    overflow: hidden;
    cursor: pointer;

    ${media.md`
        border-radius: ${rm(16)};
    `}

    .image-container {
        width: 100%;
        height: ${rm(180)};
        margin-bottom: ${rm(30)};
        overflow: hidden;
        display: flex;
        justify-content: center;
        img {
            max-height: ${rm(180)};
        }
        ${media.md`
            margin-bottom: ${rm(6)};
            height: ${rm(129)};
        `}
    }

    .info {
        padding-inline: ${rm(12)};
        /* margin-bottom: ${rm(12)}; */
        display: flex;
        flex-direction: column;
        gap: ${rm(14)};

        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                font-size: ${rm(15)};
            }

            .weight {
                font-size: ${rm(14)};
                opacity: 50%;
            }
        }

        .price {
            font-size: ${rm(16)};
        }

        ${media.md`
            gap: ${rm(8)};

            .price {
            font-size: ${rm(14)};
        }

        .top {
            .title {
                font-size: ${rm(18)};
            }

            .weight {
                font-size: ${rm(12)};
                
            }
        }
            `}
    }

    button {
        font-weight: 400;
    }
`;

interface ProductCardProps extends IProduct {}

const ProductCard = (props: ProductCardProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <StyledContainer onClick={() => setModalOpen(true)}>
                <div className="image-container">
                    <img src={BASE_IMAGE_URL + props.image[0].url} alt="" />
                </div>

                <div className="info">
                    <div className="top">
                        <span className="title">
                            {props.title.split("").length > 18
                                ? props.title.slice(0, 16) + "..."
                                : props.title}
                        </span>
                        <span className="weight">
                            {props.weight ? props.weight + " г" : ""}
                        </span>
                    </div>
                    <span className="price">
                        {props.price
                            ? props.price
                            : "от " + props.product_types[0].newPrice}{" "}
                        BYN
                    </span>
                    <Button>+ Добавить</Button>
                </div>
            </StyledContainer>
            <ProductModal
                productData={props}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
};

export default ProductCard;

import { colors, media, rm } from "@/styles";
import styled from "styled-components";
import Button from "../Button";

const StyledContainer = styled.div`
    background: ${colors.black200};
    border-radius: ${rm(24)};
    overflow: hidden;

    ${media.md`
        border-radius: ${rm(16)};
    `}

    .image-container {
        width: 100%;
        height: ${rm(180)};
        margin-bottom: ${rm(30)};
        overflow: hidden;
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
                font-size: ${rm(24)};
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

const ProductCard = () => {
    return (
        <StyledContainer>
            <div className="image-container">
                <img src="/images/product-placeholder.png" alt="" />
            </div>

            <div className="info">
                <div className="top">
                    <span className="title">Название</span>
                    <span className="weight">250г</span>
                </div>
                <span className="price">XX BYN</span>
                <Button>+ Добавить</Button>
            </div>
        </StyledContainer>
    );
};

export default ProductCard;

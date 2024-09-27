import styled from "styled-components";
import { Icons } from "../UI/Icons";
import { colors, rm } from "@/styles";

const StyledCard = styled.a`
    height: 100%;
    width: 100%;
    position: relative;
    border-radius: ${rm(24)};
    overflow: hidden;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    &:hover {
        img {
            transform: scale(1.05);
            cursor: pointer;
        }
    }

    .description {
        position: absolute;
        bottom: ${rm(20)};
        right: ${rm(20)};
        /* transform: translate(-100%, -100%); */

        .rating {
            padding: ${rm(6)} ${rm(12)};
            background: ${colors.black200};
            display: flex;
            align-items: center;
            justify-content: center;
            gap: ${rm(2)};
            border-radius: 8px;
            font-size: 20px;
        }
    }
`;

const RestaurantCard = () => {
    return (
        <StyledCard href="/restaurants/1">
            <img
                src="https://loremflickr.com/cache/resized/65535_53837803942_3ca28590ae_n_200_200_nofilter.jpg"
                alt=""
            />
            <div className="description">
                <div className="rating">
                    <Icons.star />
                    <span>5</span>
                </div>
            </div>
        </StyledCard>
    );
};

export default RestaurantCard;

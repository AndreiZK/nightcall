import styled from "styled-components";
import SectionTitle from "../UI/SectionTitle";
import { media, rm } from "@/styles";
import RestaurantCard from "../RestaurantCard";
import { Icons } from "../UI/Icons";
import { IRestaurant } from "../../../types";

const StyledContainer = styled.div`
    width: 100%;

    .content {
        width: 100%;
        display: flex;
        height: ${rm(320)};
        gap: ${rm(30)};

        margin-top: ${rm(70)};
        margin-bottom: ${rm(28)};

        ${media.md`
            flex-direction: column;
            gap: ${rm(16)};
            height: calc(${rm(212)} * 3 + ${rm(48)});
            margin-top: ${rm(16)};
        margin-bottom: ${rm(18)};
            `}
    }
`;

const StyledLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: ${rm(6)};
    margin-left: 50%;
    transform: translateX(-50%);
    padding: ${rm(10)} ${rm(40)};
    border: 1px solid white;
    border-radius: ${rm(16)};
    cursor: pointer;

    ${media.md`
        font-size: ${rm(20)};
        width: 88%;
        justify-content: center;
        align-items: center;
    `}
`;

interface PopularRestaurantsProps {
    data: IRestaurant[];
}

const PopularRestaurants = ({ data }: PopularRestaurantsProps) => {
    console.log(data);

    return (
        <StyledContainer>
            <SectionTitle>Популярные рестораны</SectionTitle>
            <div className="content">
                {data.map((i, index) => (
                    <RestaurantCard data={i} key={index} />
                ))}
            </div>
            <StyledLink href="/restaurants">
                Все рестораны <Icons.arrowRight style={{ height: "16px" }} />
            </StyledLink>
        </StyledContainer>
    );
};

export default PopularRestaurants;

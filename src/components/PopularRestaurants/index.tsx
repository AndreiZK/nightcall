import styled from "styled-components";
import SectionTitle from "../UI/SectionTitle";
import { rm } from "@/styles";
import RestaurantCard from "../RestaurantCard";
import { Icons } from "../UI/Icons";

const StyledContainer = styled.div`
    width: 100%;

    .content {
        width: 100%;
        display: flex;
        height: ${rm(320)};
        gap: ${rm(30)};

        margin-top: ${rm(70)};
        margin-bottom: ${rm(28)};
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
`;

const PopularRestaurants = () => {
    return (
        <StyledContainer>
            <SectionTitle>Популярные рестораны</SectionTitle>
            <div className="content">
                {new Array(3).fill(0).map((i, index) => (
                    <RestaurantCard key={index} />
                ))}
            </div>
            <StyledLink href="/restaurants">
                Все рестораны <Icons.arrowRight style={{ height: "16px" }} />
            </StyledLink>
        </StyledContainer>
    );
};

export default PopularRestaurants;

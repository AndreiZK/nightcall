import Collaboration from "@/components/Collaboration";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import PopularRestaurants from "@/components/PopularRestaurants";
import RestaurantCard from "@/components/RestaurantCard";
import Breadcrumb from "@/components/UI/Breadcrumb";
import SectionTitle from "@/components/UI/SectionTitle";
import Textfield from "@/components/UI/Textfield";
import { getStrapiData } from "@/requests/getStrapiData";
import { colors, media, rm } from "@/styles";
import { Head } from "next/document";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IRestaurant } from "../../../types";

const TopContainer = styled.div`
    display: flex;
    width: 100%;
    gap: ${rm(40)};
    align-items: center;
    text-wrap: nowrap;

    ${media.md`
        flex-direction: column;
        gap: ${rm(12)};
        align-items: start;
        margin-top: ${rm(14)};
    `}
`;

const Filters = styled.div`
    width: 100%;
    padding: ${rm(20)} ${rm(32)};
    background: #d9d9d90c;
    font-size: ${rm(28)};
    border-radius: ${rm(12)};
    display: flex;
    gap: ${rm(32)};

    margin-top: ${rm(54)};

    span {
        cursor: pointer;
        font-weight: 400;
    }

    .selected {
        color: ${colors.purple};
    }

    ${media.md`
        display: none;
    `}
`;

const RestaurantsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: ${rm(340)};
    gap: ${rm(46)};
    margin-block: ${rm(46)};

    ${media.md`
        grid-template-columns: 1fr;
        grid-auto-rows: ${rm(214)};
        gap: ${rm(20)};
    margin-block: ${rm(34)};
    `}
`;

export const categories = ["Все", "Бургеры", "Пицца", "Суши", "Паста"];

export default function Restaurants() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [restaurantsData, setRestaurantsData] = useState<IRestaurant[]>([]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await getStrapiData("merchants");

            console.log(data);
            setRestaurantsData(data);
        };

        getData();
    }, []);

    return (
        <>
            <Layout>
                <Breadcrumb />
                <TopContainer>
                    <SectionTitle>Все рестораны</SectionTitle>
                    <Textfield search placeholder="поиск ресторана" />
                </TopContainer>
                <Filters>
                    {categories.map((category) => (
                        <span
                            onClick={() => setSelectedCategory(category)}
                            key={category}
                            className={
                                category === selectedCategory ? "selected" : ""
                            }
                        >
                            {category}
                        </span>
                    ))}
                </Filters>
                <RestaurantsGrid>
                    {restaurantsData.map((item, index) => (
                        <RestaurantCard key={index} data={item} />
                    ))}
                </RestaurantsGrid>
            </Layout>
        </>
    );
}

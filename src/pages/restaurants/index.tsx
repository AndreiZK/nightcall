import Collaboration from "@/components/Collaboration";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import PopularRestaurants from "@/components/PopularRestaurants";
import RestaurantCard from "@/components/RestaurantCard";
import Breadcrumb from "@/components/UI/Breadcrumb";
import SectionTitle from "@/components/UI/SectionTitle";
import Textfield from "@/components/UI/Textfield";
import { colors, rm } from "@/styles";
import { Head } from "next/document";
import { useState } from "react";
import styled from "styled-components";

const TopContainer = styled.div`
    display: flex;
    width: 100%;
    gap: ${rm(40)};
    align-items: center;
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
        font-weight: 300;
    }

    .selected {
        color: ${colors.purple};
        font-weight: 600;
    }
`;

const RestaurantsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: ${rm(340)} ${rm(340)} ${rm(340)};
    gap: ${rm(46)};
    margin-block: ${rm(46)};
`;

const categories = ["Все", "Бургеры", "Пицца", "Суши", "Паста"];

export default function Restaurants() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <>
            <Layout>
                <Breadcrumb />
                <TopContainer>
                    <SectionTitle>Рестораны</SectionTitle>
                    <Textfield placeholder="поиск ресторана" />
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
                    {new Array(6).fill(0).map((item) => (
                        <RestaurantCard />
                    ))}
                </RestaurantsGrid>
            </Layout>
        </>
    );
}

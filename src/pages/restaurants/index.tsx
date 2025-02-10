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
import { getSearchResult } from "@/requests/getSearchResult";
import { getCategories } from "@/requests/getCategories";
import { useLoadingReady } from "@/hooks/useLoadingReady";
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

    ${media.xsm`
        font-size: ${rm(16)};
        gap: ${rm(22)};
        // overflow-x: scroll;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: ${rm(12)} ${rm(16)};
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


export default function Restaurants() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [restaurantsData, setRestaurantsData] = useState<IRestaurant[]>([]);
    const [search, setSearch] = useState("");

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await getSearchResult("");
            setRestaurantsData(data);
        };

        const getAllCategories = async () => {
            const categories = await getCategories();
            setCategories(categories.data);
            if (categories.data && categories.data.length > 0) {
                setSelectedCategory(categories.data[0].category);
            }
        };

        getAllCategories();
        getData();
    }, []);

    const searchRests = async () => {
        const result = await getSearchResult(search, selectedCategory);
        setRestaurantsData(result.data);
    };

    useEffect(() => {
        if (!restaurantsData) return;
        searchRests();
    }, [search, selectedCategory]);

    useLoadingReady(restaurantsData, categories);

    return (
        <>
            <Layout>
                <Breadcrumb />
                <TopContainer>
                    <SectionTitle>Все рестораны</SectionTitle>
                    <Textfield
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        search
                        placeholder="поиск ресторана"
                    />
                </TopContainer>
                <Filters>
                    {categories?.length > 0 &&
                        categories?.map((category: any) => (
                            <span
                                onClick={() => setSelectedCategory(category.category)}
                                key={category.category}
                                className={
                                category.category === selectedCategory
                                    ? "selected"
                                    : ""
                            }
                        >
                            {category.category}
                        </span>
                    ))}
                </Filters>
                <RestaurantsGrid>
                    {restaurantsData.length > 0 &&
                        restaurantsData.map((item, index) => (
                            <RestaurantCard key={index} data={item} />
                        ))}
                </RestaurantsGrid>
            </Layout>
        </>
    );
}

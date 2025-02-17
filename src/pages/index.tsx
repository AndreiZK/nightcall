import Head from "next/head";

import Hero from "@/components/Hero";
import PopularRestaurants from "@/components/PopularRestaurants";
import styled from "styled-components";
import { media, rm } from "@/styles";
import Collaboration from "@/components/Collaboration";
import { useEffect, useState } from "react";
import { getStrapiData } from "@/requests/getStrapiData";
import { IRestaurant } from "../../types";

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${rm(160)};
    margin-bottom: ${rm(200)};

    ${media.md`
        gap: ${rm(64)};
        margin-bottom: ${rm(44)};
    `}
`;

export default function Home() {
    const [restaurantsData, setRestaurantsData] = useState<IRestaurant[]>([]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await getStrapiData("merchants");

            setRestaurantsData(data.slice(0, 3));
        };

        getData();
    }, []);

    return (
        <>
            <Head>
                <title key="title">Главная</title>
            </Head>
            <ContentContainer>
                <Hero />
                <PopularRestaurants data={restaurantsData} />
                <Collaboration />
            </ContentContainer>
        </>
    );
}

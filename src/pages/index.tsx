import Head from "next/head";

import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Modal from "@/components/UI/Modal";
import PopularRestaurants from "@/components/PopularRestaurants";
import styled from "styled-components";
import { rm } from "@/styles";
import Collaboration from "@/components/Collaboration";

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${rm(160)};
    margin-bottom: ${rm(200)};
`;

export default function Home() {
    return (
        <>
            <Head>
                <title key="title">Главная</title>
            </Head>
            <Layout>
                <ContentContainer>
                    <Hero />
                    <PopularRestaurants />
                    <Collaboration />
                </ContentContainer>
            </Layout>
            {/* <Modal /> */}
        </>
    );
}

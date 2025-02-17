"use client";

import useStore from "@/store/store";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";

import { media, rm } from "@/styles";
import Header from "../Header";
import { ReactNode } from "react";
import Footer from "../Footer";

interface TelegramWebApp {
    ready: () => void;
    close: () => void;
    expand: () => void;
    MainButton: any;
    BackButton: any;
    initData: string;
    initDataUnsafe: {
        user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
        };
        start_param?: string;
    };
}

declare global {
    interface Window {
        Telegram: {
            WebApp: TelegramWebApp;
        };
    }
}

const StyledWrapperWithFooter = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #070707;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
`;

const LayoutContainer = styled.div`
    max-width: ${rm(1320)};
    overflow: hidden;
    margin-inline: auto;
    position: relative;
    .content-container {
        padding-top: ${rm(200)};
    }

    ${media.md`
        max-width: unset;
        width: calc(100vw - ${rm(0)});
        padding-inline: ${rm(16)};
        overflow: hidden;
        .content-container {
        padding-top: ${rm(100)};
    }
    `}
`;

const Gradient1 = styled.img`
    position: absolute;
    top: 50vh;
    left: 0;
`;
const Gradient2 = styled.img`
    position: absolute;
    top: -30%;
    left: 40%;
`;

export default function Layout({ children }: { children: ReactNode }) {
    const checkAuth = useStore((state: any) => state.checkAuth)

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <StyledWrapperWithFooter>
            <Gradient1 src="/images/gradient1.png" />
            <Gradient2 src="/images/gradient2.png" />
            <LayoutContainer>
                <Header />
                <div className="content-container">
                    {children}
                    <ToastContainer />
                    <a
                        // href={paymentLink}
                        id="redirectLink"
                        style={{ display: "none" }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redirect
                    </a>
                </div>
            </LayoutContainer>
            <Footer />
        </StyledWrapperWithFooter>
    );
}

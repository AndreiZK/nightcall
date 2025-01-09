"use client";

import useStore from "@/store/store";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../../constants";
// import { toast } from "react-toastify";
import parseCookie from "@/utils/parseCookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";

import { media, rm } from "@/styles";
import Header from "../Header";
import { ReactNode } from "react";
import Footer from "../Footer";

interface TelegramWebApp {
    close: () => void;
    sendData: (data: string) => void;
    ready: (data: string) => void;
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
    const isOver = useStore((state: any) => state.isOver);
    const [paymentLink, setPaymentLink] = useState<string>("");
    // const orderId = useStore((state: any) => (state.orderId))
    // const orderId = localStorage.getItem("orderId")
    const [orderId, setOrderId] = useState<String>("");
    const amounts = useStore((state: any) => state.amounts);
    const order = useStore((state: any) => state.order);
    const jwt = useStore((state: any) => state.jwtToken);
    const [hashId, setHashId] = useState<String>("");
    const promocode = useStore((state: any) => state.promocode);

    const clearOrder = useStore((state: any) => (state.clearOrder));

    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        const token = parseCookie(document.cookie).jwt;

        if (token && token.length > 10) {
            //get user data
            useStore.setState({ jwtToken: token, isAuth: true });
        }
    }, []);

    //tg data
    // useEffect(() => {
    //     const initializeTelegramWebApp = () => {
    //         if (window.Telegram && window.Telegram.WebApp) {

    //             let tg: any = window.Telegram.WebApp;
    //             tg.ready();

    //             const safeData = tg.initData || "";
    //             const initDataUnsafe = tg.initDataUnsafe || {};

    //             if (!safeData || !initDataUnsafe.user) {
    //                 console.warn(
    //                     "Не удалось получить данные пользователя Telegram"
    //                 );
    //                 return;
    //             }

    //             const url = `${BASE_API_URL}api/validateTelegramUser`;
    //             const params = new URLSearchParams({ data: safeData });
    //             const fullURL = `${url}?${params}`;


    //             fetch(fullURL)
    //                 .then((response) => response.json())
    //                 .then((data) =>
    //                 )
    //                 .catch((error) => console.error("Error:", error));

    //             //fetch к бэку с safeData на получение пользователя
    //             //Варианты ответа - user: null, user: User, error - если appData не прошла валидацию
    //         }
    //     };

    //     if (document.readyState === "complete") {
    //         initializeTelegramWebApp();
    //     } else {
    //         window.addEventListener("load", initializeTelegramWebApp);
    //     }

    //     return () => {
    //         window.removeEventListener("load", initializeTelegramWebApp);
    //     };
    // }, []);

    /////

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    const requestOptions: any = (raw: any) => {
        return {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
    };

    function getPaymentLink(orderId: any) {
        const paymentData = JSON.stringify({
            orderId: orderId,
            promocode: promocode,
        });

        fetch(
            `${BASE_API_URL}api/payment/getPaymentUrl`,
            requestOptions(paymentData)
        )
            .then((response) => response.text())
            .then((result) => {
                const link = JSON.parse(result).paymentUrl;
                const hashId = JSON.parse(result).hashId;
                if (link && hashId) {
                    setPaymentLink(link);
                    setHashId(hashId);
                    // setPaymentLink(link);
                } else {
                    // toast.error(
                    //     "В данный момент свободных курьеров нет, повторите немного позже. Мы работаем с пятницы по воскресенье с 22.00-4.30"
                    // );
                }
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        if (isOver) {
            // let tg: any = window.Telegram.WebApp

            useStore.setState({ isOver: false });

            const finalOrder: any = [];

            for (const [key, value] of amounts.entries()) {
                for (let i = 0; i < value; i++) {
                    finalOrder.push(key);
                }
            }


            const orderData = JSON.stringify({
                comment: "none",
                cart: finalOrder,
            });

            // order
            fetch(
                `${BASE_API_URL}api/order/createOrder`,
                requestOptions(orderData)
            )
                .then((response) => response.text())
                .then((result) => {
                    const orderId = JSON.parse(result).data.id;

                    if (orderId) {
                        setOrderId(orderId);
                        getPaymentLink(orderId);
                    }
                })
                .catch((error) => console.error(error));
        }
    }, [isOver]);

    useEffect(() => {
        if (paymentLink != "" && orderId != "") {
            let tg: any = window.Telegram.WebApp;

            useStore.setState({ isPayed: true });

            const tgData = {
                orderId: orderId,
                paymentLink: paymentLink,
                hashId: hashId,
            };

            tg.sendData(JSON.stringify(tgData));

            useStore.setState({ paymentLink: paymentLink });
            
            const aElem = document.createElement("a");
            aElem.href = paymentLink;
            aElem.target = "_blank";
            document.body.append(aElem);
            aElem.click();
            aElem.remove();
        }
    }, [paymentLink]);

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

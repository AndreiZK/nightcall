import GlobalStyles, { ToastStyles } from "@/styles";

// import { ScrollLayout } from '@/layouts/ScrollLayout/ScrollLayout'
import { AssetsLoaderLayout } from "@/layouts/AssetsLoaderLayout/AssetsLoaderLayout";

import { Lvh } from "@/hooks/useLvh";
import { SmartCSSGrid } from "@/styles";

import type { AppProps } from "next/app";

import { Onest, Noto_Sans } from "next/font/google";
import { AnimatedRouterLayout } from "@/layouts/AnimatedRouterLayout/AnimatedRouterLayout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Modals } from "@/components/Modals/Modals";
import { initializeTelegramWebApp } from "@/utils/initializeTelegramWebApp";
import useStore from "@/store/store";
import Layout from "@/components/Layout";

export const onest = Onest({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const notoSans = Noto_Sans({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

const ScrollLayout = dynamic(
    import("@/layouts/ScrollLayout/ScrollLayout").then(
        (mod) => mod.ScrollLayout
    ),
    { ssr: false }
);

export const title = "Nightcall - ночная доставка в Гродно";
export const description = `Работаем в тестовом режиме⏱️`;
export const keywords = `ночная доставка еды Гродно, Nightcall доставка, еда ночью Гродно, доставка бургеров Гродно, доставка пиццы ночью, заказ еды ночью, напитки и закуски ночная доставка, 24/7 доставка еды Гродно, Nightcall.by официальный сайт, быстрая ночная доставка еды`;
export const url = "https://textura.agency";
export const author = "Textura Agency";
export const twitter = "textura.agency";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChangeStart = () => {
            useStore.setState({ isContentLoaded: false });
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
        };
    }, [router]);

    useEffect(() => {
        void document.body.style.removeProperty("opacity");
    }, []);

    useEffect(() => {
        const html = document.querySelector("html");
        if (!html) {
            return;
        }
        html.style.setProperty("--font-onest", onest.style.fontFamily);
        html.style.setProperty("--font-noto", notoSans.style.fontFamily);
    });

    useEffect(() => {
        let retryCount = 0;
        const maxRetries = 10;
        
        const initApp = () => {
            if (retryCount >= maxRetries) {
                console.error("Failed to initialize Telegram WebApp after maximum retries");
                return;
            }

            console.log(`Debug: Initialization attempt ${retryCount + 1}`);
            initializeTelegramWebApp();
            
            // If we didn't get the WebApp object, retry
            if (!window.Telegram?.WebApp) {
                retryCount++;
                setTimeout(initApp, 1000);
            }
        };

        if (document.readyState === "complete") {
            initApp();
        } else {
            window.addEventListener("load", initApp);
        }

        return () => {
            window.removeEventListener("load", initApp);
        };
    }, []);

    return (
        <>
            <Head>
                <title key="title">{title}</title>
                <meta
                    name="description"
                    content={description}
                    key="description"
                />
                <meta name="keywords" content={keywords} />
                <meta
                    name="viewport"
                    content="width=device-width, minimum-scale=1, initial-scale=1.0"
                />
                <meta name="theme-color" content="#000" />
                {/* <Script 
                    src="https://telegram.org/js/telegram-web-app.js"
                    strategy="beforeInteractive"
                    async={false}
                    onLoad={() => {
                        console.log("Telegram WebApp script loaded");
                        initializeTelegramWebApp();
                    }}
                    onError={(e) => {
                        console.error("Error loading Telegram WebApp script:", e);
                    }}
                /> */}
                <script src="https://telegram.org/js/telegram-web-app.js" />
            </Head>
            <ScrollLayout>
                <AssetsLoaderLayout>
                    <AnimatedRouterLayout>
                        <Layout>
                            <GlobalStyles />
                            <ToastStyles />
                            <SmartCSSGrid />
                            <Lvh />
                            <Component {...pageProps} />
                            <Modals/>
                        </Layout>
                    </AnimatedRouterLayout>
                </AssetsLoaderLayout>
            </ScrollLayout>
        </>
    );
}

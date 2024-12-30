import GlobalStyles, { ToastStyles } from "@/styles";

// import { ScrollLayout } from '@/layouts/ScrollLayout/ScrollLayout'
import { AssetsLoaderLayout } from "@/layouts/AssetsLoaderLayout/AssetsLoaderLayout";

import { Lvh } from "@/hooks/useLvh";
import { SmartCSSGrid } from "@/styles";

import type { AppProps } from "next/app";

import { Onest } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import { AnimatedRouterLayout } from "@/layouts/AnimatedRouterLayout/AnimatedRouterLayout";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Modals } from "@/components/Modals/Modals";
import { initializeTelegramWebApp } from "@/utils/initializeTelegramWebApp";
import Script from "next/script";

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
    useEffect(() => {
        // Make location.reload do nothing
        // window.location.reload = () => {};
        
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
    if (document.readyState === "complete") {
        initializeTelegramWebApp();
      } else {
        window.addEventListener("load", initializeTelegramWebApp);
      }
  
      return () => {
        window.removeEventListener("load", initializeTelegramWebApp);
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
                <Script 
                    src="https://telegram.org/js/telegram-web-app.js"
                    strategy="beforeInteractive"
                    onError={(e) => {
                        console.error("Error loading Telegram WebApp script:", e);
                    }}
                    onLoad={() => {
                        console.log("Telegram WebApp script loaded");
                        setTimeout(() => {
                            initializeTelegramWebApp();
                        }, 1000);
                    }}
                />
            </Head>
            <ScrollLayout>
                <AssetsLoaderLayout>
                    <AnimatedRouterLayout>
                        <GlobalStyles />
                        <ToastStyles />
                        <SmartCSSGrid />
                        <Lvh />
                        <Component {...pageProps} />
                        <Modals/>
                    </AnimatedRouterLayout>
                </AssetsLoaderLayout>
            </ScrollLayout>
        </>
    );
}

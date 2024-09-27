import GlobalStyles from "@/styles";

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

export const title = "React Three Next Styled Starter";
export const url = "https://textura.agency";
export const description = "Textura Agency";
export const keywords = "Textura Agency, Textura Agency";
export const author = "Textura Agency";
export const twitter = "textura.agency";

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => void document.body.style.removeProperty("opacity"), []);
    useEffect(() => {
        const html = document.querySelector("html");
        if (!html) {
            return;
        }
        html.style.setProperty("--font-onest", onest.style.fontFamily);
        html.style.setProperty("--font-noto", notoSans.style.fontFamily);
    });
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
            </Head>
            <ScrollLayout>
                <AssetsLoaderLayout>
                    <AnimatedRouterLayout>
                        {/* Normalize & Global Styles */}
                        <GlobalStyles />

                        {/* Grid to scale sizes, configure it in styles/index.ts */}
                        <SmartCSSGrid />

                        {/* Lvh Logic for IG in-app */}
                        <Lvh />

                        <Component {...pageProps} />
                    </AnimatedRouterLayout>
                </AssetsLoaderLayout>
            </ScrollLayout>
        </>
    );
}


/**
 * @fileoverview Add here all Required assets to start page
*/

import styled from "styled-components";
import React, { useEffect, useState, createContext, useContext } from "react";
import { useLoadAssets } from "./useLoadAssets";
// Assets
import { useSpring, animated, easings, config } from "@react-spring/web";
import { SquareLoader } from "@/components/Animated/SquareLoader"; 
import { rm } from "@/styles";
import { colors } from "@/styles";

interface Props {
    loading: true,
    progress: 0,
    currentFile: '',
    fullyLoaded: false,
}
export const AssetsLoaderContext = createContext({
    loading: true,
    progress: 0,
    currentFile: '',
    fullyLoaded: false,
} as Props)
export const useAssetsLoader = () => {
    const context = useContext(AssetsLoaderContext)
    return context
}

const StyledLoader = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000000;
    // background-color: color(text-black);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* --color-loader-1: #FFF;
    --color-loader-2: #FFF; */
    --size-loader: ${rm(48)};
    transform: translate(0, 0, 0);
    overflow: hidden;
    color: ${colors.white100};
    pointer-events: none;


    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: ${rm(32)};
    }
`

const StyledBackground = styled(animated.div)`
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background-color: ${colors.black100};
    z-index: -1;
`

const StyledLoaderContainer = styled.div`
    visibility: visible;
`

export const AssetsLoaderLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [delayedLoading, setDelayedLoading] = useState(true)
    const [fullyLoaded, setFullyLoaded] = useState(false)
    const [loading, progress, currentFile] = useLoadAssets({ 
        // path: '/furniture-offer/',
        // images: [
        //     ...framesForLoadingLayout
        // ], 
        // videos: [
        //     'videos/main_background.mp4'
        // ] 
    })
    useEffect(() => { !loading && setDelayedLoading(false) }, [loading])


    const [logoBlockValues, logoBlockApi] = useSpring(() => ({
        y: '0vh',
        opacity: '1',
        config: { duration: 1500, easing: easings.easeInOutCubic }
    }))
    const [textValues, textApi] = useSpring(() => ({
        x: '0',
        y: '0',
        config: { duration: 1500, easing: easings.easeInOutCubic }
    }))
    const [logoValues, logoApi] = useSpring(() => ({
        scale: '1',
        x: '0',
        config: { duration: 1500, easing: easings.easeInOutCubic }
    }))
    const [backgroundValues, backgroundApi] = useSpring(() => ({
        x: '0%',
        y: '0%',
        config: { duration: 1500, easing: easings.easeInOutCubic }
    })) 

    useEffect(() => {
        
        if (!delayedLoading) {
            textApi.start({ x: '2rem', y: '-4.15rem', config: config.slow })
            logoApi.start({ scale: '0.3', x: '-3.13rem', config: config.slow })
            setTimeout(() => {
                logoBlockApi.start({ y: '-45vh' })
                backgroundApi.start({ y: '-100%' })
                setTimeout(() => logoBlockApi.start({ opacity: '0' }), 500)
                setTimeout(() => {
                    setFullyLoaded(true)
                }, 1500)
            }, 500)
        }
    }, [delayedLoading])

    return (
        <>
            <StyledLoader>
                <animated.div style={logoBlockValues}>
                    <animated.div style={logoValues}>
                        <SquareLoader />
                    </animated.div>
                    <animated.span style={textValues}>TEXTURA agency</animated.span>
                </animated.div>
                <StyledBackground style={backgroundValues} />
            </StyledLoader>
            <StyledLoaderContainer>
                <AssetsLoaderContext.Provider
                    value={{
                        loading,
                        progress,
                        currentFile,
                        fullyLoaded,
                    } as Props}
                >
                    {children}
                </AssetsLoaderContext.Provider>
            </StyledLoaderContainer>
        </>
    )
};
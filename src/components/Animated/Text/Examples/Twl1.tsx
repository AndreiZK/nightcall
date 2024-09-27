import { NextPage } from "next"
import TextEngine from "../TextEngine"

import type { EngineProps } from "../TextEngine"
import { useAssetsLoader } from '@/layouts/AssetsLoaderLayout/AssetsLoaderLayout';
import { easings } from "@react-spring/web";

interface Props {
    children: any
}
export const Twl1: NextPage<Props & EngineProps> = ({
    children,
    ...props
}) => {
    const { fullyLoaded } = useAssetsLoader()

    return (
        <TextEngine
            enabled={fullyLoaded}
            wordIn={{ y: '0%'}} 
            wordOut={{ y: '100%'}} 
            wordCoeff={0.3}
            wordConfig={{ duration: 750, easing: easings.easeInOutQuad }}
            letterIn={{opacity: '1', x: '0%'}} 
            letterOut={{opacity: '0', x: '110%'}} 
            letterCoeff={0.05}
            letterConfig={{ duration: 1000, easing: easings.easeInOutQuad }}
            {...props}
        >
            { children }
        </TextEngine>
    )
}
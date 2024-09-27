import { NextPage } from "next"
import TextEngine from "../TextEngine"

import type { EngineProps } from "../TextEngine"
import { useAssetsLoader } from '@/layouts/AssetsLoaderLayout/AssetsLoaderLayout';
import { easings } from "@react-spring/web";

interface Props {
    children: any
}
export const Twll1: NextPage<Props & EngineProps> = ({
    children,
    ...props
}) => {
    const { fullyLoaded } = useAssetsLoader()

    return (
        <TextEngine
            enabled={fullyLoaded}
            wordIn={{ x: '0%'}} 
            wordOut={{ x: '100%'}} 
            wordCoeff={0.1}
            wordConfig={{ duration: 1000, easing: easings.easeInOutQuad }}
            wrapLetterIn={{ y: '0%' }}
            wrapLetterOut={{ y: '100%' }}
            letterIn={{ y: '0%'}} 
            letterOut={{ y: '-100%'}} 
            letterCoeff={0.01}
            letterConfig={{ duration: 2000, easing: easings.easeInOutQuad }}
            overflow
            {...props}
        >
            { children }
        </TextEngine>
    )
}
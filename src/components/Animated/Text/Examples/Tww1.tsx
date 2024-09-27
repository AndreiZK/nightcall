import { NextPage } from "next"
import TextEngine from "../TextEngine"

import type { EngineProps } from "../TextEngine"
import { useAssetsLoader } from '@/layouts/AssetsLoaderLayout/AssetsLoaderLayout';
import { easings } from "@react-spring/web";

interface Props {
    children: any
}
export const Tww1: NextPage<Props & EngineProps> = ({
    children,
    ...props
}) => {
    const { fullyLoaded } = useAssetsLoader()

    return (
        <TextEngine
            enabled={fullyLoaded}
            wrapWordIn={{ y: '0%' }}
            wrapWordOut={{ y: '100%' }}
            wordIn={{ y: '0%'}} 
            wordOut={{ y: '-100%'}} 
            wordCoeff={0.25}
            wordConfig={{ duration: 1000, easing: easings.easeInOutQuad }}
            overflow
            {...props}
        >
            { children }
        </TextEngine>
    )
}
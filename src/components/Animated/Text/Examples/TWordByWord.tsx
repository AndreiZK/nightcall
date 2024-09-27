import { NextPage } from "next"
import TextEngine from "../TextEngine"

import type { EngineProps } from "../TextEngine"
import { useAssetsLoader } from '@/layouts/AssetsLoaderLayout/AssetsLoaderLayout';
import { easings } from "@react-spring/web";

interface Props {
    children: any
}
export const TWordByWord: NextPage<Props & EngineProps> = ({
    children,
    ...props
}) => {
    const { fullyLoaded } = useAssetsLoader()

    return (
        <TextEngine
            enabled={fullyLoaded}
            wordIn={{opacity: 1}} 
            wordOut={{opacity: 0}} 
            wordCoeff={0.25}
            wordConfig={{ duration: 1500, easing: easings.easeInOutQuad }}
            {...props}
        >
            { children }
        </TextEngine>
    )
}
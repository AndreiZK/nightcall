import { NextPage } from "next"
import TextEngine from "../TextEngine"

import type { EngineProps } from "../TextEngine"
import { useAssetsLoader } from '@/layouts/AssetsLoaderLayout/AssetsLoaderLayout';
import { easings } from "@react-spring/web";

interface Props {
    children: any
}
export const Tline1: NextPage<Props & EngineProps> = ({
    children,
    ...props
}) => {
    const { fullyLoaded } = useAssetsLoader()

    return (
        <TextEngine
            enabled={fullyLoaded}
            lineIn={{opacity: '1', y: '0%'}} 
            lineOut={{opacity: '0', y: '110%'}} 
            lineCoeff={0.05}
            lineConfig={{ duration: 1000, easing: easings.easeInOutQuad }}
            overflow
            {...props}
        >
            { children }
        </TextEngine>
    )
}
import { createWithEqualityFn } from "zustand/traditional"
import { shallow } from "zustand/shallow"
import { useEffect, useLayoutEffect } from "react"
import { RootState, useThree, addEffect } from "@react-three/fiber"

// @ts-expect-error
export const useThreeScope = createWithEqualityFn<RootState>(() => ({}), shallow)

export const ThreeScope = () => {
    const state = useThree()
    useLayoutEffect(() => void useThreeScope.setState(state), [state])
    return null
}

export const useFrameScope = (callback: (state: RootState, delta: number) => void) => {
    useEffect(() => {
        const removalEffect = addEffect((delta) => {
            callback && callback(useThreeScope.getState(), delta)
        })
        return () => removalEffect()
    }, [])
}
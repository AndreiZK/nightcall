/**
 * @fileoverview Sets full device screen height to html tag for CSS use
 * Renders only once on page load and is used to fix shakin in Instagram in-app & ios chrome
 */

import { useEffect } from "react"
import { isInstagram } from "@/utils/isInstagram"

const useLvh = () => {
    useEffect(() => {
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (isInstagram() || isChrome) {
            render()
        }
        function render() {
            const bottomMenuOffset = 0 //px
            const vh = (window.outerHeight + bottomMenuOffset) * 0.01;
            if (window.innerWidth > 576) {
                document.documentElement.style.removeProperty('--vh');
            } else
            if (document.documentElement.style.getPropertyValue('--vh') !== `${vh}px`) {
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            }
        }
    }, [])
}

export const Lvh = () => {
    useLvh()
    return null
}
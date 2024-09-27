// https://github.com/studio-freight/lenis
// TODO refactor for app-directory
// See https://github.com/pmndrs/react-three-next/pull/123

// 1 - wrap <Component {...pageProps} /> with <Scroll /> in _app.jsx
// 2 - add <ScrollTicker /> wherever in the canvas
// 3 - enjoy
import { addEffect, useFrame } from '@react-three/fiber'
import Lenis from 'lenis'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { useScroll } from './useScroll'
import { useRouter } from 'next/router'

const state = {
    top: 0,
    progress: 0,
}

const { damp } = THREE.MathUtils

export function ScrollLayout({ children }: any) {
    const isEnableScroll = useScroll(state => state.isEnableScroll)

    const [hash, setHash] = useState<string>('')
    const [lenis, setLenis] = useScroll((state) => [state.lenis, state.setLenis])
    const router = useRouter()

    useEffect(() => {
        window.scrollTo(0, 0)
        const lenis = new Lenis({
            smoothWheel: true,
            // IMPORTANT: Disable SyncTouch if there is no 3D scene on mobile
            syncTouch: true,
        })
        // @ts-expect-error
        window.lenis = lenis
        setLenis(lenis)

        // new ScrollSnap(lenis, { type: 'proximity' })
        lenis.on('scroll', ({ scroll, progress }: any) => {
            state.top = scroll
            state.progress = progress
        })
        // const effectSub = addEffect((time) => lenis.raf(time))
        
        // IMPORTANT: Use this instead [addEffect] if CanvasLayout is not used
        let rq = null
        const raf = (time: number) => {
            lenis?.raf(time);
            rq = requestAnimationFrame(raf);
        };
        rq = requestAnimationFrame(raf);

        return () => {
            // cancelAnimationFrame(rq)
            // effectSub()
            lenis.destroy()
            setLenis(null)
        }
    }, [])


    useEffect(() => {
        if (isEnableScroll) {
            lenis?.start()
            enableNativeScroll(true)
        } else {
            lenis?.stop()
            enableNativeScroll(false)
        }
    }, [isEnableScroll, lenis])


    useEffect(() => {
        if (lenis && hash) {
            const target = document.querySelector(hash);
            if (target) {
                lenis.scrollTo(target as HTMLElement, { offset: 0 });
            }
        }
    }, [lenis, hash]);

    useEffect(() => {
        // update scroll position on page refresh based on hash
        if (router.asPath.includes('#')) {
            const hash = router.asPath.split('#').pop()
            setHash('#' + hash)
        }
    }, [router])

    useEffect(() => {
        // catch anchor links clicks
        function onClick(e: any) {
            e.preventDefault()
            const node = e.currentTarget
            const hash = node.href.split('#').pop()
            setHash('#' + hash)
            setTimeout(() => {
                window.location.hash = hash
            }, 0)
        }
        // @ts-expect-error
        const internalLinks = [...document.querySelectorAll('[href]')].filter(
            (node) => node.href.includes(router.pathname + '#')
        )

        internalLinks.forEach((node) => {
            node.addEventListener('click', onClick, false)
        })

        return () => {
            internalLinks.forEach((node) => {
                node.removeEventListener('click', onClick, false)
            })
        }
    }, [])

    return <>{children}</>
}

export const ScrollTicker = ({ smooth = 9999999 }) => {
    useFrame(({ viewport, camera }, delta) => {
        camera.position.y = damp(camera.position.y, -state.progress * viewport.height, smooth, delta)
    })

    return null
}

export const enableNativeScroll = (value: boolean) => {
    if (!document) { return }
    const html = document.querySelector('html')
    if (!html) { return }
    if (!value) {
        html.style.position = 'relative'
        html.style.overflow = 'hidden'
        html.style.height = '100%'
    } else {
        html.style.removeProperty('position')
        html.style.removeProperty('overflow')
        html.style.removeProperty('height')
    }
}

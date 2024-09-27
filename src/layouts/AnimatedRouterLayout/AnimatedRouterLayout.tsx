import { NextPage } from "next"
import { useRouter } from "next/router"
import Link from "next/link"
import { AnchorHTMLAttributes, createContext, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { TransitionBg } from "./TransitionBg"

const AnimatedRouterContext = createContext({})
export const AnimatedRouterLayout: NextPage<{ children: any }> = ({ children }) => {
    const changing = useRef(false)
    const router = useRouter()
    const transitionRef = useRef<{ show: (callback?: () => void) => void, hide: () => void }>()
    const [rerouting, setRerouting] = useState(false)

    useEffect(() => {
        router.events.on('routeChangeStart', () => {
            // console.log('change start')
        })
        router.events.on('routeChangeComplete', () => {
            routeChangeComplete()
            changing.current = false
        })
        router.events.on('routeChangeError', (error) => {
            console.warn('[AnimatedRouter]: Error during routing', error)
            routeChangeComplete()
            changing.current = false
        })
    }, [])

    const routeChangeStart = (href: string) => {
        if (changing.current) { return }
        changing.current = true
        setRerouting(true)
        transitionRef.current?.show(() => {
            router.push(href)
        })
    }
    const routeChangeComplete = () => {
        transitionRef.current?.hide()
        setRerouting(false)
    }

    const value = {
        routeChangeStart,
        routeChangeComplete,
        rerouting
    }

    return (
        <AnimatedRouterContext.Provider value={value}>
            <TransitionBg ref={transitionRef}/>
            {children}
        </AnimatedRouterContext.Provider>
    )
}

interface UseAnimatedRouter {
    routeChangeStart: (href: string) => void
    routeChangeComplete: () => void
    rerouting: boolean
}
export const useAnimatedRouter = (): UseAnimatedRouter => {
    const context = useContext(AnimatedRouterContext)
    return context as UseAnimatedRouter
}


interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

export const AnimLink = forwardRef<HTMLAnchorElement, Props>(({onClick, ...props}, outerRef) => {
    const ref = useRef<HTMLAnchorElement | null>(null)
    useImperativeHandle(outerRef, () => ref.current as HTMLAnchorElement)
    const router = useAnimRouter()
    return (
        <Link
            ref={ref}
            onClick={(e) => { e.preventDefault(); router.push(e as any); onClick && onClick(e as any) }}
            {...props}
        >
            {props.children}
        </Link>
    )
})
AnimLink.displayName = 'AnimLink'


export const useAnimRouter = () => {
    const router = useRouter()
    const { routeChangeStart, rerouting } = useAnimatedRouter()
    return useMemo(() => ({
        ...router,
        push: (href: string) => {
            routeChangeStart(href)
        },
        isRerouting: rerouting
    }), [routeChangeStart, router, rerouting])
}

export const useIsRerouting = (delayIn = 2000, delayOut = 2000) => {
    const { rerouting: _rerouting } = useAnimatedRouter()
    const [rerouting, setRerouting] = useState(_rerouting)
    const tmIn = useRef<any>()
    const tmOut = useRef<any>()
    useEffect(() => {
        clearTimeout(tmIn.current)
        clearTimeout(tmOut.current)
        if (_rerouting) {
            tmIn.current = setTimeout(() => {
                setRerouting(true)
            }, delayIn)
            return
        }
        tmOut.current = setTimeout(() => {
            setRerouting(false)
        }, delayOut)
    }, [_rerouting, setRerouting])
    return rerouting
}
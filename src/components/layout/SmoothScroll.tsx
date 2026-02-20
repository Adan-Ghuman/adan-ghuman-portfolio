import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollProps {
    children: React.ReactNode;
}

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
    return lenisInstance;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.65,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.5,
            wheelMultiplier: 1.0,
            infinite: false,
        });

        lenisRef.current = lenis;
        lenisInstance = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
            lenisInstance = null;
        };
    }, []);

    return <>{children}</>;
}

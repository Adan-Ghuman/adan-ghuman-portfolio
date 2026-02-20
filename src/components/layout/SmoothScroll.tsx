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
            duration: 0.8,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2.0,
            wheelMultiplier: 1.0,
            infinite: false,
            syncTouch: true,
        });

        lenisRef.current = lenis;
        lenisInstance = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);

        return () => {
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
            lenisInstance = null;
        };
    }, []);

    return <>{children}</>;
}

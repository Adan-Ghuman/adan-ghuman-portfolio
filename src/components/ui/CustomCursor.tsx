import { useEffect, useRef } from "react";

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mx = -100;
        let my = -100;
        let rx = -100;
        let ry = -100;

        let isHovering = false;
        let isPressed = false;
        let isVisible = false;
        let rafId: number;

        const LERP = 0.4;

        const onMouseMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;

            if (!isVisible) {
                isVisible = true;
                dot.style.opacity = "1";
                ring.style.opacity = "1";
            }
        };

        const onMouseLeave = () => {
            isVisible = false;
            dot.style.opacity = "0";
            ring.style.opacity = "0";
        };

        const onMouseDown = () => {
            isPressed = true;
            dot.style.transform = `translate(${mx}px, ${my}px) scale(0.6)`;
            ring.style.width = isHovering ? "56px" : "28px";
            ring.style.height = isHovering ? "56px" : "28px";
        };


        const onMouseUp = () => {
            isPressed = false;
        };

        const INTERACTIVE =
            'a, button, [role="button"], input, textarea, select, label, details > summary, [data-cursor-hover]';

        const onMouseOver = (e: MouseEvent) => {
            if ((e.target as Element)?.closest?.(INTERACTIVE)) {
                if (!isHovering) {
                    isHovering = true;
                    ring.style.width = "64px";
                    ring.style.height = "64px";
                    ring.style.borderColor = "var(--color-primary)";
                    ring.style.backgroundColor = "rgba(163, 217, 68, 0.08)";
                    dot.style.width = "6px";
                    dot.style.height = "6px";
                }
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            if ((e.target as Element)?.closest?.(INTERACTIVE)) {
                const related = e.relatedTarget as Element | null;
                if (!related?.closest?.(INTERACTIVE)) {
                    isHovering = false;
                    ring.style.width = "36px";
                    ring.style.height = "36px";
                    ring.style.borderColor = "var(--color-primary)";
                    ring.style.backgroundColor = "transparent";
                    dot.style.width = "8px";
                    dot.style.height = "8px";
                }
            }
        };

        const animate = () => {
            rx += (mx - rx) * LERP;
            ry += (my - ry) * LERP;

            dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%) scale(${isPressed ? 0.6 : 1})`;
            ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${isPressed ? 0.85 : 1})`;

            rafId = requestAnimationFrame(animate);
        };

        document.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mouseover", onMouseOver, { passive: true });
        document.addEventListener("mouseout", onMouseOut, { passive: true });

        rafId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                aria-hidden="true"
                className="cursor-dot"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "8px",
                    height: "8px",
                    backgroundColor: "var(--color-primary)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 9999,
                    opacity: 0,
                    transition: "width 0.3s ease, height 0.3s ease, background-color 0.3s ease, opacity 0.2s ease",
                    willChange: "transform",
                }}
            />
            <div
                ref={ringRef}
                aria-hidden="true"
                className="cursor-ring"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "36px",
                    height: "36px",
                    border: "1.5px solid var(--color-primary)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 9998,
                    opacity: 0,
                    transition: "width 0.35s cubic-bezier(0.25, 1, 0.5, 1), height 0.35s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, background-color 0.3s ease, opacity 0.2s ease",
                    willChange: "transform",
                }}
            />
        </>
    );
}

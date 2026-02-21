import { useEffect, useRef, useState, useCallback } from "react";

const TRACE_COUNT = 80;      // Reduced density for better performance
const TRACE_SPEED_BASE = 1.5;
const PARTICLE_COUNT = 150;
const CENTER_RADIUS = 110;
const EXIT_MS = 800;
const MIN_DURATION_MS = 1500;

interface Vec2 { x: number; y: number }

interface Trace {
    path: Vec2[];
    currentProgress: number; // 0 to 1 drawing progress
    speed: number;
    width: number;
    alpha: number;
    totalLen: number;
    delay: number;        // Stagger start times
}

interface Particle {
    speed: number;
    size: number;
    alpha: number;
    traceIndex: number;
    progress: number;
}

interface Palette {
    bg: string;
    line: [number, number, number];
    glow: [number, number, number];
    text: string;
}

function parseColor(str: string): [number, number, number] {
    str = str.trim();
    if (str.startsWith("#")) {
        const hex = str.substring(1);
        const bigint = parseInt(hex, 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }
    const match = str.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
    return [163, 217, 68];
}

function buildOutwardTrace(w: number, h: number, cx: number, cy: number): Trace {
    const angle = Math.random() * Math.PI * 2;
    const startX = cx + Math.cos(angle) * CENTER_RADIUS;
    const startY = cy + Math.sin(angle) * CENTER_RADIUS;

    const path: Vec2[] = [{ x: startX, y: startY }];

    const distToEdge = Math.max(w, h) * 1.5;
    const targetX = cx + Math.cos(angle) * distToEdge;
    const targetY = cy + Math.sin(angle) * distToEdge;

    let currX = startX;
    let currY = startY;

    const clearDist = 20 + Math.random() * 40;
    const p1X = currX + Math.cos(angle) * clearDist;
    const p1Y = currY + Math.sin(angle) * clearDist;

    const dx = Math.abs(Math.cos(angle));
    const dy = Math.abs(Math.sin(angle));

    if (dx > dy) {
        path.push({ x: p1X, y: currY });
        currX = p1X;
    } else {
        path.push({ x: currX, y: p1Y });
        currY = p1Y;
    }

    const steps = 4 + Math.floor(Math.random() * 5);

    for (let i = 0; i < steps; i++) {
        const xDist = targetX - currX;
        const yDist = targetY - currY;

        const moveX = Math.random() < (Math.abs(xDist) / (Math.abs(xDist) + Math.abs(yDist)));

        const segmentLen = 50 + Math.random() * 200;

        if (moveX) {
            const nextX = currX + (xDist > 0 ? 1 : -1) * segmentLen;
            path.push({ x: nextX, y: currY });
            currX = nextX;
        } else {
            const nextY = currY + (yDist > 0 ? 1 : -1) * segmentLen;
            path.push({ x: currX, y: nextY });
            currY = nextY;
        }
    }

    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
        const pdx = path[i + 1].x - path[i].x;
        const pdy = path[i + 1].y - path[i].y;
        total += Math.sqrt(pdx * pdx + pdy * pdy);
    }

    return {
        path,
        currentProgress: 0,
        speed: (0.005 + Math.random() * 0.01) * TRACE_SPEED_BASE,
        width: 1 + Math.random(),
        alpha: 0.2 + Math.random() * 0.4,
        totalLen: total,
        delay: Math.random() * 50
    };
}


export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [progress, setProgress] = useState(0);
    const [exiting, setExiting] = useState(false);
    const progressRef = useRef(0);
    const smoothProgress = useRef(0);
    const loadedRef = useRef(false);
    const exitingRef = useRef(false);
    const startTime = useRef(Date.now());

    // Read palette synchronously from the DOM — the inline script in index.html
    // guarantees the correct dark/light class is already on <html> before React renders.
    const themeRef = useRef<Palette | null>(null);
    if (themeRef.current === null) {
        const isDark = !document.documentElement.classList.contains("light");
        const styles = getComputedStyle(document.documentElement);
        const bgBase = styles.getPropertyValue("--color-bg-base").trim();
        const colorPrimary = styles.getPropertyValue("--color-primary").trim();
        const primaryRGB = parseColor(colorPrimary || (isDark ? "#c0ff40" : "#a3d944"));
        themeRef.current = {
            bg: bgBase || (isDark ? "#050505" : "#f9fafb"),
            line: primaryRGB,
            glow: primaryRGB,
            text: colorPrimary || (isDark ? "#c0ff40" : "#a3d944"),
        };
    }

    useEffect(() => {
        const mark = () => { loadedRef.current = true; };
        if (document.readyState === "complete") setTimeout(mark, 1000);
        else window.addEventListener("load", () => setTimeout(mark, 500));
        return () => window.removeEventListener("load", mark);
    }, []);

    const startExit = useCallback(() => {
        if (exitingRef.current) return;
        exitingRef.current = true;
        setExiting(true);
        setTimeout(onComplete, EXIT_MS);
    }, [onComplete]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false })!;

        let w: number, h: number, cx: number, cy: number;
        let traces: Trace[] = [];
        let particles: Particle[] = [];

        const init = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            cx = w / 2;
            cy = h / 2;

            traces = [];
            for (let i = 0; i < TRACE_COUNT; i++) {
                traces.push(buildOutwardTrace(w, h, cx, cy));
            }

            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    speed: 0.005 + Math.random() * 0.01,
                    size: 1.5 + Math.random() * 1.5,
                    alpha: 0.5 + Math.random() * 0.5,
                    traceIndex: Math.floor(Math.random() * TRACE_COUNT),
                    progress: Math.random()
                });
            }
        };

        init();
        window.addEventListener("resize", init, { passive: true });

        let rafId: number;
        let frame = 0;

        const animate = () => {
            frame++;
            const { bg, line, glow } = themeRef.current!;
            const [lr, lg, lb] = line;
            const [gr, gg, gb] = glow;

            smoothProgress.current += (progressRef.current - smoothProgress.current) * 0.1;
            const p = smoothProgress.current / 100;

            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, w, h);

            ctx.lineCap = "butt";
            ctx.lineJoin = "miter";

            for (const tr of traces) {
                if (tr.delay > 0) { tr.delay--; continue; }

                if (tr.currentProgress < 1) tr.speed ? tr.currentProgress += tr.speed : tr.currentProgress += 0.01;
                if (tr.currentProgress > 1) tr.currentProgress = 1;

                const drawLen = tr.totalLen * tr.currentProgress;
                let lenAcc = 0;

                ctx.beginPath();
                ctx.strokeStyle = `rgba(${lr},${lg},${lb},${tr.alpha})`;
                ctx.lineWidth = 1;

                if (tr.path.length > 0) {
                    ctx.moveTo(tr.path[0].x, tr.path[0].y);
                }

                for (let i = 0; i < tr.path.length - 1; i++) {
                    const p1 = tr.path[i];
                    const p2 = tr.path[i + 1];
                    const segLen = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

                    if (lenAcc + segLen <= drawLen) {
                        ctx.lineTo(p2.x, p2.y);
                        lenAcc += segLen;
                    } else {
                        const remain = drawLen - lenAcc;
                        const ratio = remain / segLen;
                        ctx.lineTo(p1.x + (p2.x - p1.x) * ratio, p1.y + (p2.y - p1.y) * ratio);
                        break;
                    }
                }
                ctx.stroke();
            }

            for (const pt of particles) {
                const tr = traces[pt.traceIndex];
                if (tr.currentProgress < 0.2) continue;

                pt.progress += pt.speed;
                if (pt.progress >= 1) {
                    pt.progress = 0;
                    if (Math.random() < 0.1) pt.traceIndex = Math.floor(Math.random() * TRACE_COUNT);
                }

                const targetLen = tr.totalLen * pt.progress;

                if (targetLen > tr.totalLen * tr.currentProgress) continue;

                let currentDist = 0;
                let pos = tr.path[0];

                for (let i = 0; i < tr.path.length - 1; i++) {
                    const p1 = tr.path[i];
                    const p2 = tr.path[i + 1];
                    const segLen = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
                    if (currentDist + segLen >= targetLen) {
                        const ratio = (targetLen - currentDist) / segLen;
                        pos = { x: p1.x + (p2.x - p1.x) * ratio, y: p1.y + (p2.y - p1.y) * ratio };
                        break;
                    }
                    currentDist += segLen;
                }

                ctx.fillStyle = `rgba(${gr},${gg},${gb},${pt.alpha})`;
                ctx.fillRect(pos.x - pt.size / 2, pos.y - pt.size / 2, pt.size, pt.size);
            }

            const ringR = 100;
            const thickness = 10;

            ctx.shadowBlur = 0;
            ctx.strokeStyle = `rgba(${lr},${lg},${lb}, 0.15)`;
            ctx.lineWidth = thickness;
            ctx.beginPath();
            ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
            ctx.stroke();

            ctx.shadowBlur = 15;
            ctx.shadowColor = `rgba(${gr},${gg},${gb}, 0.6)`;
            ctx.strokeStyle = `rgba(${lr},${lg},${lb}, 1)`;
            ctx.lineWidth = thickness;
            ctx.lineCap = "butt";

            const startAngle = -Math.PI / 2;
            const endAngle = startAngle + (Math.PI * 2 * p);

            ctx.beginPath();
            ctx.arc(cx, cy, ringR, startAngle, endAngle);
            ctx.stroke();

            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(${lr},${lg},${lb}, 0.5)`;
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(cx, cy, ringR - 15, 0, Math.PI * 2);
            ctx.stroke();


            const cur = progressRef.current;
            const elapsed = Date.now() - startTime.current;
            if (cur < 100) {
                let inc = 0.5;
                if (!loadedRef.current) {
                    if (cur > 70) inc = 0.05;
                    else if (cur > 90) inc = 0.01;
                } else {
                    inc = 1.0 + (cur * 0.05);
                }
                inc *= (0.5 + Math.random());
                const next = Math.min(100, cur + inc);
                progressRef.current = next;
                if (Math.floor(next) > Math.floor(cur)) setProgress(Math.floor(next));
            } else if (!exitingRef.current && elapsed > MIN_DURATION_MS) {
                setTimeout(startExit, 200);
            }

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", init);
        };
    }, [startExit]);

    // themeRef is always non-null after the lazy-init above
    const palette = themeRef.current!;
    const { text, glow } = palette;
    const [gr, gg, gb] = glow;

    return (
        <div
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out"
            style={{
                backgroundColor: palette.bg,
                opacity: exiting ? 0 : 1,
                transform: exiting ? "scale(2.5)" : "scale(1)",
                filter: exiting ? "blur(10px)" : "blur(0px)",
                pointerEvents: exiting ? "none" : "auto"
            }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />


            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none">
                <div className="absolute flex items-center justify-center" style={{ width: 160, height: 160 }}>
                    <span
                        className="font-display font-bold tabular-nums tracking-tighter"
                        style={{
                            fontSize: "3.5rem",
                            color: text,
                            textShadow: `0 0 30px rgba(${gr},${gg},${gb},0.5)`
                        }}
                    >
                        {progress}<span className="text-2xl opacity-70">%</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

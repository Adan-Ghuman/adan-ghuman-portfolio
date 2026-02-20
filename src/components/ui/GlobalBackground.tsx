import { useEffect, useRef } from 'react';

export function GlobalBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrameId: number;

        const isDark = () => document.documentElement.classList.contains('dark');

        const BG_DARK = [5, 5, 5];
        const BG_LIGHT = [249, 250, 251];
        const LINE_DARK = [50, 100, 50];
        const LINE_LIGHT = [34, 120, 60];
        const NODE_DARK = [60, 120, 60];
        const NODE_LIGHT = [34, 120, 60];

        const startDark = isDark();
        const currentBg = startDark ? [...BG_DARK] : [...BG_LIGHT];
        const currentLine = startDark ? [...LINE_DARK] : [...LINE_LIGHT];
        const currentNode = startDark ? [...NODE_DARK] : [...NODE_LIGHT];
        let currentOpacityMul = startDark ? 1 : 0.5;

        const LERP_SPEED = 0.06;

        const lerpChannel = (current: number, target: number, t: number) =>
            current + (target - current) * t;

        const lerpColor = (current: number[], target: number[], t: number) => {
            current[0] = lerpChannel(current[0], target[0], t);
            current[1] = lerpChannel(current[1], target[1], t);
            current[2] = lerpChannel(current[2], target[2], t);
        };

        const rgbString = (c: number[]) =>
            `rgb(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])})`;

        const rgbTuple = (c: number[]) =>
            `${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}`;

        const GRID_SIZE = 30;
        const MAX_GRID_STEPS = 50;
        const TRACE_COUNT = 15;
        const MOVEMENT_SPEED = 1.7;

        interface Tracer {
            x: number;
            y: number;
            dx: number;
            dy: number;
            history: { x: number, y: number }[];
            state: 'growing' | 'fading';
            alpha: number;
            gridSteps: number;
            segmentProgress: number;
        }

        let tracers: Tracer[] = [];

        const resetTracer = (t: Tracer) => {
            const side = Math.floor(Math.random() * 4);

            t.history = [];
            t.state = 'growing';
            t.alpha = 1.0;
            t.gridSteps = 0;
            t.segmentProgress = 0;

            switch (side) {
                case 0:
                    t.x = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
                    t.y = 0;
                    t.dx = 0;
                    t.dy = 1;
                    break;
                case 1:
                    t.x = width;
                    t.y = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
                    t.dx = -1;
                    t.dy = 0;
                    break;
                case 2:
                    t.x = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
                    t.y = height;
                    t.dx = 0;
                    t.dy = -1;
                    break;
                case 3:
                    t.x = 0;
                    t.y = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
                    t.dx = 1;
                    t.dy = 0;
                    break;
            }
            t.history.push({ x: t.x, y: t.y });
        }

        const initTracers = () => {
            tracers = [];
            for (let i = 0; i < TRACE_COUNT; i++) {
                const t: Tracer = {
                    x: 0, y: 0, dx: 0, dy: 0,
                    history: [], state: 'growing', alpha: 1,
                    gridSteps: 0, segmentProgress: 0
                };
                resetTracer(t);
                t.gridSteps = Math.floor(Math.random() * MAX_GRID_STEPS);
                tracers.push(t);
            }
        };

        const update = () => {
            tracers.forEach(t => {
                if (t.state === 'fading') {
                    t.alpha -= 0.02;
                    if (t.alpha <= 0) {
                        resetTracer(t);
                    }
                    return;
                }

                t.x += t.dx * MOVEMENT_SPEED;
                t.y += t.dy * MOVEMENT_SPEED;
                t.segmentProgress += MOVEMENT_SPEED;

                if (t.segmentProgress >= GRID_SIZE) {
                    t.segmentProgress = 0;
                    t.gridSteps++;

                    const lastPoint = t.history[t.history.length - 1];
                    t.x = lastPoint.x + t.dx * GRID_SIZE;
                    t.y = lastPoint.y + t.dy * GRID_SIZE;

                    t.history.push({ x: t.x, y: t.y });

                    if (t.x < 0 || t.x > width || t.y < 0 || t.y > height || t.gridSteps > MAX_GRID_STEPS) {
                        t.state = 'fading';
                    } else if (Math.random() < 0.2) {
                        if (t.dx !== 0) {
                            t.dx = 0;
                            t.dy = Math.random() > 0.5 ? 1 : -1;
                        } else {
                            t.dy = 0;
                            t.dx = Math.random() > 0.5 ? 1 : -1;
                        }
                    }
                }
            });
        };

        const draw = () => {
            const dark = isDark();

            const targetBg = dark ? BG_DARK : BG_LIGHT;
            const targetLine = dark ? LINE_DARK : LINE_LIGHT;
            const targetNode = dark ? NODE_DARK : NODE_LIGHT;
            const targetOpacity = dark ? 1 : 0.5;

            lerpColor(currentBg, targetBg, LERP_SPEED);
            lerpColor(currentLine, targetLine, LERP_SPEED);
            lerpColor(currentNode, targetNode, LERP_SPEED);
            currentOpacityMul = lerpChannel(currentOpacityMul, targetOpacity, LERP_SPEED);

            ctx.fillStyle = rgbString(currentBg);
            ctx.fillRect(0, 0, width, height);

            const BASE_LINE_COLOR = rgbTuple(currentLine);
            const BASE_NODE_COLOR = rgbTuple(currentNode);
            const opacityMultiplier = currentOpacityMul;

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            ctx.shadowBlur = 3;
            ctx.shadowColor = `rgba(${BASE_LINE_COLOR}, 0.4)`;

            tracers.forEach(t => {
                if (t.history.length < 1) return;

                const opacity = t.alpha * 0.3 * opacityMultiplier;
                ctx.strokeStyle = `rgba(${BASE_LINE_COLOR}, ${opacity})`;
                ctx.lineWidth = 1.5;

                ctx.beginPath();
                ctx.moveTo(t.history[0].x, t.history[0].y);
                for (let i = 1; i < t.history.length; i++) {
                    ctx.lineTo(t.history[i].x, t.history[i].y);
                }

                if (t.state === 'growing' && t.history.length > 0) {
                    ctx.lineTo(t.x, t.y);
                }
                ctx.stroke();

                ctx.fillStyle = `rgba(${BASE_NODE_COLOR}, ${t.alpha * 0.25 * opacityMultiplier})`;
                for (let i = 0; i < t.history.length; i++) {
                    const point = t.history[i];
                    if (i === 0 || i === t.history.length - 1) {
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    } else {
                        const prev = t.history[i - 1];
                        const next = t.history[i + 1];
                        if (prev && next && (prev.x !== next.x && prev.y !== next.y)) {
                            ctx.beginPath();
                            ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                }

                if (t.state === 'growing') {
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            ctx.shadowBlur = 0;
        };

        const animate = () => {
            update();
            draw();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initTracers();
        };

        window.addEventListener('resize', handleResize, { passive: true });

        canvas.width = width;
        canvas.height = height;
        initTracers();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
        />
    );
}

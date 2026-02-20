import { useEffect, useRef } from 'react';

export function HeroBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = container.offsetWidth;
        let height = container.offsetHeight;
        let animationFrameId: number;

        const isDark = () => document.documentElement.classList.contains('dark');
        const PARTICLE_COUNT = 60;
        const CONNECTION_DISTANCE = 80;

        const LERP_SPEED = 0.06;
        const lerpVal = (current: number, target: number, t: number) =>
            current + (target - current) * t;

        let themeFactor = isDark() ? 1 : 0;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            baseAlpha: number;
            hue: number; // slight color variation

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.radius = Math.random() * 2 + 0.5;
                this.baseAlpha = Math.random() * 0.5 + 0.3;
                this.hue = Math.random() * 30 + 105; // 105-135 range (green spectrum)
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw(ctx: CanvasRenderingContext2D) {
                const alpha = this.baseAlpha * lerpVal(0.8, 1, themeFactor);
                const glow = lerpVal(0, 4, themeFactor);
                const saturation = lerpVal(100, 90, themeFactor);
                const lightness = lerpVal(25, 75, themeFactor);

                ctx.shadowBlur = glow;
                if (glow > 0.1) {
                    ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, ${alpha * 0.6})`;
                } else {
                    ctx.shadowColor = 'transparent';
                }

                ctx.beginPath();
                ctx.fillStyle = `hsla(${this.hue}, ${saturation}%, ${lightness}%, ${alpha})`;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowBlur = 0;
            }
        }

        let particles: Particle[] = [];

        const init = () => {
            width = container.offsetWidth;
            height = container.offsetHeight;
            canvas.width = width;
            canvas.height = height;

            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            const targetFactor = isDark() ? 1 : 0;
            themeFactor = lerpVal(themeFactor, targetFactor, LERP_SPEED);

            const glowR = Math.round(lerpVal(65, 192, themeFactor));
            const glowG = Math.round(lerpVal(105, 255, themeFactor));
            const glowB = Math.round(lerpVal(50, 64, themeFactor));
            const glowAlpha = lerpVal(0.02, 0.04, themeFactor);

            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.6);
            grad.addColorStop(0, `rgba(${glowR}, ${glowG}, ${glowB}, ${glowAlpha})`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            const connectionAlphaMax = lerpVal(0.12, 0.15, themeFactor);
            ctx.lineWidth = 0.5;
            const connectionDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < connectionDistSq) {
                        const alpha = (1 - Math.sqrt(distSq) / CONNECTION_DISTANCE) * connectionAlphaMax;
                        ctx.strokeStyle = `rgba(${glowR}, ${glowG}, ${glowB}, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const resizeObserver = new ResizeObserver(() => {
            init();
        });
        resizeObserver.observe(container);

        init();
        animate();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 -z-10 bg-transparent overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
}

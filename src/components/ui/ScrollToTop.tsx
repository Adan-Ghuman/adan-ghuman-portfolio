import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { getLenis } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(32);
  const btnRef = useRef<HTMLButtonElement>(null);
  const bounceRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const GAP = 16;
    const DEFAULT_BOTTOM = 32;

    const update = () => {
      setVisible(window.scrollY > 300);

      const isMobile = window.innerWidth < 768;
      const BOTTOM_BAR = isMobile ? 64 : 0;

      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const overlap = window.innerHeight - footerTop;
        if (overlap > 0) {
          setBottomOffset(overlap + GAP + BOTTOM_BAR);
        } else {
          setBottomOffset(DEFAULT_BOTTOM + BOTTOM_BAR);
        }
      } else {
        setBottomOffset(DEFAULT_BOTTOM + BOTTOM_BAR);
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!btnRef.current) return;

    if (visible) {
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, y: 24, scale: 0.7 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)",
          onComplete: startBounce,
        }
      );
    } else {
      stopBounce();
      gsap.to(btnRef.current, {
        opacity: 0,
        y: 24,
        scale: 0.7,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [visible]);

  const startBounce = () => {
    if (!btnRef.current || bounceRef.current) return;
    bounceRef.current = gsap.to(btnRef.current, {
      y: -7,
      duration: 0.55,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  };

  const stopBounce = () => {
    if (bounceRef.current) {
      bounceRef.current.kill();
      bounceRef.current = null;
    }
    if (btnRef.current) gsap.set(btnRef.current, { y: 0 });
  };

  const handleMouseEnter = () => {
    if (!bounceRef.current) return;
    gsap.to(btnRef.current, {
      y: 0, duration: 0.2, ease: "power2.out", onComplete: () => {
        bounceRef.current?.pause();
      }
    });
  };

  const handleMouseLeave = () => {
    bounceRef.current?.resume();
  };

  const handleClick = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (btnRef.current) {
      gsap.timeline()
        .to(btnRef.current, { scale: 0.85, duration: 0.1, ease: "power2.in" })
        .to(btnRef.current, { scale: 1, duration: 0.4, ease: "back.out(3)" });
    }
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Scroll to top"
      style={{ bottom: bottomOffset }}
      className={cn(
        "fixed right-8 z-50",
        "size-12 rounded-full",
        "flex items-center justify-center",
        "bg-primary",
        "shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
        "hover:brightness-110",
        "transition-[filter,bottom] duration-300",
        "opacity-0",
        !visible && "pointer-events-none"
      )}
    >
      <ArrowUp
        className="size-5 text-black"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </button>
  );
}

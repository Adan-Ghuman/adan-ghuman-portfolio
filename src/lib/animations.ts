import {gsap} from "gsap";

interface ScrollRevealConfig {
  trigger: Element;
  start?: string;
  end?: string;
  toggleActions?: string;
}

export function fadeUp(
  targets: gsap.TweenTarget,
  scrollConfig: ScrollRevealConfig,
  options: {delay?: number; stagger?: number} = {},
) {
  return gsap.from(targets, {
    y: 60,
    opacity: 0,
    duration: 1,
    delay: options.delay ?? 0,
    stagger: options.stagger ?? 0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: scrollConfig.trigger,
      start: scrollConfig.start ?? "top 85%",
      end: scrollConfig.end ?? "bottom 20%",
      toggleActions: scrollConfig.toggleActions ?? "play none none none",
    },
  });
}

export function staggerText(
  targets: gsap.TweenTarget,
  scrollConfig: ScrollRevealConfig,
  options: {stagger?: number} = {},
) {
  return gsap.from(targets, {
    y: 80,
    opacity: 0,
    duration: 1.2,
    stagger: options.stagger ?? 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: scrollConfig.trigger,
      start: scrollConfig.start ?? "top 85%",
      toggleActions: scrollConfig.toggleActions ?? "play none none none",
    },
  });
}

export function scaleIn(
  targets: gsap.TweenTarget,
  scrollConfig: ScrollRevealConfig,
) {
  return gsap.from(targets, {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 1,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: scrollConfig.trigger,
      start: scrollConfig.start ?? "top 85%",
      toggleActions: scrollConfig.toggleActions ?? "play none none none",
    },
  });
}

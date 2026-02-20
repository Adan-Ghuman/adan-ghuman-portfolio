import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

let didInit = false;

export function initGsap() {
  if (didInit) return;
  didInit = true;
  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
    force3D: true,
    overwrite: "auto",
  });

  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    ignoreMobileResize: true,
  });

  // Prevent GSAP from skipping frames when tab regains focus.
  // A value of 500ms threshold / 33ms cap keeps animations smooth
  // without big jumps after the browser was in the background.
  gsap.ticker.lagSmoothing(500, 33);
}

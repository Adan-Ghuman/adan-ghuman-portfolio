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
  });

  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    ignoreMobileResize: true,
  });
}

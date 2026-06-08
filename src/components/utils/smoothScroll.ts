import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let rafId: ((time: number) => void) | null = null;

/**
 * Initialise Lenis smooth scrolling and wire it into GSAP's ticker and
 * ScrollTrigger so the 3D character / scroll-driven timelines stay perfectly
 * in sync. Smoothing is intentionally disabled on touch devices (Lenis default)
 * so native momentum scrolling is preserved on phones/tablets.
 */
export function initSmoothScroll(): Lenis | null {
  if (lenis) return lenis;

  // Respect users who prefer reduced motion — keep native scrolling.
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return null;
  }

  lenis = new Lenis({
    // Lower lerp = longer, silkier glide (more "buttery smooth").
    lerp: 0.1,
    // Keep good distance per wheel notch so the silky glide still feels fast.
    wheelMultiplier: 1.4,
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 2,
  });

  // Keep ScrollTrigger updated on every smoothed scroll frame.
  lenis.on("scroll", ScrollTrigger.update);

  rafId = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(rafId);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function destroySmoothScroll(): void {
  if (rafId) {
    gsap.ticker.remove(rafId);
    rafId = null;
  }
  lenis?.destroy();
  lenis = null;
}

import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

declare global {
    interface Window {
        gsap: typeof gsap;
        ScrollTrigger: typeof ScrollTrigger;
        __lenis?: Lenis;
        __pluginsInited?: boolean;
    }
}

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

let gsap_ctx: ReturnType<typeof gsap.context> | null = null;

export function init_gsap_context(scope: string | null = null) {
    if (gsap_ctx) gsap_ctx.revert();
    gsap_ctx = gsap.context(() => { }, scope ? scope : undefined);
    return gsap_ctx;
}

export function clear_gsap_context() {
    if (gsap_ctx) {
        gsap_ctx.revert();
        gsap_ctx = null;
    }
}

export function initPlugins() {
    if (window.__pluginsInited) return window.__lenis;
    window.__pluginsInited = true;

    const lenis = new Lenis({
        smoothWheel: true,
    });
    window.__lenis = lenis;

    // Lenis -> ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker -> Lenis raf
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Refrescos para evitar “atascos” por layout shifts en deploy
    requestAnimationFrame(() => ScrollTrigger.refresh());
    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

    return lenis;
}

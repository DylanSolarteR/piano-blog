import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

let gsap_ctx: ReturnType<typeof gsap.context> | null = null;

export function init_gsap_context(scope: string | null = null) {
  if (gsap_ctx) {
    gsap_ctx.revert();
  }
  gsap_ctx = gsap.context(() => {}, scope ? scope : undefined);
  return gsap_ctx;
}

export function clear_gsap_context() {
  if (gsap_ctx) {
    gsap_ctx.revert();
    gsap_ctx = null;
  }
}

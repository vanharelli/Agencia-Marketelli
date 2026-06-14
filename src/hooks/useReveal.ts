import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useReveal — anima todos os elementos com [data-reveal] dentro do scope quando
 * entram na viewport. Suporta data-reveal="up|left|right|scale" e
 * data-reveal-stagger para grupos. Respeita prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const scopeRef = useRef<T>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      els.forEach((el) => {
        const type = el.dataset.reveal || 'up';
        const from: gsap.TweenVars = { opacity: 0 };
        if (type === 'up') from.y = 48;
        if (type === 'left') from.x = -48;
        if (type === 'right') from.x = 48;
        if (type === 'scale') { from.scale = 0.9; from.y = 24; }

        if (prefersReduced) {
          gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
          return;
        }

        const children = el.dataset.revealStagger
          ? gsap.utils.toArray<HTMLElement>(el.children)
          : [el];

        gsap.from(children, {
          ...from,
          duration: 0.9,
          ease: 'power3.out',
          stagger: el.dataset.revealStagger ? 0.12 : 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

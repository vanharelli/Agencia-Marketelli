import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Preloader — abertura cinematográfica. Logo + contador 0→100 e
 * cortina que revela o site. Chama onComplete ao terminar.
 */
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      onComplete();
    };

    // Garantia: se o rAF for limitado (aba em segundo plano) o site revela mesmo assim.
    const fallback = window.setTimeout(finish, 4200);

    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: finish,
      });

      tl.to(counter, {
        v: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => setPct(Math.round(counter.v)),
      });
      if (barRef.current) {
        tl.to(barRef.current, { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0);
      }
      tl.to('.pre-fade', { y: -30, opacity: 0, duration: 0.6, ease: 'power3.in', stagger: 0.05 }, '+=0.15');
      tl.to(rootRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'expo.inOut',
      }, '-=0.2');
    }, rootRef);

    return () => {
      window.clearTimeout(fallback);
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
    >
      <div className="pre-fade flex items-center gap-3 mb-8">
        <img src="/Marketellilogo.webp" alt="" className="w-10 h-10 object-contain animate-glow-pulse" />
        <span className="text-2xl font-black tracking-[8px] text-white">MARKETELLI</span>
      </div>
      <div className="pre-fade w-56 h-px bg-white/10 overflow-hidden">
        <div
          ref={barRef}
          className="h-full w-full bg-gradient-to-r from-[#A020F0] to-[#D18CFF] origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
      <div className="pre-fade mt-4 flex w-56 justify-between text-[10px] tracking-[3px] uppercase text-gray-500 font-mono">
        <span>Carregando</span>
        <span className="text-[#A020F0]">{pct}%</span>
      </div>
    </div>
  );
};

export default Preloader;

import { useEffect, useRef } from 'react';

/**
 * ScrollProgress — barra fina no topo que mede o avanço da leitura.
 */
const ScrollProgress = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (el) {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? h.scrollTop / max : 0;
        el.style.transform = `scaleX(${p})`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[60] pointer-events-none">
      <div
        ref={ref}
        className="h-full w-full origin-left bg-gradient-to-r from-[#A020F0] via-[#D18CFF] to-[#FFD700]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};

export default ScrollProgress;

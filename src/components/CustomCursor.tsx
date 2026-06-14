import { useEffect, useRef } from 'react';

/**
 * CustomCursor — cursor de luxo (ponto + anel) com lerp suave.
 * Cresce sobre elementos interativos (a, button, [data-cursor]).
 * Só ativa em ponteiros finos (desktop); some no toque.
 */
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.documentElement.classList.add('has-custom-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let hovering = false;
    let down = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target as HTMLElement;
      hovering = !!target.closest('a, button, [data-cursor="hover"], input, textarea');
    };
    const onDown = () => { down = true; };
    const onUp = () => { down = false; };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      dot.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      const scale = (hovering ? 1.8 : 1) * (down ? 0.8 : 1);
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%,-50%) scale(${scale})`;
      ring.style.opacity = hovering ? '1' : '0.6';
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;

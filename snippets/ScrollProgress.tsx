import { useEffect, useRef } from 'react';

/**
 * ScrollProgress — barra de progresso de rolagem (scroll progress bar).
 * ZERO dependências: só React + estilos inline. Fica fixa no topo e enche
 * da esquerda para a direita conforme o usuário desce a página.
 *
 * Como usar (coloque uma vez, no topo da sua árvore):
 *   <ScrollProgress />
 *   // ou personalizando:
 *   <ScrollProgress height={3} gradient="linear-gradient(90deg,#A020F0,#FFD700)" />
 */

type ScrollProgressProps = {
  /** altura da barra em px (padrão 2) */
  height?: number;
  /** cor ou gradiente CSS da barra */
  gradient?: string;
  /** z-index (padrão 60) */
  zIndex?: number;
};

export default function ScrollProgress({
  height = 2,
  gradient = 'linear-gradient(90deg, #A020F0, #D18CFF, #FFD700)',
  zIndex = 60,
}: ScrollProgressProps) {
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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height,
        zIndex,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={ref}
        style={{
          height: '100%',
          width: '100%',
          background: gradient,
          transformOrigin: 'left',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  );
}

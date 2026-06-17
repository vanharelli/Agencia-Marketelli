import React, { useRef } from 'react';

/**
 * PortalCard — card "portal" com túnel 3D em paralaxe.
 * Molduras neon recuam em profundidade (translateZ) formando um portal; o card
 * inclina seguindo o cursor (preserve-3d), criando paralaxe entre as camadas.
 * O conteúdo (children) flutua à frente, no centro do portal.
 */
const FRAMES = 6;

const PortalCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (inner.current) {
      inner.current.style.transform = `rotateX(${-py * 18}deg) rotateY(${px * 18}deg)`;
      inner.current.style.setProperty('--px', `${px}`);
      inner.current.style.setProperty('--py', `${py}`);
    }
  };
  const leave = () => {
    if (inner.current) inner.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`portal-card ${className}`}>
      <div ref={inner} className="portal-inner">
        <div className="portal-wall" />
        {Array.from({ length: FRAMES }).map((_, i) => (
          <span
            key={i}
            className="portal-layer"
            style={{ transform: `translateZ(${-i * 52}px)`, opacity: 1 - i * 0.13 }}
          />
        ))}
        <div className="portal-face" />
        <div className="portal-content">{children}</div>
      </div>
    </div>
  );
};

export default PortalCard;

import React, { useRef } from 'react';

/**
 * TiltCard — inclinação 3D sutil seguindo o cursor + brilho que acompanha.
 * Só em ponteiros finos; em toque fica estático.
 */
const TiltCard = ({
  children,
  className = '',
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current!;
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

export default TiltCard;

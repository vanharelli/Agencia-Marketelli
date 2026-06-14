import React, { useRef } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
}

/**
 * MagneticButton — o botão "persegue" o cursor levemente e volta ao soltar.
 * Desativa o efeito em telas de toque.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.35,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.5, ease: 'power3.out' });
    gsap.to(innerRef.current, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: 'power3.out' });
  };

  const handleLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      {...props}
    >
      <span ref={innerRef} className="inline-flex items-center justify-center gap-2 w-full h-full">
        {children}
      </span>
    </button>
  );
};

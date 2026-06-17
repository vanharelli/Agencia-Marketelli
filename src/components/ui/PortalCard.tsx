import React from 'react';

/**
 * PortalCard — card "portal" com túnel 3D estático (sem paralaxe/inclinação).
 * As molduras neon recuam em profundidade (translateZ + perspective) formando o
 * portal; o conteúdo (children) fica na 3ª camada, dentro do portal. Sem interação
 * de mouse/toque, então é estável igual no web e no mobile.
 */
const FRAMES = 6;

const PortalCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`portal-card ${className}`}>
      <div className="portal-inner">
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

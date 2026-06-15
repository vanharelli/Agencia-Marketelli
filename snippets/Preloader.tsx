import { useEffect, useRef, useState } from 'react';

/**
 * Preloader — tela de carregamento reutilizável (ZERO dependências).
 * Não precisa de GSAP, Tailwind nem assets externos: só React + estilos inline.
 *
 * Como usar:
 *   const [ready, setReady] = useState(false);
 *   return (
 *     <>
 *       {!ready && (
 *         <Preloader
 *           brand="MARKETELLI"
 *           subtitle="Carregando"
 *           accent="#A020F0"
 *           logoSrc="/logo.png"      // opcional
 *           onComplete={() => setReady(true)}
 *         />
 *       )}
 *       {/* dispare as animações de entrada quando `ready` for true *\/}
 *     </>
 *   );
 */

type PreloaderProps = {
  onComplete: () => void;
  brand?: string;
  subtitle?: string;
  accent?: string;
  logoSrc?: string;
  /** duração da contagem 0→100 em ms (padrão 1800) */
  duration?: number;
};

export default function Preloader({
  onComplete,
  brand = 'BRAND',
  subtitle = 'Carregando',
  accent = '#A020F0',
  logoSrc,
  duration = 1800,
}: PreloaderProps) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setLeaving(true);                 // dispara o fade + cortina subindo
      window.setTimeout(onComplete, 900); // espera a cortina terminar
    };

    // Segurança: revela o site mesmo se a animação travar (ex.: aba em 2º plano)
    const fallback = window.setTimeout(finish, duration + 2400);

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(finish, 150);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    };
  }, [duration, onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        transform: leaving ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 28,
          opacity: leaving ? 0 : 1,
          transform: leaving ? 'translateY(-12px)' : 'translateY(0)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {logoSrc && (
          <img src={logoSrc} alt="" style={{ width: 40, height: 40, objectFit: 'contain' }} />
        )}
        <span style={{ color: '#fff', fontWeight: 900, letterSpacing: '8px', fontSize: 24 }}>
          {brand}
        </span>
      </div>

      <div
        style={{
          width: 224,
          height: 1,
          background: 'rgba(255,255,255,0.12)',
          overflow: 'hidden',
          opacity: leaving ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${accent}, #fff)`,
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <div
        style={{
          width: 224,
          marginTop: 14,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 10,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
          color: '#6b7280',
          opacity: leaving ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        <span>{subtitle}</span>
        <span style={{ color: accent }}>{pct}%</span>
      </div>
    </div>
  );
}

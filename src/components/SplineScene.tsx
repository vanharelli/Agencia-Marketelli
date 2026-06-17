import { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';

/**
 * SplineScene — carrega uma cena 3D do Spline (formato .splinecode) num <canvas>.
 * O canvas mantém pointer-events para o motor de rastreamento (LookAt) seguir o cursor.
 *
 * IMPORTANTE: `scene` deve apontar para um arquivo .splinecode (runtime), por exemplo:
 *   - URL pública do Spline: "https://prod.spline.design/XXXX/scene.splinecode"
 *   - ou um arquivo local em /public: "/nexbot.splinecode"
 * O arquivo .spline (projeto do editor) NÃO funciona aqui — exporte como Code/Web.
 */
const SplineScene = ({ scene, className = '' }: { scene: string; className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !scene) return;

    let active = true;
    const app = new Application(canvas);

    // Pausa a renderização quando o robô sai da tela (economiza GPU e destrava o scroll).
    const io = new IntersectionObserver(
      ([entry]) => {
        const a = app as unknown as { play?: () => void; stop?: () => void };
        if (entry.isIntersecting) a.play?.();
        else a.stop?.();
      },
      { threshold: 0 }
    );

    app
      .load(scene)
      .then(() => {
        if (!active) return;
        setState('ready');
        io.observe(canvas);
      })
      .catch(() => { if (active) setState('error'); });

    return () => {
      active = false;
      io.disconnect();
      app.dispose();
    };
  }, [scene]);

  return (
    <div className={className} aria-hidden>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {state !== 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] tracking-[3px] uppercase text-gray-600">
            {state === 'error' ? 'cena 3D indisponível' : 'carregando 3D…'}
          </span>
        </div>
      )}
    </div>
  );
};

export default SplineScene;

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

    app
      .load(scene)
      .then(() => { if (active) setState('ready'); })
      .catch(() => { if (active) setState('error'); });

    return () => {
      active = false;
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

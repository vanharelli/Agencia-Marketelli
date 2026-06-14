import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * HeroCanvas — Constelação 3D interativa (three.js).
 * Uma rede de partículas (nós) conectada por linhas, girando lentamente e
 * reagindo ao cursor. Representa o "Ecossistema Marketelli": sistemas
 * automáticos e conectados. Otimizada: DPR limitado, pausa fora de tela,
 * respeita prefers-reduced-motion e limpa tudo na desmontagem.
 */
const HeroCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // ---- Build particle field on a spherical shell ----
    const isMobile = width < 768;
    const COUNT = isMobile ? 90 : 150;
    const RADIUS = 11;
    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      // even-ish distribution on sphere (golden spiral) + slight jitter
      const t = i / COUNT;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = RADIUS * (0.65 + Math.random() * 0.35);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions.set([x, y, z], i * 3);
      basePositions.set([x, y, z], i * 3);
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // soft round sprite for glowing nodes
    const sprite = (() => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const ctx = c.getContext('2d')!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, 'rgba(216,140,255,1)');
      g.addColorStop(0.4, 'rgba(160,32,240,0.8)');
      g.addColorStop(1, 'rgba(160,32,240,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      return tex;
    })();

    const pointsMat = new THREE.PointsMaterial({
      size: isMobile ? 0.55 : 0.6,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xffffff,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);

    // ---- Constellation lines between near neighbors ----
    const linePositions: number[] = [];
    const CONNECT_DIST = isMobile ? 5.2 : 4.6;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = basePositions[i * 3] - basePositions[j * 3];
        const dy = basePositions[i * 3 + 1] - basePositions[j * 3 + 1];
        const dz = basePositions[i * 3 + 2] - basePositions[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECT_DIST) {
          linePositions.push(
            basePositions[i * 3], basePositions[i * 3 + 1], basePositions[i * 3 + 2],
            basePositions[j * 3], basePositions[j * 3 + 1], basePositions[j * 3 + 2]
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xa020f0,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);

    const group = new THREE.Group();
    group.add(points);
    group.add(lines);
    scene.add(group);

    // ---- Interaction state ----
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // ---- Resize ----
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // ---- Pause when off-screen ----
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(mount);

    // ---- Animation loop ----
    let raf = 0;
    const startTime = performance.now();
    const posAttr = pointsGeo.getAttribute('position') as THREE.BufferAttribute;

    const render = () => {
      raf = requestAnimationFrame(render);
      if (!visible) return;

      const elapsed = (performance.now() - startTime) / 1000;

      // ease cursor target
      target.x += (mouse.x - target.x) * 0.05;
      target.y += (mouse.y - target.y) * 0.05;

      // autonomous rotation + cursor parallax
      const speed = prefersReduced ? 0.02 : 0.06;
      group.rotation.y = elapsed * speed + target.x * 0.4;
      group.rotation.x = Math.sin(elapsed * 0.15) * 0.12 - target.y * 0.3;

      // gentle breathing of nodes
      if (!prefersReduced) {
        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3;
          const pulse = 1 + Math.sin(elapsed * 1.2 + i) * 0.012;
          posAttr.array[ix] = basePositions[ix] * pulse;
          posAttr.array[ix + 1] = basePositions[ix + 1] * pulse;
          posAttr.array[ix + 2] = basePositions[ix + 2] * pulse;
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    render();

    // ---- Cleanup ----
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      io.disconnect();
      pointsGeo.dispose();
      lineGeo.dispose();
      pointsMat.dispose();
      lineMat.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default HeroCanvas;

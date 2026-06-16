import { useEffect, useRef } from 'react';

/**
 * FooterShader — "wallpaper" interativo em WebGL, exclusivo do rodapé.
 * Reage à posição do mouse (brilho que segue o cursor) e a cliques (ondas/ripples),
 * na paleta roxa/neon do site. Pausa quando fora da tela; limpa tudo na desmontagem.
 * Os listeners ficam no elemento-pai (o footer), então os links continuam clicáveis.
 */
const FRAG = `
precision highp float;
uniform vec2  u_resolution;
uniform float u_time;
uniform vec2  u_mouse;       // 0..1 (y para cima)
uniform vec2  u_click;       // 0..1
uniform float u_clickTime;   // tempo do último clique

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float ar = u_resolution.x / u_resolution.y;
  vec2 p = vec2(uv.x * ar, uv.y);
  vec2 m = vec2(u_mouse.x * ar, u_mouse.y);

  // fluxo orgânico (domain warping) puxado levemente em direção ao mouse
  vec2 q = vec2(fbm(p * 3.0 + u_time * 0.05), fbm(p * 3.0 - u_time * 0.04));
  float n = fbm(p * 3.0 + q * 1.6 + (m - p) * 0.25);

  // base escura -> roxo do site (mais vívido)
  vec3 col = mix(vec3(0.03, 0.0, 0.07), vec3(0.52, 0.10, 0.85), smoothstep(0.25, 0.95, n));
  col += vec3(0.65, 0.15, 1.0) * pow(n, 3.0) * 0.8;

  // nuvem de raios roxa: cristas finas de ruído animado (filamentos) com flicker
  float lt = u_time * 0.5;
  float ridge = fbm(p * 4.5 + vec2(lt, lt * 0.35) + q * 1.2);
  float bolt = pow(1.0 - abs(ridge - 0.5) * 2.0, 11.0);
  float flick = 0.4 + 0.6 * step(0.45, fract(sin(floor(u_time * 7.0) * 47.13) * 4375.84));
  col += vec3(0.78, 0.45, 1.0) * bolt * 1.5 * flick;

  // clarão ocasional (relâmpago)
  float flash = pow(fract(sin(floor(u_time * 0.8) * 53.1) * 9871.3), 22.0);
  col += vec3(0.55, 0.32, 0.95) * flash * 0.6;

  // brilho que segue o cursor
  float d = distance(p, m);
  col += vec3(0.7, 0.25, 1.0) * exp(-d * 3.2) * 0.95;

  // onda ao clicar
  float age = u_time - u_clickTime;
  if (age < 2.2) {
    vec2 c = vec2(u_click.x * ar, u_click.y);
    float r = distance(p, c);
    float ring = smoothstep(0.03, 0.0, abs(r - age * 0.65)) * (1.0 - age / 2.2);
    col += vec3(0.85, 0.45, 1.0) * ring * 1.3;
  }

  // grão sutil
  col += (hash(uv + fract(u_time)) - 0.5) * 0.03;

  // vinheta para manter as bordas um pouco mais escuras (legibilidade do texto)
  col *= 0.7 + 0.3 * smoothstep(1.25, 0.15, distance(uv, vec2(0.5)));

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FooterShader = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    if (!host) return;

    const gl = canvas.getContext('webgl', { antialias: true, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uClick = gl.getUniformLocation(prog, 'u_click');
    const uClickTime = gl.getUniformLocation(prog, 'u_clickTime');

    const dpr = Math.min(window.devicePixelRatio, 2);
    const mouse = { x: 0.5, y: 0.5 };
    const click = { x: 0.5, y: 0.5, t: -10 };
    const start = performance.now();

    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
    };
    const onClick = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      click.x = (e.clientX - r.left) / r.width;
      click.y = 1 - (e.clientY - r.top) / r.height;
      click.t = (performance.now() - start) / 1000;
    };
    host.addEventListener('mousemove', onMove, { passive: true });
    host.addEventListener('click', onClick, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
    io.observe(host);

    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      if (!visible) return;
      const t = (performance.now() - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform2f(uClick, click.x, click.y);
      gl.uniform1f(uClickTime, click.t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    render();

    return () => {
      // NÃO chamar loseContext aqui: o React (StrictMode) reusa o mesmo <canvas>
      // na remontagem, e perder o contexto o deixaria preto/sem reação.
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('click', onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
};

export default FooterShader;

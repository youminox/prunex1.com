/** SVG animado: partículas de agua que la fibra soluble absorbe hasta formar un gel. Solo corre en pantalla. */
export default function FiberGel() {
  const drops = Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return {
      x: 200 + Math.cos(a) * 46,
      y: 210 + Math.sin(a) * 46,
      dx: `${Math.cos(a) * 150}px`,
      dy: `${Math.sin(a) * 150}px`,
      d: `${(i % 6) * 0.65}s`,
      r: 7 + (i % 3) * 2,
    };
  });
  const strands = Array.from({ length: 7 }).map((_, i) => {
    const a = (i / 7) * Math.PI * 2 + 0.3;
    const x1 = 200 + Math.cos(a) * 30,
      y1 = 210 + Math.sin(a) * 30;
    const x2 = 200 + Math.cos(a) * 120,
      y2 = 210 + Math.sin(a) * 120;
    const mx = 200 + Math.cos(a + 0.5) * 80,
      my = 210 + Math.sin(a + 0.5) * 80;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });
  return (
    <div className="gel-scene relative mx-auto aspect-square w-full max-w-[460px]">
      <svg viewBox="0 0 400 420" className="h-full w-full" role="img" aria-label="Ilustración: la fibra soluble absorbe agua y forma un gel">
        <defs>
          <filter id="fg-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b" />
            <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
          </filter>
          <radialGradient id="fg-gel" cx="45%" cy="40%" r="60%">
            <stop offset="0" stopColor="#ffb08a" />
            <stop offset="0.55" stopColor="#E07A4F" />
            <stop offset="1" stopColor="#7A1F3D" />
          </radialGradient>
          <radialGradient id="fg-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#8CC63F" stopOpacity="0.35" />
            <stop offset="1" stopColor="#0093DD" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="210" r="190" fill="url(#fg-halo)" />
        <circle cx="200" cy="210" r="150" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 7" />
        {strands.map((d, i) => (
          <path key={i} d={d} className="fiber-strand" fill="none" stroke="#8CC63F" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
        <g filter="url(#fg-goo)">
          <circle className="gel-blob" cx="200" cy="210" r="46" fill="url(#fg-gel)" />
          <circle className="gel-blob" cx="178" cy="196" r="26" fill="#E07A4F" style={{ animationDelay: "0.4s" }} />
          <circle className="gel-blob" cx="224" cy="226" r="24" fill="#B4472F" style={{ animationDelay: "0.9s" }} />
          {drops.map((p, i) => (
            <circle
              key={i}
              className="drop"
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#5cc8ff"
              style={{ ["--dx" as string]: p.dx, ["--dy" as string]: p.dy, animationDelay: p.d }}
            />
          ))}
        </g>
        <g fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600">
          <g transform="translate(18 40)">
            <rect width="92" height="26" rx="13" fill="rgba(92,200,255,0.18)" stroke="rgba(92,200,255,0.5)" />
            <text x="46" y="17" textAnchor="middle" fill="#bfe8ff">
              agua
            </text>
          </g>
          <g transform="translate(278 60)">
            <rect width="108" height="26" rx="13" fill="rgba(140,198,63,0.16)" stroke="rgba(140,198,63,0.55)" />
            <text x="54" y="17" textAnchor="middle" fill="#d4f59c">
              fibra soluble
            </text>
          </g>
          <g transform="translate(140 372)">
            <rect width="120" height="26" rx="13" fill="rgba(224,122,79,0.18)" stroke="rgba(224,122,79,0.6)" />
            <text x="60" y="17" textAnchor="middle" fill="#ffd2bb">
              gel viscoso
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}

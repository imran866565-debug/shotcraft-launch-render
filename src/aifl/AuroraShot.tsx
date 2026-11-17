// aurora-bloom-bg-flip — re-skinned for Solstice One, plain Remotion (no demo fixtures).
// Card parameters kept exactly: rise seg(0.04→0.56, outCubic), flip seg(0.57→0.64,
// inOutQuad) ≈0.36s — the flip is the shot's single accent. Blob colours re-skinned
// as a group from the card's purple/orange to Solstice amber/rose/indigo.
// A: "Your light never changes." (4 words) blur-out from t=0.40, stagger 0.04.
// B: "Until now." (2 words) blur-in from t=0.70, stagger 0.05, amber→white收色.
// Gap between A-out and B-in ≈0.6s of no text — the flip breathes.
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';

const DURATION = 160;
const LIGHT: [number, number, number] = [236, 236, 236];
const DARK: [number, number, number] = [10, 10, 18];
const AMBER: [number, number, number] = [245, 166, 84];
const WHITE: [number, number, number] = [245, 245, 250];
const INK: [number, number, number] = [22, 23, 28];

const mix = (a: number[], b: number[], k: number) =>
  `rgb(${Math.round(a[0] + (b[0] - a[0]) * k)},${Math.round(a[1] + (b[1] - a[1]) * k)},${Math.round(a[2] + (b[2] - a[2]) * k)})`;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (t: number, a: number, b: number, ease: (x: number) => number) =>
  ease(interpolate(t, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

const WA = 'Your light never changes.'.split(' ');
const WB = 'Until now.'.split(' ');

export const AuroraShot: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / DURATION;
  const rise = seg(t, 0.04, 0.56, Easing.out(Easing.cubic));
  const flip = seg(t, 0.57, 0.64, Easing.inOut(Easing.quad));
  const squash = seg(t, 0.57, 0.7, Easing.bezier(0.34, 1.56, 0.64, 1));
  const drift = Math.sin(t * Math.PI * 2.2);
  const drift2 = Math.sin(t * Math.PI * 1.6 + 1.1);

  const blob = (style: React.CSSProperties, color: string, stop = 68): React.CSSProperties => ({
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(60px)',
    background: `radial-gradient(circle,${color} 0%,${color.replace(/[\d.]+\)$/, '0)')} ${stop}%)`,
    ...style,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: mix(LIGHT, DARK, flip), overflow: 'hidden' }}>
      {/* bright-field top glow (收掉 on flip) + dark-field cold sky (appears after flip) */}
      <div
        style={{
          position: 'absolute', inset: 0, opacity: 1 - flip,
          background: 'radial-gradient(ellipse 70% 60% at 50% 8%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute', inset: 0, opacity: flip,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,79,224,0.20) 0%, rgba(107,79,224,0) 70%)',
        }}
      />
      {/* blob group: rises + grows, then pressed into an ember glow */}
      <div
        style={{
          position: 'absolute',
          inset: '-10%',
          transform: `translateY(${lerp(32, -6, rise)}%) scale(${lerp(1, 1.25, rise) * (1 - 0.06 * squash)})`,
          opacity: lerp(1, 0.4, flip),
        }}
      >
        <div style={blob({ left: '8%', bottom: '-45%', width: '90%', height: '85%' }, 'rgba(245,166,84,.85)')} />
        <div
          style={blob(
            { left: '22%', bottom: '-36%', width: '60%', height: '58%', transform: `translateX(${drift2 * 6}%)` },
            'rgba(224,120,86,.6)', 64,
          )}
        />
        <div
          style={blob(
            { left: '32%', bottom: '-18%', width: '44%', height: '46%', transform: `translateX(${drift * 8}%)` },
            'rgba(217,122,74,.9)', 66,
          )}
        />
        <div
          style={{
            ...blob({ left: '-12%', bottom: '-40%', width: '64%', height: '60%' }, 'rgba(255,255,255,.8)', 62),
            opacity: 1 - flip,
          }}
        />
      </div>

      {/* copy: two lines, same centre point, never cross-fading */}
      <div
        style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif', fontWeight: 600,
          fontSize: 96, letterSpacing: '-0.022em',
        }}
      >
        <div style={{ position: 'absolute', transform: `scale(${lerp(1, 1.035, seg(t, 0, 0.58, Easing.bezier(0.3, 0, 0.2, 1)))})` }}>
          {WA.map((w, i) => {
            const out = seg(t, 0.4 + i * 0.04, 0.5 + i * 0.04, Easing.in(Easing.quad));
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block', margin: '0 .16em',
                  color: mix(INK, INK, 0), opacity: 1 - out,
                  filter: out > 0.005 ? `blur(${out * 8}px)` : 'none',
                  transform: `translateY(${-out * 5}px)`,
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
        <div style={{ position: 'absolute' }}>
          {WB.map((w, i) => {
            const d0 = 0.7 + i * 0.05;
            const a = seg(t, d0, d0 + 0.11, Easing.out(Easing.poly(5)));
            const c = seg(t, d0 + 0.06, d0 + 0.15, Easing.out(Easing.quad));
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block', margin: '0 .16em', opacity: a,
                  filter: a < 0.995 ? `blur(${(1 - a) * 8}px)` : 'none',
                  transform: `translateY(${(1 - a) * 6}px)`,
                  color: mix(AMBER, WHITE, c),
                  textShadow: `0 0 ${10 * (1 - c)}px rgba(245,166,84,${(0.45 * a * (1 - c)).toFixed(3)})`,
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
      </div>

      {/* vignette deepens with the flip */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(12,12,22,0.55) 100%)',
          opacity: lerp(0.07, 0.55, flip),
        }}
      />
    </AbsoluteFill>
  );
};

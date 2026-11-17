// End card — static brand hold after the outro (fades in, then holds to the end).
// Same lockup as the outro sign-off, with the price as the takeaway line.
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.3, 0, 0.2, 1),
  });
  const rise = interpolate(frame, [0, 12], [14, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.3, 0, 0.2, 1),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0B0B12', justifyContent: 'center', alignItems: 'center',
        opacity: fadeIn,
      }}
    >
      <div style={{ textAlign: 'center', transform: `translateY(${rise}px)` }}>
        {/* CSS lamp orb — the product mark */}
        <div
          style={{
            width: 130, height: 130, borderRadius: '50%', margin: '0 auto 44px',
            background:
              'radial-gradient(circle at 50% 42%, #FFF3D6 0%, #FFB454 38%, #E07856 62%, rgba(107,79,224,0.55) 100%)',
            boxShadow: '0 0 60px rgba(255,180,84,0.55), 0 0 140px rgba(224,120,86,0.30)',
          }}
        />
        <div
          style={{
            fontFamily: 'ui-serif, Georgia, "Times New Roman", serif',
            fontSize: 110, fontWeight: 600, color: '#F5F1EA', letterSpacing: '-0.01em', lineHeight: 1,
          }}
        >
          SOLSTICE ONE
        </div>
        <div style={{ height: 6, width: 260, margin: '34px auto 0', borderRadius: 3, background: '#FFB454' }} />
        <div
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 25,
            letterSpacing: '0.14em', color: '#9A97A8', marginTop: 30, textTransform: 'uppercase',
          }}
        >
          Light that follows your day
        </div>
        <div
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 30,
            letterSpacing: '0.14em', color: '#FFB454', marginTop: 22,
          }}
        >
          $129 · AVAILABLE NOW
        </div>
      </div>
    </AbsoluteFill>
  );
};

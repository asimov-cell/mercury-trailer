import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, Easing} from 'remotion';

const FPS = 30;
const DURATION = 1020; // 34 seconds

// Colors
const COLORS = {
  dark: '#050510',
  dark2: '#0a0a1a',
  primary: '#00ff88',
  primaryDark: '#00cc6a',
  secondary: '#00d4ff',
  secondaryDark: '#0099cc',
  accent: '#ff6b35',
  text: '#ffffff',
  textMuted: '#8899aa',
  cardBg: 'rgba(255,255,255,0.03)',
  border: 'rgba(255,255,255,0.08)',
};

// ─────────────────────────────────────────
// UTILITY HOOKS
// ─────────────────────────────────────────

const useFadeIn = (frame: number, delay: number, duration = 30) => {
  const f = useCurrentFrame();
  return interpolate(f, [delay, delay + duration, delay + duration + 15], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

const useSlideUp = (frame: number, delay: number, duration = 25) => {
  const f = useCurrentFrame();
  return interpolate(f, [delay, delay + duration], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

const useScale = (frame: number, delay: number, duration = 20) => {
  const f = useCurrentFrame();
  return interpolate(f, [delay, delay + duration], [0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    extrapolateMax: 'clamp',
  });
};

// ─────────────────────────────────────────
// ANIMATED BACKGROUND
// ─────────────────────────────────────────

const AnimatedBg: React.FC<{color1?: string; color2?: string; speed?: number}> = ({
  color1 = COLORS.dark,
  color2 = COLORS.dark2,
  speed = 200,
}) => {
  const frame = useCurrentFrame();
  const shift = interpolate(frame, [0, speed], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(${135 + shift * 30}deg, ${color1} 0%, ${color2} 100%)`,
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.5,
      }} />
    </div>
  );
};

// ─────────────────────────────────────────
// GLOWING ORB
// ─────────────────────────────────────────

const Orb: React.FC<{x: number; y: number; size: number; color: string; delay: number; duration?: number}> = ({
  x, y, size, color, delay, duration = 300,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(Math.sin(t * Math.PI * 4), [-1, 1], [0.3, 0.7]);
  const scale = 1 + Math.sin(t * Math.PI * 2) * 0.3;
  const translateY = y - t * 60;

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: translateY,
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      opacity,
      transform: `scale(${scale})`,
      filter: `blur(${size / 3}px)`,
    }} />
  );
};

// ─────────────────────────────────────────
// FLOATING PARTICLES
// ─────────────────────────────────────────

const Particles: React.FC<{count?: number; color: string}> = ({count = 15, color}) => {
  const particles = useMemo(() => {
    return Array.from({length: count}, (_, i) => ({
      id: i,
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      size: 2 + Math.random() * 4,
      speed: 50 + Math.random() * 150,
      delay: Math.random() * 200,
      offset: Math.random() * 20,
    }));
  }, [count]);

  const frame = useCurrentFrame();

  return (
    <>
      {particles.map((p) => {
        const t = interpolate(frame, [p.delay, p.delay + p.speed], [0, 1080], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const x = p.x + Math.sin((frame + p.offset) / 50) * 20;
        const opacity = interpolate(Math.sin((frame + p.offset) / 30), [-1, 1], [0.1, 0.5]);
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: x,
              top: t,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: color,
              opacity,
              filter: `blur(${p.size / 2}px)`,
            }}
          />
        );
      })}
    </>
  );
};

// ─────────────────────────────────────────
// ANIMATED LINE
// ─────────────────────────────────────────

const AnimatedLine: React.FC<{x1: number; y1: number; x2: number; y2: number; color: string; delay: number; duration?: number}> = ({
  x1, y1, x2, y2, color, delay, duration = 40,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentX = x1 + (x2 - x1) * progress;
  const currentY = y1 + (y2 - y1) * progress;

  return (
    <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'}}>
      <line x1={x1} y1={y1} x2={currentX} y2={currentY} stroke={color} strokeWidth={1.5} opacity={0.4} />
    </svg>
  );
};

// ─────────────────────────────────────────
// FRAME BOX (for feature cards)
// ─────────────────────────────────────────

const FeatureCard: React.FC<{
  title: string;
  subtitle: string;
  icon: string;
  x: number;
  y: number;
  delay: number;
  accentColor: string;
}> = ({title, subtitle, icon, x, y, delay, accentColor}) => {
  const opacity = useFadeIn(useCurrentFrame(), delay, 30);
  const translateY = useSlideUp(useCurrentFrame(), delay, 25);
  const scale = useScale(useCurrentFrame(), delay, 20);

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${accentColor}33`,
      borderRadius: 16,
      padding: '24px 28px',
      backdropFilter: 'blur(10px)',
      minWidth: 260,
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 20,
        width: 40,
        height: 3,
        background: accentColor,
        borderRadius: 2,
        opacity: 0.8,
      }} />
      <div style={{fontSize: 40, marginBottom: 12}}>{icon}</div>
      <div style={{fontSize: 22, fontWeight: 700, color: COLORS.text, marginBottom: 6, fontFamily: 'Arial'}}>{title}</div>
      <div style={{fontSize: 14, color: COLORS.textMuted, fontFamily: 'Arial'}}>{subtitle}</div>
    </div>
  );
};

// ─────────────────────────────────────────
// HERO TEXT BLOCK
// ─────────────────────────────────────────

const HeroText: React.FC<{
  lines: Array<{text: string; size?: number; color?: string; delay: number; duration?: number}>;
  align?: 'left' | 'center' | 'right';
  maxWidth?: number;
}> = ({lines, align = 'center', maxWidth}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
      gap: 8,
      maxWidth: maxWidth || 900,
    }}>
      {lines.map((line, i) => {
        const opacity = useFadeIn(useCurrentFrame(), line.delay, line.duration || 30);
        const translateY = useSlideUp(useCurrentFrame(), line.delay, 25);
        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              overflow: 'hidden',
            }}
          >
            <span style={{
              fontFamily: 'Arial',
              fontSize: line.size || 60,
              fontWeight: 800,
              color: line.color || COLORS.text,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}>
              {line.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────
// LOGO / WORDMARK
// ─────────────────────────────────────────

const LogoMark: React.FC<{size?: number}> = ({size = 60}) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 20), [-1, 1], [0.8, 1.2]);

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
      <div style={{
        width: size,
        height: size,
        borderRadius: size / 4,
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${pulse})`,
        boxShadow: `0 0 30px ${COLORS.primary}66, 0 0 60px ${COLORS.primary}33`,
      }}>
        <span style={{
          fontFamily: 'Arial',
          fontSize: size * 0.5,
          fontWeight: 900,
          color: COLORS.dark,
        }}>M</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// PHONE MOCKUP
// ─────────────────────────────────────────

const PhoneMockup: React.FC<{x: number; y: number; delay: number; children: React.ReactNode}> = ({
  x, y, delay, children,
}) => {
  const opacity = useFadeIn(useCurrentFrame(), delay, 30);
  const translateY = useSlideUp(useCurrentFrame(), delay, 25);
  const scale = useScale(useCurrentFrame(), delay, 20);

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
    }}>
      <div style={{
        width: 220,
        height: 440,
        background: '#111',
        borderRadius: 36,
        border: '3px solid #333',
        overflow: 'hidden',
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)`,
      }}>
        {/* Notch */}
        <div style={{
          width: 80,
          height: 24,
          background: '#111',
          borderRadius: '0 0 16px 16px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }} />
        <div style={{padding: 16, paddingTop: 8}}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────

const ProgressBar: React.FC<{x: number; y: number; width: number; delay: number; color: string; label?: string}> = ({
  x, y, width, delay, color, label,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{position: 'absolute', left: x, top: y, width: width}}>
      {label && (
        <div style={{fontSize: 13, color: COLORS.textMuted, marginBottom: 6, fontFamily: 'Arial'}}>{label}</div>
      )}
      <div style={{
        width: '100%',
        height: 6,
        background: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress * 100}%`,
          height: '100%',
          background: color,
          borderRadius: 3,
          boxShadow: `0 0 10px ${color}`,
        }} />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// ═══════════════════════════════════════
//  SCENE 1: HOOK
// ═══════════════════════════════════════

const Scene1: React.FC = () => (
  <AbsoluteFill>
    <AnimatedBg color1="#050510" color2="#0a0a1a" />
    <Particles count={20} color={COLORS.primary} />
    <Orb x={200} y={100} size={300} color={COLORS.primary} delay={0} duration={400} />
    <Orb x={1600} y={700} size={200} color={COLORS.secondary} delay={30} duration={350} />
    <Orb x={960} y={500} size={150} color={COLORS.accent} delay={60} duration={300} />

    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <HeroText
        lines={[
          {text: 'Every Agency', size: 90, color: COLORS.text, delay: 15, duration: 35},
          {text: 'Hits A Wall.', size: 110, color: COLORS.primary, delay: 40, duration: 40},
        ]}
      />
      <div style={{marginTop: 40}}>
        <HeroText
          lines={[
            {text: 'Building AI is easy.', size: 36, color: COLORS.textMuted, delay: 90, duration: 25},
            {text: 'Scaling a business isn\'t.', size: 36, color: COLORS.textMuted, delay: 110, duration: 25},
          ]}
        />
      </div>
    </div>

    {/* Decorative lines */}
    <AnimatedLine x1={0} y1={540} x2={400} y2={540} color={COLORS.primary} delay={50} />
    <AnimatedLine x1={1520} y1={540} x2={1920} y2={540} color={COLORS.secondary} delay={60} />
  </AbsoluteFill>
);

// ─────────────────────────────────────────
// SCENE 2: THE PROBLEM
// ─────────────────────────────────────────

const Scene2: React.FC = () => (
  <AbsoluteFill>
    <AnimatedBg color1="#050510" color2="#0a0510" />
    <Particles count={12} color={COLORS.secondary} />
    <Orb x={100} y={800} size={400} color="#3300ff" delay={0} duration={500} />

    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <HeroText
        lines={[
          {text: 'You build the agent.', size: 72, color: COLORS.text, delay: 10, duration: 30},
          {text: 'Client is happy.', size: 72, color: COLORS.text, delay: 35, duration: 30},
        ]}
      />
      <div style={{marginTop: 30}}>
        <HeroText
          lines={[
            {text: 'Then:', size: 32, color: COLORS.textMuted, delay: 75, duration: 20},
          ]}
        />
      </div>
      <div style={{marginTop: 20}}>
        <HeroText
          lines={[
            {text: 'How do you charge?', size: 100, color: COLORS.secondary, delay: 95, duration: 40},
          ]}
        />
      </div>
      <div style={{marginTop: 20}}>
        <HeroText
          lines={[
            {text: 'Per message? Per token? Monthly?', size: 32, color: COLORS.textMuted, delay: 130, duration: 25},
          ]}
        />
      </div>
    </div>
  </AbsoluteFill>
);

// ─────────────────────────────────────────
// SCENE 3: THE REVEAL
// ─────────────────────────────────────────

const Scene3: React.FC = () => (
  <AbsoluteFill>
    <AnimatedBg color1="#050510" color2="#001a10" />
    <Particles count={25} color={COLORS.primary} />
    <Orb x={960} y={540} size={500} color={COLORS.primary} delay={0} duration={400} />
    <Orb x={960} y={540} size={300} color={COLORS.secondary} delay={20} duration={350} />

    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <HeroText
        lines={[
          {text: 'Introducing', size: 36, color: COLORS.textMuted, delay: 10, duration: 25},
        ]}
      />
      <div style={{marginTop: 16}}>
        <LogoMark size={80} />
      </div>
      <div style={{marginTop: 24}}>
        <HeroText
          lines={[
            {text: 'Mercury Hub', size: 140, color: COLORS.primary, delay: 35, duration: 50},
          ]}
        />
      </div>
      <div style={{marginTop: 20}}>
        <HeroText
          lines={[
            {text: 'AI Agents for Agencies', size: 42, color: COLORS.text, delay: 80, duration: 30},
          ]}
        />
      </div>
      <div style={{marginTop: 30}}>
        <HeroText
          lines={[
            {text: 'Build. White-label. Scale.', size: 30, color: COLORS.textMuted, delay: 110, duration: 25},
          ]}
        />
      </div>
    </div>

    {/* Accent lines */}
    <AnimatedLine x1={400} y1={700} x2={1520} y2={700} color={COLORS.primary} delay={100} duration={60} />
  </AbsoluteFill>
);

// ─────────────────────────────────────────
// SCENE 4: BUILD
// ─────────────────────────────────────────

const Scene4: React.FC = () => (
  <AbsoluteFill>
    <AnimatedBg color1="#050510" color2="#0a0a1a" />
    <Particles count={15} color={COLORS.primary} />
    <Orb x={300} y={200} size={350} color={COLORS.primary} delay={0} duration={400} />
    <Orb x={1500} y={800} size={250} color={COLORS.secondary} delay={40} duration={350} />

    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <HeroText
        lines={[
          {text: 'Build', size: 150, color: COLORS.primary, delay: 15, duration: 40},
        ]}
      />
      <div style={{marginTop: 20}}>
        <HeroText
          lines={[
            {text: 'Visual agent builder', size: 42, color: COLORS.text, delay: 55, duration: 30},
            {text: 'No code required', size: 36, color: COLORS.textMuted, delay: 80, duration: 25},
          ]}
        />
      </div>
      <div style={{marginTop: 35}}>
        <HeroText
          lines={[
            {text: 'Setup in 5 minutes', size: 32, color: COLORS.secondary, delay: 110, duration: 20},
          ]}
        />
      </div>
    </div>

    {/* Feature card */}
    <FeatureCard
      title="Drag & Drop"
      subtitle="Build agents visually with our intuitive canvas"
      icon="🧩"
      x={1300}
      y={350}
      delay={70}
      accentColor={COLORS.primary}
    />

    {/* Animated lines */}
    <AnimatedLine x1={0} y1={300} x2={600} y2={300} color={COLORS.primary} delay={30} />
    <AnimatedLine x1={1320} y1={420} x2={1920} y2={420} color={COLORS.primary} delay={90} />
  </AbsoluteFill>
);

// ─────────────────────────────────────────
// SCENE 5: WHITE-LABEL
// ─────────────────────────────────────────

const Scene5: React.FC = () => (
  <AbsoluteFill>
    <AnimatedBg color1="#050510" color2="#001030" />
    <Particles count={15} color={COLORS.secondary} />
    <Orb x={960} y={540} size={400} color={COLORS.secondary} delay={0} duration={400} />

    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <HeroText
        lines={[
          {text: 'White-label', size: 140, color: COLORS.secondary, delay: 15, duration: 40},
        ]}
      />
      <div style={{marginTop: 20}}>
        <HeroText
          lines={[
            {text: 'Your clients think they built it', size: 40, color: COLORS.text, delay: 55, duration: 30},
            {text: 'You stay invisible', size: 36, color: COLORS.textMuted, delay: 80, duration: 25},
          ]}
        />
      </div>
      <div style={{marginTop: 30}}>
        <HeroText
          lines={[
            {text: 'Their logo. Their brand. Their AI.', size: 32, color: COLORS.primary, delay: 110, duration: 20},
          ]}
        />
      </div>
    </div>

    {/* Phone mockup showing WhatsApp */}
    <PhoneMockup x={150} y={300} delay={50}>
      <div style={{
        background: '#0a1510',
        borderRadius: 12,
        padding: 12,
        height: 380,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        {/* Chat header */}
        <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0'}}>
          <div style={{width: 36, height: 36, borderRadius: '50%', background: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18}}>🦷</div>
          <div>
            <div style={{fontSize: 14, fontWeight: 600, color: COLORS.text, fontFamily: 'Arial'}}>Dental Clinic AI</div>
            <div style={{fontSize: 11, color: COLORS.primary, fontFamily: 'Arial'}}>● Online</div>
          </div>
        </div>
        {/* Messages */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto'}}>
          <div style={{background: '#1a2a1a', borderRadius: '12px 12px 12px 4px', padding: '8px 12px', fontSize: 12, color: COLORS.text, maxWidth: '80%', fontFamily: 'Arial'}}>
            Hola! Quiero sacar un turno para blanqueamiento
          </div>
          <div style={{background: '#0a1510', borderRadius: '12px 12px 4px 12px', padding: '8px 12px', fontSize: 12, color: COLORS.text, maxWidth: '80%', alignSelf: 'flex-end', fontFamily: 'Arial', border: '1px solid rgba(255,255,255,0.1)'}}>
            Perfecto! Tenemos disponible el jueves a las 3pm. Te parece? 🦷
          </div>
          <div style={{background: '#1a2a1a', borderRadius: '12px 12px 12px 4px', padding: '8px 12px', fontSize: 12, color: COLORS.text, maxWidth: '80%', fontFamily: 'Arial'}}>
            Si! Confirmado entonces
          </div>
        </div>
      </div>
    </PhoneMockup>

    {/* Second phone - different branding */}
    <PhoneMockup x={1550} y={320} delay={80}>
      <div style={{
        background: '#100a1a',
        borderRadius: 12,
        padding: 12,
        height: 380,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0'}}>
          <div style={{width: 36, height: 36, borderRadius: '50%', background: COLORS.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18}}>🏠</div>
          <div>
            <div style={{fontSize: 14, fontWeight: 600, color: COLORS.text, fontFamily: 'Arial'}}>RealEstate AI</div>
            <div style={{fontSize: 11, color: COLORS.secondary, fontFamily: 'Arial'}}>● Online</div>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto'}}>
          <div style={{background: '#1a1a2a', borderRadius: '12px 12px 12px 4px', padding: '8px 12px', fontSize: 12, color: COLORS.text, maxWidth: '80%', fontFamily: 'Arial'}}>
            Hi! Looking for a 3BR apartment in Palermo
          </div>
          <div style={{background: '#0a0a1a', borderRadius: '12px 12px 4px 12px', padding: '8px 12px', fontSize: 12, color: COLORS.text, maxWidth: '80%', alignSelf: 'flex-end', fontFamily: 'Arial', border: '1px solid rgba(255,255,255,0.1)'}}>
            Great choice! I found 4 matching properties 🌴
          </div>
        </div>
      </div>
    </PhoneMockup>

    <AnimatedLine x1={370} y1={520} x2={1550} y2={520} color={COLORS.secondary} delay={100} duration={50} />
  </AbsoluteFill>
);

// ─────────────────────────────────────────
// SCENE 6: SCALE
// ─────────────────────────────────────────

const Scene6: React.FC = () => (
  <AbsoluteFill>
    <AnimatedBg color1="#050510" color2="#0a0a1a" />
    <Particles count={20} color={COLORS.primary} />
    <Orb x={960} y={540} size={600} color={COLORS.primary} delay={0} duration={500} />

    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <HeroText
        lines={[
          {text: 'Scale', size: 150, color: COLORS.primary, delay: 15, duration: 40},
        ]}
      />
      <div style={{marginTop: 20}}>
        <HeroText
          lines={[
            {text: 'From 1 client to 20', size: 44, color: COLORS.text, delay: 55, duration: 30},
            {text: 'Without hiring devs', size: 38, color: COLORS.textMuted, delay: 80, duration: 25},
          ]}
        />
      </div>
    </div>

    {/* Stats */}
    <div style={{
      position: 'absolute',
      bottom: 200,
      display: 'flex',
      gap: 80,
    }}>
      {[
        {value: '$79', label: '/month to start', color: COLORS.primary},
        {value: '$370', label: 'avg profit/agent', color: COLORS.secondary},
        {value: '5 min', label: 'setup time', color: COLORS.accent},
      ].map((stat, i) => (
        <div key={i} style={{
          textAlign: 'center',
          opacity: useFadeIn(useCurrentFrame(), 100 + i * 20, 30),
          transform: `translateY(${useSlideUp(useCurrentFrame(), 100 + i * 20, 20)}px)`,
        }}>
          <div style={{
            fontSize: 64,
            fontWeight: 900,
            color: stat.color,
            fontFamily: 'Arial',
            letterSpacing: '-0.04em',
            textShadow: `0 0 30px ${stat.color}66`,
          }}>{stat.value}</div>
          <div style={{fontSize: 14, color: COLORS.textMuted, marginTop: 4, fontFamily: 'Arial'}}>{stat.label}</div>
        </div>
      ))}
    </div>

    {/* No credit card */}
    <div style={{
      position: 'absolute',
      bottom: 120,
      opacity: useFadeIn(useCurrentFrame(), 150, 25),
    }}>
      <HeroText
        lines={[
          {text: 'No credit card required', size: 26, color: COLORS.textMuted, delay: 150, duration: 20},
        ]}
      />
    </div>
  </AbsoluteFill>
);

// ─────────────────────────────────────────
// SCENE 7: CTA
// ─────────────────────────────────────────

const Scene7: React.FC = () => (
  <AbsoluteFill>
    <AnimatedBg color1="#050510" color2="#001a10" />
    <Particles count={30} color={COLORS.primary} />
    <Orb x={960} y={540} size={500} color={COLORS.primary} delay={0} duration={400} />
    <Orb x={960} y={540} size={250} color={COLORS.secondary} delay={30} duration={350} />
    <Orb x={200} y={200} size={200} color={COLORS.accent} delay={50} duration={300} />

    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <LogoMark size={80} />
      <div style={{marginTop: 24}}>
        <HeroText
          lines={[
            {text: 'Start Free', size: 130, color: COLORS.primary, delay: 30, duration: 45},
          ]}
        />
      </div>
      <div style={{marginTop: 20}}>
        <HeroText
          lines={[
            {text: 'mercuryhub.io', size: 52, color: COLORS.text, delay: 70, duration: 30},
          ]}
        />
      </div>
      <div style={{marginTop: 40}}>
        <HeroText
          lines={[
            {text: 'Deploy AI Agents for Your Clients.', size: 30, color: COLORS.textMuted, delay: 100, duration: 25},
            {text: 'Bill Monthly. Scale.', size: 30, color: COLORS.textMuted, delay: 120, duration: 25},
          ]}
        />
      </div>
    </div>

    {/* Final accent line */}
    <AnimatedLine x1={600} y1={800} x2={1320} y2={800} color={COLORS.primary} delay={140} duration={60} />

    {/* Corner decorations */}
    <div style={{
      position: 'absolute',
      bottom: 30,
      right: 30,
      fontSize: 12,
      color: COLORS.textMuted,
      opacity: 0.4,
      fontFamily: 'Arial',
    }}>
      Mercury Hub 2026
    </div>
  </AbsoluteFill>
);

// ─────────────────────────────────────────
// MAIN COMPOSITION
// ─────────────────────────────────────────

export const MercuryTrailer: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene ranges (in frames, at 30fps)
  const inScene2 = frame >= 150 && frame < 300;
  const inScene3 = frame >= 300 && frame < 450;
  const inScene4 = frame >= 450 && frame < 600;
  const inScene5 = frame >= 600 && frame < 750;
  const inScene6 = frame >= 750 && frame < 900;
  const inScene7 = frame >= 900;

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.dark}}>
      {/* Scene 1: Always show for first 150 frames */}
      {frame < 150 && <Scene1 />}

      {/* Scenes 2-7: conditional */}
      {inScene2 && <Scene2 />}
      {inScene3 && <Scene3 />}
      {inScene4 && <Scene4 />}
      {inScene5 && <Scene5 />}
      {inScene6 && <Scene6 />}
      {inScene7 && <Scene7 />}

      {/* Scene indicator (optional) */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        fontSize: 11,
        color: COLORS.textMuted,
        opacity: 0.3,
        fontFamily: 'Arial',
      }}>
        {Math.floor(frame / 30)}s / {Math.floor(DURATION / 30)}s
      </div>
    </AbsoluteFill>
  );
};

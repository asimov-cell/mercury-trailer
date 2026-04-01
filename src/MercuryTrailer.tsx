import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

const FPS = 30;
const DURATION = 1020; // 34 seconds

// Colors
const C = {
  dark: '#050510',
  green: '#00ff88',
  cyan: '#00d4ff',
  orange: '#ff6b35',
  white: '#ffffff',
  muted: '#666677',
};

// ─── HELPERS ──────────────────────────────────────────────

const fadeSlide = (frame: number, start: number, duration = 30) => {
  return {
    opacity: interpolate(frame, [start, start + duration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    transform: `translateY(${interpolate(frame, [start, start + duration], [40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px)`,
  };
};

const GlowDot: React.FC<{x: number; y: number; color: string; size?: number; start?: number}> = ({x, y, color, size = 10, start = 0}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: size, height: size,
      borderRadius: '50%',
      background: color,
      opacity: interpolate(frame, [start, start + 25], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
      transform: `scale(${interpolate(frame, [start, start + 25], [0.3, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})`,
      boxShadow: `0 0 ${size * 2}px ${color}`,
    }} />
  );
};

const LogoBox: React.FC<{x: number; y: number; start?: number}> = ({x, y, start = 0}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [start, start + 25], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scale = interpolate(frame, [start, start + 25], [0.5, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: 80, height: 80,
      borderRadius: 18,
      background: `linear-gradient(135deg, ${C.green}, ${C.cyan})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity, transform: `scale(${scale})`,
      boxShadow: `0 0 50px ${C.green}66`,
    }}>
      <span style={{fontFamily: 'Arial', fontSize: 40, fontWeight: 900, color: C.dark}}>M</span>
    </div>
  );
};

const Line: React.FC<{x1: number; y1: number; x2: number; y2: number; color: string; start: number; duration?: number}> = ({x1, y1, x2, y2, color, start, duration = 40}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + duration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'}}>
      <line x1={x1} y1={y1} x2={x1 + (x2-x1)*t} y2={y1 + (y2-y1)*t} stroke={color} strokeWidth={1.5} opacity={0.5} />
    </svg>
  );
};

const T: React.FC<{text: string; x: number; y: number; size?: number; color?: string; weight?: number; start: number; dur?: number; maxW?: number}> = ({text, x, y, size = 60, color = C.white, weight = 800, start, dur = 30, maxW}) => {
  const frame = useCurrentFrame();
  const s = fadeSlide(frame, start, dur);
  return (
    <div style={{position: 'absolute', left: x, top: y, ...s, maxWidth: maxW}}>
      <span style={{fontFamily: 'Arial, sans-serif', fontSize: size, fontWeight: weight, color, letterSpacing: '-0.02em', lineHeight: 1.1}}>{text}</span>
    </div>
  );
};

// ─── PHONE MOCKUP ──────────────────────────────────────────

const Phone: React.FC<{x: number; y: number; emoji: string; name: string; msg1: string; msg2: string; accent: string; start: number}> = ({x, y, emoji, name, msg1, msg2, accent, start}) => {
  const frame = useCurrentFrame();
  const s = fadeSlide(frame, start, 30);
  return (
    <div style={{position: 'absolute', left: x, top: y, ...s}}>
      <div style={{
        width: 210, background: '#111', borderRadius: 28, border: '2px solid #333',
        overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      }}>
        <div style={{height: 22, background: '#111'}} />
        <div style={{padding: '12px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10}}>
            <div style={{width: 34, height: 34, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16}}>{emoji}</div>
            <div>
              <div style={{fontSize: 13, fontWeight: 700, color: C.white, fontFamily: 'Arial'}}>{name}</div>
              <div style={{fontSize: 10, color: C.green, fontFamily: 'Arial'}}>● Online</div>
            </div>
          </div>
          <div style={{background: '#0a1510', borderRadius: 12, padding: 10, display: 'flex', flexDirection: 'column', gap: 6}}>
            <div style={{background: '#1a2a1a', borderRadius: '10px 10px 10px 2px', padding: '7px 10px', fontSize: 11, color: C.white, fontFamily: 'Arial', maxWidth: '85%'}}>{msg1}</div>
            <div style={{background: '#111', borderRadius: '10px 10px 2px 10px', padding: '7px 10px', fontSize: 11, color: C.white, fontFamily: 'Arial', maxWidth: '85%', alignSelf: 'flex-end', border: '1px solid rgba(255,255,255,0.1)'}}>{msg2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── STAT ─────────────────────────────────────────────────

const Stat: React.FC<{x: number; y: number; value: string; label: string; color: string; start: number}> = ({x, y, value, label, color, start}) => {
  const frame = useCurrentFrame();
  const s = fadeSlide(frame, start, 25);
  return (
    <div style={{position: 'absolute', left: x, top: y, ...s, textAlign: 'center'}}>
      <div style={{fontSize: 60, fontWeight: 900, color, fontFamily: 'Arial', letterSpacing: '-0.03em', textShadow: `0 0 30px ${color}66`}}>{value}</div>
      <div style={{fontSize: 13, color: C.muted, marginTop: 4, fontFamily: 'Arial'}}>{label}</div>
    </div>
  );
};

// ─── SCENE 1: HOOK ────────────────────────────────────────
const Scene1: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.dark}}>
    {/* BG */}
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #050510 0%, #0a0a1a 100%)'}} />
    {/* Grid */}
    <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '50px 50px'}} />
    {/* Glow */}
    <div style={{position: 'absolute', left: 150, top: 80, width: 300, height: 300, borderRadius: '50%', background: C.green, filter: 'blur(100px)', opacity: 0.12}} />
    <div style={{position: 'absolute', right: 100, bottom: 100, width: 250, height: 250, borderRadius: '50%', background: C.cyan, filter: 'blur(100px)', opacity: 0.1}} />
    {/* Content */}
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <T text="Every Agency" x={0} y={300} size={95} color={C.white} start={10} dur={40} />
      <T text="Hits A Wall." x={0} y={400} size={110} color={C.green} start={40} dur={45} />
      <div style={{marginTop: 40}}>
        <T text="Building AI is easy." x={0} y={530} size={32} color={C.muted} start={90} dur={25} />
        <T text="Scaling a business isn't." x={0} y={575} size={32} color={C.muted} start={108} dur={25} />
      </div>
    </div>
    <GlowDot x={300} y={200} color={C.green} start={20} />
    <GlowDot x={1700} y={150} color={C.cyan} size={8} start={40} />
    <GlowDot x={200} y={900} color={C.orange} size={6} start={60} />
    <GlowDot x={1600} y={850} color={C.green} size={10} start={30} />
  </AbsoluteFill>
);

// ─── SCENE 2: PROBLEM ──────────────────────────────────────
const Scene2: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.dark}}>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #050510 0%, #0a0515 100%)'}} />
    <div style={{position: 'absolute', left: 50, bottom: 0, width: 400, height: 400, borderRadius: '50%', background: '#3300aa', filter: 'blur(120px)', opacity: 0.15}} />
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <T text="You build the agent." x={0} y={280} size={72} color={C.white} start={5} dur={30} />
      <T text="Client is happy." x={0} y={370} size={72} color={C.white} start={30} dur={30} />
      <T text="Then:" x={0} y={480} size={28} color={C.muted} start={70} dur={20} />
      <T text="How do you charge?" x={0} y={530} size={95} color={C.cyan} start={90} dur={45} />
      <T text="Per message? Per token? Monthly?" x={0} y={620} size={28} color={C.muted} start={130} dur={25} />
    </div>
    <GlowDot x={1800} y={100} color={C.cyan} size={14} start={50} />
    <GlowDot x={100} y={950} color={C.orange} size={8} start={80} />
  </AbsoluteFill>
);

// ─── SCENE 3: REVEAL ───────────────────────────────────────
const Scene3: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.dark}}>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #050510 0%, #001a10 100%)'}} />
    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: C.green, filter: 'blur(150px)', opacity: 0.08}} />
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <T text="Introducing" x={0} y={200} size={32} color={C.muted} start={5} dur={20} />
      <LogoBox x={935} y={260} start={25} />
      <T text="Mercury Hub" x={0} y={370} size={130} color={C.green} start={35} dur={55} />
      <T text="AI Agents for Agencies" x={0} y={470} size={42} color={C.white} start={80} dur={30} />
      <T text="Build. White-label. Scale." x={0} y={540} size={28} color={C.muted} start={110} dur={25} />
    </div>
    <GlowDot x={500} y={150} color={C.green} size={10} start={60} />
    <GlowDot x={1400} y={850} color={C.cyan} size={12} start={80} />
  </AbsoluteFill>
);

// ─── SCENE 4: BUILD ────────────────────────────────────────
const Scene4: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.dark}}>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #050510 0%, #0a0a1a 100%)'}} />
    <div style={{position: 'absolute', left: 200, top: 100, width: 350, height: 350, borderRadius: '50%', background: C.green, filter: 'blur(120px)', opacity: 0.1}} />
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <T text="Build" x={0} y={300} size={160} color={C.green} start={10} dur={50} />
      <T text="Visual agent builder" x={0} y={430} size={40} color={C.white} start={55} dur={30} />
      <T text="No code required" x={0} y={485} size={32} color={C.muted} start={80} dur={25} />
      <T text="Setup in 5 minutes" x={0} y={560} size={30} color={C.cyan} start={110} dur={20} />
    </div>
    <GlowDot x={1500} y={200} color={C.cyan} size={12} start={40} />
    <GlowDot x={300} y={850} color={C.green} size={8} start={70} />
    <Line x1={0} y1={250} x2={500} y2={250} color={C.green} start={30} />
    <Line x1={1420} y1={400} x2={1920} y2={400} color={C.green} start={90} />
  </AbsoluteFill>
);

// ─── SCENE 5: WHITE-LABEL ─────────────────────────────────
const Scene5: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.dark}}>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #050510 0%, #001030 100%)'}} />
    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 500, borderRadius: '50%', background: C.cyan, filter: 'blur(150px)', opacity: 0.07}} />
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <T text="White-label" x={0} y={180} size={140} color={C.cyan} start={10} dur={50} />
      <T text="Your clients think they built it" x={0} y={330} size={38} color={C.white} start={55} dur={30} />
      <T text="You stay invisible" x={0} y={385} size={32} color={C.muted} start={80} dur={25} />
      <T text="Their logo. Their brand. Their AI." x={0} y={450} size={28} color={C.green} start={105} dur={20} />
    </div>
    <Phone x={80} y={520} emoji="🦷" name="Dental Clinic AI" msg1="Hola! Quiero sacar un turno para blanqueamiento" msg2="Perfecto! Tenemos jueves a las 3pm. Te parece? 🦷" accent={C.green} start={80} />
    <Phone x={1600} y={540} emoji="🏠" name="RealEstate AI" msg1="Hi! Looking for a 3BR apartment in Palermo" msg2="Great choice! I found 4 matching properties 🌴" accent={C.cyan} start={100} />
    <GlowDot x={1550} y={200} color={C.cyan} size={10} start={50} />
    <GlowDot x={400} y={900} color={C.green} size={8} start={70} />
    <Line x1={290} y1={530} x2={1600} y2={530} color={C.cyan} start={100} duration={50} />
  </AbsoluteFill>
);

// ─── SCENE 6: SCALE ───────────────────────────────────────
const Scene6: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.dark}}>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #050510 0%, #0a0a1a 100%)'}} />
    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 700, borderRadius: '50%', background: C.green, filter: 'blur(180px)', opacity: 0.07}} />
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <T text="Scale" x={0} y={180} size={160} color={C.green} start={10} dur={50} />
      <T text="From 1 client to 20" x={0} y={330} size={44} color={C.white} start={55} dur={30} />
      <T text="Without hiring devs" x={0} y={390} size={36} color={C.muted} start={80} dur={25} />
    </div>
    <Stat x={440} y={580} value="$79" label="/month to start" color={C.green} start={100} />
    <Stat x={800} y={580} value="$370" label="avg profit/agent" color={C.cyan} start={115} />
    <Stat x={1160} y={580} value="5 min" label="setup time" color={C.orange} start={130} />
    <T text="No credit card required" x={0} y={800} size={24} color={C.muted} start={155} dur={20} />
    <GlowDot x={200} y={150} color={C.green} size={10} start={50} />
    <GlowDot x={1750} y={900} color={C.orange} size={8} start={70} />
  </AbsoluteFill>
);

// ─── SCENE 7: CTA ─────────────────────────────────────────
const Scene7: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.dark}}>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #050510 0%, #001a10 100%)'}} />
    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 500, borderRadius: '50%', background: C.green, filter: 'blur(150px)', opacity: 0.1}} />
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <LogoBox x={935} y={170} start={10} />
      <T text="Start Free" x={0} y={280} size={130} color={C.green} start={25} dur={50} />
      <T text="mercuryhub.io" x={0} y={380} size={50} color={C.white} start={65} dur={30} />
      <div style={{marginTop: 40}}>
        <T text="Deploy AI Agents for Your Clients." x={0} y={470} size={28} color={C.muted} start={95} dur={25} />
        <T text="Bill Monthly. Scale." x={0} y={510} size={28} color={C.muted} start={112} dur={25} />
      </div>
    </div>
    <GlowDot x={300} y={200} color={C.green} size={12} start={40} />
    <GlowDot x={1700} y={150} color={C.cyan} size={8} start={60} />
    <GlowDot x={200} y={850} color={C.orange} size={10} start={80} />
    <Line x1={600} y1={800} x2={1320} y2={800} color={C.green} start={140} duration={60} />
    <T text="Mercury Hub 2026" x={0} y={1020} size={12} color={C.muted} weight={400} start={140} dur={10} />
  </AbsoluteFill>
);

// ─── MAIN COMPONENT ────────────────────────────────────────
export const MercuryTrailer: React.FC = () => {
  const frame = useCurrentFrame();

  const inS2 = frame >= 150 && frame < 300;
  const inS3 = frame >= 300 && frame < 450;
  const inS4 = frame >= 450 && frame < 600;
  const inS5 = frame >= 600 && frame < 750;
  const inS6 = frame >= 750 && frame < 900;
  const inS7 = frame >= 900;

  return (
    <AbsoluteFill style={{backgroundColor: C.dark}}>
      {frame < 150 && <Scene1 />}
      {inS2 && <Scene2 />}
      {inS3 && <Scene3 />}
      {inS4 && <Scene4 />}
      {inS5 && <Scene5 />}
      {inS6 && <Scene6 />}
      {inS7 && <Scene7 />}
      {/* Time */}
      <div style={{position: 'absolute', bottom: 16, left: 16, fontSize: 11, color: C.muted, opacity: 0.3, fontFamily: 'Arial'}}>
        {Math.floor(frame / FPS)}s / {Math.floor(DURATION / FPS)}s
      </div>
    </AbsoluteFill>
  );
};

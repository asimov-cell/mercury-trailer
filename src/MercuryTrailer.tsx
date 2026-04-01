import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';

const FPS = 30;
const DURATION = 1020; // 34 seconds

// Colors
const COLORS = {
  dark: '#0a0a0f',
  primary: '#00ff88',
  secondary: '#00ccff',
  text: '#ffffff',
  muted: '#666677',
  gradient1: '#1a1a2e',
  gradient2: '#16213e',
};

// Animated text component
const AnimatedText: React.FC<{
  text: string;
  fontSize?: number;
  color?: string;
  startFrame: number;
  endFrame: number;
}> = ({text, fontSize = 80, color = COLORS.text, startFrame, endFrame}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [startFrame, startFrame + 10, endFrame - 10, endFrame], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame, [startFrame, startFrame + 15], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{opacity, transform: `translateY(${translateY}px)`}}>
      <span style={{fontFamily: 'Arial, sans-serif', fontSize, color, fontWeight: 700, letterSpacing: '-0.02em'}}>
        {text}
      </span>
    </div>
  );
};

// Full trailer in one component (simpler approach)
export const MercuryTrailer: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene timing
  const isScene2 = frame >= 120 && frame < 270;
  const isScene3 = frame >= 270 && frame < 420;
  const isScene4 = frame >= 420 && frame < 570;
  const isScene5 = frame >= 570 && frame < 720;
  const isScene6 = frame >= 720 && frame < 870;
  const isScene7 = frame >= 870;

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.dark, justifyContent: 'center', alignItems: 'center'}}>
      {/* Background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.gradient1} 50%, ${COLORS.gradient2} 100%)`,
      }} />

      {/* Scene 1: Hook */}
      {frame < 120 && (
        <>
          <AnimatedText text="Every Agency Hits A Wall" fontSize={100} startFrame={0} endFrame={115} />
          <div style={{height: 40}} />
          <AnimatedText text="Building AI is easy." fontSize={50} color={COLORS.muted} startFrame={30} endFrame={115} />
          <AnimatedText text="Scaling a business isn't." fontSize={50} color={COLORS.muted} startFrame={60} endFrame={115} />
        </>
      )}

      {/* Scene 2: Problem */}
      {isScene2 && (
        <>
          <AnimatedText text="You build the agent." fontSize={70} startFrame={120} endFrame={265} />
          <AnimatedText text="Client is happy." fontSize={70} startFrame={140} endFrame={265} />
          <div style={{height: 30}} />
          <AnimatedText text="Then:" fontSize={40} color={COLORS.muted} startFrame={160} endFrame={265} />
          <AnimatedText text="How do you charge?" fontSize={90} color={COLORS.secondary} startFrame={180} endFrame={265} />
          <AnimatedText text="Per message? Per token? Monthly?" fontSize={35} color={COLORS.muted} startFrame={210} endFrame={265} />
        </>
      )}

      {/* Scene 3: Reveal */}
      {isScene3 && (
        <>
          <AnimatedText text="Introducing" fontSize={40} color={COLORS.muted} startFrame={270} endFrame={415} />
          <div style={{height: 20}} />
          <AnimatedText text="Mercury Hub" fontSize={140} color={COLORS.primary} startFrame={290} endFrame={415} />
          <AnimatedText text="AI Agents for Agencies" fontSize={45} color={COLORS.text} startFrame={330} endFrame={415} />
          <div style={{height: 30}} />
          <AnimatedText text="Build. White-label. Scale." fontSize={35} color={COLORS.muted} startFrame={360} endFrame={415} />
        </>
      )}

      {/* Scene 4: Build */}
      {isScene4 && (
        <>
          <AnimatedText text="Build" fontSize={130} color={COLORS.primary} startFrame={420} endFrame={565} />
          <AnimatedText text="Visual agent builder" fontSize={40} color={COLORS.text} startFrame={450} endFrame={565} />
          <AnimatedText text="No code required" fontSize={35} color={COLORS.muted} startFrame={475} endFrame={565} />
          <div style={{height: 25}} />
          <AnimatedText text="Setup in 5 minutes" fontSize={35} color={COLORS.secondary} startFrame={500} endFrame={565} />
        </>
      )}

      {/* Scene 5: White-label */}
      {isScene5 && (
        <>
          <AnimatedText text="White-label" fontSize={130} color={COLORS.secondary} startFrame={570} endFrame={715} />
          <AnimatedText text="Your clients think they built it" fontSize={40} color={COLORS.text} startFrame={600} endFrame={715} />
          <AnimatedText text="You stay invisible" fontSize={35} color={COLORS.muted} startFrame={625} endFrame={715} />
          <div style={{height: 25}} />
          <AnimatedText text="Their logo. Their brand. Their AI." fontSize={35} color={COLORS.primary} startFrame={650} endFrame={715} />
        </>
      )}

      {/* Scene 6: Scale */}
      {isScene6 && (
        <>
          <AnimatedText text="Scale" fontSize={130} color={COLORS.primary} startFrame={720} endFrame={865} />
          <AnimatedText text="From 1 client to 20" fontSize={45} color={COLORS.text} startFrame={750} endFrame={865} />
          <AnimatedText text="Without hiring devs" fontSize={40} color={COLORS.muted} startFrame={775} endFrame={865} />
          <div style={{height: 25}} />
          <AnimatedText text="$79/month to start" fontSize={40} color={COLORS.secondary} startFrame={800} endFrame={865} />
          <AnimatedText text="No credit card required" fontSize={30} color={COLORS.muted} startFrame={825} endFrame={865} />
        </>
      )}

      {/* Scene 7: CTA */}
      {isScene7 && (
        <>
          <AnimatedText text="Start Free" fontSize={120} color={COLORS.primary} startFrame={870} endFrame={1020} />
          <div style={{height: 20}} />
          <AnimatedText text="mercuryhub.io" fontSize={50} color={COLORS.text} startFrame={900} endFrame={1020} />
          <div style={{height: 40}} />
          <AnimatedText text="Deploy AI Agents for Your Clients." fontSize={35} color={COLORS.muted} startFrame={930} endFrame={1020} />
          <AnimatedText text="Bill Monthly. Scale." fontSize={35} color={COLORS.muted} startFrame={955} endFrame={1020} />
        </>
      )}
    </AbsoluteFill>
  );
};

import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, Easing, Series} from 'remotion';

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

// Animated text component using current frame
const AnimatedText: React.FC<{
  text: string;
  fontSize?: number;
  color?: string;
  startFrame: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({text, fontSize = 80, color = COLORS.text, startFrame, duration = 30, style}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [startFrame, startFrame + 15, startFrame + duration - 15, startFrame + duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame, [startFrame, startFrame + 20], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{...style, overflow: 'hidden', opacity, transform: `translateY(${translateY}px)`}}>
      <span style={{fontFamily: 'Arial, sans-serif', fontSize, color, fontWeight: 700, letterSpacing: '-0.02em'}}>
        {text}
      </span>
    </div>
  );
};

// Scene component
const Scene: React.FC<{children: React.ReactNode; bgColor?: string}> = ({children, bgColor = COLORS.dark}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor}}>
    {children}
  </AbsoluteFill>
);

// Gradient background overlay
const GradientBg: React.FC = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(135deg, ${COLORS.dark} 0%, ${COLORS.gradient1} 50%, ${COLORS.gradient2} 100%)`,
  }}>
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle at 30% 30%, rgba(0, 255, 136, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0, 204, 255, 0.08) 0%, transparent 50%)',
    }} />
  </div>
);

// Scene 1: Hook
const Scene1: React.FC = () => (
  <Scene>
    <GradientBg />
    <AnimatedText text="Every Agency Hits A Wall" fontSize={100} startFrame={0} duration={120} style={{textAlign: 'center'}} />
    <div style={{height: 40}} />
    <AnimatedText text="Building AI is easy." fontSize={50} color={COLORS.muted} startFrame={30} duration={90} style={{textAlign: 'center'}} />
    <AnimatedText text="Scaling a business isn't." fontSize={50} color={COLORS.muted} startFrame={60} duration={90} style={{textAlign: 'center'}} />
  </Scene>
);

// Scene 2: The Problem
const Scene2: React.FC = () => (
  <Scene>
    <GradientBg />
    <AnimatedText text="You build the agent." fontSize={70} startFrame={0} duration={90} style={{textAlign: 'center'}} />
    <AnimatedText text="Client is happy." fontSize={70} startFrame={30} duration={90} style={{textAlign: 'center'}} />
    <div style={{height: 30}} />
    <AnimatedText text="Then:" fontSize={40} color={COLORS.muted} startFrame={60} duration={60} style={{textAlign: 'center'}} />
    <AnimatedText text="How do you charge?" fontSize={90} color={COLORS.secondary} startFrame={80} duration={90} style={{textAlign: 'center'}} />
    <AnimatedText text="Per message? Per token? Monthly?" fontSize={35} color={COLORS.muted} startFrame={110} duration={60} style={{textAlign: 'center'}} />
  </Scene>
);

// Scene 3: The Reveal
const Scene3: React.FC = () => (
  <Scene>
    <GradientBg />
    <AnimatedText text="Introducing" fontSize={40} color={COLORS.muted} startFrame={0} duration={60} style={{textAlign: 'center'}} />
    <div style={{height: 20}} />
    <AnimatedText text="Mercury Hub" fontSize={140} color={COLORS.primary} startFrame={20} duration={120} style={{textAlign: 'center', fontWeight: 900}} />
    <AnimatedText text="AI Agents for Agencies" fontSize={45} color={COLORS.text} startFrame={60} duration={90} style={{textAlign: 'center', letterSpacing: '0.1em', textTransform: 'uppercase'}} />
    <div style={{height: 30}} />
    <AnimatedText text="Build. White-label. Scale." fontSize={35} color={COLORS.muted} startFrame={90} duration={60} style={{textAlign: 'center'}} />
  </Scene>
);

// Scene 4: Build
const Scene4: React.FC = () => (
  <Scene>
    <GradientBg />
    <AnimatedText text="Build" fontSize={130} color={COLORS.primary} startFrame={0} duration={90} style={{textAlign: 'center'}} />
    <AnimatedText text="Visual agent builder" fontSize={40} color={COLORS.text} startFrame={30} duration={60} style={{textAlign: 'center'}} />
    <AnimatedText text="No code required" fontSize={35} color={COLORS.muted} startFrame={55} duration={60} style={{textAlign: 'center'}} />
    <div style={{height: 25}} />
    <AnimatedText text="Setup in 5 minutes" fontSize={35} color={COLORS.secondary} startFrame={80} duration={60} style={{textAlign: 'center'}} />
  </Scene>
);

// Scene 5: White-label
const Scene5: React.FC = () => (
  <Scene>
    <GradientBg />
    <AnimatedText text="White-label" fontSize={130} color={COLORS.secondary} startFrame={0} duration={90} style={{textAlign: 'center'}} />
    <AnimatedText text="Your clients think they built it" fontSize={40} color={COLORS.text} startFrame={30} duration={60} style={{textAlign: 'center'}} />
    <AnimatedText text="You stay invisible" fontSize={35} color={COLORS.muted} startFrame={55} duration={60} style={{textAlign: 'center'}} />
    <div style={{height: 25}} />
    <AnimatedText text="Their logo. Their brand. Their AI." fontSize={35} color={COLORS.primary} startFrame={80} duration={60} style={{textAlign: 'center'}} />
  </Scene>
);

// Scene 6: Scale
const Scene6: React.FC = () => (
  <Scene>
    <GradientBg />
    <AnimatedText text="Scale" fontSize={130} color={COLORS.primary} startFrame={0} duration={90} style={{textAlign: 'center'}} />
    <AnimatedText text="From 1 client to 20" fontSize={45} color={COLORS.text} startFrame={30} duration={60} style={{textAlign: 'center'}} />
    <AnimatedText text="Without hiring devs" fontSize={40} color={COLORS.muted} startFrame={55} duration={60} style={{textAlign: 'center'}} />
    <div style={{height: 25}} />
    <AnimatedText text="$79/month to start" fontSize={40} color={COLORS.secondary} startFrame={80} duration={60} style={{textAlign: 'center'}} />
    <AnimatedText text="No credit card required" fontSize={30} color={COLORS.muted} startFrame={105} duration={60} style={{textAlign: 'center'}} />
  </Scene>
);

// Scene 7: CTA
const Scene7: React.FC = () => (
  <Scene>
    <GradientBg />
    <AnimatedText text="Start Free" fontSize={120} color={COLORS.primary} startFrame={0} duration={90} style={{textAlign: 'center'}} />
    <div style={{height: 20}} />
    <AnimatedText text="mercuryhub.io" fontSize={50} color={COLORS.text} startFrame={30} duration={60} style={{textAlign: 'center'}} />
    <div style={{height: 40}} />
    <AnimatedText text="Deploy AI Agents for Your Clients." fontSize={35} color={COLORS.muted} startFrame={60} duration={60} style={{textAlign: 'center'}} />
    <AnimatedText text="Bill Monthly. Scale." fontSize={35} color={COLORS.muted} startFrame={85} duration={60} style={{textAlign: 'center'}} />
  </Scene>
);

// Main Trailer Component
export const MercuryTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.dark}}>
      <Series>
        <Series.Sequence durationInFrames={120}>
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <Scene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <Scene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <Scene5 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <Scene6 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <Scene7 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

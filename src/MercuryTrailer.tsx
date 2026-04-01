import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

export const MercuryTrailer: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{backgroundColor: '#050510', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: 90,
        fontWeight: 900,
        color: '#00ff88',
        textAlign: 'center',
      }}>
        Mercury Hub
      </div>
      <div style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: 30,
        color: '#666677',
        marginTop: 20,
        textAlign: 'center',
      }}>
        Frame: {frame}
      </div>
    </AbsoluteFill>
  );
};

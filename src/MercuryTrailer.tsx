import React from 'react';
import {AbsoluteFill} from '@remotion/core';

export const MercuryTrailer: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#050510'}}>
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial',
        fontSize: 80,
        fontWeight: 900,
        color: '#00ff88',
      }}>
        Mercury Hub
      </div>
    </AbsoluteFill>
  );
};

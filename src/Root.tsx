import {registerRoot, Composition} from 'remotion';
import {MercuryTrailer} from './MercuryTrailer';

const FPS = 30;
const DURATION = 1020; // 34 seconds

registerRoot(() => (
  <Composition
    id="MercuryTrailer"
    component={MercuryTrailer}
    durationInFrames={DURATION}
    fps={FPS}
    width={1920}
    height={1080}
  />
));

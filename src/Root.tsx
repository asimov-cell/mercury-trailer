import {Composition} from 'remotion';
import {MercuryTrailer} from './MercuryTrailer';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MercuryTrailer"
        component={MercuryTrailer}
        durationInFrames={1020}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

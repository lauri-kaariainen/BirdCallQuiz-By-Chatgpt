/* NOT IN USE */

import React, { useEffect, useRef } from "react";
import { Stage, Sprite, useTick, Graphics } from "@inlet/react-pixi";

interface SpectrogramProps {
  audio: string; // Path to the audio file
}

const Spectrogram: React.FC<SpectrogramProps> = ({ audio }) => {
  // @ts-ignore
  const containerRef = useRef<PIXI.Container | null>(null);

  useEffect(() => {
    const fetchDataAndGenerateSpectrogram = async () => {
      // Fetch audio data and generate spectrogram using your preferred method
      // This part requires more complex audio processing and is beyond the scope of this example.
    };

    fetchDataAndGenerateSpectrogram();
  }, [audio]);

  useTick((delta) => {
    // Update the spectrogram visualization based on the audio data
    // This part is where you would implement your spectrogram rendering logic
    // Use containerRef.current to access the PIXI.Container for rendering
  });

  return (
    <div className="spectrogram">
      <Stage width={800} height={400}>
        <Graphics ref={containerRef} />
      </Stage>
    </div>
  );
};

export default Spectrogram;

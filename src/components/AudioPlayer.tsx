import React, { forwardRef, useRef } from "react";

interface AudioPlayerProps {
  audio: string;
  onToggle: () => void; // Callback to toggle audio playback
  isPlaying: boolean; // Indicates whether audio is playing
}

const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  (props, ref) => {
    const { audio, onToggle, isPlaying } = props;
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    return (
      <div>
        <audio
          controls={false}
          ref={(element) => {
            audioElementRef.current = element;
            if (ref) {
              if (typeof ref === "function") {
                ref(element);
              } else {
                ref.current = element;
              }
            }
          }}
        >
          <source src={"/audio/" + audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <button onClick={onToggle}>{isPlaying ? "[   Pause   ]" : "[   Play   ]"}</button>
      </div>
    );
  }
);

export default AudioPlayer;
// import React, { forwardRef, useRef } from "react";

// interface AudioPlayerProps {
//   audio: string;
// }

// const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
//   (props, ref) => {
//     const { audio } = props;
//     const audioElementRef = useRef<HTMLAudioElement | null>(null);

//     const playAudio = () => {
//       if (audioElementRef.current) {
//         audioElementRef.current.play();
//       }
//     };

//     const pauseAudio = () => {
//       if (audioElementRef.current) {
//         audioElementRef.current.pause();
//       }
//     };

//     return (
//       <div>
//         <audio
//           controls={false}
//           ref={(element) => {
//             audioElementRef.current = element;
//             if (ref) {
//               if (typeof ref === "function") {
//                 ref(element);
//               } else {
//                 ref.current = element;
//               }
//             }
//           }}
//         >
//           <source src={"/audio/" + audio} type="audio/mpeg" />
//           Your browser does not support the audio element.
//         </audio>
//         <button onClick={playAudio}>Play</button>
//         <button onClick={pauseAudio}>Pause</button>
//       </div>
//     );
//   }
// );

// export default AudioPlayer;

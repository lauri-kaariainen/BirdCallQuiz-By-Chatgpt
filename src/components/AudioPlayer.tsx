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
//           <source src={audio} type="audio/mpeg" />
//           Your browser does not support the audio element.
//         </audio>
//         <button onClick={playAudio}>Play</button>
//         <button onClick={pauseAudio}>Pause</button>
//       </div>
//     );
//   }
// );

// export default AudioPlayer;
// import React, { useRef, useState } from "react";

// interface AudioPlayerProps {
//   audio: string; // Path to the audio file
// }

// const AudioPlayer: React.FC<AudioPlayerProps> = ({ audio }) => {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const toggleAudio = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="audio-player">
//       <button onClick={toggleAudio}>{isPlaying ? "Pause" : "Play"}</button>
//       <audio ref={audioRef} src={"/audio/" + audio} />
//     </div>
//   );
// };

// export default AudioPlayer;
import React, { forwardRef, useRef } from "react";

interface AudioPlayerProps {
  audio: string;
}

const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  (props, ref) => {
    const { audio } = props;
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    const playAudio = () => {
      if (audioElementRef.current) {
        audioElementRef.current.play();
      }
    };

    const pauseAudio = () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
    };

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
        <button onClick={playAudio}>Play</button>
        <button onClick={pauseAudio}>Pause</button>
      </div>
    );
  }
);

export default AudioPlayer;

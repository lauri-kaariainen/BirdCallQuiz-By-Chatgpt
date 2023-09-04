import React, { useState, useRef, useEffect } from "react";
import AudioPlayer from "./components/AudioPlayer"; // Adjust the import path
import Typeahead, { BirdOption } from "./components/Typeahead"; // Import BirdOption from Typeahead

const birdData: BirdOption[] = [
  {
    value: "sparrow",
    labelEN: "Sparrow",
    labelFI: "Varpunen",
    image: "sparrow.jpg",
    audio: "sparrow.mp3"
  },
  {
    value: "eagle",
    labelEN: "Eagle",
    labelFI: "Kotka",
    image: "eagle.jpg",
    audio: "eagle.mp3"
  },
  {
    value: "hawk",
    labelEN: "Hawk",
    labelFI: "Haukka",
    image: "hawk.jpg",
    audio: "hawk.mp3"
  },
  {
    value: "robin",
    labelEN: "Robin",
    labelFI: "Punarinta",
    image: "robin.jpg",
    audio: "robin.mp3"
  },
  {
    value: "bluejay",
    labelEN: "Blue Jay",
    labelFI: "Sinitiainen",
    image: "bluejay.jpg",
    audio: "bluejay.mp3"
  },
  {
    value: "dove",
    labelEN: "Dove",
    labelFI: "Kyyhky",
    image: "dove.jpg",
    audio: "dove.mp3"
  },
  {
    value: "pigeon",
    labelEN: "Pigeon",
    labelFI: "Kyyhkynen",
    image: "pigeon.jpg",
    audio: "pigeon.mp3"
  },
  {
    value: "owl",
    labelEN: "Owl",
    labelFI: "Pöllö",
    image: "owl.jpg",
    audio: "owl.mp3"
  },
  {
    value: "crow",
    labelEN: "Crow",
    labelFI: "Varis",
    image: "crow.jpg",
    audio: "crow.mp3"
  },
  {
    value: "woodpecker",
    labelEN: "Woodpecker",
    labelFI: "Tikka",
    image: "woodpecker.jpg",
    audio: "woodpecker.mp3"
  },
  {
    value: "parrot",
    labelEN: "Parrot",
    labelFI: "Papukaija",
    image: "parrot.jpg",
    audio: "parrot.mp3"
  },
  {
    value: "finch",
    labelEN: "Finch",
    labelFI: "Peippo",
    image: "finch.jpg",
    audio: "finch.mp3"
  },
  {
    value: "canary",
    labelEN: "Canary",
    labelFI: "Kanarialintu",
    image: "canary.jpg",
    audio: "canary.mp3"
  },
  {
    value: "swan",
    labelEN: "Swan",
    labelFI: "Joutsen",
    image: "swan.jpg",
    audio: "swan.mp3"
  }
  // Add more bird options with images and audio paths here
];

const App: React.FC = () => {
  const [selectedBird, setSelectedBird] = useState<BirdOption | null>(null);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false); // Lift the state up to App component
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setAudioPlaying(false); // Reset audio playing state when audio finishes
      });
    }
  }, []);

  const playRandomBirdSound = () => {
    const randomBird = birdData[Math.floor(Math.random() * birdData.length)];
    setSelectedBird(randomBird);
    setUserGuess("");
    setFeedback("");
    if (audioRef.current) {
      audioRef.current.src = "/audio/" + randomBird.audio;
      audioRef.current.play();
      setAudioPlaying(true);
    }
  };

  const handleGuessSubmit = (selectedOption: BirdOption | null) => {
    if (selectedBird && selectedOption) {
      if (
        selectedBird.value.toLowerCase() === selectedOption.value.toLowerCase()
      ) {
        setFeedback("Correct! It was a " + selectedBird.labelEN);
        setScore(score + 1);
        if (audioPlaying && audioRef.current) {
          audioRef.current.pause();
          setAudioPlaying(false);
        }
        playRandomBirdSound();
      } else {
        setFeedback("Incorrect. Try again.");
      }
    }
  };

  return (
    <div className="app">
      <h1>Bird Call Quiz App</h1>
      <div className="quiz-container">
        {selectedBird ? (
          <div className="bird-details">
            <AudioPlayer audio={selectedBird.audio} ref={audioRef} />
            <img src={selectedBird.image} alt={selectedBird.labelEN} />
          </div>
        ) : (
          <div className="bird-details">
            <button
              onClick={
                audioPlaying
                  ? () => {
                      audioRef.current?.pause();
                      setAudioPlaying(false);
                    }
                  : playRandomBirdSound
              }
            >
              {audioPlaying ? "Pause" : "Play Sound"}
            </button>
          </div>
        )}
        <div className="feedback">
          <Typeahead options={birdData} onSelect={handleGuessSubmit} />
          <p>{feedback}</p>
        </div>
      </div>
      <div className="score">
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default App;

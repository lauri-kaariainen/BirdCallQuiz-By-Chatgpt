import React, { useState, useRef, useEffect } from "react";
import AudioPlayer from "./components/AudioPlayer"; // Adjust the import path
import Typeahead, { BirdOption } from "./components/Typeahead"; // Import BirdOption from Typeahead
import { birdData } from "./other/birdData";
import { logo } from "./other/logo";
import "./styles/App.css";


const App: React.FC = () => {
  const [selectedBird, setSelectedBird] = useState<BirdOption | null>(null);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false); // Lift the state up to App component
  const [audioStarted, setAudioStarted] = useState(false);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);



  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setAudioPlaying(false); // Reset audio playing state when audio finishes
      });
    }
  }, []);

  const toggleAudio = () => {
    if (!audioStarted) {
      playRandomBirdSound();
      setAudioStarted(true);
    } else {
      if (audioRef.current) {
        if (isAudioPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsAudioPlaying(!isAudioPlaying);
      }
    }
  };

  const playRandomBirdSound = () => {
    const randomBird = birdData[Math.floor(Math.random() * birdData.length)];
    setSelectedBird(randomBird);
    setUserGuess("");
    setFeedback("");
    if (audioRef.current) {
      audioRef.current.src = "./audio/" + randomBird.audio;
      audioRef.current.play();
      setAudioPlaying(true);
    }
  };

  const handleGuessSubmit = (selectedOption: BirdOption | null) => {
    if (selectedBird && selectedOption) {
      if (selectedBird.value.toLowerCase() === selectedOption.value.toLowerCase()) {
        setFeedback("Correct! It was a " + selectedBird.labelEN);
        setScore(score + 1);
      } else {
        setFeedback("Incorrect. Try again.");
        setScore(score - 1); // Deduct a point for incorrect guesses
      }
  
      if (audioPlaying && audioRef.current) {
        audioRef.current.pause();
        setAudioPlaying(false);
      }
      playRandomBirdSound();
    }
  };
  return (
    <div className="app">
      <div className="quiz-container">
        <h4>
          <pre>{logo}</pre>
        </h4>
        {selectedBird ? (
          <div className="bird-details">
            <AudioPlayer
              audio={selectedBird.audio}
              ref={audioRef}
              onToggle={toggleAudio}
              isPlaying={isAudioPlaying}
            />
            {/* <img src={selectedBird.image} alt={selectedBird.labelEN} /> */}
          </div>
        ) : (
          <div className="bird-details">
            <button onClick={toggleAudio}>
              {isAudioPlaying ? "[ Pause Sound ]" : "[  Play Sound  ]"}
            </button>
          </div>
        )}
        <div className="feedback">
          <Typeahead options={birdData} onSelect={handleGuessSubmit} />
          <p>{feedback}</p>
        </div>
        <div className="score">
          <p>Score: {score}</p>
        </div>
      </div>
    </div>
  );
  }

export default App;

import { Level, PeriodicTable } from "./components/periodic-table";
import { useState } from "preact/hooks";
import Button from "./components/button";
import "./app.css";

export function App() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const playIntroSound = () => {
    const audio = new Audio("./audio/KH3V1.wav");
    audio.playbackRate = 1.25;
    audio.play();
  };

  const handleStartButtonClick = () => {
    playIntroSound();
    setShowIntro(false);
  };

  const handleLevelChange = (level: Level) => {
    playIntroSound();
    setSelectedLevel(level);
  };

  return (
    <>
      {showIntro && (
        <div class="game-intro">
          <h1>Welcome to Element Decoder!</h1>
          <p>
            Match elements until you spell out a word! When an element is shaded
            in, it has already been matched.
          </p>
          <Button onClick={handleStartButtonClick}>Start</Button>
        </div>
      )}

      {!showIntro &&
        (selectedLevel === null ? (
          <div class="difficulty-chooser">
            <Button onClick={() => handleLevelChange(Level.Beginner)}>
              Beginner
            </Button>
            <Button onClick={() => handleLevelChange(Level.Intermediate)}>
              Intermediate
            </Button>
            <Button onClick={() => handleLevelChange(Level.Advanced)}>
              Advanced
            </Button>
          </div>
        ) : (
          <>
            <PeriodicTable
              level={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />
            <Button onClick={() => setSelectedLevel(null)}>
              Change Difficulty
            </Button>
          </>
        ))}
    </>
  );
}

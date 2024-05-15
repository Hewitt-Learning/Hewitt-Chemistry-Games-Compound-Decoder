import { Character, Level, PeriodicTable } from "./components/periodic-table";
import { useEffect, useState } from "preact/hooks";
import Button from "./components/button";
import "./app.css";
import { ThemeToggle } from "../theme";
// import shark from './chem_photo4.jpg';
// import owl from './chem_photo3.jpg';
// import soccer from './chem_photo2.jpg';
// import oct from './chem_photo1.jpg';

// export enum Character {
//   shark = './chem_photo4.jpg',
//   owl = './chem_photo3.jpg',
//   soccer = './chem_photo2.jpg',
//   oct = './chem_photo1.jpg',
// } 
export function App() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null); 
  const [showIntro, setShowIntro] = useState(true);
  const [showLevel, setShowLevel] = useState(false);
  const [showCharacter, setShowCharacter] = useState(true);

  // when the selectedLevel state changes, useEffect updates and
  // listens for an escape key press when the difficulty options are displays,
  // but only after the difficulty is initially set
  // (e.g. you have to select difficulty the first time you play, but not after)
  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (selectedLevel === null) {
        return;
      }
      if (e.key === "Escape") {
        setShowLevel(false);
        setShowCharacter(false);
      }
    };
    window.addEventListener("keydown", keyListener);
    //cleanup function, called whenever the component is unmounted
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [selectedLevel]);

  // handles what happens when the user asks to change difficulty -
  // either the user can change difficulty, or they can be exit the change difficulty screen
  // when the difficulty has previously been selected
  const difficultyChange = () => {
    return (
      <div
        class="difficulty-chooser-wrapper"
        onClick={(e) => {
          // if the click did not originate on the background
          // (e.g. the difficulty selector box), ignore the click
          if (e.target !== e.currentTarget) {
            return;
          }

          if (selectedLevel === null) {
            return;
          }
          setShowLevel(false);
        }}
      >
        <div class="difficulty-chooser">
          <div class="difficulty-chooser-text">Select Difficulty</div>

          <Button onClick={() => handleLevelChange(Level.Beginner)}>
            Beginner
          </Button>
          <Button onClick={() => handleLevelChange(Level.Intermediate)}>
            Intermediate
          </Button>
          <Button onClick={() => handleLevelChange(Level.Advanced)}>
            Advanced
          </Button>
          <Button onClick={() => handleLevelChange(Level.Compound)}>
            Compound
          </Button>
        </div>
      </div>
    );
  };
  const characterChange = () => {
    return (
      <div
        class="character-chooser-wrapper"
        onClick={(d) => {
          // if the click did not originate on the background
          // (e.g. the character selector box), ignore the click
          if (d.target !== d.currentTarget) {
            return;
          }

          if (selectedCharacter === null) {
            return;
          }
          setShowCharacter(false);
        }}
      >
        <div class="character-chooser">
          <div class="character-chooser-text">Select Character</div>

          <Button onClick={() => handlecharacterChange(Character.shark)}>
            Shark
          </Button>
          <Button onClick={() => handlecharacterChange(Character.soccer)}>
            Boy
          </Button>
          <Button onClick={() => handlecharacterChange(Character.owl)}>
            Owl
          </Button>
          <Button onClick={() => handlecharacterChange(Character.oct)}>
            Octopus
          </Button>
        </div>
      </div>
    );
  };

  const playIntroSound = () => {
    const audio = new Audio("/audio/KH3V1.wav");
    audio.playbackRate = 1.25;
    audio.play();
  };

  const handleStartButtonClick = () => {
    playIntroSound();
    setShowIntro(false);
    setShowLevel(true);
    setShowCharacter(false);
  };

  const handleLevelChange = (level: Level) => {
    playIntroSound();
    setSelectedLevel(level);
    setShowLevel(false);
    setShowCharacter(false);
  };

  const handlecharacterChange = (character: Character) => {
    playIntroSound();
    setSelectedCharacter(character);
    setShowLevel(false);
    setShowCharacter(false);
  };


  return (
    <>
      <ThemeToggle />
      {showIntro && (
        <div class="game-intro">
          <h1>Welcome to Element Decoder!</h1>
          <p>
            Match elements until you spell out a word! When an element is shaded
            in, it has already been matched.
          </p>
          <p>
            Lower difficulties give more information about the element to match,
            whereas higher difficulties give less information.
          </p>
          <Button onClick={handleStartButtonClick}>Start</Button>
        </div>
      )}

      {!showIntro && (
        <>
          {showLevel && difficultyChange()}
          {showCharacter && characterChange()}
          
          {selectedLevel !== null && (
            <>
              <PeriodicTable
                level={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                setShowLevel={setShowLevel}
                setSelectedCharacter={setSelectedCharacter}
                setShowCharacter={setShowCharacter}
              />
              <Button
                onClick={() => {
                  setShowLevel(true);
                }}
              >
                Change Difficulty
              </Button>
              <Button
                onClick={() =>{
                  setShowCharacter(true);
                }}
              >
                Change Character
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}

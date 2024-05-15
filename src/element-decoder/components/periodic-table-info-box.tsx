import { Compound, CompoundClassification } from "../../compound-decoder/compound-data";
import usedCompounds from "../random-element-sequence-from-placement";
import { GameState, GamePhase, Feedback } from "../game-state";
import { useEffect, useState } from "preact/hooks";
import { ElementToFind } from "./periodic-table-to-find";
import { Level } from "./periodic-table";
import { PeriodicTableElement as PeriodicTableElementType } from "../periodic-table-data";
import clsx from "clsx";
import "./periodic-table-info-box.css";
import Button from "./button";
// import shark from './chem_photo4.png';

interface Props {
  gameState: GameState;
  activeElement?: PeriodicTableElementType | undefined | null;
  level: Level;
  setSelectedLevel: (level: Level | null) => void;
  setShowLevel: (showLevel: boolean) => void;
  feedback?: Feedback;
}

/**
 * This Compound was used for testing the Compound display,
 * as it gave a static Compound to use as a prop.
 */

const example:Compound = {
  name: "aluminum nitride",
  elements: ["aluminum","nitrogen"],
  atomicNumbers: [13,7],
  formula: "Al N",
  classification: CompoundClassification.BinaryIonicCompound
}

export const InfoBox = ({
  gameState,
  activeElement,
  level,
  setSelectedLevel,
  setShowLevel,
  feedback,
}: Props) => {
  /** Keeps track of whether the showClock is to be displayed or not */
  const [showClock, setShowClock] = useState<boolean>(false);
  /**  Keeps track of the current time (in milliseconds since enoch), used to figure out time spent matching the current element*/
  const [currTime, setCurrTime] = useState(new Date().getTime());

  const[showChar,setChar] = useState<boolean>(false);

  /** Initial defn of elapsed time, which is the amount of time elapsed since the start of this element's matching phase in seconds*/
  const elapsedTime = (currTime - gameState.startTime) / 1000;
  const [wordGuess, setWordGuess] = useState<string>();

  /**
   * This useEffect function updates the current time every second (since updating currTime as fast as possible
   * would re-render everything every time currTime updates)
   */
  useEffect(() => {
    setInterval(() => {
      setCurrTime(new Date().getTime());
    }, 1000);
  }, []);

  if (gameState.gamePhase === GamePhase.CompletedWord) {
    //return two things, based on if the wordGuess the user has made matches the game's word or not
    // 1. Show the "Congrats" screen
    // 2. Ask the user to type in the word that they see on the screen until
    //    the guess matches the game's word.
    return wordGuess?.toLowerCase() === gameState.word.toLowerCase() ? (
      // option 1: show end screen
      <div class="game-info">
        <EndScreen
          setSelectedLevel={setSelectedLevel}
          setShowLevel={setShowLevel}
        />
      </div>
    ) : (
      // option 2: let user guess the word.
      <div class="game-info">
        <form
          class="user-guess"
          onSubmit={(event) => {
            event.preventDefault(); //dont reload page
            const theGuess = new FormData(event.currentTarget).get(
              "text-box-end",
            );
            setWordGuess(theGuess?.toString());
          }}
        >
          {wordGuess === undefined ? (
            <label for="end-game-text-box">
              You have filled in the word! Type it out in the text box. {"\n"}
            </label>
          ) : (
            <label for="end-game-text-box">
              Not quite! Try guessing the word again. {"\n"}
            </label>
          )}

          <input
            type="text"
            class="text-box"
            id="end-game-text-box"
            name="text-box-end"
            placeholder="Enter here"
            required
            size={10}
          />
          <Button>Check</Button>
        </form>
      </div>
    );
  }

  return (
    <div class="game-info">
      {/* If the game has an error display the error, otherwise show the active element */}
      {gameState.error && <h1>{gameState.error}</h1>}
      {activeElement && (
        <div class="element-and-feedback">
          <ElementToFind activeElement={activeElement} level={level} comp={CompoundDisplay(activeElement,usedCompounds)} />
          {feedback && (
            <div class="feedback">
              {feedback.type === "good" && (
                <h1 class="match-text-good">{feedback.text}</h1>
              )}
              {feedback.type === "bad" && (
                <h1 class="match-text-bad">{feedback.text}</h1>
              )}
            </div>
          )}
        </div>
      )}

      <div>Score: {gameState.score}</div>

      {/* display score breakdown if there is a correct match or stay empty if incorrect match*/}
      {gameState.gamePhase === GamePhase.ShowingCorrect ? (
        <h2 class={clsx("match-text-score-description", "match-text-good")}>
          {gameState.scoreCompBase !== 0 ? (
            <div>+ {gameState.scoreCompBase} (base)</div>
          ) : null}
          {gameState.scoreCompStreak !== 0 ? (
            <div>+ {gameState.scoreCompStreak} (streak bonus)</div>
          ) : null}
          {gameState.scoreCompTime !== 0 ? (
            <div>+ {gameState.scoreCompTime} (time bonus)</div>
          ) : null}
        </h2>
      ) : (
        <div class="box-text"></div>
      )}

      {/* toggle-able clock that increments every second if enabled, not relative to grid but to the info box */}
      <div class="clock-elements">
        <span class="clock-text">
          {showClock && (Math.round(elapsedTime * 100) / 100).toFixed(0)}
        </span>
        <button
          class="clock-toggle"
          onClick={() => {
            setShowClock(!showClock);
          }}
        >
          <svg
            class="clock-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>Toggle Clock</title>
            <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
          </svg>
        </button>
        
      </div>
       {/* character placement in the infobox*/}
       <div class="char-chooser">
        <span class="char-chooser-text">
        {showChar && (Math.round(elapsedTime * 100) / 100).toFixed(0)}
        </span>
        <Button
          class="char-toggle"
          onClick={() => {
            window.open(shark)
          }}
        >Characters      
            <title>Character-chooser</title>
         </Button>
      </div>
    </div>
  );
};

const characterChooser = () => {
  return ( 

<div class="char-chooser">
  <div class="char-chooser-text">Characters</div>
  
  <Button
        class="char-toggle"
      >
        <img src={ shark } class="char-icon"/>
        
          
          <title>Toggle Char</title>
       </Button>
  </div>
  )
}

interface EndScreenProps {
  setSelectedLevel: (level: Level | null) => void;
  setShowLevel: (showLevel: boolean) => void;
}
const EndScreen = ({ setSelectedLevel, setShowLevel }: EndScreenProps) => {
  return (
    <div class="end-screen">
      <h1>Congrats!</h1>
      <Button
        onClick={() => {
          setSelectedLevel(null);
          setShowLevel(true);
        }}
      >
        Play again
      </Button>
    </div>
  );
};
/**
 * This function checks the current element and tests if it is part of a usedCompound,
 * if it is it will return the compound that the element is a part of, so it can be displayed.
 * @param element - active element that would normally be displayed
 * @param usedCompounds - array of compounds that were found within the list of elements
 */
function CompoundDisplay(element:PeriodicTableElementType,usedCompounds:Compound[]):Compound | null{

  for(let i = 0; i < usedCompounds.length; i++){
    if(element.name === usedCompounds[i].elements[0])
    {
      return usedCompounds[i];
    }else if (element.name === usedCompounds[i].elements[1]){
      return usedCompounds[i];
    }
  }

  return null;
}
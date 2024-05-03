import { Compound, CompoundClassification } from "../../compound-decoder/compound-data";
import usedCompounds from "../random-element-sequence-from-placement";
import { GameState, GamePhase, Feedback } from "../game-state";
import { useEffect, useState } from "preact/hooks";
import { ElementToFind } from "./periodic-table-to-find";
import { Level } from "./periodic-table";
import { PeriodicTableElement as PeriodicTableElementType } from "../periodic-table-data";
import {computeNewScore} from "../score-calc";
import clsx from "clsx";
import "./periodic-table-info-box.css";
import Button from "./button";
import shark from './chem_photo4.png';
import owl from './chem_photo3.png';
import soccer from './chem_photo2.png';
import oct from './chem_photo1.png';


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

  const[showCurrent,setCurrent] = useState<boolean>(false);


  /** Initial defn of elapsed time, which is the amount of time elapsed since the start of this element's matching phase in seconds*/
  const elapsedTime = (currTime - gameState.startTime) / 1000;

  const [wordGuess, setWordGuess] = useState<string>();
  const [runBonus, setRunningTime] = useState(1000);
  const [widthset, setWidth] = useState(100);
  //let toggleExecuted = false;

  /**
   * This useEffect function updates the current time every second (since updating currTime as fast as possible
   * would re-render everything every time currTime updates)
   */
  useEffect(() => {
    setInterval(() => {
      setCurrTime(new Date().getTime());
    }, 1000);
  }, []);
  let time:number;

  /**
   * This useEffect function updates the timebonus every second at a specified rate that differs
   * across levels.
  */
  useEffect(() => {
    let duration = 1000;
      if (level == Level.Beginner) {
        duration = 25;
      } else if (level == Level.Intermediate) {
        duration = 50;
      } else if (level == Level.Advanced) {
        duration = 100;
      }

    const interval = setInterval(() => {      
      setRunningTime(prevtime => Math.max(prevtime-1, 0));

      if (runBonus === 0){
        clearInterval(interval);
      }
    }, duration)

    return () => clearInterval(interval)
  }, []);

  //If the user clicks the right element, set the running bonus to 1000 to countdown anew
  if (gameState.gamePhase === GamePhase.ShowingCorrect){
    setRunningTime(1000);
    const timeBar = timeBarChange(runBonus);
    const element = document.querySelector('.time-icon') as HTMLElement;
    element.style.width = '100%';
    element.style.animation = 'progress linear';
    element.style.animationDuration = setRunningTime(1000) + 'ms';
  }

  function timeBarChange(runBonus:number): string{
    return `<div> 
      
      <div class="time-icon" style="animationDuration: ${runBonus*100}ms; backgroundColor: green; width: 100%;"></div>
      
    </div>`;
  }
  
  const scoreProgress = document.querySelector('.score-bar') as HTMLElement;
  function updateScore(points: number){
    const correctPoints = Math.max(0, Math.min(100, points));

    scoreProgress.style.width = `${correctPoints}`;
  }

  // if(gameState.score >= 10000 && !toggleExecuted){
  //   let scores = gameState.score;
  //   let intervalpop: ReturnType<typeof setInterval> | undefined;
  //   const toggle = (scores : number) => {
  //     let popup = document.getElementById("congrats-Modal");
  //     let popupContent = document.getElementById("congrats-Modal-Text");
      
  //     if(popup && popupContent){
  //       popup.style.display = "flex";
  //       popupContent.textContent = `Great! You have unlocked a new character`;

  //       intervalpop = setInterval(scaleImage, 50);

  //       setTimeout(() => {
  //         popup.style.display = "none";
  //         clearInterval(intervalpop);
  //       }, 4000);
  //     }
  //   };

  //   let factor = 1;
  //   let popImage = document.getElementById("congrats-Modal-Image");

  //   const scaleImage = () => {
  //     if (factor === 1){
  //       factor = 0.8;
  //     } else {
  //       factor = 1;
  //     }
  //     if(popImage){
  //       popImage.style.transform = `scale(${factor})`;
  //     }
  //   }
  //   toggle(scores);
  //   toggleExecuted = true;
  // }

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

      
      {/* displays the current timebonus counting down  style="height:24px; width:1%; color:black" */}
      <div> 
        time: <span>{runBonus}</span>
        <div class="time-elements">
          <div class="time-icon" style={{width: `${runBonus/10}%`}}></div>
        </div>
      </div> 
      <div>Score: {gameState.score}
        <div class="score-element">
          <div class="score-bar" style={{width: `${gameState.score / 1000}%`}}></div>
        </div>
      </div>
      
      <div class="Modal" id="congrats-Modal">
        <div class="Modal-content">
          <div id="Modal-text">
                {/* <p id="congrats-Modal-Text">Yay! You've unlocked a new character.</p> */}
          </div>
        </div>
      </div>

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
       <div class="char-icon">
        <span class="char-text">
        {showChar && "Characters Availible: "}
        </span>
        <button
          class="char-toggle"
          onClick={() => {
            setChar(!showChar);
            
          }}
        >
        
          <img src={ shark } class="char-icon"/>
         
          <img src={ owl } class="char-icon"/>

          <img src={ soccer } class="char-icon"/>

          <img src={ oct } class="char-icon"/>

          
          
            
            <title>Toggle Char</title>
         </button>

      </div>

      <div class="current-icon">
        <span class="current-text">
        {showCurrent && "Current Character: "}
        </span>
        <button
          class="current-toggle"
          onClick={() => {
            setCurrent(!showCurrent);
            
          }}
        >
        
          <img src={ shark } class="current-icon"/>
          <title>Toggle Char</title>
         </button>

      </div>
      </div>
  );
};

const characterChooser = () => {
  return ( 

<div class="character-chooser">
  <div class="character-chooser-text">Characters</div>
  
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
      <h2> "You unlocked: showCurrent </h2> 
      <Button
        onClick={() => {
          setSelectedLevel(null);
          setShowLevel(true);
            
          }}
        >
        
          <img src={ shark } class="char-icon"/>
      
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

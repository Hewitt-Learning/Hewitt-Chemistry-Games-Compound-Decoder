import { GameState, MatchStatus } from "../game-state";
import { useEffect, useState } from "preact/hooks";
import { ElementToFind } from "./periodic-table-to-find";
import { PeriodicTable, ElementState, Level } from "./periodic-table";
import { PeriodicTableElement as PeriodicTableElementType } from "../periodic-table-data";
import clsx from "clsx";
import { addSpace } from "./periodic-table-space";

const goodWords: string[] = [
  "Nice!",
  "Great!",
  "Good Job!",
  "WOW!",
  "Excellent!",
  "Well Done!",
];
const badWords: string[] = [
  "Try again!",
  "Whoops!",
  "Almost!",
  "Yikes!",
  "Jinkies!",
  "Not quite!",
];

interface Props {
  gameState: GameState;
  element: PeriodicTableElementType;
  level: Level;
}

export const TheBox = ({ gameState, element, level }: Props) => {
  /** Keeps track of whether the clock is to be displayed or not */
  const [clock, setClock] = useState<boolean>(false);
  /**  Keeps track of the current time (in milliseconds since enoch), used to figure out time spent matching the current element*/
  const [currTime, setCurrTime] = useState(new Date().getTime());

  /** currWord is used to keep track of the current matchStatus display word so that it doesn't change when matchStatus changes */
  const [currWord, setCurrWord] = useState<string>(); 

  /** Initial defn of elapsed time, which is the amount of time elapsed since the start of this element's matching phase in seconds*/
  let elapsedTime = (currTime - gameState.startTime) / 1000; 

  /** 
   * This useEffect function updates the current time every second (since updating currTime as fast as possible
   * would re-render everything every time currTime updates)
   */
  useEffect(() => {
    setInterval(() => {
      setCurrTime(new Date().getTime());
      elapsedTime = (currTime - gameState.startTime) / 1000;
    }, 1000);
  }, []);

  /**
   * This useEffect handles what match status word the user sees when the user makes a match attempt.
   */
  useEffect(() => {
    // if the match attempt was good
    if(gameState.matchStatus === MatchStatus.Correct) {
      setCurrWord(goodWords[Math.round(Math.random() * goodWords.length)]);
    }
    // if the match attempt was bad
    else if(gameState.matchStatus === MatchStatus.Incorrect) {
      setCurrWord(badWords[Math.round(Math.random() * badWords.length)]);
    }
    // if the match has not happened yet, the word does not exist
    else {
      setCurrWord("");
    }
  }, [gameState.matchStatus])

  return (
    <div class="game-info">
      {/* row 1 column 1 */}
      {/* If the game has an error display the error, otherwise show the active element */}
      {!true &&
        (gameState.error ? (
          <h1 class="box-text">{gameState.error}</h1>
        ) : (
          <h1 class="box-text">Word does not fit</h1>
        ))
        || true && gameState.activeElement && (
          <ElementToFind element={element} level={level} />
      )}

      {/* first row, second column */}
      <div class="box-text">Score <div></div>{gameState.score}</div>

      {/* display score breakdown if there is a correct match or stay empty if incorrect match*/}
      {(gameState.matchStatus === MatchStatus.Correct && (
        <h1 class={clsx("match-text-score-description", "match-text-good")}>
          <div>+ {gameState.scoreCompBase}</div>
          <div>+ {gameState.scoreCompStreak}</div>
          <div>+ {gameState.scoreCompTime}</div>
        </h1>
      )) ||
        (gameState.matchStatus === MatchStatus.Incorrect && (
          <div class="box-text"></div>
        )) ||
        (gameState.matchStatus === MatchStatus.InProgress && <div></div>)}

      <div>
        {/* display the current score & match status of active element to the screen. */}
        {(gameState.matchStatus === MatchStatus.Correct && (
          <h1 class={clsx("box-text", "match-text", "match-text-good")}>
            {currWord}
          </h1>
        )) ||
          (gameState.matchStatus === MatchStatus.Incorrect && (
            <h1 class={clsx("box-text", "match-text", "match-text-bad")}>
              {currWord}
            </h1>
          )) || <div class="match-text"></div>}
      </div>

      {/* second row, second column has the button to toggle the timer for the current element */}
      <div class="box-text">
        <button
          class="clock-toggle"
          onClick={() => {
            if (!clock) {
              setClock(true);
            } else {
              setClock(false);
            }
          }}
        >
          {/* use the icon from w3.org  */}
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

      {/* second row, final column should be a toggle-able clock that increments every second if enabled */}
      {}
      <div class={clsx("clock-element", "box-text")}>
        <div>{clock && (Math.round(elapsedTime * 100) / 100).toFixed(0)}</div>
      </div>
    </div>
  );
};

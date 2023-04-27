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
  const [clock, setClock] = useState<boolean>(false);
  const [currTime, setCurrTime] = useState(new Date().getTime()); //ms since enoch
  let elapsedTime = (currTime - gameState.startTime) / 1000; //time elapsed since the start of this element's matching phase in seconds

  useEffect(() => {
    setInterval(() => {
      setCurrTime(new Date().getTime());
      elapsedTime = (currTime - gameState.startTime) / 1000;
    }, 1000);
  }, []);

  //console.log(elapsedTime);
  return (
    <div class="game-info">
      {!true &&
        (gameState.error ? (
          <h1 class="box-text">{gameState.error}</h1>
        ) : (
          <h1 class="box-text">Word does not fit</h1>
        ))}
      {/* column 1 */}
      {gameState.activeElement && (
        <ElementToFind element={element} level={level} />
      )}

      <div class="box-text">Score: {gameState.score}</div>

      {/* configure the top right element of the grid to display score breakdown if
      there is a correct match or stay empty if incorrect match*/}
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
        {/* display the current score & match status of active element to the screen. TODO: make it look better */}
        {(gameState.matchStatus === MatchStatus.Correct && (
          <h1 class={clsx("box-text", "match-text", "match-text-good")}>
            {goodWords[Math.round(Math.random() * goodWords.length)]}
          </h1>
        )) ||
          (gameState.matchStatus === MatchStatus.Incorrect && (
            <h1 class={clsx("box-text", "match-text", "match-text-bad")}>
              {badWords[Math.round(Math.random() * badWords.length)]}
            </h1>
          )) || <div class="match-text"></div>}
      </div>

      {/* second row, second column is empty */}

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

      {/* second row, final column should be a toggle-able clock */}
      {}
      <div class={clsx("clock-element", "box-text")}>
        <div>{clock && (Math.round(elapsedTime * 100) / 100).toFixed(0)}</div>
      </div>
    </div>
  );
};

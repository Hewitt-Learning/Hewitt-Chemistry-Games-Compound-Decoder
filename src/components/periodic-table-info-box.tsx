import { GameState, MatchStatus } from "../game-state";
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
  return (
    <div>
      {!true &&
        (gameState.error ? (
          <h1 class="box-text">{gameState.error}</h1>
        ) : (
          <h1 class="box-text">Word does not fit</h1>
        ))}
      {gameState.activeElement && (
        <ElementToFind element={element} level={level} />
      )}
      <h1 class="box-text">Score: {gameState.score}</h1>

      <div class="match-text">
        {/* display the current score & match status of active element to the screen. TODO: make it look better */}
        {(gameState.matchStatus === MatchStatus.Correct && (
          <h1 class={clsx("match-text-good", "match-text")}>
            {goodWords[Math.round(Math.random() * goodWords.length)]}
          </h1>
        )) ||
          (gameState.matchStatus === MatchStatus.Incorrect && (
            <h1 class={clsx("match-text-bad", "match-text")}>
              {badWords[Math.round(Math.random() * badWords.length)]}
            </h1>
          ))}
      </div>
    </div>
  );
};

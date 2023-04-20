import { GameState, MatchStatus } from "../game-state";
import { ElementToFind } from "./periodic-table-to-find";
import { PeriodicTable, ElementState, Level } from "./periodic-table";
import { PeriodicTableElement as PeriodicTableElementType } from "../periodic-table-data";

interface Props {
  gameState: GameState;
  element: PeriodicTableElementType;
  level: Level;
}

export const theBox = ({ gameState, element, level }: Props) => {
  return (
    <div class="game-info">
      {!true &&
        (gameState.error ? (
          <h1>{gameState.error}</h1>
        ) : (
          <h1>Word does not fit</h1>
        ))}
      {gameState.activeElement && (
        <ElementToFind element={element} level={level} />
      )}

      {/* display the current score & match status of active element to the screen. TODO: make it look better */}
      {gameState.matchStatus === MatchStatus.Correct ? (
        <h1 class="match-text-good">Nice!</h1>
      ) : (
        <div></div>
      )}
      {gameState.matchStatus === MatchStatus.Incorrect ? (
        <h1 class="match-text-bad">Try again!</h1>
      ) : (
        <div></div>
      )}
      <h1>Score: {gameState.score}</h1>
    </div>
  );
};

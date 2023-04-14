import { periodicTable } from "../periodic-table-data";
import { PeriodicTableElement } from "./periodic-table-element";
import { ElementToFind } from "./periodic-table-to-find";
import "./periodic-table.css";
import { useGameState, MatchStatus } from "../game-state";

/** The possible states for each displayed element during the game */
export enum ElementState {
  /** Elements of the current word that have been found */
  FoundElement,
  /** Elements that have not been clicked */
  NotClicked,
  /** Elements that were clicked incorrectly (gets reset after a the correct element is found) */
  WrongElementClicked,
}

export enum Level {
  Beginner,
  Intermediate,
  Advanced,
}

interface Props {
  wordList: string[];
  level: Level;
}

export const PeriodicTable = ({ level, wordList }: Props) => {
  const gameState = useGameState(wordList, level);

  const activeElement =
    gameState.activeElement &&
    periodicTable[gameState.activeElement.row][gameState.activeElement.col];

  return (
    <div class="periodic-table-wrapper">
      {!true &&
        (gameState.error ? (
          <h1>{gameState.error}</h1>
        ) : (
          <h1>Word does not fit</h1>
        ))}
      {activeElement && <ElementToFind element={activeElement} level={level} />}

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
      <div class="periodic-table">
        {periodicTable.map((row, rowIndex) => {
          // Row is array of elements or null
          return row.map((element, colIndex) => {
            if (element) {
              return (
                <PeriodicTableElement
                  element={element}
                  onClick={() => {
                    // If it was already found, or already clicked but was wrong, ignore the click
                    if (
                      gameState.elementStates[rowIndex][colIndex] ===
                        ElementState.FoundElement ||
                      gameState.elementStates[rowIndex][colIndex] ===
                        ElementState.WrongElementClicked
                    )
                      return;

                    // There is not an element being searched for, so ignore the click
                    // This could happen if you click an element when a word that does not fit in the table is placed
                    // Or if you have completed finding all the elements
                    if (!gameState.activeElement) return;

                    if (
                      rowIndex === gameState.activeElement.row &&
                      colIndex === gameState.activeElement.col
                    ) {
                      // The active (searched-for) element was clicked
                      gameState.handleCorrectElementClick();
                    } else {
                      // Wrong element was clicked
                      gameState.handleIncorrectElementClick(rowIndex, colIndex);
                    }
                  }}
                  elementState={gameState.elementStates[rowIndex][colIndex]}
                />
              );
            } else {
              return <div />;
            }
          });
        })}
      </div>
    </div>
  );
};

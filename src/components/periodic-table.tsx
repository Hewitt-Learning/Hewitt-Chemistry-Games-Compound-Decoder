import { periodicTable } from "../periodic-table-data";
import { PeriodicTableElement } from "./periodic-table-element";
import { ElementToFind } from "./periodic-table-to-find";
import "./periodic-table.css";
import { useGameState, MatchStatus } from "../game-state";
import { TheBox } from "./periodic-table-info-box";

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
  /** A property that describes the difficulty of the game, which determines how the "active" element is displayed to the user */
  level: Level;
}

export const PeriodicTable = ({ level }: Props) => {
  const gameState = useGameState(level);

  const activeElement =
    gameState.activeElement &&
    periodicTable[gameState.activeElement.row][gameState.activeElement.col];

  return (
    <div class="periodic-table-wrapper">
      <div class="periodic-table">
        {/* THE BOX */}
        <div class="game-info">
          {activeElement && (
            <TheBox
              gameState={gameState}
              element={activeElement}
              level={level}
            />
          )}
        </div>
        {/* end of THE BOX */}

        {periodicTable.map((row, rowIndex) => {
          // Row is array of elements or null
          return row.map((element, colIndex) => {
            if (element === null) {
              return null;
            }
            return (
              <PeriodicTableElement
                style={{ gridColumn: `${colIndex + 1} / span 1` }}
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
          });
        })}
      </div>
    </div>
  );
};

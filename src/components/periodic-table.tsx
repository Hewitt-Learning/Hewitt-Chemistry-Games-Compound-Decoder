import { periodicTable } from "../periodic-table-data";
import { PeriodicTableElement } from "./periodic-table-element";
import "./periodic-table.css";
import { useGameState } from "../game-state";

/** The possible states for each displayed element during the game */
export enum ElementState {
  /** Elements of the current word that have been found */
  FoundElement,
  /** Elements that have not been clicked */
  NotClicked,
  /** Elements that were clicked incorrectly (gets reset after a the correct element is found) */
  WrongElementClicked,
}

export const PeriodicTable = () => {
  const gameState = useGameState();

  return (
    // Text box for testing purpose only: if typed words fit, places them on the periodic table
    <div class="periodic-table-wrapper">
      <input
        type="text"
        value={gameState.word}
        onInput={(event) => gameState.setWord(event.currentTarget.value)}
      />
      {!true &&
        (gameState.error ? (
          <h1>{gameState.error}</h1>
        ) : (
          <h1>Word does not fit</h1>
        ))}
      {gameState.activeElement && (
        <h1>
          {
            periodicTable[gameState.activeElement.row][
              gameState.activeElement.col
            ]?.name
          }
        </h1>
      )}
      {/* display the current score to the screen TODO: make it look better */}
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
                  isFound={gameState.elementStates[rowIndex][colIndex]}
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

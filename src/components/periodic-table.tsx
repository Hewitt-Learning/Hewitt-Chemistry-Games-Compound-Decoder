import { periodicTable } from "../periodic-table-data";
import { PeriodicTableElement } from "./periodic-table-element";
import "./periodic-table.css";
import { useGameState, GamePhase } from "../game-state";
import { InfoBox } from "./periodic-table-info-box";
import { SpaceDef } from "../word-placement";

const playIncorrectSound = () => {
  const audio = new Audio("./audio/boowomp.mp3");
  audio.playbackRate = 1.25;
  audio.play();
};

const playCorrectSound = () => {
  const audio = new Audio("./audio/KH3v2.wav");
  audio.playbackRate = 1.5;
  audio.play();
};

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
  setSelectedLevel: (level: Level | null) => void;
}

export const PeriodicTable = ({ level, setSelectedLevel }: Props) => {
  const gameState = useGameState(level);

  const activeElement =
    gameState.activeElement &&
    periodicTable[gameState.activeElement.row][gameState.activeElement.col];

  return (
    <div class="periodic-table-wrapper">
      <div class="periodic-table">
        {/* THE BOX */}
        <InfoBox
          gameState={gameState}
          activeElement={activeElement}
          level={level}
          setSelectedLevel={setSelectedLevel}
        />
        {/* end of THE BOX */}

        {periodicTable.map((row, rowIndex) => {
          // Row is array of elements or null
          return row.map((element, colIndex) => {
            if (element === null) {
              return null;
            }
            // There are two options for how the periodic table is displayed:
            // 1. The player has not yet completed filling out the word
            // 2. The player has completed filling in the word
            // In the first case, we want to render the periodic table so that all of the elements and their details are displayed
            // In the second case, we only want to show the outlines of the elements, and in particular highlight the elements that
            //  were part of the word, so the user can distinguish the word more clearly.
            // The following return does this.

            return gameState.gamePhase !== GamePhase.CompletedWord ? (
              // Start with the case 1: The user has not completed the word
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
                    playCorrectSound();
                    gameState.handleCorrectElementClick();
                  } else {
                    // Wrong element was clicked
                    playIncorrectSound();
                    gameState.handleIncorrectElementClick(rowIndex, colIndex);
                  }
                }}
                elementState={gameState.elementStates[rowIndex][colIndex]}
              />
            ) : // user has completed the word, now we need to highlight the elements that were placed.
            // assume that the game has placed a word on the table, and check which elements make up the word or not
            gameState.placement &&
              gameState.placement[rowIndex][colIndex] === SpaceDef.Occupied ? (
              //these elements do make up the word. Make the background and font color match so there is less confusion
              <PeriodicTableElement
                style={{
                  gridColumn: `${colIndex + 1} / span 1`,
                  color: `black`,
                  background: `black`,
                }}
                element={element}
                onClick={() => null}
                elementState={gameState.elementStates[rowIndex][colIndex]}
              />
            ) : (
              // these elements do not make up the word. Make them contrast with the elements that do make up the word,
              // and hide the text similar to what was done above.
              <PeriodicTableElement
                style={{
                  gridColumn: `${colIndex + 1} / span 1`,
                  color: `white`,
                  background: `white`,
                }}
                element={element}
                onClick={() => null}
                elementState={gameState.elementStates[rowIndex][colIndex]}
              />
            );
          });
        })}
      </div>
    </div>
  );
};

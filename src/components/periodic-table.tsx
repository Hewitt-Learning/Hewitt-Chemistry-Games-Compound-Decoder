import { useEffect, useMemo, useState } from "preact/hooks";
import { periodicTable } from "../periodic-table-data";
import { PeriodicTableElement } from "./periodic-table-element";
import { placeWord, SpaceDef } from "../word-placement";
import "./periodic-table.css";
import {
  randomElementSequenceFromPlacement,
  RowCol,
} from "../random-element-sequence-from-placement";

/**
 * Keeps track of status of element clicks per element displayed
 */
export enum ElementState {
  /**
   * This enum is for the current element we are watching to match.
   * Once the current element is matched, it will be set to FoundElement.
   */
  RightElementNotMatched,
  /**
   * Keeps track of the elements of the current word that have been guessed correctly.
   * Should not change from this state once it gets here.
   */
  FoundElement,
  /**
   * Keeps track of elements that are not the current match and not currently clicked.
   */
  WrongElementNotClicked,
  /**
   * If these elements are clicked they should be set to have a red
   * background until the correct element is matched.
   */
  WrongElementClicked,
}

export const PeriodicTable = () => {
  const [word, setWord] = useState("Fill");
  const [error, setError] = useState<undefined | string>(undefined);
  const [active, setActive] = useState<undefined | RowCol>(undefined);
  /**keeps track of the current element to match in a list of elements to guess in the word */
  const [currMatch, setCurrMatch] = useState<number>(0);
  //stateful clickable button map, all set to not-clicked at first
  //fix to use enums
  const [click, setClick] = useState<ElementState[][]>(
    periodicTable.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        return ElementState.WrongElementNotClicked;
      });
    }),
  );

  /**
   * Runs this code only if active is changed - active is a RowCol element that is the current item
   * to match. For example, if RowCol is Potassium, any incorrect match other than potassium will
   * show as red on the screen, while matching potassium will set the background of potassium to black for
   * the rest of the game (additionally, resets
   */
  useEffect(() => {
    setClick(
      periodicTable.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          if (active && active.row === rowIndex && active.col === colIndex) {
            return ElementState.RightElementNotMatched;
          }

          return click[rowIndex][colIndex];
        });
      }),
    );
  }, [active]);

  /**
   * Defines a 2D array of enums signifying which spaces of the periodic table are
   * occupied, unoccupied, or invalid once the word has been "placed".
   * In addition, defines an array of RowCol elements that indicate the order of
   * elements to match in the game.
   * Only runs if the input word changes.
   */
  const { placement, elementSequence } = useMemo(() => {
    try {
      setError(undefined);
      const placement = placeWord(word);
      if (placement) {
        const elementSequence = randomElementSequenceFromPlacement(
          placement,
          Math.random,
        );
        return { placement, elementSequence };
      } else {
        return { placement, elementSequence: [] };
      }
    } catch (error: any) {
      setError(String(error));
      return { placement: false, elementSequence: [] };
    }
  }, [word]);

  useEffect(() => {
    setActive(elementSequence[currMatch]);
  }, [elementSequence, currMatch]);

  return (
    //text box for testing purposes, tests if words fit and if so, places them on periodic table.
    <div class="periodic-table-wrapper">
      <input
        type="text"
        value={word}
        onInput={(event) => {
          setWord(event.currentTarget.value);
        }}
      />
      {!placement && (error ? <h1>{error}</h1> : <h1>Word does not fit</h1>)}
      {active && <h1>{periodicTable[active.row][active.col]?.name}</h1>}
      <div class="periodic-table">
        {periodicTable.map((row, rowIndex) => {
          //row is array of elements or null
          return row.map((element, colIndex) => {
            if (element) {
              //set element in table based on element def in ./periodic-table-element
              //set the occupied status based on placeWord function from ../word-placement/index.ts
              return (
                <PeriodicTableElement
                  element={element}
                  occupied={
                    placement &&
                    placement[rowIndex]?.[colIndex] === SpaceDef.Occupied
                  }
                  onClick={() => {
                    // we want to check for valid clicks onto occupied or unoccupied spaces
                    // clicks onto invalid spaces will not matter & are null. These if statements handle that.

                    //valid click onto occupied space
                    // also resets the state of the rest of the "wrong elements" from red to default
                    if (
                      placement &&
                      placement[rowIndex]?.[colIndex] !== SpaceDef.Invalid &&
                      click[rowIndex][colIndex] ===
                        ElementState.RightElementNotMatched
                    ) {
                      setClick((click) => {
                        click[rowIndex][colIndex] = ElementState.FoundElement;

                        // reset the status of all "incorrect" element matches
                        click.map((row, rowInd) => {
                          return row.map((col, colInd) => {
                            if (
                              click[rowInd][colInd] !==
                              ElementState.FoundElement
                            ) {
                              click[rowInd][colInd] =
                                ElementState.WrongElementNotClicked;
                            }
                          });
                        });
                        setCurrMatch(currMatch + 1);
                        return [...click];
                      });
                      //wrong match :)
                    } else if (placement) {
                      setClick((click) => {
                        console.log("wrong match");
                        click[rowIndex][colIndex] =
                          ElementState.WrongElementClicked;
                        return [...click];
                      });
                    }
                  }}
                  isFound={click[rowIndex][colIndex]}
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

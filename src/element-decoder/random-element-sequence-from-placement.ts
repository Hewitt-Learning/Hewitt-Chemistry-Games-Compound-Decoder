import { SpaceDef } from "./word-placement";
import { periodicTable } from "./periodic-table-data";
import { compoundQuestions } from "../compound-decoder/compound-data";

export interface RowCol {
  row: number;
  col: number;
}

/**
 * @param placement The pre-generated arrangement of elements to find
 * @param rng a function that returns a random number between [0, 1)
 * @returns a randomly shuffled sequence of (row, col) coordinates given a placement
 */
export const randomElementSequenceFromPlacement = (
  placement: SpaceDef[][],
  rng: () => number,
): RowCol[] => {
  // Generate (row, col) for each occupied space in the table
  const elementCoordinates = placement.reduce((output, row, rowIndex) => {
    return [
      ...output,
      ...row
        .map((spaceDef, colIndex) => {
          if (spaceDef === SpaceDef.Occupied)
            return {
              row: rowIndex,
              col: colIndex,
            };
        })
        .filter((v): v is RowCol => v !== undefined),
    ];
  }, [] as RowCol[]);

  // Randomly shuffle the sequence
  for (let i = 0; i < elementCoordinates.length; i++) {
    const tmp = elementCoordinates[i];
    const swapIndex = Math.floor(rng() * elementCoordinates.length);
    elementCoordinates[i] = elementCoordinates[swapIndex];
    elementCoordinates[swapIndex] = tmp;
  }
  ///// TO-DO: search list for possible compounds
  /**
  List of compounds available is generated, this now needs to sort the elements
  in a way that makes the game logic work. (Element 1, before Element 2)

  We should also recall the word function to guarantee that at least a few compounds are made.

  This can be done by also changing the order in which compounds are paired, randomly becoming more optimal

  */

  //Deep copy the elementCoordinates array to eliminate used elements.
  //NOTE: Now pointless, as the coordinate array is unchanged as of yet.
  //but might be needed to use for sorting.
  const elemCoordCopy = JSON.parse(JSON.stringify(elementCoordinates));



  const usedElements:number[] = []; //excludes the elements from being included in future loops
  const usedCompounds:number[] = []; //holds the number identifier of each compound used
  for (let i = 0; i < elemCoordCopy.length; i++) {
    //check each compound option
    for (let j = 0; j < compoundQuestions.length; j++) {
      //the first elementCoordinate pair as an atomic number.
      let firstElement = periodicTable[elemCoordCopy[i].row][elemCoordCopy[i].col]?.atomicNumber;
      
      //This checks 3 things.
      //1. That the compound question at index j contains first element, as the first element
      //2. That the firstElement is not already used.
      //3. That the compound has not already been used. <-- This one might be redundant, because the first element of a compound is required
      if ((firstElement === compoundQuestions[j].atomicNumbers[0]) && (!usedElements.includes(firstElement)) && (!usedCompounds.includes(j))){

        //Check for the second element in each compound
        for (let k = 0; k < elemCoordCopy.length; k++) {

          let secondElement = periodicTable[elemCoordCopy[k].row][elemCoordCopy[k].col]?.atomicNumber;

          //If the second element also matches the compound, and is not already used
          if ((compoundQuestions[j].atomicNumbers[1] === secondElement) && (!usedElements.includes(secondElement))) {
          
            usedElements.push(compoundQuestions[j].atomicNumbers[0]);
            usedElements.push(compoundQuestions[j].atomicNumbers[1]);
            usedCompounds.push(j);

          }
        }
      }
    }

  }
  //This log shows the above function working as intended. Running a dev build
  //and selecting a difficulty will show the results in the console log.
  //Note: inspect the page and navigate to console, there is a chance there is no possible compounds.
  for(let i = 0; i < usedElements.length; i++){
    console.log("Element %d: %d",i,usedElements[i]);
  }



  return elementCoordinates;
};

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;
  test("Returns a random sequence of (row, col) coordinates", () => {
    const placement = [
      [SpaceDef.Invalid, SpaceDef.Occupied, SpaceDef.NotOccupied],
      [SpaceDef.Occupied, SpaceDef.NotOccupied, SpaceDef.Occupied],
      [SpaceDef.Occupied, SpaceDef.Invalid, SpaceDef.NotOccupied],
    ];

    const rng = mulberry32(1);

    expect(randomElementSequenceFromPlacement(placement, rng))
      .toMatchInlineSnapshot(`
        [
          {
            "col": 0,
            "row": 1,
          },
          {
            "col": 2,
            "row": 1,
          },
          {
            "col": 1,
            "row": 0,
          },
          {
            "col": 0,
            "row": 2,
          },
        ]
      `);
  });

  /**
   * A seedable random number generator. (Math.random is not seedable)
   * Used for tests only, so the output is deterministic/consistent.
   * In the live site, Math.random is used instead.
   * From https://stackoverflow.com/a/47593316/4898045
   */
  const mulberry32 = (seed: number) => {
    return function () {
      var t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
}

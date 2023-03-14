import { SpaceDef } from "./word-placement";

interface RowCol {
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

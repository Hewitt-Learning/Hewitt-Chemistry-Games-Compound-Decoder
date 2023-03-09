# Word Placement

This folder contains the algorithm for placing/fitting a word onto the periodic table grid. In general, the placement goes top to bottom, left to right, but this is subject to change.

The individual letters/characters are defined in `letter-definitions.ts`. When a word is placed, the letters are looked up in this file one-by-one.

The `index.test.ts` file contains test cases to ensure that the placement of certain words are as expected.

The placement algorithm is in `index.ts` and is subject to the following constraints:

- A letter must be fully inside the periodic table grid.
- Parts of a letter cannot overlap with parts of another letter.
- Every part of a letter must be fully contained within the elements of the periodic table, and cannot overflow outside the periodic table or into the spaces where no elements are.
- The largest x-coordinate of one letter must be 2 or more spaces away from the smallest x-coordinate of another letter (in other words, there must be a one-column gap between letters).
- All letters will be converted to uppercase in order to be placed.

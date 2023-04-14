import { useEffect, useState } from "preact/hooks";
import { periodicTable } from "./periodic-table-data";
import { ElementState, Level } from "./components/periodic-table";
import {
  randomElementSequenceFromPlacement,
  RowCol,
} from "./random-element-sequence-from-placement";
import { placeWord, SpaceDef } from "./word-placement";
import { computeNewScore } from "./score-calc";
//import wordList from "./word-list.json";
/**
 * signifies the state of the current "turn", e.g. if the active element is Neon, are we waiting on a click, has there been an incorrect click, or a correct click
 */
export enum MatchStatus {
  /**The current guess state is "in progress" e.g. the player has not made an attempt to match, or is between attempts (e.g. tried and failed, fail state ended) */
  InProgress,
  /**The user made an incorrect match, which will prompt a "try again" message for the current element */
  Incorrect,
  /**The user made a correct match, which will prompt a "congrats" message and then move on to the next active element */
  Correct,
}

const getInitialElementStates = () =>
  periodicTable.map((row) => row.map(() => ElementState.NotClicked));

interface GameState {
  wordList: string[];
  word: string;
  error: string | undefined;
  score: number;
  /** The row and column corresponding to the element that is being looked for */
  activeElement: RowCol | undefined;
  matchStatus: MatchStatus;
  elementStates: ElementState[][];
  handleCorrectElementClick(): void;
  handleIncorrectElementClick(rowIndex: number, colIndex: number): void;
}

/**
 * This is a Preact Hook that includes all the game logic.
 * It is pulled into the PeriodicTable component,
 * so that all the game logic is separate from the rendering.
 * @param wordList is a string of words we can use for the game DatoCMS, passed through
 *    as a parameter for PeriodicTable when declaring PeriodicTable in ./app.tsx
 * @returns The game state object,
 * which includes the externally-visible state values themselves,
 * and functions to modify the state.
 */
export const useGameState = (wordList: string[], level: Level): GameState => {
  /** Selects a random word from the wordList retrieved from DatoCMS and passed to GameState as a property. */
  function selectRandomWord() {
    if (wordList.length === 1) {
      return wordList[0];
    }
    return wordList[
      Math.round(Math.random() * Number.MAX_SAFE_INTEGER) % wordList.length
    ];
  }
  /**
   * gets the first valid (placeable) word from the list of words, or a
   * default word if no word from the wordList works
   */
  function getValidWord() {
    let newWord = selectRandomWord(); //select random word from the wordList
    //if the word can't be placed
    if (!placeWord(newWord)) {
      //remove the word & any duplicates from the word list, select a new word
      wordList = wordList.filter((e) => e !== newWord);
      newWord = selectRandomWord();

      //loop until the newWord can be placed or wordList does not have valid word
      while (!placeWord(newWord) && wordList.length > 1) {
        wordList = wordList.filter((e) => e !== newWord); //remove bad newWord from wordList
        newWord = selectRandomWord(); //select a random newWord
        if (placeWord(newWord)) {
          //if the newWord we found can be placed, return it to exit loop
          return newWord;
        }
      }
      //we went through the wordList and couldn't find a word that fit, check the last element
      if (wordList.length === 1 && placeWord(wordList[0])) {
        newWord = wordList[0];
      } else {
        newWord = "fill";
      }
    }
    return newWord;
  }
  /** The word that will be formed by all the searched-for elements */
  const [word, _setWord] = useState<string>(() => getValidWord());
  /** The arrangement of elements to find on the periodic table grid */
  const [placement, setPlacement] = useState<false | SpaceDef[][]>(false);
  /** The "elements to find" in their randomly-shuffled order */
  const [elementSequence, setElementSequence] = useState<RowCol[]>([]);
  const [error, setError] = useState<undefined | string>(undefined);
  const [score, setScore] = useState(0);
  /** The number of elements that have been correctly found in a row without mistakes */
  const [streak, setStreak] = useState(0);
  /** The amount of time that has passed since the current element began to be looked for */
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [matchStatus, setMatchStatus] = useState<MatchStatus>(
    MatchStatus.InProgress,
  );

  // Stateful clickable button map, all set to not-clicked at first
  const [elementStates, setElementStates] = useState<ElementState[][]>(
    getInitialElementStates,
  );
  // Whenever word changes, recompute the placement
  useEffect(() => {
    try {
      setError(undefined);
      setPlacement(placeWord(word));
    } catch (error: any) {
      setError(String(error));
    }
  }, [word]);

  // set match state to InProgress after .5 seconds upon change of matchStatus state
  useEffect(() => {
    setTimeout(() => {
      setMatchStatus(MatchStatus.InProgress);
    }, 750);
  }, [matchStatus]);

  // Whenever the placement changes
  useEffect(() => {
    // Recompute the randomized element sequence to find
    setScore(0);
    setElementSequence(
      placement
        ? randomElementSequenceFromPlacement(placement, Math.random)
        : [],
    );
    // Reset the element states (found/wrong elements)
    setElementStates(getInitialElementStates);
    setMatchStatus(MatchStatus.InProgress);
  }, [placement]);

  const activeElement: RowCol | undefined = elementSequence[0];

  const handleCorrectElementClick = () => {
    // Update the state to mark it as found and reset wrong elements
    setMatchStatus(MatchStatus.Correct);
    setElementStates((click) =>
      click.map((row, rowIndex) =>
        row.map((elementState, colIndex) => {
          if (
            rowIndex === activeElement.row &&
            colIndex === activeElement.col
          ) {
            //logic for updating score/streak
            let newScore, newStreak; //temps to hold output of score calculation
            const currTime = new Date().getTime(); //ms since enoch
            const elapsedTime = (currTime - startTime) / 1000; //get the time elapsed since last correct match in seconds
            //set temp vars to the values calculated from scoring function
            [newScore, newStreak] = computeNewScore(elapsedTime, score, streak);
            setScore(newScore);
            setStreak(newStreak);

            setStartTime(new Date().getTime()); //set new startTime for next element to match
            return ElementState.FoundElement; //Mark as found
          } else if (
            // Reset any wrong elements clicked -> neutral
            elementState === ElementState.WrongElementClicked
          ) {
            return ElementState.NotClicked;
          } else {
            // Leave other elements as-is
            return elementState;
          }
        }),
      ),
    );

    // Advance the elements-to-find sequence ("activate" the next element to find)
    setElementSequence((seq) => seq.slice(1));
  };

  const handleIncorrectElementClick = (rowIndex: number, colIndex: number) => {
    setStreak(0); //if there is an incorrect match, reset the streak but make no score penalty
    setMatchStatus(MatchStatus.Incorrect);
    setElementStates((click) => {
      click[rowIndex][colIndex] = ElementState.WrongElementClicked;
      return [...click];
    });
  };

  return {
    wordList,
    word,
    error,
    score,
    activeElement,
    matchStatus,
    elementStates,
    handleCorrectElementClick,
    handleIncorrectElementClick,
  };
};

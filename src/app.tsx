import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact";
import { Level, PeriodicTable } from "./components/periodic-table";
import wordListDefault from "./word-list.json";
export function App() {
  const [startTime, setStartTime] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  const [wordList, setWordList] = useState<undefined | string[]>(undefined); //possibly set default wordList here, from wordListDefault
  useEffect(() => {
    setStartTime(new Date().getTime());
    setInterval(() => {
      setCurrTime(new Date().getTime());
    }, 1000);
  }, []);

  const resetTime = (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = event.currentTarget;
    setStartTime(new Date().getTime());
    setCurrTime(new Date().getTime());
  };

  /**
   * Retrieves the wordList from DatoCMS and checks for errors in retrieval or content retrieved.
   * Pauses function while waiting for headers from fetch
   */
  async function getWordList() {
    try {
      /**
       * Fetch returns a promise (an object that is expected to exist at some point but does not necessarily
       * exist right now), and once the promise value exists the json data (a promise) is
       * passed to state variable as data, once the json data exists.
       * For this use case, we neeed to use await on fetch so that the try/catch doesn't go through before an error exists
       */
      const response = await fetch("https://graphql.datocms.com/", {
        headers: {
          authorization: "Bearer 306d97cc36416136dec1925240ef29",
          "content-type": "application/json",
        },
        body: '{"query":"{\\n  wordList{\\n    words\\n  }\\n}","variables":null}',
        method: "POST",
        mode: "cors",
        credentials: "include",
      });
      const data = await response.json(); //await used for same reason here - can't get json data until response arrives
      if (!response.ok) {
        //If the fetch response is anything other "ok" (e.g. outside of 200-299 range)
        throw new Error(`Invalid response (${response.status}).`);
      } else {
        //if the response is "ok"
        let splitData = [];
        if (!data.data.wordList.words) {
          //if the words field of the data retrieved is undefined
          setWordList(wordListDefault); //use the default wordList from ./word-list.json
          throw new Error("No data found. Using default word list instead.");
        } else {
          //if we found a valid wordList from the data retrieved
          splitData = data.data.wordList.words.split("\n"); //split the data on newline character,
          setWordList(splitData); //set the wordList state variable
        }
      }
    } catch (err) {
      //catch any errors that may have occurred
      console.error(err);
    }
  }

  useEffect(() => {
    getWordList();
  }, []);

  return (
    <>
      <h1>
        Hewitt Learning Chemistry games!{" "}
        {Math.round((currTime - startTime) / 1000)}{" "}
        <button onClick={resetTime}>Reset Clock</button>
      </h1>
      {/* only show periodic table if theres a word list, pass wordList & level into periodic table */}
      {wordList && (
        <PeriodicTable wordList={wordList} level={Level.Intermediate} />
      )}
    </>
  );
}

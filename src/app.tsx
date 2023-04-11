import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact";
import { PeriodicTable } from "./components/periodic-table";
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

  async function getWordList() {
    try {
      const response = await fetch("https://graphql.datocms.com/", {
        headers: {
          authorization: "Bearer 306d97cc36416136dec1925240ef29",
          "content-type": "application/json",
        },
        body: '{"query":"{\\n  wordList{\\n    words\\n  }\\n}","variables":null}',
        method: "POST",
        mode: "cors",
        credentials: "include",
      }).catch((error) => error.message);
      if (!response) {
        console.log("test1");
        throw new Error("Empty response.");
      } else {
        const data = await response.json();
        let splitData = [];
        if (!data.data.wordList.words) {
          setWordList(wordListDefault);
          throw new Error("No data found. Using default word list instead.");
        } else {
          splitData = data.data.wordList.words.split("\n");
          setWordList(splitData);
        }
      }
    } catch (err) {
      //console.log("uhhhh whats up");
      console.error(err);
    }
  }

  useEffect(() => {
    /**
     * fetch returns a promise (an object that is expected to exist at some point but does not necessarily
     * exist right now), and once the promise value exists, then() calls an arrow function on the response
     * on response. once response "exists", the response is converted to json. Then, the json data (a promise) is
     * passed to state variable as data, once the json data exists.
     */
    getWordList();
  }, []);

  return (
    <>
      {/* only show periodic table if theres a word list, pass wordList into periodic table */}
      <h1>
        Hewitt Learning Chemistry games!{" "}
        {Math.round((currTime - startTime) / 1000)}{" "}
        <button onClick={resetTime}>Reset Clock</button>
      </h1>
      {wordList && <PeriodicTable wordList={wordList} />}
    </>
  );
}

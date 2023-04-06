import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact";
import { PeriodicTable } from "./components/periodic-table";
import wordListDefault from "./word-list.json"
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

  useEffect(() => {
    /**
     * fetch returns a promise (an object that is expected to exist at some point but does not necessarily
     * exist right now), and once the promise value exists, then() calls an arrow function on the response
     * on response. once response "exists", the response is converted to json. Then, the json data (a promise) is
     * printed to the console as data, once the json data exists.
     */
    fetch("https://graphql.datocms.com/", {
      headers: {
        authorization: "Bearer 306d97cc36416136dec1925240ef29",
        "content-type": "application/json",
      },
      body: '{"query":"{\\n  wordList{\\n    words\\n  }\\n}","variables":null}',
      method: "POST",
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWordList(data.data.wordList.words.split("\n"));
        //TODO: error check in the promise - if the wordList from DatoCMS can't be fetched for some reason, or is empty,
        //      set the wordList to some default wordList
      });
  }, []);

  return (
    <>
      {/* TODO: only show periodic table if theres a word list, pass wordList into periodic table*/}
      <h1>
        Hewitt Learning Chemistry games!{" "}
        {Math.round((currTime - startTime) / 1000)}{" "}
        <button onClick={resetTime}>Reset Clock</button>
      </h1>
      {wordList && <PeriodicTable wordList = {wordList}/> }
      {}
    </>
  );
}

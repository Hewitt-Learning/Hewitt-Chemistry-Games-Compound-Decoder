import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact";
import { PeriodicTable } from "./components/periodic-table";
export function App() {
  const [startTime, setStartTime] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  const [wordList, setWordList] = useState<null | string[]>(null);
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

  // restapi stuff
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
        //console.log(data);
      }); //returns object that is promise
  }, []);

  return (
    <>
      {/* TODO: only show periodic table if theres a word list, pass wordList into periodic table*/}
      <h1>
        Hewitt Learning Chemistry games!{" "}
        {Math.round((currTime - startTime) / 1000)}{" "}
        <button onClick={resetTime}>Reset Clock</button>
      </h1>
      <PeriodicTable />
    </>
  );
}

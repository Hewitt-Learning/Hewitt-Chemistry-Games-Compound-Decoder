import { useEffect, useState } from "preact/hooks";
import { PeriodicTable } from "./components/periodic-table";
import React, { useSate } from "react";
export function App() {
  const [startTime, setStartTime] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  useEffect(() => {
    setStartTime(new Date().getTime());
    setInterval(() => {
      setCurrTime(new Date().getTime());
    }, 1000);
  }, []);

  const resetTime = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setStartTime(new Date().getTime());
    setCurrTime(new Date().getTime());
  };
  return (
    <>
      <h1>
        Hewitt Learning Chemistry games!{" "}
        {Math.round((currTime - startTime) / 1000)}{" "}
        <button onClick={resetTime}>Reset Clock</button>
      </h1>
      <PeriodicTable />
    </>
  );
}

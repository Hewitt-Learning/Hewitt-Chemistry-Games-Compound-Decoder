import { useEffect, useState } from "preact/hooks";
import { PeriodicTable } from "./components/periodic-table";

export function App() {
  const [startTime, setStartTime] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  useEffect(() => {
    setStartTime(new Date().getTime());
    setInterval(() => {
      setCurrTime(new Date().getTime());
    }, 1000);
  }, []);
  return (
    <>
      <h1>
        Hewitt Learning Chemistry games!{" "}
        {Math.round((currTime - startTime) / 1000)}
      </h1>
      <PeriodicTable />
    </>
  );
}

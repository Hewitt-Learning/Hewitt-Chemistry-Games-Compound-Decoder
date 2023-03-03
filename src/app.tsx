import { useState } from "preact/hooks";
import { PeriodicTable } from "./components/periodic-table";

export function App() {
  return (
    <>
      <h1>Hewitt Learning Chemistry games!</h1>
      <PeriodicTable />
    </>
  );
}

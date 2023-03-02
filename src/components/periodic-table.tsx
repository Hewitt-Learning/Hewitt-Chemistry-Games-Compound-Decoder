import { periodicTable } from "../periodic-table";
import { PeriodicTableElement } from "./periodic-table-element";
import "./periodic-table.css";

export const PeriodicTable = () => {
  return (
    <div class="periodic-table-wrapper">
      <div class="periodic-table">
        {periodicTable.map((row) => {
          //row is array of elements or null
          return row.map((element) => {
            if (element) {
              return <PeriodicTableElement element={element} />;
            } else {
              return <div />;
            }
          });
        })}
      </div>
    </div>
  );
};

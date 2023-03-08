import { useMemo, useState } from "preact/hooks";
import { periodicTable } from "../periodic-table";
import { PeriodicTableElement } from "./periodic-table-element";
import { placeWord, SpaceDef } from "../word-placement";
import "./periodic-table.css";

export const PeriodicTable = () => {
  const [word, setWord] = useState("Fill");
  const [error, setError] = useState<undefined | string>(undefined);
  //if the word changes, rerun the function, otherwise don't
  const placement = useMemo(() => {
    try {
      setError(undefined);
      return placeWord(word);
    } catch (error: any) {
      setError(String(error));
      return false;
    }
  }, [word]);

  return (
    //text box for testing purposes, tests if words fit and if so, places them on periodic table.
    <div class="periodic-table-wrapper">
      <input
        type="text"
        value={word}
        onInput={(event) => {
          setWord(event.currentTarget.value);
        }}
      />
      {!placement && (error ? <h1>{error}</h1> : <h1>Word does not fit</h1>)}
      <div class="periodic-table">
        {periodicTable.map((row, rowIndex) => {
          //row is array of elements or null
          return row.map((element, colIndex) => {
            if (element) {
              //set element in table based on element def in ./periodic-table-element
              //set the occupied status based on placeWord function from ../word-placement/index.ts
              return (
                <PeriodicTableElement
                  element={element}
                  occupied={
                    placement &&
                    placement[rowIndex]?.[colIndex] === SpaceDef.Occupied
                  }
                />
              );
            } else {
              return <div />;
            }
          });
        })}
      </div>
    </div>
  );
};

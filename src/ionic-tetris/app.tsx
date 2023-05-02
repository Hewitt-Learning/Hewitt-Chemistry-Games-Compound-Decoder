import { Bucket } from "./components/bucket";
import "./app.css";
import { useState } from "preact/hooks";

export interface Ion {
  symbol: string;
  charge: number;

}

export interface RowState {
  columns: (Ion | null)[];
}

export interface BucketGridState {
  rows: RowState[];
}

export interface GridState {
  buckets: BucketGridState[];
}

export function App() {
  const bucketColumns = [2, 2, 3, 3];
  // const [state, setState] = useState<GridState>({
  //   buckets: bucketColumns.map((numCols): BucketGridState => {
  //     return {
  //       rows: [{ columns: new Array<Element | null>(numCols).fill(null) }],
  //     };
  //   }),
  // });
  const [state, setState] = useState<GridState>({
    buckets: [
      {
        rows: [
          {
            columns: [
              { symbol: "Al", charge: 3 },
              { symbol: "P", charge: -3 },
            ],
          },
          {
            columns: [
              { symbol: "Al", charge: 3 },
              { symbol: "N", charge: -3 },
            ],
          },
        ],
      },
      {
        rows: [
          {
            columns: [
              { symbol: "Al", charge: 3 },
              { symbol: "P", charge: -3 },
            ],
          },
        ],
      },
      {
        rows: [
          {
            columns: [
              { symbol: "Li", charge: 1 },
              { symbol: "Li", charge: 1 },
              { symbol: "O", charge: -2 },
            ],
          },
        ],
      },
      {
        rows: [
          {
            columns: [
              { symbol: "Li", charge: 1 },
              { symbol: "Li", charge: 1 },
              { symbol: "O", charge: -2 },
            ],
          },
        ],
      },
    ],
  });

  return (
    <>
      <div
        class="ionic-tetris"
        style={{
          gridTemplateColumns: bucketColumns
            .map((numCols) => `${numCols}fr`)
            .join(" "),
        }}
      >
        {bucketColumns.map((numCols, i) => {
          return (
            <Bucket numCols={numCols} bucketGridState={state.buckets[i]} />
          );
        })}
      </div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button
        onClick={() => {
          setState((state) => {
            const newState = structuredClone(state);
            newState.buckets[0].rows[0].columns[0] = {
              symbol: "K",
              charge: 1,
            };
            return newState;
          });
        }}
      >
        Click me
      </button>
    </>
  );
}

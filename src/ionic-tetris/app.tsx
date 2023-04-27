import { Bucket } from "./components/bucket";
import "./app.css";
import { useState } from "preact/hooks";

export interface Ion {
  name: string;
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
              { name: "Al", charge: 3 },
              { name: "P", charge: -3 },
            ],
          },
          {
            columns: [
              { name: "Al", charge: 3 },
              { name: "N", charge: -3 },
            ],
          },
        ],
      },
      {
        rows: [
          {
            columns: [
              { name: "Al", charge: 3 },
              { name: "P", charge: -3 },
            ],
          },
        ],
      },
      {
        rows: [
          {
            columns: [
              { name: "Li", charge: 1 },
              { name: "Li", charge: 1 },
              { name: "O", charge: -2 },
            ],
          },
        ],
      },
      {
        rows: [
          {
            columns: [
              { name: "Li", charge: 1 },
              { name: "Li", charge: 1 },
              { name: "O", charge: -2 },
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
              name: "K",
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

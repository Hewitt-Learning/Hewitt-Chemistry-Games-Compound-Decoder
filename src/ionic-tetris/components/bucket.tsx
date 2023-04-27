import { BucketGridState } from "../app";
import { Ion } from "./ion";

interface Props {
  numCols: number;
  bucketGridState: BucketGridState;
}

export const Bucket = ({ numCols, bucketGridState }: Props) => {
  const columnIndices = new Array(numCols).fill(0);
  return (
    <div class="bucket">
      {columnIndices.map((_col, colIndex) => {
        return (
          <div class="column">
            {bucketGridState.rows.map((row) => {
              const ion = row.columns[colIndex];
              if (ion === null) {
                return <div>Empty</div>;
              } else {
                return <Ion ion={ion} />;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

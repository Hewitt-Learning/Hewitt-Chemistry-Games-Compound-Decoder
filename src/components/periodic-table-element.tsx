import {
  PeriodicTableElement as PeriodicTableElementType,
  ElementClassification,
} from "../periodic-table-data";
import "./periodic-table-element.css";
import clsx from "clsx";

interface Props {
  element: PeriodicTableElementType;
  occupied: boolean;
}

export const PeriodicTableElement = ({ element, occupied }: Props) => {
  return (
    <button
      class={clsx(
        "periodic-table-element",
        element.classification === ElementClassification.Metal &&
          "periodic-table-element-metal",
        element.classification === ElementClassification.Metalloid &&
          "periodic-table-element-metalloid",
        element.classification === ElementClassification.Nonmetal &&
          "periodic-table-element-nonmetal",
        occupied && "periodic-table-element-occupied",
      )}
    >
      <span class="periodic-table-element-atomic-number">
        {element.atomicNumber}
      </span>
      <span class="periodic-table-element-symbol">{element.symbol}</span>
      <span class="periodic-table-element-name">{element.name}</span>
      <span class="periodic-table-element-atomic-mass">
        {element.atomicMass}
      </span>
    </button>
  );
};

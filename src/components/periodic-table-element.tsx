import {
  PeriodicTableElement as PeriodicTableElementType,
  ElementClassification,
} from "../periodic-table-data";
import "./periodic-table-element.css";
import clsx from "clsx";
import { useState } from "preact/hooks";
import { ElementState } from "./periodic-table";

interface Props {
  /**
   * Gives information about the element, e.g. name, atomic number, symbol, atomic mass, & classification
   */
  element: PeriodicTableElementType;
  /**
   * Tells us whether the element makes up a letter of the word to guess
   */
  occupied: boolean;
  /**
   * Determines what to display based on occupied status:
   * Red to element:background animation is incorrect guess (element not occupied/doesn't create a letter)
   * Black background means the element does create a letter, and the guess was correct.
   */
  isFound: ElementState;
  /**
   * Property for checking if the element was clicked
   */
  onClick: () => void;
}

export const PeriodicTableElement = ({
  element,
  occupied,
  onClick,
  isFound,
}: Props) => {
  return (
    <button
      onClick={onClick}
      class={clsx(
        "periodic-table-element",
        element.classification === ElementClassification.Metal &&
          "periodic-table-element-metal",
        element.classification === ElementClassification.Metalloid &&
          "periodic-table-element-metalloid",
        element.classification === ElementClassification.Nonmetal &&
          "periodic-table-element-nonmetal",
        isFound === ElementState.FoundElement &&
          "periodic-table-element-good-click", //occupied and is found, show good click
        isFound === ElementState.WrongElementClicked &&
          "periodic-table-element-bad-click", //not occupied and not found, bad click
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

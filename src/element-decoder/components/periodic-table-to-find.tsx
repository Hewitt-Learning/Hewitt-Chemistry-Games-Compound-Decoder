import {
  PeriodicTableElement as PeriodicTableElementType,
  ElementClassification,
} from "../periodic-table-data";
import "./periodic-table-element.css";
import clsx from "clsx";
import { useState } from "preact/hooks";
import { ElementState } from "./periodic-table";
import { Level } from "./periodic-table";
import { addSpace } from "./periodic-table-space";

interface Props {
  /**
   * Gives information about the element, e.g. name, atomic number, symbol, atomic mass, & classification
   */
  activeElement: PeriodicTableElementType;

  /**
   * Property for the difficulty of the game
   */
  level: Level;
}

/**
 * Displays element to search for based on the difficulty of the game
 * @param element - The element that player needs to find from the periodic table
 * @param level - The difficulty of the game, There is Beginner, Intermediate and Advanced
 */
export const ElementToFind = ({ activeElement: element, level }: Props) => {
  return level === Level.Beginner ? (
    <button
      class={clsx(
        "periodic-table-element",
        "periodic-table-element-to-find",
        element.classification === ElementClassification.Metal &&
          "periodic-table-element-metal",
        element.classification === ElementClassification.Metalloid &&
          "periodic-table-element-metalloid",
        element.classification === ElementClassification.Nonmetal &&
          "periodic-table-element-nonmetal",
      )}
    >
      <span class="periodic-table-element-atomic-number">
        {element.atomicNumber}
      </span>
      <span class="periodic-table-element-symbol">
        {addSpace(element.symbol)}
      </span>
      <span class="periodic-table-element-name">{addSpace(element.name)}</span>
      <span class="periodic-table-element-atomic-mass">
        {element.atomicMass}
      </span>
    </button>
  ) : level === Level.Intermediate ? (
    <button
      class={clsx("periodic-table-element", "periodic-table-element-to-find")}
    >
      <span class="periodic-table-element-symbol">
        {addSpace(element.symbol)}
      </span>
      <span class="periodic-table-element-name">{addSpace(element.name)}</span>
    </button>
  ) : level === Level.Advanced ? (
    <button
      class={clsx(
        "periodic-table-element",
        "periodic-table-element-to-find",
        "periodic-table-element-advanced",
      )}
    >
      <span class="periodic-table-element-name">{addSpace(element.name)}</span>
    </button>
  /////  TO-DO: Compound Questions
  /**
  This is where we can implement the additional logic to handle displaying compounds for the next difficulty.

  What if we go through the list of elements, find what elements can make compounds and record the combinations.
  This will be passed to this component, and will be checked for display.

  These combinations need to have a way to compare the combination with the current element, since this should be in order
  it should display when the first element of the pair becomes the 'active-element' and continue displaying until the second item is selected.
  
  
  */
  /////
  ) : (
    <></>
  );
};

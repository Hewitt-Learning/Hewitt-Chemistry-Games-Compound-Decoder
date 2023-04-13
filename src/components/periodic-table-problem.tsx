import {
  PeriodicTableElement as PeriodicTableElementType,
  ElementClassification,
} from "../periodic-table-data";
import "./periodic-table-element.css";
import clsx from "clsx";
import { useState } from "preact/hooks";
import { ElementState } from "./periodic-table";
import { Level } from "./periodic-table";

interface Props {
  /**
   * Gives information about the element, e.g. name, atomic number, symbol, atomic mass, & classification
   */
  element: PeriodicTableElementType;

  /**
   * Property for the difficulty of the game
   */
  level: Level;
}
/** Adds narrow unicode spaces to element symbols and names to prevent players from using ctrl + F on the elements. */
function addSpace(word: string): string {
  return word
    .split("")
    .map((letter) => {
      return letter + "\u200a";
    })
    .join("");
}
export const FindElement = ({ element, level }: Props) => {
  return level === Level.Beginner ? (
    <button
      class={clsx(
        "periodic-table-element",
        "periodic-table-element-problem",
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
      class={clsx("periodic-table-element", "periodic-table-element-problem")}
    >
      <span class="periodic-table-element-symbol">
        {addSpace(element.symbol)}
      </span>
      <span class="periodic-table-element-name">{addSpace(element.name)}</span>
    </button>
  ) : level === Level.Advanced ? (
    <button
      class={clsx("periodic-table-element", "periodic-table-element-problem")}
    >
      <span class="periodic-table-element-name">{addSpace(element.name)}</span>
    </button>
  ) : (
    <></>
  );
};

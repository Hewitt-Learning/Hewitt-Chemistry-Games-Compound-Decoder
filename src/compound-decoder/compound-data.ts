/**
 * This file will define data structures and storage of the compounds
 * so they can be used in the compound decoder game
 */
import { PeriodicTableElement } from "../element-decoder/periodic-table-data";

/**
 * Enumerated type to describe the classification of the compound.
 * Currently only consists of Binary Ionic Compounds
 */

export enum CompoundClassification {
  /**
   * The first classification is Binary Ionic Compounds
   */
  BinaryIonicCompound,
}
/**
 *  Defining a Compound type to store necessary information, like Name
 *  Elements, Chemical Formula, and Compound Classfication
 */
export interface Compound {
  name: string; //Name of the Compound
  elements: string[]; //Array of the names of the compounds used,
                      //could use PeriodicTableElement instead, might reduce lookup
  formula: string;
  classification: CompoundClassification;
}

export const compoundQuestions: (Compound)[] = 
[
    {
        name: "aluminum nitride",
        elements: ["aluminum", "nitrogen"],
        formula: "Al N",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "aluminum phosphide",
        elements: ["aluminum", "phosphorus"],
        formula: "Al P",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name:"berylium oxide",
        elements: ["berylium", "oxygen"],
        formula: "Be O",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "magnesium oxide",
        elements: ["magnesium","oxygen"],
        formula: "Mg O",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "calcium oxide",
        elements: ["calcium","oxygen"],
        formula: "Ca O",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "strontium oxide",
        elements: ["strontium","oxygen"],
        formula: "Sr 0",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "barium oxide",
        elements: ["barium","oxygen"],
        formula: "Ba O",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "radium oxide",
        elements: ["radium","oxygen"],
        formula: "Ra O",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "berylium sulfide",
        elements: ["berylium","sulfur"],
        formula: "Be S",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "magnesium sulfide",
        elements: ["magnesium","sulfur"],
        formula: "Mg S",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "calcium sulfide",
        elements: ["calcium","sulfur"],
        formula: "Ca S",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "strontium sulfide",
        elements: ["strontium","sulfur"],
        formula: "Sr S",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "barium sulfide",
        elements: ["barium","sulfur"],
        formula: "Ba S",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "radium sulfide",
        elements: ["radium","sulfur"],
        formula: "Ra S",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "lithium fluoride",
        elements: ["lithium","fluorine"],
        formula: "Li F",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "sodium fluoride",
        elements: ["sodium","fluorine"],
        formula: "Na F",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "potassium fluoride",
        elements: ["potassium","fluorine"],
        formula: "K F",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "rubidium fluoride",
        elements: ["rubidium","fluorine"],
        formula: "Rb F",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "cesium fluoride",
        elements: ["cesium","fluorine"],
        formula: "Cs F",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "lithium chloride",
        elements: ["lithium","chlorine"],
        formula: "Li Cl",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "potassium chloride",
        elements: ["potassium","chlorine"],
        formula: "K Cl",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "rubidium chloride",
        elements: ["rubidium","chlorine"],
        formula: "Rb Cl",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "cesium chloride",
        elements: ["cesium","chlorine"],
        formula: "Cs Cl",
        classification: CompoundClassification.BinaryIonicCompound
    },
]

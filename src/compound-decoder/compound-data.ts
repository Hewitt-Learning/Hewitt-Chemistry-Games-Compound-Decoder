/**
 * This file will define data structures and storage of the compounds
 * so they can be used in the compound decoder game
 */



/**
 * This import is not currently being used, but could be used to handle comparisons
 * between the elements and their corresponding compounds.
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
  atomicNumbers: number[]; //used for identifing the compounds
  formula: string;
  classification: CompoundClassification;
}

export const compoundQuestions: (Compound)[] = 
[
    {
        name: "aluminum nitride",
        elements: ["aluminum", "nitrogen"],
        atomicNumbers: [13,7],
        formula: "Al N",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "aluminum phosphide",
        elements: ["aluminum", "phosphorus"],
        atomicNumbers: [13,15],
        formula: "Al P",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name:"berylium oxide",
        elements: ["berylium", "oxygen"],
        atomicNumbers: [4,8],
        formula: "Be O",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "magnesium oxide",
        elements: ["magnesium","oxygen"],
        atomicNumbers: [12,8],
        formula: "Mg O",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "calcium oxide",
        elements: ["calcium","oxygen"],
        atomicNumbers: [20,8],
        formula: "Ca O",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "strontium oxide",
        elements: ["strontium","oxygen"],
        atomicNumbers: [38,8],
        formula: "Sr 0",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "barium oxide",
        elements: ["barium","oxygen"],
        atomicNumbers: [56,8],
        formula: "Ba O",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "radium oxide",
        elements: ["radium","oxygen"],
        atomicNumbers: [88,8],
        formula: "Ra O",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "berylium sulfide",
        elements: ["berylium","sulfur"],
        atomicNumbers: [4,16],
        formula: "Be S",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "magnesium sulfide",
        elements: ["magnesium","sulfur"],
        atomicNumbers: [12,16],
        formula: "Mg S",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "calcium sulfide",
        elements: ["calcium","sulfur"],
        atomicNumbers: [20,16],
        formula: "Ca S",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "strontium sulfide",
        elements: ["strontium","sulfur"],
        atomicNumbers: [38,16],
        formula: "Sr S",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "barium sulfide",
        elements: ["barium","sulfur"],
        atomicNumbers: [56,16],
        formula: "Ba S",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "radium sulfide",
        elements: ["radium","sulfur"],
        atomicNumbers: [88,16],
        formula: "Ra S",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "lithium fluoride",
        elements: ["lithium","fluorine"],
        atomicNumbers: [3,9],
        formula: "Li F",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "sodium fluoride",
        elements: ["sodium","fluorine"],
        atomicNumbers: [11,9],
        formula: "Na F",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "potassium fluoride",
        elements: ["potassium","fluorine"],
        atomicNumbers: [19,9],
        formula: "K F",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "rubidium fluoride",
        elements: ["rubidium","fluorine"],
        atomicNumbers: [37,9],
        formula: "Rb F",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "cesium fluoride",
        elements: ["cesium","fluorine"],
        atomicNumbers: [55,9],
        formula: "Cs F",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "lithium chloride",
        elements: ["lithium","chlorine"],
        atomicNumbers: [3,17],
        formula: "Li Cl",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "potassium chloride",
        elements: ["potassium","chlorine"],
        atomicNumbers: [19,17],
        formula: "K Cl",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "rubidium chloride",
        elements: ["rubidium","chlorine"],
        atomicNumbers: [37,17],
        formula: "Rb Cl",
        classification: CompoundClassification.BinaryIonicCompound
    },
    {
        name: "cesium chloride",
        elements: ["cesium","chlorine"],
        atomicNumbers: [55,17],
        formula: "Cs Cl",
        classification: CompoundClassification.BinaryIonicCompound
    },
]
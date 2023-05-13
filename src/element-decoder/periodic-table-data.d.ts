/**
 * Enumerated type to easily describe the classification of elements.
 */
export declare enum ElementClassification {
    /**
     * The element classification is metal (generally on the left side of periodic table).
     */
    Metal = 0,
    /**
     * The element classification is a nonmetal (generally on the far right of the periodic table).
     */
    Nonmetal = 1,
    /**
     * The element classification is a metalloid (between metals and nonmetals, towards the right-hand side of the periodic table).
     */
    Metalloid = 2
}
/**
 * Defining our own PeriodicTableElement type, which consists of
 * an element's name, symbol, atomic number, atomic mass, and classification (metal, metalloid, nonmetal)
 */
export interface PeriodicTableElement {
    atomicNumber: number;
    name: string;
    symbol: string;
    atomicMass: number;
    classification: ElementClassification;
}
/**
 * Manually defined, in memory implementation of the periodic table as a 2D array.
 * Indices of the 2D array are either of type PeriodicTableElement or null. Null
 * indices indicate the gaps across the top rows of the periodic table.
 */
export declare const periodicTable: (PeriodicTableElement | null)[][];

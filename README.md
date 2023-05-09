# Hewitt Learning

[Trello board](https://trello.com/b/cKhbgr5G/soft-eng-project) (you will need access to view it)

When commits are pushed/merged to the main branch, it is automatically deployed to https://hewitt-chemistry-games.netlify.app/

## Installation/Setup

You should have installed:

- [Node.js](https://nodejs.org/en/) 16.0 or newer
- [Git](https://git-scm.com/)

Then, using the [npm package manager (which comes preinstalled with Node.js)](https://www.npmjs.com/package/npm), you will need to install the [pnpm package manager](https://pnpm.io/), which we are using for this project. You can install pnpm by running `npm install -g pnpm`

Then, you can install the dependencies for this project by running `pnpm install` in the project folder.

## Running the project

After everything is installed, you can run the development server using:

```
pnpm dev
```

You can run the production build (creates a static site in the `dist` folder) using:

```
pnpm build
```

You can run the tests using:

```
pnpm test
```

## Architecture

This project is a static site, where all of the interactive behavior is implemented client-side. The UI framework is [Preact](https://preactjs.com/tutorial/) (if you are familiar with [React](https://reactjs.org/), all applicable knowledge will carry over). We are using [TypeScript](https://www.typescriptlang.org/) for type safety.

All the source code lives in the `src` folder. Its folder structure is:

- `components`: Holds Preact components for the UI.
- `word-placement`: Holds logic related to the placement/fitting of words onto the periodic table grid. Also currently contains the list of valid words.
- `app.tsx`: The top-level rendered component.
- `game-state.ts`: Keeps track of all of the game state. Most of the game logic is in here. This file exports a `useGameState` [hook](https://preactjs.com/guide/v10/hooks) that allow it to be pulled into components (in our case, specifically the `PeriodicTable` component). The `useGameState` hook returns properties for all the externally-visible state values, as well as functions to modify the state.
- `main.tsx`: The entrypoint file, it renders the top-level component into the page.
- `periodic-table-data.ts`: Contains the raw data for the elements of the periodic table.
- `random-element-sequence-from-placement.ts`: Given a "placed" word, shuffles the "elements to find" into a random sequence of elements to be found.
- `score-calc.ts`: Given the current score and streak, and the amount of time it took to find the element, returns the new score and streak. The score is calculated as the sum of three parts: The base score for correctly finding an element, an increasing "streak bonus" for getting multiple elements in a row correctly without mistakes, and a "time bonus" for answering correctly quickly. The comments in that file more specifically describe the calculations for each of those bonuses.
- `index.css`: Contains global CSS styles, it is imported by the `main.tsx` component.
- `vite-env.d.ts`: Sets up globals for TypeScript.


Below is a graph of the high-level architecture of this project. We used rounded boxes with links to subgraphs to represent the different folders inside of `src`, unrounded boxes for specific files or components, and arrow cardinality to represent interaction between files and components (e.g. one-way arrows mean that the source of the arrow is not affected by the destination). Certain file names have been condensed for brevity, specifically within the `/src/components/` subfolder. This graph was made with the [Mermaid](https://mermaid.js.org/) diagramming and charting tool for GitHub/GitLab, and tested on Mermaid's [live testing website](https://mermaid.live/).

```mermaid
graph TD
    SubGraph1 <---> components
    Node3 <---> components
    subgraph "component-items"
    components(periodic-table)
    components <--> CompNode2[periodic-table-element]
    components <--> CompNode3[info-box]
    components <--> CompNode4[element-to-find]
    end

    SubGraph2 ---> word-placement
    subgraph "word-placement-items"
    word-placement(word-placement/)
    word-placement --> |Testing| WordNode1[index.test.ts]
    word-placement --> |Manually defined letters| WordNode2[letter-definitions]
    word-placement --> |Placement logic| WordNode3[index.ts]
    end

    subgraph "Main Graph"
    Node1[main.tsx] --> Node2[app.tsx]
    Node2 <--> SubGraph1(components/)
    Node6[periodic-table-data] --> |data used as base for game| SubGraph1 
    
    Node3[game-state.tsx]
    Node3 <--> Node4[score-calc.tsx]
    Node5[random-element-sequence] -->|once per word change| Node3
    SubGraph2(vite.config.ts) --> |word placement data| Node3
    end
```

The following graph shows how each of the different states in our game-state logic file interact with each other. The graph begins at the `start` box, and runs until `element-sequence` is empty.

```mermaid
graph TD
    %% define word & place on periodic table
    State0(Error)
    Start --> WordList
    WordList -- Choose random word --> State1(word) 
    State1 --> State2(placement) --> State3(element-states)
    State2 -- Could not place word --> State0
    State0 --> WordList

    %% word has been placed on table, begin game setup
    State2 --> State4(element-sequence)
    State4 --> State5(active-element)
    State5  ---> State10(start-time)
    State10  --> time-bonus

    %% Game has been setup, handle if a click is good or bad
    State4 --> State6(click)
    State6 -- incorrect match --> State6
    State6 -- bad match, reset streak --> State9
    State6 --> Click2(good-click)
    State5 --> State6
    Click2 --> State3
    Click2 --> time-bonus
    State3 -- display status to user --> State7(match-status)

    %% Determine scoring
    %% Score is added to if match attempt is good, and is broken into
    %% Base points per correct match, streak bonus, and time bonus
    State3 --> State8(score)
    Click2 --> State9(streak) 
    State9 --> State8 
    time-bonus --> State8

    Click2 -- Start next turn --> State4


```

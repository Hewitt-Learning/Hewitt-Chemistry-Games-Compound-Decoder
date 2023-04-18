# Components

This folder holds Preact components for the UI. Each component is defined in a `.tsx` file, and may have a corresponding `.css` file for its styles as well.

The components are:

- `periodic-table`: Displays the whole periodic table. Most of the game logic is loaded into this component via the `useGameState` hook, defined in `src/game-state.ts`.
- `periodic-table-element`: Displays a single element (used inside `periodic-table`), and does not contain much logic.

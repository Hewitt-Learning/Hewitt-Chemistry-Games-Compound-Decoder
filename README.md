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
- `main.tsx`: The entrypoint file, it renders the top-level component into the page.
- `periodic-table-data.ts`: Contains the raw data for the elements of the periodic table.
- `index.css`: Contains global CSS styles, it is imported by the `main.tsx` component.
- `vite-env.d.ts`: Sets up globals for TypeScript.

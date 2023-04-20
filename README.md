# Parsec exercise

This repository includes an full-stack application that allows a user to enter in an address, function, and arguments, and returns the respective values.

## Running locally

Make sure to create an env variable file (e.g., `.env`) inside the client directory with an Alchemy Key and Etherscan Key.

To begin running locally, first install dependencies

```bash
pnpm i
```

Next, start the development server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) within your browser to see the result.

## Directory breakdown

Everything vital appears in the src directory

- components: reusable components
- constants: constant variables
- features: non-reusable components and features
- pages: routes
- store: global store
- theme: application styling
- types: universal typings
- utils: utility functions

## Noteworthy dependencies

This application may contain some non-obvious dependencies:

- @chakra-ui/react: A component library for creating responsive and accessible web interfaces.
- @emotion/react & @emotion/styled: A CSS-in-JS styling library.
- @tanstack/react-query: A library for managing asynchronous data in React.
- ethers: A library for interacting with Ethereum blockchain.
- zustand: A library for managing globsl state.

## If I had more time

## Other notes

- Inside the `validateContract()`, I call Etherscan to check if there's any code at that address. While it isn't a guarantee (as the contract could've been deployed, the contract could've moved, could've called the self-destruct op-code, or has 0 bytes of code), it will give us a good look at a majority of what is expected to be entered.
- Because it's in experimental mode, I've decided not to use the `app` directory

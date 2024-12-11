# Cryptocurrency Tracker SPA (coinCap)

## Project Overview

This Single Page Application (SPA) allows users to track cryptocurrencies and create their own portfolio. It provides a user-friendly interface for viewing cryptocurrency information, managing portfolios, and visualizing market trends.

## API: Coincap - https://docs.coincap.io/

## Main Features

### Main Page

- **Cryptocurrency List**:

  - Displays a table of cryptocurrencies with essential information, including current prices and controls to add them to the portfolio (e.g., a "+" button).
  - **Pagination**: Implements pagination to navigate through the list of cryptocurrencies efficiently.

- **Detailed View**:

  - When a user clicks on a cryptocurrency in the table, a detailed page opens, showing:
    - Comprehensive information about the selected cryptocurrency.
    - An option to add it to the user's portfolio.
    - A historical price chart for visualizing price changes over time.

- **Portfolio Management**:
  - Users can add cryptocurrencies to their portfolio.
  - Clicking on portfolio information opens a modal window displaying the list of cryptocurrencies in the user's portfolio, with options to remove any of them.

### Header

- **Top Performers**:

  - Displays the prices of three popular cryptocurrencies side by side for quick reference.

- **Portfolio Value**:

  - Shows the total value of the user's portfolio, including:
    - The difference from the initial investment total.
    - Percentage change in the portfolio's value.

- **Persistence**:
  - The portfolio remains persistent through page reloads, ensuring that all user-selected cryptocurrencies are saved.

# Getting Started with coinCap

To get started with the coinCap project, follow these steps:

1. Clone the repository to your local machine:
   git clone https://github.com/spacepocket1985/coinCap.git

2. Navigate into the project directory:
   cd coinCap

3. Switch to the develop branch:
   git checkout develop

4. Install the required packages:
   npm install

## Then run Scripts

Run `npm run ...`:

- `dev`: to launch the development server;
- `build`: to compile the application in a "dist" folder;

## Technologies

- React
- Typescript
- React Router
- Redux, RTK query
- Mui/material
- Recharts

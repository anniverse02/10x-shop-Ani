# 10X Shop

A modern shopping experience built with React and TypeScript.

## About the Project

10X Shop is an e-commerce application created as part of my React and TypeScript learning journey. The goal was to build a functional online store with a clean design and a simple shopping experience.

Users can explore products, view product details, manage their shopping cart, and complete the checkout process.

## Features

**Shopping**
- Browse the product catalog
- View individual product details
- Add products to the cart
- Update quantities and remove items
- Calculate the total price
- Save cart data using localStorage

**User Access**
- Login and logout
- Protected checkout page

**Checkout**
- Fill in checkout form details
- Submit an order
- View order confirmation

**Other**
- Responsive design for different screen sizes
- Product data fetched from DummyJSON API

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Context API
- localStorage
- DummyJSON API

## Project Structure

- `public` – static files
- `src/assets` – images and other assets
- `src/components` – reusable UI components
- `src/components/layout` – Header and Footer components
- `src/context` – cart and authentication state management
- `src/pages` – application pages, including Home, Shop, Product Details, Cart, Login, and Checkout
- `src/services` – product API requests
- `src/types` – TypeScript types and interfaces
- `src/App.tsx` – main application component and routing
- `src/main.tsx` – application entry point
- `src/index.css` and `src/App.css` – global and application styles
## Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/anniverse02/10x-shop-Ani.git
cd 10x-shop
npm install
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build the application |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | Check TypeScript errors |
| `npm run lint` | Run ESLint |

## Data Source

Product data is provided by [DummyJSON](https://dummyjson.com/).

## Live Demo

Coming soon.

## Test Account

Username: `Annie`

Password: `pass1234`

## Author

Developed by Annie.
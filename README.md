# 10X Shop

## About

10X Shop is a single-page online store built as an individual graduation project for the 10X Front-end course. Shoppers can browse and search products, add them to a cart, place a simulated order, and follow its status. Product data comes from the public DummyJSON API; accounts, carts, and orders are stored in the browser.

**Live demo:** https://10-x-shop.vercel.app/

## Features

### CORE

- Catalog loaded from DummyJSON with typed product cards
- Product details with price, discount, and stock status
- Cart with add, quantity, remove, and totals
- Local login with a protected checkout that returns to the original page after login
- Checkout form with validation and an order confirmation
- Loading, error, and empty states, a 404 page, and an Error Boundary
- Responsive layout built with Tailwind CSS v4

### FULL

- Debounced search by product title, category filter, sorting, and pagination, all kept in the URL
- Product gallery, reviews, and related products
- Promo code `10X10` and free shipping from $100, using `useReducer` with typed actions
- Order history with simulated statuses and an order detail page
- Profile editing and clearing local data
- Dark mode with a saved preference
- Formik and Yup forms, and `@theme` design tokens
- Lazy-loaded routes for pages other than Home and Catalog
- Toast notifications for cart and review actions

## Tech Stack

React 19, TypeScript (strict), Vite, React Router, Tailwind CSS v4, Formik, Yup, lucide-react, DummyJSON API, Vercel.

## Architecture

```text
src/
  assets/       fonts and icons
  components/   auth, cart, catalog, checkout, home, layout, orders, product, profile, ui
  hooks/        useAuth, useCart, useCategories, useDebounce, useProduct, useProducts, useTheme
  pages/        one component per route
  utils/        price formatting
```

Pages combine reusable components and read shared state from `AuthProvider` and `CartProvider`. A user action calls a handler, which updates React state, and React renders the result. Product data is fetched in `useEffect` through `useProducts` and `useProduct`, which cancel outdated requests with `AbortController`. The cart, users, orders, and theme are saved to `localStorage`.

## How to Run

```bash
npm install
npm run dev
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |
| `npm run lint` | Run ESLint |

## Test Account

There is no shared test account. Accounts are stored only in your browser, so create one on the **Register** page and use it to log in.

Promo code: `10X10`

## Credits

<!-- TODO: list who helped you -->
Product data: [DummyJSON](https://dummyjson.com).

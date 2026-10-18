# 10X Shop — Project Plan

> Individual graduation project · 10X Front-end · 2026
> Author: Mariam Sepiashvili · Repo: `10x-shop` · Live: _TBD (added after first deploy)_
> Timeline: **17 Oct – 6 Nov 2026** · Code freeze: **6 Nov, 23:59 (GMT+4)**

---

## 1. Goal

Build **10X Shop**, a single-page online store with React + TypeScript + Tailwind CSS v4 and the DummyJSON products API.
A shopper can browse the catalog, open a product, add it to the cart, change quantities, log in (local simulation) and place an order (local simulation).

**Priority rule:** finish and deploy all **CORE** items first. **FULL** items are started only after CORE is done and deployed.

## 2. Tech Stack

| Area | Choice |
|---|---|
| Build | Vite (react-ts template) |
| UI | React 19 (function components, hooks) |
| Language | TypeScript, `strict: true`, no `any` |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Routing | React Router |
| Data | DummyJSON (`https://dummyjson.com/products`) via `fetch` |
| State | React Context (Auth, Cart) + `localStorage` (`shop_cart`) |
| Quality | ESLint (typescript-eslint, react-hooks), `tsc --noEmit` |
| Deploy | Vercel / Netlify with SPA rewrite |

## 3. Scope

### 3.1 CORE (required minimum)

| Module | CORE scope |
|---|---|
| **React** | Function components, props, `children`, callback props, `useState`/`useEffect`, `map` + stable `key`, conditional rendering, Router (`/`, `/login`, `/products/:id`, `/cart`, `/checkout`, `*`), AuthContext, CartContext, controlled Login and Checkout forms, immutable state updates |
| **TypeScript** | Strict config; typed `Product`, `ProductsResponse`, `CartItem`, `CartState`, `AuthUser`, `LoginFormValues`, `ShippingInfo`; typed props, state and API functions; `npm run typecheck` = 0 errors |
| **Tailwind CSS** | v4 integration; utility-first styling of Header, ProductCard, Catalog, Product, Cart, Checkout; Flex/Grid; mobile-first responsive grid (1 → 2 → 4 columns); `hover:` / `focus:` / `disabled:` states |
| **Optimization** | Responsive at 375px and desktop with no horizontal scroll; Loading / Error / Empty states; Error Boundary; `loading="lazy"` images with width/height; DEBUG-LOG.md with ≥ 3 real bugs |
| **Process** | This PLAN.md, meaningful Git history, working deploy, README.md (EN), REPORT.md |

### 3.2 FULL (only after CORE is complete)

- Catalog: search (debounced), category filter, sort, pagination, URL state, AbortController
- Tailwind: `@theme` design tokens, dark mode
- Optimization: lazy routes (`React.lazy` + `Suspense`), Lighthouse before/after
- Cart: promo code `10X10`, `useReducer` with typed actions
- TypeScript: `ApiClient` (generics), `ApiError`, type guards, utility types
- Orders / Profile pages (stretch goal, only if time remains)

### 3.3 Out of scope

Real authentication, real payments, card data, backend, wishlist, infinite scroll, price-range filter.

## 4. Work Breakdown Structure (WBS)

Estimates are in hours. **W1** = 17–23 Oct, **W2** = 24–30 Oct, **W3** = 31 Oct – 6 Nov.

### Epic 0 — Setup

| # | Task | Est. | Week | Level |
|---|---|---|---|---|
| 0.1 | Vite + React + TS project, strict tsconfig | 1 | W1 | CORE |
| 0.2 | Tailwind CSS v4 integration | 0.5 | W1 | CORE |
| 0.3 | ESLint (no-explicit-any, react-hooks), scripts: dev/build/preview/typecheck/lint | 1 | W1 | CORE |
| 0.4 | GitHub repo + first deploy + SPA rewrite | 1 | W1 | CORE |
| 0.5 | Domain types in `src/types/` | 1.5 | W1 | CORE |
| 0.6 | `utils/format.ts` (`formatPrice`, `discountedPrice`) | 0.5 | W1 | CORE |

### Epic 1 — Layout & Routing

| # | Task | Est. | Week | Level |
|---|---|---|---|---|
| 1.1 | `Layout` (Header + Outlet + Footer), `ScrollToTop` | 1.5 | W1 | CORE |
| 1.2 | `AppRoutes` with all CORE routes + `NotFoundPage` | 1 | W1 | CORE |
| 1.3 | Header nav with active `NavLink`, cart badge | 1 | W1 | CORE |

### Epic 2 — Auth

| # | Task | Est. | Week | Level |
|---|---|---|---|---|
| 2.1 | `AuthContext` (`login`, `logout`, `user`) | 1 | W1 | CORE |
| 2.2 | `LoginPage` controlled form + validation | 2 | W1 | CORE |
| 2.3 | `ProtectedRoute` for `/checkout` with return redirect | 1 | W1 | CORE |

### Epic 3 — Catalog

| # | Task | Est. | Week | Level |
|---|---|---|---|---|
| 3.1 | `products.api.ts` (`fetchProducts`, `fetchProductById`) | 1 | W1 | CORE |
| 3.2 | `CatalogPage` fetch with loading / error / empty | 2 | W1 | CORE |
| 3.3 | `ProductCard` + `ProductGrid` + responsive grid | 3 | W1 | CORE |
| 3.4 | Search, category, sort, pagination, URL state | 5 | W3 | FULL |

### Epic 4 — Product

| # | Task | Est. | Week | Level |
|---|---|---|---|---|
| 4.1 | `ProductPage` with `useParams`, invalid-ID and 404 handling | 2 | W2 | CORE |
| 4.2 | `ProductGallery`, `QuantityStepper`, `StockBadge` | 2.5 | W2 | CORE |
| 4.3 | Add to cart from Product page and ProductCard | 1 | W2 | CORE |

### Epic 5 — Cart

| # | Task | Est. | Week | Level |
|---|---|---|---|---|
| 5.1 | `CartContext` (add / remove / setQuantity / clear) + `shop_cart` persistence | 3 | W2 | CORE |
| 5.2 | `CartPage` with `CartItemRow`, `CartSummary`, empty state | 3 | W2 | CORE |
| 5.3 | Promo code `10X10`, `useReducer` refactor | 2 | W3 | FULL |

### Epic 6 — Checkout

| # | Task | Est. | Week | Level |
|---|---|---|---|---|
| 6.1 | Controlled form (Full name, Email, Address, City) + validation | 3 | W2 | CORE |
| 6.2 | Local order confirmation ("Thank you!") + clear cart | 1.5 | W2 | CORE |
| 6.3 | Redirect to `/cart` when cart is empty | 0.5 | W2 | CORE |

### Epic 7 — Orders & Profile (stretch)

| # | Task | Est. | Week | Level |
|---|---|---|---|---|
| 7.1 | Orders list/details from `shop_orders` | 4 | W3 | FULL |
| 7.2 | Profile page + theme toggle | 2 | W3 | FULL |

### Epic 8 — Quality

| # | Task | Est. | Week | Level |
|---|---|---|---|---|
| 8.1 | `ErrorBoundary` with fallback UI | 1 | W2 | CORE |
| 8.2 | Responsive pass at 375px / tablet / desktop, burger menu | 3 | W3 | CORE |
| 8.3 | Hover / focus / disabled states, a11y basics (labels, alt, semantic tags) | 1.5 | W3 | CORE |
| 8.4 | Manual end-to-end test of the happy path and edge cases | 2 | W3 | CORE |
| 8.5 | Typecheck, lint, production build at 0 errors | 1 | W3 | CORE |
| 8.6 | `@theme` tokens + dark mode | 2 | W3 | FULL |
| 8.7 | Lazy routes + Lighthouse before/after | 2 | W3 | FULL |

### Epic 9 — Docs

| # | Task | Est. | Week | Level |
|---|---|---|---|---|
| 9.1 | PLAN.md (this file) | 1 | W1 | CORE |
| 9.2 | DEBUG-LOG.md (≥ 3 entries, updated during work) | 2 | W1–W3 | CORE |
| 9.3 | README.md (EN) | 1.5 | W3 | CORE |
| 9.4 | REPORT.md (planned vs delivered, problems, AI usage) | 2 | W3 | CORE |

**Estimated total:** CORE ≈ 55 h · FULL ≈ 19 h

## 5. Milestones

| Date | Milestone |
|---|---|
| 18 Oct | Project set up, PLAN.md committed, first deploy live |
| 23 Oct | Routing, Login, Catalog with ProductCards working |
| 30 Oct | Product, Cart, Checkout working end to end on deploy |
| **2 Nov** | **All CORE done:** responsive, docs, 0 typecheck/lint/build errors |
| 3–4 Nov | FULL features |
| 5 Nov | Theory test, only bug fixes |
| 6 Nov | Final QA and submission (before 20:00) |

## 6. Risks

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| R1 | DummyJSON is slow or unavailable | Catalog/Product cannot load | Clear Error state with message; keep a small local JSON fallback for development |
| R2 | Falling behind schedule | CORE incomplete at deadline | CORE strictly first; FULL only after 2 Nov; daily small commits |
| R3 | Deploy breaks on direct URL refresh (`/products/5` → 404) | Fails a CORE check | SPA rewrite added on day 1; refresh tested after every deploy |
| R4 | Unable to explain AI-generated code at the defense | Lower grade | Read and rewrite every suggestion before committing; note decisions in DEBUG-LOG / REPORT |
| R5 | Strict TS errors pile up late | Build fails at the end | Run `npm run typecheck` before every commit |

## 7. Definition of Done (applies to every task)

A task is **done** only when:

1. The feature works in the browser and matches its acceptance criteria in the PRD (Annex A).
2. `npm run typecheck`, `npm run lint` and `npm run build` pass with 0 errors.
3. There is no `any` and no leftover `console.log`.
4. The UI works at 375px and desktop with no horizontal scroll.
5. Loading / error / empty states are handled where data is fetched.
6. Changes are committed with a meaningful message (`feat:`, `fix:`, `refactor:`, `docs:` …) and pushed.
7. I can explain the code and why it was written this way.

## 8. Workflow

- Small, focused commits each working day, using conventional prefixes (`feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`).
- Redeploy at least once a week so the live link always works.
- Every real bug I hit goes into DEBUG-LOG.md (symptom → repro → tool → root cause → fix commit → lesson).
- This plan is updated if the scope changes. Differences between planned and delivered work are explained in REPORT.md.

# Final Report

**Project:** 10X Shop
**Author:** Mariam Sepiashvili
**Live demo:** https://10-x-shop.vercel.app/
**Repository:** https://github.com/marisepiashvili/10X-shop

Status as of 2 November 2026. Update this report before submission.

## Planned vs Delivered

### CORE

| Requirement | Status | Notes |
|---|---|---|
| Vite, React 19, strict TypeScript, Router, Tailwind v4 | Done | `strict` comes from the TypeScript 6 default |
| No `any`, passing `typecheck` and `lint` | Done | |
| Layout, active links, scroll to top, 404 page | Done | |
| Checkout guard with return after login | Done | |
| Catalog, product details, cart, checkout, confirmation | Done | |
| Loading, error, and empty states | Done | |
| Error Boundary | Done | |
| Deployment with SPA rewrite | Done | Vercel |
| PLAN, README, and Git history | Done | |
| DEBUG-LOG | Done | 5 entries |
| Login with username and 6-character password rule | Changed | Uses email and local registration instead of a username; passwords need at least 6 characters |
| 375px layout | Done | No horizontal scrolling; tap targets are at least 44px, and product cards are clickable as a whole |
| Compatibility matrix | Partial | Chromium checked; Firefox still needs testing |
| Lighthouse report | Done | Before and after results recorded |

### FULL

| Requirement | Status | Notes |
|---|---|---|
| Debounced search, category filter, AbortController | Done | |
| Product gallery, related products | Done | |
| Promo code and typed cart reducer | Done | |
| Dark mode and `@theme` tokens | Done | |
| Sorting | Done | The five options from the PRD, including `Name A→Z` |
| Pagination | Done | Includes `Showing X–Y of Z` |
| Reviews | Done | Saved in `shop_reviews`; average rating and count update; field error messages not shown |
| Orders | Done | Statuses refresh every 30 seconds without a reload; Reorder adds the items back to the cart |
| Profile | Done | First and last name fields and a theme switch that shares state with the header |
| Formik and Yup | Partial | Uses `<Formik>` instead of `useFormik` |
| URL state | Done | `q`, `category`, `sort` and `page` live in the URL; refresh, Back/Forward and shared links keep them |
| Toast | Done | Add to cart, stock limit, remove from cart, and review added |
| Skeleton, Retry | Done | Skeletons on Home, Catalog, and Product; Retry on load errors |
| `ApiClient`, `ApiError`, type guards | Done | Generic `get<T>`, 404 detected by status code, stored data validated before use |
| `Cart`, `Order`, `StorageService<T>` classes | Not done | The reducer and storage functions already cover this logic |
| Lazy routes | Done | Home and Catalog load up front; other pages load on demand |
| Lighthouse targets | Done | All medians met on the live site |
| Issues, Projects, PRs, progress notes, demo video | Not done | No merge commits in the local history |

### Intentional Deviations

- **Home on `/`, Catalog on `/catalog`:** Home is the entry page instead of the Catalog.
- **Login required to submit a review:** The review form is visible to everyone, and a guest is sent to Login on submit. The written review is restored afterward.

## Metrics

| Metric | Value |
|---|---|
| Commits | 43 |
| Days with commits | 10 |
| Merged PRs | <!-- TODO --> |
| Closed Issues | <!-- TODO --> |
| Main JavaScript bundle | 259 kB (about 82 kB gzip), was 450 kB (141 kB gzip) |
| CSS bundle | 49 kB (about 10 kB gzip) |

### Lighthouse

Run on the live site on 2 November 2026 with the Mobile preset. Each page was tested 3 times; the table shows the median. Reports are in `docs/lighthouse/`.

**Before**

| Page | Performance | Accessibility | Best Practices | CLS |
|---|---|---|---|---|
| Home `/` | 93 | 95 | 100 | 0 |
| Catalog `/catalog` | 93 | 94 | 100 | 0 |
| Product `/products/1` | 84 | 97 | 100 | 0 |

Performance varied between runs (Home 77–96, Catalog 89–98, Product 79–86). CLS reached 0.229 on Home and 0.145 on Product in one run each, above the 0.1 target.

**After**

Run on the live site on 2 November 2026 with the Mobile preset, 3 runs per page. The table shows the median. Reports are in `docs/lighthouse/`.

| Page | Performance | Accessibility | Best Practices | CLS |
|---|---|---|---|---|
| Home `/` | 98 | 95 | 100 | 0 |
| Catalog `/catalog` | 95 | 96 | 100 | 0 |
| Product `/products/1` | 89 | 97 | 100 | 0 |

Accessibility stays below 100 because white text on the brand orange `#FF7A1A` has 2.6:1 contrast. This is a deliberate design choice.

**What changed**

- Added lazy loading for pages other than Home and Catalog.
- Gave the main product image a high fetch priority and fixed dimensions.
- Reserved space for the Home product cards and kept the footer below the fold while content loads.
- Added a hidden `h2` to the Catalog to fix the heading order.

### Hours by Epic

<!-- TODO: add your real hours for Auth, Catalog, Product, Cart, Checkout, Orders, Profile, Quality, and Docs -->

## Three Hardest Problems

1. **Keeping the return path through login and registration.** Router state lasts for one navigation, so the registration path lost the checkout destination. Both auth pages now forward `from`.
2. **Direct links on the deployed site.** Routes worked from the menu but returned 404 when opened directly. A rewrite to `index.html` in `vercel.json` fixed this.
3. **Adding dark mode to existing colors.** One color often had several jobs: `white` was both a card background and a label color. Separating those roles allowed dark mode to change without affecting light mode.

## What I Would Do Differently

<!-- TODO: write this in your own words -->

## AI Usage Summary

<!-- TODO: review and complete this section in your own words -->

- **Used for:** step-by-step guidance on features and fixes, dark mode and review-flow changes I asked it to make directly, browser testing, and first drafts of the project documents.
- **Rejected:** a separate login card in place of the review form, and several dark mode color proposals.
- **Why:** <!-- TODO -->

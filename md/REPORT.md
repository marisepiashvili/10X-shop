# Final Report

**Project:** 10X Shop
**Author:** Mariam Sepiashvili
**Live demo:** https://10-x-shop.vercel.app/
**Repository:** https://github.com/marisepiashvili/10X-shop

Status as of 4 November 2026. Update this report before submission.

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
| DEBUG-LOG | Done | 6 entries |
| Login with username and 6-character password rule | Changed | Username and password with the PRD messages (`Username is required`, `Password is required`, 6-character minimum); accounts come from a local registration instead of accepting any values |
| 375px layout | Done | Burger menu below 768px; no horizontal scrolling; tap targets are at least 44px, and product cards are clickable as a whole. On phones the catalog filters fold behind a Filters button and the grid has 2 columns (see Intentional Deviations) |
| Compatibility matrix | Done | Chromium, Firefox and Safari checked; Firefox and Safari screenshots in `docs/compat/` |
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
| Reviews | Done | Saved in `shop_reviews`; average rating and count update; `Please select a rating` and `Comment must be at least 10 characters` shown on submit |
| Orders | Done | Statuses refresh every 30 seconds without a reload; Reorder adds the items back to the cart |
| Profile | Done | First and last name fields; the header link shows the first name, so a change is visible there; theme switch shares state with the header |
| Formik and Yup | Done | Login uses `useFormik` with `FormikProvider`; Register, password reset, Checkout and Profile use `<Formik>` |
| Sign up and password reset | Done | Register page; local password reset at `/forgot-password` checks username and email |
| Page titles, login redirect | Done (extra) | Every page sets its own `<title>` (React 19), e.g. `Catalog · 10X Shop` or the product name; a logged-in user opening `/login` or `/register` is sent on |
| URL state | Done | `q`, `category`, `sort` and `page` live in the URL; refresh, Back/Forward and shared links keep them |
| Toast | Done | Add to cart, stock limit, remove from cart, and review added |
| Skeleton, Retry | Done | Skeletons on Home, Catalog, and Product; Retry on load errors |
| `ApiClient`, `ApiError`, type guards | Done | Generic `get<T>`, 404 detected by status code, stored data validated before use |
| `AsyncState<T>`, `SortOption` unions | Done | `useProducts` and `useProduct` return `AsyncState<T>`; pages switch on `status`; `?sort=` is checked with `isSortOption` |
| `formatDate()` | Done | One date formatter in `utils/date.ts` instead of seven `toLocaleDateString` calls |
| `Cart`, `Order`, `StorageService<T>` classes | Done | `src/models/`. `Cart implements ICart` does every total and is used by `CartProvider`, the receipts and checkout; `Order.create()` snapshots the cart, `getStatus()` drives the status pill and timeline, `toJSON()` feeds storage; `StorageService<T>` is the only way the app reads or writes storage (except the theme string, which `index.html` reads before React) |
| Lazy routes | Done | Home and Catalog load up front; other pages load on demand |
| Lighthouse targets | Done | All medians met on the live site |
| Progress notes | Done | `docs/progress/week-1.md` to `week-3.md`, reconstructed from the Git history |
| Issues, Projects, PRs, demo video | Not done | No merge commits in the local history |

### Intentional Deviations

- **Home on `/`, Catalog on `/catalog`:** Home is the entry page instead of the Catalog.
- **Login against local accounts:** The PRD describes a username login that accepts any non-empty values and stores no credentials. The app logs in with a username and password, but checks them against accounts created on the Register page and kept in `shop_users` in this browser.
- **2-column product grid on phones:** The PRD asks for 1 column below 480px. Cards were shrunk so 2 fit at 375px (about 165px each), which shows twice as many products per screen; there is still no horizontal scrolling and buttons stay 44px tall.
- **Details tab instead of Description:** The PRD puts the description both in the info block and in a Description tab. The text stays under the price; the tab is named Details and shows brand, category, SKU, stock, warranty, shipping and return policy instead of repeating it.
- **Login required to submit a review:** The review form is visible to everyone, and a guest is sent to Login on submit. The written review is restored afterward.

## Metrics

| Metric | Value |
|---|---|
| Commits | 52 (before the 4 November PRD-fix commit) |
| Days with commits | 12 |
| Merged PRs | <!-- TODO --> |
| Closed Issues | <!-- TODO --> |
| Main JavaScript bundle | 271 kB (about 85 kB gzip), was 450 kB (141 kB gzip) |
| CSS bundle | 52 kB (about 10 kB gzip) |

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

**After the mobile layout changes**

Run on the live site on 4 November 2026 with Lighthouse 13.6 and the Mobile preset, 3 runs per page. The table shows the median. Reports are `docs/lighthouse/mobile-layout-*.html`.

| Page | Performance | Accessibility | Best Practices | CLS |
|---|---|---|---|---|
| Home `/` | 96 | 96 | 100 | 0 |
| Catalog `/catalog` | 98 | 96 | 100 | 0 |
| Product `/products/1` | 88 | 96 | 100 | 0 |

The 2-column grid and smaller layout did not slow the pages down; Catalog went from 95 to 98. The only accessibility finding is colour contrast of white text on the orange brand colour (logo, coupon, discount badge, Add to cart), which was already there before. A first run with Lighthouse 12.8 gave 83–88 for Performance; it is not used here because the earlier results came from version 13.6.

Accessibility stays below 100 because white text on the brand orange `#FF7A1A` has 2.6:1 contrast. This is a deliberate design choice.

**What changed**

- Added lazy loading for pages other than Home and Catalog.
- Gave the main product image a high fetch priority and fixed dimensions.
- Reserved space for the Home product cards and kept the footer below the fold while content loads.
- Added a hidden `h2` to the Catalog to fix the heading order.

### Hours by Epic

Planned hours come from `PLAN.md`. The actual hours are an estimate from the Git history, because time was not tracked while working. Commits less than 3 hours apart count as one work session; each session gets 1 hour before its first commit plus the time between its commits. Each commit's time is split between epics by the files it changed.

| Epic | Planned (h) | Estimated from Git (h) |
|---|---|---|
| Setup | 5.5 | 1.5 |
| Layout & Routing | 3.5 | 9 |
| Auth | 4 | 3.5 |
| Catalog | 11 | 8.5 |
| Product | 5.5 | 3 |
| Cart | 8 | 3.5 |
| Checkout | 5 | 1 |
| Orders & Profile | 6 | 3.5 |
| Quality | 12.5 | 3 |
| Docs | 6.5 | 1.5 |
| Shared utilities | – | 1 |
| **Total** | **67.5** | **≈ 39** |

The estimate is a lower bound: 16 sessions over 13 days. Work that leaves few commits is undercounted, such as reading documentation, debugging, Lighthouse runs, browser testing, screenshots and writing these documents, so Quality and Docs took longer than shown. Layout & Routing is high because the redesign on 25 October changed the layout and shared styles of every page.

## Three Hardest Problems

1. **Keeping the return path through login and registration.** Router state lasts for one navigation, so the registration path lost the checkout destination. Both auth pages now forward `from`.
2. **Direct links on the deployed site.** Routes worked from the menu but returned 404 when opened directly. A rewrite to `index.html` in `vercel.json` fixed this.
3. **Adding dark mode to existing colors.** One color often had several jobs: `white` was both a card background and a label color. Separating those roles allowed dark mode to change without affecting light mode.

## What I Would Do Differently

<!-- Draft written from the project history; reread it and change anything that does not match your experience -->

- **Use Issues and pull requests from the first day.** I committed straight to `main`, so the Issues, PRs and progress notes had to be reconstructed from the Git history at the end. Opening an Issue and a branch for each task would have kept the plan and the history connected.
- **Write the progress note at the end of each week.** The notes for weeks 1 and 2 were written afterwards from commit messages, and the hours and blockers were hard to remember.
- **Check each page at 375px as soon as it is built.** I tested mobile late, so on 4 November I had to shrink headings, cards, tables and inputs on almost every page at once. A quick check after each page would have caught this earlier.
- **Plan color roles before adding dark mode.** Colors such as `white` had several jobs, and splitting them later took longer than naming the roles at the start.
- **Compare each page with the PRD before calling it done.** A later review found gaps such as a missing type guard and an `as` cast where the PRD asks for a guard. A short checklist per page would have found them earlier.

## AI Usage Summary

<!-- TODO: review and complete this section in your own words -->

- **Used for:** step-by-step guidance on features and fixes, dark mode and review-flow changes I asked it to make directly, browser testing, and first drafts of the project documents.
- **Rejected:** a separate login card in place of the review form, and several dark mode color proposals.
- **Why:** <!-- TODO -->

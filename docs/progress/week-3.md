# Week 3 — 31 October – 6 November 2026

> Written on 4 November 2026 from the Git history and DEBUG-LOG.md, updated on 5 November.

## Done

- **2 Nov:** dark mode with a saved preference; Error Boundary around routed pages; SPA rewrite for Vercel; lazy-loaded routes and Lighthouse fixes; reset filters button; search limited to product titles; login required for orders and reviews; checkout prefilled from the logged-in user; return path kept through registration.
- **3 Nov:** filters, sort and page kept in the URL; toast notifications; reviews saved with a live average rating; skeletons, paging info and live order status; `ApiClient`, `ApiError` and storage type guards.
- **4 Nov:** mobile burger menu and confirm dialog; PRD detail fixes; username login, password reset page, `useFormik`, `AsyncState<T>`, `SortOption`, `formatDate`, review form errors; Orders and Profile links only for logged-in users; compact mobile layout with a 2-column product grid; Details tab with product specs; `Cart`, `Order` and `StorageService<T>` classes; page titles; new Lighthouse run.
- **5 Nov:** Firefox and Safari checked on desktop and mobile, with screenshots in `docs/compat/`.

## Compared with the plan

- On track: all CORE items done by 2 Nov; the Firefox check followed on 5 Nov, together with Safari.
- Not done yet: GitHub Issues/Projects and PRs, demo video.

## Next

- Final README and REPORT, submission on 6 Nov.

## Blockers

- Direct links returned 404 on Vercel until the SPA rewrite was added (DEBUG-LOG #2).
- The DummyJSON search also matches descriptions, so search results had to be filtered by title on the client (DEBUG-LOG #4).
- Router state was lost through the registration flow, so checkout did not resume after sign-up (DEBUG-LOG #1).

## Hours

About 17 hours: 2 Nov ≈ 6 h, 3 Nov ≈ 3.5 h, 4 Nov ≈ 6 h, 5 Nov ≈ 1 h.

Hours are estimated from commit times (see Hours by Epic in REPORT.md); they are a lower bound. The Firefox and Safari screenshots on 5 Nov took longer than the single commit shows.

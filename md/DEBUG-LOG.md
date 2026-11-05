# Debug Log

Real bugs found while building 10X Shop. Fix links point to the commits in the project repository.

## 1. Login forgot the checkout page after registration

- **Symptom:** A new user was sent from Checkout to Login, registered, logged in, and landed on the home page instead of Checkout.
- **Reproduction:** Log out, add a product, click `Proceed to checkout`, click `Register`, create an account, and log in.
- **Tool:** A Playwright browser script that printed the URL after each login path. Direct login reached `/checkout`; login through registration reached `/`.
- **Cause:** `location.state` belongs to a single navigation. The `Register` link and the redirect back to Login did not pass `from` along, so `LoginPage` fell back to `/`.
- **Fix:** [969ad57](https://github.com/marisepiashvili/10X-shop/commit/969ad57) passes `from` through both auth pages.
- **What I learned:** Router state does not persist by itself. Every step of a multi-page flow has to forward it.

## 2. Direct links returned 404 on Vercel

- **Symptom:** `/catalog` and `/products/5` worked from the menu, but refreshing them or opening them directly showed Vercel's 404 page.
- **Reproduction:** Open `https://10-x-shop.vercel.app/products/5` in a new tab, using a deployment without the fix.
- **Tool:** `curl` showed HTTP 404 for those paths and HTTP 200 for `/`.
- **Cause:** The app has a single `index.html` and React Router handles paths in the browser. On a direct request, Vercel looked for a matching file on the server and did not find one.
- **Fix:** [b32b509](https://github.com/marisepiashvili/10X-shop/commit/b32b509) adds a rewrite to `index.html` in `vercel.json`.
- **What I learned:** Client-side routing also needs server configuration, and it has to be tested on the deployed site.

## 3. Error screen stayed after leaving a crashed page

- **Symptom:** After a page crashed, clicking `Catalog` changed the URL, but `Something went wrong.` stayed on screen.
- **Reproduction:** Temporarily throw an error while rendering a page, open that page, and click a menu link.
- **Tool:** A Playwright script that read the URL and the content of `main` after navigating.
- **Cause:** `ErrorBoundary` lives in `Layout`, so it is not recreated between routes and kept `hasError: true`.
- **Fix:** [48ed8bd](https://github.com/marisepiashvili/10X-shop/commit/48ed8bd) adds `key={pathname}`, so React creates a new boundary on each route. This bug was caught before the feature was committed, so the fix is part of the same commit.
- **What I learned:** Changing a component's `key` is a simple way to reset its state.

## 4. Search returned products without the word in the title

- **Symptom:** Searching `fresh` returned 12 products, and none had `fresh` in the title. Searching `phone` returned 23 products, but only 8 titles matched.
- **Reproduction:** Search `fresh` in the catalog using a build without the fix.
- **Tool:** `curl` and a small script that compared the DummyJSON `/products/search` results with their titles.
- **Cause:** The API's `q` parameter also searches other fields such as descriptions, and it has no title-only option.
- **Fix:** [10f3691](https://github.com/marisepiashvili/10X-shop/commit/10f3691) requests all results, filters them by title, and paginates on the client.
- **What I learned:** Test what an API really returns instead of assuming what a parameter does.

## 5. Disabled `Apply` button disappeared in dark mode

- **Symptom:** In dark mode, the disabled promo button blended into the promo block, so only its label was visible.
- **Reproduction:** In dark mode, add a product and open the cart without entering a promo code. This needs the commit before the fix.
- **Tool:** Page screenshots, plus computed styles read from the browser.
- **Cause:** Yellow became cream in dark mode, so the disabled button's background nearly matched the block behind it.
- **Fix:** [32fa84e](https://github.com/marisepiashvili/10X-shop/commit/32fa84e) gives disabled buttons on bright surfaces a darker background.
- **What I learned:** Check every state of a component after changing a shared color, including disabled ones.

## 6. An unknown `?sort=` value switched on `Reset filters`

- **Symptom:** Opening `/catalog?sort=abc` showed `Default` in the `Sort by` select, but the `Reset filters` button was active although no filter was visible.
- **Reproduction:** Open `/catalog?sort=abc` on a build before the fix.
- **Tool:** The TypeScript compiler. After `ProductQuery.sort` was narrowed from `string` to the `SortOption` union, `npm run typecheck` reported `src/pages/CatalogPage.tsx(32,91): error TS2322: Type 'string' is not assignable to type 'SortOption'.` The error pointed straight at the line where the raw URL value entered the app. A Playwright script then confirmed the symptom on the old build (select value `default`, `Reset filters` enabled).
- **Cause:** `CatalogPage` passed `searchParams.get("sort")` on as a plain string. The select could not show `abc`, so it displayed its first option, while the toolbar compared `"abc" !== "default"` and decided a filter was active.
- **Fix:** [29c8758](https://github.com/marisepiashvili/10X-shop/commit/29c8758) adds the `isSortOption` type guard; unknown values fall back to `default`, and `sortParams` is now a `Record<SortOption, …>` so every option must have an entry.
- **What I learned:** The URL is user input. A literal union type alone does not protect it; it forces a check at the boundary, and the type guard is that check.

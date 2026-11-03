# Compatibility

Results use these marks: ✓ works, ⚠️ works with a known issue, ⬜ not tested yet.

Chromium results come from automated Playwright checks on 2 November 2026. Those checks measured horizontal scrolling and touch-target size at 375px, not a full visual review.

## Browser Matrix

| Page | Chromium desktop (1280px) | Chromium mobile (375px) | Firefox desktop | Firefox mobile |
|---|---|---|---|---|
| Home `/` | ✓ | ✓ | ⬜ | ⬜ |
| Catalog `/catalog` | ✓ | ✓ | ⬜ | ⬜ |
| Product `/products/1` | ✓ | ✓ | ⬜ | ⬜ |
| Cart `/cart` | ✓ | ✓ | ⬜ | ⬜ |
| Checkout `/checkout` | ✓ | ✓ | ⬜ | ⬜ |
| Orders `/orders` | ✓ | ✓ | ⬜ | ⬜ |
| Order detail `/orders/:id` | ✓ | ✓ | ⬜ | ⬜ |
| Profile `/profile` | ✓ | ✓ | ⬜ | ⬜ |
| Login `/login` | ✓ | ⬜ | ⬜ | ⬜ |
| Register `/register` | ✓ | ⬜ | ⬜ | ⬜ |
| 404 | ✓ | ⬜ | ⬜ | ⬜ |

## Known Issues

| Issue | Where | Status |
|---|---|---|
| Some interactive elements were smaller than 44px | Home, Catalog, Product, Cart, Login, and Register at 375px | Fixed on 3 November 2026 |

## Screenshots

<!-- TODO: add screenshots to docs/compat/ and link them here -->

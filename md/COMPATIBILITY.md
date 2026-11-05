# Compatibility

Results use these marks: ✓ works, ⚠️ works with a known issue, ⬜ not tested yet.

Chromium results come from automated Playwright checks on 2 November 2026. Those checks measured horizontal scrolling and touch-target size at 375px, not a full visual review.

Firefox and Safari results come from manual checks on the live site on 5 November 2026:

- **Firefox 159:** desktop at 1152px; mobile at 375px in Responsive Design Mode.
- **Safari 18.6:** desktop at 1264–1440px; mobile at 393px (iPhone) in Responsive Design Mode.

In both browsers every page loaded and worked, with no horizontal scrolling and no overlapping elements. Home was also checked in dark mode.

## Browser Matrix

| Page | Chromium desktop (1280px) | Chromium mobile (375px) | Firefox desktop (1152px) | Firefox mobile (375px) | Safari desktop (1264–1440px) | Safari mobile (393px) |
|---|---|---|---|---|---|---|
| Home `/` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Catalog `/catalog` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Product `/products/1` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cart `/cart` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Checkout `/checkout` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Order placed `/confirmation/:orderId` | ⬜ | ⬜ | ✓ | ✓ | ✓ | ✓ |
| Orders `/orders` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Order detail `/orders/:id` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Profile `/profile` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Login `/login` | ✓ | ⬜ | ✓ | ✓ | ✓ | ✓ |
| Register `/register` | ✓ | ⬜ | ✓ | ✓ | ✓ | ✓ |
| 404 | ✓ | ⬜ | ✓ | ✓ | ✓ | ✓ |

## Known Issues

| Issue | Where | Status |
|---|---|---|
| Some interactive elements were smaller than 44px | Home, Catalog, Product, Cart, Login, and Register at 375px | Fixed on 3 November 2026 |

## Screenshots

Full-page screenshots, stored in `docs/compat/`.

| Page | Firefox desktop | Firefox mobile | Safari desktop | Safari mobile |
|---|---|---|---|---|
| Home | [light](../docs/compat/firefox-desktop-home.png) · [dark](../docs/compat/firefox-desktop-home-dark.png) | [light](../docs/compat/firefox-mobile-home.png) · [dark](../docs/compat/firefox-mobile-home-dark.png) | [light](../docs/compat/safari-desktop-home.png) · [dark](../docs/compat/safari-desktop-home-dark.png) | [light](../docs/compat/safari-mobile-home.png) · [dark](../docs/compat/safari-mobile-home-dark.png) |
| Catalog | [view](../docs/compat/firefox-desktop-catalog.png) | [view](../docs/compat/firefox-mobile-catalog.png) | [view](../docs/compat/safari-desktop-catalog.png) | [view](../docs/compat/safari-mobile-catalog.png) |
| Product | [view](../docs/compat/firefox-desktop-product-details.png) | [view](../docs/compat/firefox-mobile-product-details.png) | [view](../docs/compat/safari-desktop-product-details.png) | [view](../docs/compat/safari-mobile-product-details.png) |
| Cart | [view](../docs/compat/firefox-desktop-cart.png) | [view](../docs/compat/firefox-mobile-cart.png) | [view](../docs/compat/safari-desktop-cart.png) | [view](../docs/compat/safari-mobile-cart.png) |
| Checkout | [view](../docs/compat/firefox-desktop-checkout.png) | [view](../docs/compat/firefox-mobile-checkout.png) | [view](../docs/compat/safari-desktop-checkout.png) | [view](../docs/compat/safari-mobile-checkout.png) |
| Order placed | [view](../docs/compat/firefox-desktop-thankyoupage.png) | [view](../docs/compat/firefox-mobile-thankyoupage.png) | [view](../docs/compat/safari-desktop-thankyoupage.png) | [view](../docs/compat/safari-mobile-thankyoupage.png) |
| Orders | [view](../docs/compat/firefox-desktop-orders.png) | [view](../docs/compat/firefox-mobile-orders.png) | [view](../docs/compat/safari-desktop-orders.png) | [view](../docs/compat/safari-mobile-orders.png) |
| Order detail | [view](../docs/compat/firefox-desktop-order-details.png) | [view](../docs/compat/firefox-mobile-order-details.png) | [view](../docs/compat/safari-desktop-order-details.png) | [view](../docs/compat/safari-mobile-order-details.png) |
| Profile | [view](../docs/compat/firefox-desktop-profile.png) | [view](../docs/compat/firefox-mobile-profile.png) | [view](../docs/compat/safari-desktop-profile.png) | [view](../docs/compat/safari-mobile-profile.png) |
| Login | [view](../docs/compat/firefox-desktop-login.png) | [view](../docs/compat/firefox-mobile-login.png) | [view](../docs/compat/safari-desktop-login.png) | [view](../docs/compat/safari-mobile-login.png) |
| Register | [view](../docs/compat/firefox-desktop-register.png) | [view](../docs/compat/firefox-mobile-register.png) | [view](../docs/compat/safari-desktop-register.png) | [view](../docs/compat/safari-mobile-register.png) |
| 404 | [view](../docs/compat/firefox-desktop-pagenotfound.png) | [view](../docs/compat/firefox-mobile-pagenotfound.png) | [view](../docs/compat/safari-desktop-pagenotfound.png) | [view](../docs/compat/safari-mobile-pagenotfound.png) |

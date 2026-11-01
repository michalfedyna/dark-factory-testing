# Bike Shopping Demo

Interactive Expo prototype for iOS and Android, using the supplied Figma presentation scaffold and bundled product images. No backend, persistence, authentication, payment SDK or real ordering.

## Run

```sh
npm ci
npm start
# With a compatible Expo runtime, or build locally:
npm run ios
npm run android
```

Native iOS and Android source is generated and included intentionally. Pods, Gradle outputs, local paths and dependency directories are ignored; no prebuild is needed during QA. Expo 58's dependency-compatible pinned versions from the UI handoff are retained. See [design handoff](docs/design/HANDOFF.md) for provenance and dependency references.

For standalone iOS simulator QA without Metro:

```sh
npm run qa:ios -- --device 3F85C83A-2821-4DB5-A41F-50F19E6FE553
```

This installs locked Pods then builds/installs a Release app with an embedded bundle (`com.demo.bikeshopping`). Substitute an available simulator UDID for another host. Initial native generation is complete; do not run prebuild during verification. Android local development uses `npm run android`; a Release emulator build can use `npm run android -- --variant release --no-bundler`. Android native build and hardware-back behavior have not been verified in this implementation stage.

## Checks

```sh
npm test
npm run typecheck
npm run verify:bundles
```

Tests exercise the actual session reducer: empty-cart guards, session navigation/favorites/quantities, search/category intersection, integer-cent discount arithmetic, no stacking, invalid-code reset, required address validation, and immutable mock confirmation totals/address.

## Demo behavior

- Cart starts empty on each fresh process. Shopping and favorites are retained across screens, not across app restarts.
- Search matches product name/type, case-insensitively, within the selected category.
- Add to Cart opens the cart; decrementing quantity one removes the item. Cart Back and Explore bikes return to catalog. Address Back returns to cart retaining the form.
- Apply exactly `Bike` (surrounding whitespace is ignored) for a single 30% subtotal discount. Shipping is always free. Invalid application clears any active discount and shows feedback. Editing code without applying does not change the active discount. Totals derive from numeric cents, with the aggregate discount rounded once to cents.
- All six shipping fields are required. Whitespace-only input is invalid. Confirm snapshots a local mock total and trimmed address, clears the cart and promotion, and makes no network request or transaction. Continue shopping returns to catalog.
- Map/profile/document glyphs are decorative and have no destinations. Android hardware Back uses the same screen transitions; at catalog it leaves the app normally.

## Verification performed

- `npm test`: four deterministic suites passed.
- `npm run typecheck`: passed.
- Expo export for both iOS and Android: passed.
- iOS Release simulator build/install: succeeded on iPhone 17, iOS 27.2. Known nonfatal Expo module/linking warnings did not prevent build/install.
- Advisory native interaction testing after this build passed remaining category/favorite/back/removal cases and a Bike-discounted address-to-confirmation flow ($1999.99 minus $600.00 = $1399.99). Earlier advisory exercised search, quantity changes, invalid/repeated discounts, required-field errors and mock checkout, but lacked independently established build provenance. Final independent QA remains separate.

Visual limitations inherited from the scaffold: low-resolution exported product images appear soft enlarged; card silhouettes/diagonal effects approximate the design. No replacement artwork or unrelated screens were introduced.

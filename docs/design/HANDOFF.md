# Bike shopping UI handoff

## Scope and ownership
This is a presentation-only Expo scaffold, not an interactive candidate. `App.tsx` displays a static catalog fixture; its callbacks deliberately do nothing. Replace this entry with functional session state/navigation. All screen components are controlled through typed props in `src/ui/screens.tsx`; shared view models are in `src/ui/types.ts`. No backend, persistence, routing package, real payment, domain validation, or order creation is included.

## References
Source: https://www.figma.com/design/JlGecZGGMzahyqJj9eMGQJ?node-id=1%3A4
Read version: 2416527323473953788 (unversioned current source).
Canonical downloaded PNGs (390 × 844 logical reference):
- `catalog.png`: node 1:2276
- `product-details.png`: node 1:2994
- `cart.png`: node 1:1973
- `checkout-reference.png`: node 1:2070
These are QA references only, never shipped as screens. Local transparent exported product assets map to nodes 1:2368 (road), 1:2304 (mountain), 1:2290 (helmet), 1:2450 (electric). They use Figma's default export resolution; upscaling on detail may soften edges.

## Design system
`src/ui/theme.ts` holds resolved node colors, gradients, spacing, radii, and Poppins regular/medium/bold families. Figma variables endpoint returned HTTP 403; no variable identities/values were inferred. Source uses 20px gutters, 44px action buttons, 10px control radii, 20px cards, 30px sheet corners; text ranges from 13px catalog metadata to 20px headings and 26px promotion. Dark navy surfaces, cyan-to-indigo actions and a large diagonal background carry across screens. Shared Label, Action, Panel, Header, Screen are in `primitives.tsx`.

Layout uses flexible widths, wrapping two-column product cards, scrollable content, safe areas, keyboard avoidance on checkout, 44px touch regions and text labels/selected states. Card outlines and panel gradients approximate Figma's overlay/blur effects; skewed catalog card silhouettes and slanted navigation edge are not exact. Detailed native visual tuning remains necessary. Map/profile/document glyphs intentionally have no callbacks or destinations. Address and confirmation extensions are designed here, not fully specified by Figma; confirmation copy explicitly disclaims real transactions.

## Wiring contract
- CatalogScreen: supply already filtered products, category, query, search visibility, cart count; wire selection, search, favorite and cart callbacks. No filtering is performed here.
- ProductCard / ProductDetailsScreen: supply selected product and favorite state; wire open, toggle favorite, tab selection, back and add. Specification arrays and description are supplied, not generated.
- CartScreen: supply actual cart lines, quantity values, formatted totals, code text, feedback and disabled checkout state; wire increase/decrease/remove/apply/back/browse/checkout. Start empty. No arithmetic is performed in UI.
- AddressScreen: pass controlled six-field address and per-field errors. All visible fields are marked required. Implementation must validate before calling confirmation, block empty checkout and manage keyboard/back behavior.
- ConfirmationScreen: supply committed mock summary/address display and continue callback. Do not create a payment/order. Reset/navigation semantics belong to implementation.
- `sampleContent.ts` is explicitly presentation fixture data, not a canonical product model. Missing descriptions/specifications are labeled demo content. Implementation should establish numeric prices independently of formatted labels.
- Apply code Bike once for 30% off item subtotal with free shipping; round to cents from actual cart contents. Invalid feedback and repeated application behavior belong to implementation. Do not copy reference mock totals.

## Dependencies and checks
Created minimal Expo 58.0.22 / React 19.3.0 / RN 0.88.1 native-only scaffold using the current stable registry versions and Expo compatibility map. TypeScript latest registry was 7.0.2 but `expo install --check` requires ~6.0.3; selected supported 6.0.3 instead. Package lock committed in checkout. Official sources consulted through documentation agent:
- https://unpkg.com/expo@58.0.22/bundledNativeModules.json
- https://docs.expo.dev/versions/v58.0.0.md
- https://expo.dev/changelog/sdk-58.md
- https://docs.expo.dev/versions/v58.0.0/sdk/linear-gradient.md
- https://docs.expo.dev/versions/v58.0.0/sdk/font.md
- https://docs.expo.dev/versions/v58.0.0/sdk/safe-area-context.md
Host observed Node 26.2.0, npm 12.0.2, Xcode 27.2, JDK 26.0.1. SDK docs list Xcode 26.4+ and Xcode 27 support; Android compile SDK37 / target36. Android SDK default-path listing was unavailable; no native build has been attempted at this UI stage. Do not treat those versions/path alone as blockers.

Actual successful commands: `npm install`, `npm run typecheck`, `npx expo install --check`, and `npx expo export --platform ios --platform android --output-dir dist`. Export is bundle evidence only, not a native build or simulator behavior pass. No device/browser presentation test or independent QA performed. Implementation owns runnable native testing and all acceptance verification.

`npm install` reported 11 moderate vulnerabilities. Production audit snapshot: `dependency-audit.json`; no force-fix or unrelated framework upgrades applied. Review transitive advisories during implementation.

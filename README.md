# Ember & Oak

A single-page Next.js site for an explicitly fictional neighborhood café. Includes an introduction, eight sample menu items with USD prices, opening hours, and an imaginary address. No backend, ordering, payments, or reservations.

## Run

- `npm ci`
- `npm run dev` — http://127.0.0.1:3000 (fixed port; Next exits if occupied)
- `npm test` — deterministic server-rendered content, navigation, asset and style checks
- `npm run typecheck`
- `npm run build`
- `npm start` — serve the production build at http://127.0.0.1:3000

## Design and accessibility

Warm cream, terracotta, editorial serif typography and locally stored café photography. Responsive layouts stack on small screens. Native anchor navigation, a skip link, visible keyboard focus, descriptive image alternatives, semantic landmarks/headings, and reduced-motion support are included. Fictional status appears explicitly in the visit section and footer. Browser-based mobile/desktop and keyboard QA should follow implementation verification.

## Assets

Photos downloaded from Unsplash and served locally: https://images.unsplash.com/photo-1442512595331-e89e73853f31 and https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb. Photography is illustrative, not a representation of a real Ember & Oak business. DM Sans and Libre Caslon Display font files are sourced from Google Fonts and served locally through `public/fonts.css`. No runtime third-party calls are needed.

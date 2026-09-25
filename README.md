# Site Unseen

A small browser game about recognizing iconic websites from tiny interface fragments. Each wrong guess expands the crop. Fewer reveals and faster answers score more points.

Play it at [fgbutterlettuce.github.io/site-unseen](https://fgbutterlettuce.github.io/site-unseen/).

## Play locally

```bash
npm install
npm run dev
```

Production and test commands:

```bash
npm run build
npm test
npm run test:e2e
```

## Add a clue

1. Create an original 1200×720 SVG in `public/clues/`. Do not use private or authenticated screens, real names, email addresses, avatars, order numbers, or other account data.
2. Add an entry to `src/data/clues.js` with an answer, useful aliases, asset path, three progressively wider SVG `viewBox` crops, a category, and a short fact.
3. Keep any text inside the reconstruction synthetic. Avoid copying a complete live page pixel-for-pixel.
4. Run the unit and browser tests, then play the new clue at 320, 375, 414, and 768 CSS pixels.

Each crop is `x y width height`. The final crop should normally be `0 0 1200 720`.

## Privacy and provenance

All included clue images are original SVG reconstructions created for this game. They contain synthetic text and no user or account data. Product and company names are used only as answers in a nominative, referential way. Site Unseen is not affiliated with or endorsed by any website represented in the game.

See [CLUE_POLICY.md](./CLUE_POLICY.md) for submission and review rules.

## Stack

Static HTML, CSS, and JavaScript built with Vite. There is no backend, sign-in, analytics, advertising, or cookie storage. The only persisted value is a best score in browser `localStorage`.

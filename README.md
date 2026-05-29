# Joshua Hebert — Portfolio Site

Technical Delivery Manager / TPM / Delivery Systems portfolio.
Built with Vite + React. Deployed via Vercel.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm test           # smoke tests
```

## Project structure

```
src/
  components/
    layout/        Navbar, Footer
    sections/      Hero, ExecutiveSnapshot, CaseStudies,
                   OperatingPrinciples, Skills, Downloads, Contact
    ui/            ErrorBoundary (and shared UI components)
  data/            Content files — edit here, not in components
  styles/          tokens.css, globals.css, animations.css
  test/            smoke.test.jsx
public/
  assets/          PDF resume + portfolio brief go here
```

## Updating content

All copy lives in `src/data/`. No component changes needed to update text:

| File | What it controls |
|---|---|
| `snapshot.js` | Executive Snapshot cards |
| `caseStudies.js` | All 4 case study cards |
| `principles.js` | Operating Principles list |
| `skills.js` | Skills groups and items |

## Adding PDF files

Drop these two files into `public/assets/`:
- `Joshua_Hebert_Resume.pdf`
- `Joshua_Hebert_Portfolio_Brief.pdf`

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

The `vercel.json` handles SPA routing automatically.

## Contact form

The form currently simulates a send (setTimeout). To wire up a real endpoint:
- [Formspree](https://formspree.io) — easiest, free tier available
- Netlify Forms — if you move to Netlify
- Any POST endpoint — replace the `await new Promise(...)` in `Contact.jsx`

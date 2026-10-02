# Anurag Tamrakar Portfolio

A responsive Vue 3 portfolio with a dark lavender-and-lime design system, an animated creative workspace, dimensional project artwork, project filters, and expandable experience sections.

## Run locally

```sh
npm install
npm run dev
```

Open the local address printed by Vite. Use `npm run build` to create the production site in `dist`, and `npm run preview` to preview it.

## GitHub Pages

The `.github/workflows/deploy.yml` workflow builds and deploys pushes to `main`. In repository Settings → Pages, choose **GitHub Actions** as the source. The workflow takes the base path from GitHub Pages, so both repository sites and username sites work, including document downloads. The workflow can also be started manually from the Actions tab.

## Content

Project names, roles, URLs, experience, skills, education, and contact information come from Anurag_Tamrakar. Edit `src/data.js` to update projects, skills, or employment history; edit `src/App.vue` for biography and contact details. The project artwork is an original typographic index, rather than screenshots of client websites. In-progress projects retain their documented status.

The original documents are served from `public` for download. The résumé includes professional reference contact details; replace that download with a public-facing résumé if desired.

## Design

Shared color, type, spacing, and interaction rules live in `src/style.css`; UX refinements and ambient background motion live in `src/ux.css`. The background animates transforms on three soft gradient layers. The footer motion toggle saves its preference locally; animation pauses in hidden tabs and respects reduced-motion preferences. Navigation stays visible while scrolling, and Escape dismisses the mobile menu and restores button focus. The layout adapts to mobile screens and uses keyboard-accessible controls and semantic landmarks. Google Fonts has local system-font fallbacks. Email uses the visitor’s mail app, with a clipboard shortcut; no contact backend is required.

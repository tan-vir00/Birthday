# Happy Birthday, Rifa

React + TypeScript + Vite + Tailwind CSS + Framer Motion.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # ONE self-contained file: dist/index.html
```
Windows PowerShell: use `npm.cmd` instead of `npm`.

## Edit the words
All text lives in `src/content/birthday.ts`. The photograph used is `src/assets/rifa-memory.webp`
(the original, untouched, is `photo-original/rifa-memory.jpeg`).

## Host it
`dist/index.html` works on its own: open it by double-click, send it as a file, or drag the `dist`
folder onto Netlify Drop (app.netlify.com/drop). `dist/artifact.html` is only for the Claude page.

## GitHub Pages
`docs/index.html` is the built single-file site. In the repository: Settings → Pages →
Source "Deploy from a branch", Branch `main`, folder `/docs`. After `npm run build`,
copy `dist/index.html` to `docs/index.html` to publish changes.

# Ready2Leave

A simple **before-you-leave checklist** so you can confirm home is safe and you have what you need before walking out the door.

**[Live demo → ready2leave.vercel.app](https://ready2leave.vercel.app/)**

---

## What it does

Ready2Leave helps you run through a quick routine:

- **Home** — lights, gas, water taps, door lock
- **Essentials** — phone, keys, wallet
- **Custom items** — add anything else (e.g. laptop, charger)
- **Progress** — see how many tasks are done at a glance
- **Done for Now** — clear all checkmarks when you’re ready to start fresh
- **Light / dark mode** — matches your preference (saved in the browser)
- **Installable (PWA)** — add to your home screen on mobile for quick access

Your checklist and theme are stored in **localStorage**, so they persist between visits on the same device.

---

## Tech stack

| Area | Tools |
|------|--------|
| UI | [React 19](https://react.dev/) |
| Build | [Vite 8](https://vite.dev/) |
| PWA | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) |
| Lint | ESLint + React Hooks plugin |
| Hosting | [Vercel](https://vercel.com/) |

No backend — the app runs entirely in the browser.

---

## Run locally

```bash
git clone https://github.com/ud4uddav/ready2leave.git
cd ready2leave
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Project structure

```
src/
  App.jsx      # Checklist logic and UI
  App.css      # Layout and theme styles
  main.jsx     # App entry
  index.css    # Global styles
public/        # Static assets and PWA icons
```

---

## Author

Built by **ud4uddav** — [GitHub](https://github.com/ud4uddav/ready2leave)

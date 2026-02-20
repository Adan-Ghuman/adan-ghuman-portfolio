# M. Adan Ghuman — Portfolio

Personal portfolio site for [M. Adan Ghuman](https://github.com/Adan-Ghuman), Software Engineer.

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| Animations | GSAP 3 + ScrollTrigger, Lenis smooth scroll |
| Icons | lucide-react, react-icons |
| Deployment | Netlify |

## Getting Started

```bash
# Install dependencies
bun install

# Dev server
bun run dev

# Production build
bun run build

# Preview build
bun run preview
```

> Uses `bun` exclusively. Do not commit `package-lock.json`.

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, SmoothScroll
│   ├── sections/     # Hero, Experience, Expertise, Projects, Stats, Contact
│   └── ui/           # Button, GlobalBackground, LoadingScreen, etc.
├── data/             # Static content (projects, personal, stats, experience)
├── hooks/            # useTheme, useGsap
├── lib/              # GSAP init, animation presets, cn() utility
└── types/            # Shared TypeScript interfaces
```

## Key Details

- **Single page** — anchor-based navigation, no router.
- **Theme** — dark/light toggle, persisted to `localStorage`, 200ms transition.
- **Animations** — all scroll animations via `useGsap()` hook (auto-cleanup on unmount). Canvas backgrounds (`GlobalBackground`, `HeroBackground`) use raw `requestAnimationFrame`.
- **Content** — fully static, lives in `src/data/`. No CMS, no API calls.
- **Path alias** — `@/*` maps to `src/*`.

## Environment

No `.env` required. All content is static.


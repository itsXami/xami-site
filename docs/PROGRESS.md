# xami-site — stan prac

Ten plik wystarcza, żeby nowa sesja mogła kontynuować pracę. Zasady i decyzje: `CLAUDE.md`.

## Etapy

| # | Etap | Status |
|---|------|--------|
| 1 | Szkielet Astro + publikacja na Cloudflare Pages | ✅ gotowe |
| 2 | Strona Vonara (makieta A) | ⏳ następny |
| 3 | Dema audio (12 presetów) | — |
| 4 | Wykończenie: `/legal` i „Lista przed publikacją” | — |

## Etap 1 — co jest w repo

- Astro 7.4.12 (statyczny build, `output: 'static'`), `build.inlineStylesheets: 'never'`.
- Zależności (wersje przypięte dokładnie): `astro`, `@fontsource/inter`, `@fontsource/inter-tight`.
  `package-lock.json` w repo, instalacja przez `npm ci`.
- Node 22.23.4 w `.node-version` (wymóg Astro 7; czyta go CI i Cloudflare Pages).
- Strona startowa `src/pages/index.astro`: tytuł „Xami” + jedno zdanie. Bez wyglądu z makiety (Etap 2).
- Czcionki: Inter 400/500/600, Inter Tight 800/900 z Fontsource, bundlowane do `/_astro/` (bez Google Fonts).
- `public/_headers` — dokładnie jak w `CLAUDE.md`.
- `scripts/check-links.mjs` — sprawdzanie linków wewnętrznych w `dist/` (bez zależności): `npm run check-links`.
- CI `.github/workflows/ci.yml`: job „Build and check links” (`npm ci`, `npm run build`, linki)
  i „Secret scan (gitleaks)” (gitleaks 8.30.1, plik sprawdzany sumą SHA-256, skan całej historii).
  `permissions: contents: read`, akcje przypięte do pełnego SHA.
- `.github/dependabot.yml` — co tydzień `npm` i `github-actions`.

Projekt Cloudflare Pages: `xami-sound` → https://xami-sound.pages.dev. Ustawienia: framework preset „Astro”, build command
`npm run build`, output `dist`. Wersję Node Cloudflare bierze z `.node-version`.

## Dziennik

- 2026-11-14: repo założone; pierwszy commit z `CLAUDE.md`, README, `.gitignore` i tym plikiem.
- 2026-11-14: Etap 1 — szkielet Astro, czcionki, `_headers`, CI (build, linki, gitleaks), Dependabot (PR #1).
- 2026-11-14: reguła `main` z wymaganymi jobami CI; projekt Cloudflare Pages `xami-sound`, adres `xami-sound.pages.dev`.
- 2026-11-14: Etap 1 zakończony (produkcja i podgląd PR działają). Od teraz Claude scala PR sam przy zielonym CI i podglądzie.

## Do zrobienia przez użytkownika

- Settings → Advanced Security: secret scanning z push protection, Dependabot alerts i security
  updates, Private vulnerability reporting.
- Lista 12 presetów do dem — przed etapem 3.

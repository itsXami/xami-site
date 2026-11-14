# xami-site — stan prac

Ten plik wystarcza, żeby nowa sesja mogła kontynuować pracę. Zasady i decyzje: `CLAUDE.md`.

## Etapy

| # | Etap | Status |
|---|------|--------|
| 1 | Szkielet Astro + publikacja na Cloudflare Pages | ✅ gotowe |
| 2 | Strona Vonara (makieta A) | ✅ gotowe |
| 3 | Dema audio (12 presetów) | ✅ gotowe |
| 4 | Wykończenie: podstrony Vonara, `/legal` i „Lista przed publikacją” | 🔄 w toku |

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

## Etap 2 — co jest w repo

- Strona główna = strona Vonara według makiety A: nagłówek, hero, fala, galeria zrzutów (Synth / Modulation /
  Effects / Presets), przesuwane nazwy presetów, „Start with a sound.”, sekcja dem (znacznik `[DO UZUPEŁNIENIA]`
  do Etapu 3), „Free. / And open source.”, blok pobierania, stopka. Komponenty w `src/components/`.
- Fakty o wydaniu w `src/data/vonar.ts` (wersja, link do pliku, SHA-256, rozmiar, liczby). Przy nowej wersji Vonara
  zmień je tam.
- Lista presetów `src/data/vonar-presets.json` generowana z plików JSON Vonara:
  `node scripts/sync-vonar.mjs <ścieżka do repo Vonara>` (kopiuje też notatki wydań). Nazwy w pasku są sprawdzane przy buildzie.
- SHA-256 `Vonar-1.0.0-Setup.exe`: `e580c3dc3b25b4be998d9c526e5ed6636b3540e4d068ba92381f9d6532e30802`
  (plik pobrany z Release v1.0.0, 4 551 918 bajtów).
- Zrzuty w `src/assets/vonar/` z `VOLT_Render --snapshot … 1.5 <zakładka>` (Vonar `711887e` = tag v1.0.0,
  build na Linuksie): Synth z presetem „Dream Keys”, Modulation, Effects; Presets = zrzut od użytkownika z FL Studio
  (otwarte menu presetów, preset „Acid Bath”), przycięty o pasek okna FL Studio. Astro robi z nich AVIF/WebP 600/900/1200 px (zamiast PNG ok. 1 MB).
- CSP: `vite.build.assetsInlineLimit: 0` — Astro nie wkleja małych skryptów ani plików jako `data:`.
  Strona sprawdzona w Playwright z nagłówkiem CSP z `_headers`: zero błędów w konsoli, brak przewijania w bok
  przy 375 px, zakładki działają klawiszami strzałek.
- Poprawka faktu: Vonar ma 7 trybów warp (plus „Off”), nie 8 — poprawione w `CLAUDE.md`.

## Etap 3 — co jest w repo

- Wybór użytkownika (12 presetów): `src/data/vonar-demo-picks.json` — Distorted Reese, Rave Siren Lead,
  Harmony Twin Lead, Dream Keys, House Piano Stab, Church Bell Toll, House Pump Pad, Neon Grid Pad,
  Distorted Fanfare, Bassoon Low, Acid Line Arp, 808 Boom Kick (9 kategorii plus Lead i Guitar).
- Dema: podglądy FLAC z `VOLT_Render --preset "<nazwa>"` (Vonar v1.0.0), zamienione na MP3 128 kb/s, 48 kHz,
  bez zmiany głośności i bez metadanych. Pliki w `public/audio/vonar/` (12 plików, ok. 0,8 MB).
  Odtworzenie: `node scripts/build-vonar-demos.mjs <katalog wyjścia renderera>` — robi MP3
  i `src/data/vonar-demos.json` (nazwa, kategoria z JSON presetu, ścieżka). Strona czyta tylko ten plik.
- Odtwarzacz (`src/components/Sounds.astro`, `src/scripts/demos.ts`): jeden dźwięk naraz, play/stop,
  filtr kategorii (przyciski `aria-pressed`, komunikat dla czytnika ekranu), audio pobierane dopiero po
  kliknięciu „play”, nic nie zapisuje na urządzeniu.
- Sprawdzone w Playwright z CSP: brak pobrań MP3 przed kliknięciem, jeden dźwięk naraz, stop, filtr, obsługa
  klawiaturą, koniec dźwięku resetuje przycisk, zero błędów w konsoli, pusty localStorage i ciasteczka,
  brak przewijania w bok przy 375 px. Sprawdzanie linków obejmuje też ścieżki MP3 (`data-src`).

## Etap 4 — postęp

- [x] `/vonar/getting-started/` — instrukcja instalacji (pobranie, SmartScreen krok po kroku, SHA-256, instalator,
  FL Studio, presety, makra; fakty z README Vonara). Linki: „Install guide” w menu, podpowiedź pod przyciskami
  w hero, przycisk „Installation guide” w bloku pobierania, link w stopce.
- [x] `/vonar/faq/` (11 pytań, odpowiedzi z README, CONTRIBUTING i notatek wydań) i `/vonar/changelog/`
  (notatki wydań skopiowane z `docs/releases/` Vonara do `src/content/vonar-releases/` przez
  `scripts/sync-vonar.mjs`, renderowane przy buildzie). Wspólny układ podstron: `src/layouts/Page.astro`.
  Linki: stopka (Installation guide · FAQ · Changelog), numer wersji w hero → changelog, instrukcja → FAQ.
- [ ] `/legal`, strona 404.
- [ ] SEO: favicon, Open Graph, `sitemap.xml`, `robots.txt`.
- [ ] Bezpieczeństwo i jakość: `security.txt`, `SECURITY.md`, `docs/INCIDENT.md`, Lighthouse w CI.

## Dziennik

- 2026-11-14: repo założone; pierwszy commit z `CLAUDE.md`, README, `.gitignore` i tym plikiem.
- 2026-11-14: Etap 1 — szkielet Astro, czcionki, `_headers`, CI (build, linki, gitleaks), Dependabot (PR #1).
- 2026-11-14: reguła `main` z wymaganymi jobami CI; projekt Cloudflare Pages `xami-sound`, adres `xami-sound.pages.dev`.
- 2026-11-14: Etap 1 zakończony (produkcja i podgląd PR działają). Od teraz Claude scala PR sam przy zielonym CI i podglądzie.
- 2026-11-14: Etap 2 — strona Vonara według makiety A, zrzuty z aktualnej wersji, link do pliku i SHA-256.
- 2026-11-14: Etap 3 — 12 dem audio (wybór użytkownika, Rave Siren Lead zamiast Fuzz Bassline), odtwarzacz z filtrem.
- 2026-11-14: galeria — nowy zrzut zakładki Presets (otwarte menu presetów, od użytkownika).
- 2026-11-14: Etap 4 (1) — instrukcja instalacji z sekcją o SmartScreen i linki do niej (prośba użytkownika).
- 2026-11-14: Etap 4 (2) — FAQ i changelog.

## Do zrobienia przez użytkownika

- Settings → Advanced Security: secret scanning z push protection, Dependabot alerts i security
  updates, Private vulnerability reporting.

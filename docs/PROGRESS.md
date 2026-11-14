# xami-site — stan prac

Ten plik wystarcza, żeby nowa sesja mogła kontynuować pracę. Zasady i decyzje: `CLAUDE.md`.

## Etapy

| # | Etap | Status |
|---|------|--------|
| 1 | Szkielet Astro + publikacja na Cloudflare Pages | ⏳ następny |
| 2 | Strona Vonara (makieta A) | — |
| 3 | Dema audio (12 presetów) | — |
| 4 | Wykończenie: `/legal` i „Lista przed publikacją” | — |

## Dziennik

- 2026-11-14: repo założone; pierwszy commit z `CLAUDE.md`, README, `.gitignore` i tym plikiem.

## Do zrobienia przez użytkownika

- Reguła ochrony `main` (PR wymagany, 0 zatwierdzeń, CI musi przejść, zakaz force-push i usuwania).
- Settings → Advanced Security: secret scanning z push protection, Dependabot alerts i security
  updates, Private vulnerability reporting.
- Konto Cloudflare (passkey/2FA) — podłączenie repo po etapie 1.
- Lista 12 presetów do dem — przed etapem 3.

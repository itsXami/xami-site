# Plan awaryjny (xami-site)

Co robić, gdy coś pójdzie źle. Kolejność: najpierw zatrzymać szkodę, potem sprawdzać przyczynę.

## Sygnały alarmowe

- Nieoczekiwane wdrożenie w Cloudflare Pages (e-mail o wdrożeniu, którego nikt nie zlecił).
- Nieznany commit lub PR scalony do `main`, nowy token, nowa aplikacja z dostępem do repo.
- Zmieniona suma SHA-256 instalatora albo nowy plik w wydaniu Vonara, którego nikt nie dodał.
- Zgłoszenie przez Private vulnerability reporting albo `security.txt`.
- Fałszywa strona z „Vonarem” w wynikach wyszukiwania.

## 1. Strona pokazuje coś złego (podmieniona treść, zły link do pobrania)

1. Cloudflare → Workers & Pages → `xami-sound` → **Deployments** → ostatnie dobre wdrożenie → **Rollback**.
   Strona wraca w kilka sekund.
2. Sprawdzić historię `main` na GitHubie. Złą zmianę cofnąć przez PR z `git revert` (nigdy force-push).
3. Sprawdzić, czy link pobierania i SHA-256 w `src/data/vonar.ts` zgadzają się z wydaniem Vonara.

## 2. Przejęte konto (GitHub, Cloudflare, e-mail projektu)

1. Zmienić hasło i od nowa ustawić passkey/2FA, wylogować wszystkie sesje.
2. GitHub: Settings → Sessions, SSH and GPG keys, Personal access tokens, Applications → usunąć wszystko
   nieznane. Sprawdzić reguły `main` i listę współpracowników.
3. Cloudflare: Members, API Tokens, ustawienia projektu Pages (gałąź produkcyjna, polecenie builda,
   zmienne środowiskowe).
4. Przejrzeć ostatnie wdrożenia i commity, cofnąć obce zmiany (punkt 1).

## 3. Złośliwe lub podmienione wydanie Vonara

1. Na GitHubie oznaczyć wydanie jako niebezpieczne: w opisie na samej górze ostrzeżenie, plik usunąć.
2. Na stronie: zmienić link i SHA-256 w `src/data/vonar.ts` na ostatnie dobre wydanie (PR, szybkie scalenie).
3. Ostrzeżenie dla użytkowników: krótka informacja na stronie głównej i w notatkach wydania (co się stało,
   które pliki, jak sprawdzić SHA-256, co zrobić, jeśli ktoś uruchomił zły plik).

## 4. Fałszywa strona z Vonarem

Zgłosić adres w Google Safe Browsing (https://safebrowsing.google.com/safebrowsing/report_phish/) i Microsoft
(https://www.microsoft.com/wdsi/support/report-unsafe-site). Na stronie i w README powtarzać, że oficjalne pobieranie
jest tylko na `xami-sound.pages.dev` i GitHubie.

## Po incydencie

Dopisać do `docs/PROGRESS.md`: co się stało, kiedy, co zrobiono i co zmienić, żeby się nie powtórzyło.

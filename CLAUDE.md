# xami-site — instrukcja projektu

Ten plik wystarcza, żeby nowa sesja mogła pracować nad stroną. Czytaj go przed każdą zmianą.

## Cel

Darmowa strona Xami z darmowymi pluginami i presetami dla producentów muzyki (głównie FL Studio).
Na start jeden produkt: syntezator **Vonar** (repo `itsXami/vonar`). Później kolejne pluginy,
paczki presetów (Vital, wbudowane syntezatory FL Studio) i instrumenty dla Decent Samplera.

Zasady z wizji projektu: wszystko za darmo (także po stronie autora), jakość ponad ilość,
najpierw produkt, potem otoczka.

## Ustalenia (nie zmieniaj bez zgody użytkownika)

| Temat | Decyzja |
|---|---|
| Adres | `xami-sound.pages.dev` (projekt Cloudflare Pages `xami-sound`, wybór użytkownika). Własna domena dopiero w Etapie 4 wizji. |
| Hosting | Cloudflare Pages, darmowy plan. |
| Technologia | Astro, wynik to statyczny HTML. Bez serwera, bez bazy danych. |
| Repo | `itsXami/xami-site` na GitHubie. |
| Język strony | Angielski. Notatki projektu (`docs/`) po polsku. |
| Podpis | Tylko pseudonim **Xami**. Nigdzie imienia, nazwiska, wieku, miasta ani prywatnego e-maila. |
| Wygląd | Makieta **A — Studio (jasna)**: https://claude.ai/artifact/8j3j1wNBnXhnxjFmoQ4czz |
| Pobieranie | Przycisk prowadzi prosto do pliku z GitHub Releases Vonara. Plików pluginu nie kopiujemy na stronę. |
| Statystyki | **Wyłączone** (decyzja użytkownika 2026-11-14): na `*.pages.dev` Cloudflare Web Analytics nie ma opcji pomijania odwiedzających z UE, a pomiar w UE bez zgody to szara strefa. Liczbę pobrań pokazują liczniki plików na GitHubie. Przy własnej domenie: patrz „Otwarte”. |
| Platformy Vonara | Tylko Windows (VST3). Nie obiecuj macOS ani Linuksa. |

## Sposób pracy

- Każda zmiana: osobna gałąź → Pull Request → zielone CI → scalenie do `main`.
  Nigdy nie wypychaj prosto na `main` (chroni go reguła w ustawieniach repo).
- Cloudflare Pages publikuje `main` automatycznie, a każdy PR dostaje adres podglądu.
  Podaj użytkownikowi adres podglądu przy każdym PR.
- Scalanie (zgoda użytkownika z 2026-11-14): Claude scala PR sam, gdy wszystkie wymagane joby CI
  i podgląd Cloudflare Pages są zielone. Nie scala przy czerwonym CI ani konflikcie. Po scaleniu podaje
  użytkownikowi adres podglądu i produkcji.
- CI musi co najmniej zbudować stronę (`npm run build`) i sprawdzić linki wewnętrzne.
- Zmieniaj tylko to, o co poproszono. Pomysły spoza zakresu zapisz w „Otwarte”, nie wdrażaj ich.
- Prowadź `docs/PROGRESS.md` (stan prac, po polsku), tak jak w repo Vonara.

## Wygląd (makieta A)

**Kolory**

| Rola | Hex |
|---|---|
| Tło | `#F5F3EF` |
| Tekst główny | `#111111` |
| Druga linia nagłówka | `#A3A3A3` |
| Tekst pomocniczy | `#4A4A4A` / `#6B6B6B` |
| Akcent (przyciski odtwarzania, fala) | `#C4572B` |
| Etykieta nad nagłówkiem (tekst, kontrast) | `#B04A22` |
| Karty | `#EAE6DF`, przycisk drugorzędny `#E8E4DD` |
| Karty pastelowe | `#DCE6E1`, `#DDE3EC`, `#EEDFD6` |
| Blok pobierania | tło `#111111`, tekst `#FFFFFF` |

**Typografia**
- Nagłówki: Inter Tight 800–900, ciasne odstępy (`letter-spacing` ok. −0,045em).
- Tekst: Inter 400–600.
- Czcionki **hostowane na stronie** (np. Fontsource), nie ładowane z Google Fonts — ładowanie z serwerów
  Google przekazuje adres IP odwiedzającego i w UE bywa uznawane za naruszenie RODO.

**Wzorce**
- Nagłówek dwutonowy: pierwsza linia czarna, druga szara (np. „Start with a sound. / Not a manual.”).
- Mała etykieta nad nagłówkiem: wielkie litery, odstęp liter 0,22em, kolor `#B04A22`.
- Zaokrąglone karty (16–32 px), numerowane czarne kółka, czarny blok z przyciskiem pobierania.
- Zasada treści: mało opcji, jedna wyraźna główna akcja (pobierz), reszta pod spodem.

**Animacje** (z makiety): wejście nagłówka, falujący pasek z fali, przesuwające się nazwy presetów,
unoszący się zrzut pluginu, uniesienie kart po najechaniu, pulsujący przycisk odtwarzania.
Wszystkie wyłączone przy `prefers-reduced-motion: reduce`.

**Dostępność:** standard WCAG 2.2 AA. Prawdziwe `<button>` i `<a>`, `aria-label` na przyciskach
z samą ikoną, kontrast tekstu co najmniej 4,5:1, widoczny fokus, cała strona i odtwarzacz obsługiwane
klawiaturą, strona działa na telefonie (sekcje układają się w kolumnę).

## Struktura strony

1. Nagłówek: logo „xami”, linki Sounds, Open source, GitHub, przycisk Download.
2. Hero: etykieta „FREE WAVETABLE SYNTH”, „Vonar. / Sound first.”, opis, dwa przyciski, linia z wersją.
3. Animowana fala.
4. Galeria zrzutów Vonara: przełącznik zakładek (Synth / Modulation / Effects / Presets),
   jeden duży zrzut na zakładkę z krótkim podpisem, płynne przejście między nimi.
   Źródło: `docs/ui-*.png` z repo Vonara; brakujące ujęcia (rack efektów, przeglądarka presetów,
   zbliżenia sekcji) robione przez `VOLT_Render --snapshot`. Zawsze zrzuty z aktualnej wersji.
5. Przewijane nazwy presetów.
6. „Start with a sound. / Not a manual.” — trzy numerowane karty.
7. Dema audio z filtrem kategorii (patrz niżej).
8. „Free. / And open source.” — trzy karty.
9. Blok pobierania z uwagą o SmartScreen.
10. Stopka: „Vonar by Xami · AGPLv3”, uwaga o znaku towarowym VST.

Podstrony Vonara (w Etapie 2):
- `/vonar/getting-started` — instalacja, pierwsze uruchomienie w FL Studio, presety, makra.
- `/vonar/faq` — m.in. SmartScreen, weryfikacja SHA-256, gdzie są presety użytkownika, czy działa
  na macOS (nie).
- `/vonar/changelog` — lista zmian każdej wersji (z notatek wydań w repo Vonara).

Na razie strona główna = strona Vonara. Gdy dojdzie drugi produkt: strona główna z kafelkami
produktów i osobne podstrony (`/vonar`, …).

## Treści — zasady

- Tylko prawdziwe fakty z repo Vonara (README, `docs/`, `CMakeLists.txt`). Żadnych wymyślonych liczb,
  opinii ani recenzji. Brak danych → widoczny znacznik `[DO UZUPEŁNIENIA]`.
- Fakty aktualne na 1.0.0: 327 presetów, 10 efektów w racku, 7 trybów warp (Sync, Bend, Squeeze, Mirror, Quantize, FM, RM; plus „Off”
  — sprawdzone w `Source/Params.h`), oscylator strunowy,
  4 makra na preset, VST3 dla Windows 10/11, instalator ok. 4,6 MB, licencja AGPLv3.
  Przy nowej wersji Vonara sprawdź je ponownie.
- Uwaga przy pobieraniu: instalator nie jest podpisany, Windows może pokazać SmartScreen
  („More info” → „Run anyway”).
- Link do kodu źródłowego przy pobieraniu (wymóg AGPLv3): https://github.com/itsXami/vonar
- Obok pobierania suma kontrolna SHA-256 pliku z Release.
- Żadnych nazw artystów, logo ani znaków towarowych (np. w nazwach i opisach presetów).
  Logo VST tylko zgodnie z wytycznymi Steinberga; w stopce: „VST is a trademark of Steinberg Media
  Technologies GmbH.”

## Dema audio

- Źródło: renderer Vonara (`VOLT_Render`) robi podglądy FLAC każdego presetu.
- Na stronę: MP3 ok. 128 kb/s, krótka fraza, ta sama głośność co w rendererze.
  Pliki w `public/audio/vonar/`, lista z nazwą, kategorią i ścieżką w pliku danych (`src/data/`).
- Strona generuje listę dem z pliku danych — nie wpisuj pozycji ręcznie.
- 12 dem wybranych przez użytkownika (patrz „Otwarte”).
- Odtwarzacz: jeden dźwięk naraz, przycisk play/stop, filtr kategorii.
- Nazwy presetów i kategorie biorą się z plików JSON presetów Vonara, nie z pamięci.

## SEO

- Tytuł i opis każdej strony, obraz podglądu linku (Open Graph), `sitemap.xml`, `robots.txt`.
- Po publikacji: zgłoszenie w Google Search Console (robi użytkownik, z instrukcją).

## Strona „Legal” (`/legal`)

Jedna krótka strona po angielsku, link w stopce:
- **Privacy** (wymagane przez RODO, art. 13 — adres IP odwiedzającego to dana osobowa, a przetwarza go
  Cloudflare): administrator i kontakt (e-mail projektu `xami.sound@gmail.com`), cel (działanie
  i bezpieczeństwo strony), podstawa (art. 6 ust. 1 lit. f RODO), odbiorca (Cloudflare jako podmiot
  przetwarzający), transfer do USA (EU-U.S. Data Privacy Framework, pomocniczo standardowe klauzule
  umowne z umowy powierzenia Cloudflare), okres przechowywania według Cloudflare, prawa osoby, prawo
  skargi do Prezesa UODO, zdanie „This site does not use cookies or similar technologies”,
  Cloudflare Web Analytics jako zbiorczy pomiar bez ciasteczek.
  Tożsamość administratora: patrz „Otwarte”.
- **Terms:** pluginy i presety są darmowe, udostępniane „as is”; oprogramowanie na licencji AGPLv3
  (link do `LICENSE` w repo Vonara); znaki towarowe (VST — Steinberg).
- Bez imienia, nazwiska i adresu autora.
- Gdy dojdzie newsletter: rozbudować część Privacy (patrz „Otwarte”).

## Bezpieczeństwo

Cel: wszystko, co stosują duże serwisy i co da się zrobić za darmo. Strona statyczna nie ma serwera ani
bazy, więc największe ryzyka to przejęcie konta (GitHub, Cloudflare, e-mail), złośliwa zależność npm
lub akcja CI oraz podmiana instalatora lub fałszywe strony z „Vonarem”.

**Konta** (robi użytkownik, instrukcja krok po kroku od Claude)
- Passkey (telefon lub komputer, darmowe) jako logowanie i 2FA na: e-mailu projektu, GitHubie,
  Cloudflare. Kody odzyskiwania zapisane offline. Klucz sprzętowy (YubiKey) to jedyny płatny
  dodatek — opcjonalny.
- Menedżer haseł, unikalne hasła; powiadomienia o nowych logowaniach.
- Aplikacja Cloudflare Pages w GitHubie ma dostęp tylko do repo strony. Żadnych zbędnych tokenów.

**Repo i łańcuch dostaw**
- Reguła dla `main`: wymagany PR, zakaz force-push i usuwania.
- `package-lock.json` w repo, build przez `npm ci`, minimum zależności.
- Secret scanning z push protection, Dependabot (alerty i aktualizacje dla `npm` i `github-actions`),
  Private vulnerability reporting — w repo strony i Vonara.
- GitHub Actions: `permissions: contents: read` domyślnie; każda akcja zewnętrzna przypięta do pełnego
  SHA commita z komentarzem wersji; zakaz `pull_request_target` z kodem z PR.
- gitleaks w CI, `npm audit --omit=dev` przed publikacją, OpenSSF Scorecard okresowo.

**Cloudflare Pages**
- Plik `public/_headers` (poniżej), cel: A+ na securityheaders.com i A/A+ w MDN HTTP Observatory.
- Bez `'unsafe-inline'` w `script-src`: skrypty jako pliki w `src/` (Astro je zbundluje)
  lub z hashem; `build.inlineStylesheets: 'never'` w `astro.config.mjs`.
- Podglądy PR chronione przez Cloudflare Access (darmowy plan Zero Trust) albo wyłączone.
- **Nie** dodawaj `X-Robots-Tag: noindex` dla `*.pages.dev` — produkcja też jest na pages.dev.
- Żadnych sekretów w zmiennych builda (wszystko z `PUBLIC_` trafia do HTML).
- Sprawdzić w panelu tryb Web Analytics (od 10.2025 włączony domyślnie, wersja domyślna pomija
  odwiedzających z UE) i opisać go w Privacy zgodnie ze stanem faktycznym.

```
# public/_headers
/*
  Content-Security-Policy: default-src 'none'; script-src 'self' https://static.cloudflareinsights.com; style-src 'self'; img-src 'self'; font-src 'self'; media-src 'self'; connect-src 'self' https://cloudflareinsights.com; manifest-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: accelerometer=(), autoplay=(self), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), browsing-topics=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/audio/*
  Cache-Control: public, max-age=604800

/.well-known/security.txt
  Content-Type: text/plain; charset=utf-8
```

Po każdej zmianie `_headers`: przejście wszystkich podstron z konsolą (błędy CSP), odtworzenie MP3,
klik „Download”, test w Observatory i securityheaders.com.

**`/.well-known/security.txt`** (RFC 9116): `Contact` = link do Private vulnerability reporting w repo
Vonara (bez prywatnego e-maila), `Expires` krócej niż rok naprzód (przypomnienie o odnowieniu),
`Preferred-Languages: en, pl`, `Canonical`, `Policy` = `SECURITY.md`. `SECURITY.md` w obu repo.

**Pobieranie instalatora**
- SHA-256 każdego pliku przy przycisku „Download” i w notatkach wydania na GitHubie, plus instrukcja:
  `Get-FileHash .\Vonar-<wersja>-Setup.exe -Algorithm SHA256`.
- Zdanie: „Official downloads are only available from this site and the GitHub repository.
  Any other site is unofficial.”
- Sekcja „Why does Windows SmartScreen warn me?”.
- W repo Vonara: atestacje pochodzenia buildu (`actions/attest-build-provenance`), weryfikowalne
  przez `gh attestation verify`; niezmienne wydania (immutable releases), jeśli dostępne.
- Podpis Authenticode: wniosek do **SignPath Foundation** (darmowy dla open source, podpis jako
  „SignPath Foundation”, nie ujawnia nazwiska) po pierwszym publicznym wydaniu. Wymaga: publicznego
  repo, buildu w CI, ręcznej akceptacji każdego podpisu, MFA, polityki podpisywania na stronie.
  Nie używać Certum Open Source (płatny i pokazuje imię i nazwisko w podpisie).

**Monitoring i reakcja**
- Powiadomienia e-mail o wdrożeniach z Cloudflare Pages (nieoczekiwane wdrożenie = alarm).
- Raz w miesiącu: wyszukanie „Vonar VST download” i literówek, zgłaszanie fałszywych stron
  (Google Safe Browsing, Microsoft „Report unsafe site”).
- Plan awaryjny w `docs/INCIDENT.md`: cofnięcie wdrożenia (Pages → Deployments → Rollback),
  unieważnienie tokenów, oznaczenie złośliwego wydania, ostrzeżenie użytkowników.

**Własna domena (później):** blokada transferu u rejestratora, ukryte dane WHOIS, DNSSEC, CAA,
przekierowanie 301 z pages.dev, zgłoszenie HSTS preload, SPF/DKIM/DMARC przy poczcie w domenie.

## Lista przed publikacją

Każdy punkt musi być spełniony przed pierwszą publikacją i sprawdzany przy dużych zmianach.

| # | Punkt | Jak u nas |
|---|---|---|
| 1 | Polityka prywatności | Część „Privacy” na `/legal`. |
| 2 | Regulamin | Część „Terms” na `/legal`. |
| 3 | Żadnych sekretów w kodzie strony | Strona statyczna, bez kluczy API. Nigdy nie commituj kluczy, tokenów ani haseł; CI sprawdza repo skanerem sekretów (np. gitleaks). |
| 4 | Wymuszone HTTPS | Cloudflare Pages robi to automatycznie; wszystkie linki `https://`. |
| 5 | Baner cookies | **Nie dodajemy**, bo strona nie zapisuje nic na urządzeniu (art. 399 Prawa komunikacji elektronicznej). Zasada: żadnych ciasteczek ani localStorage (odtwarzacz nie zapamiętuje głośności), żadnych narzędzi, które je ustawiają (Google Analytics, YouTube bez `youtube-nocookie`, piksele reklamowe). Sprawdzenie w DevTools → Application na produkcji przed każdą publikacją. |
| 6 | Tytuły i opisy meta | Każda strona ma własny `<title>` i `description`. |
| 7 | Obraz podglądu linku | Obraz Open Graph 1200×630 dla każdej strony produktu. |
| 8 | Favicon | Ikona z logo (SVG + PNG 180×180 dla Apple). |
| 9 | `sitemap.xml` + `robots.txt` | `@astrojs/sitemap` i statyczny `robots.txt`. |
| 10 | Teksty alternatywne | Każdy obraz ma `alt`; obrazy dekoracyjne `alt=""` i `aria-hidden`. |
| 11 | Kompresja obrazów | Komponent obrazów Astro, formaty WebP/AVIF, właściwe rozmiary. Zrzut Vonara (PNG ok. 570 KB) musi wyjść dużo lżejszy. |
| 12 | Szybkość ładowania | Lighthouse w CI na telefonie: 100 w Performance, Accessibility, Best Practices i SEO (minimum do scalenia: 95). Audio ładowane dopiero po kliknięciu „play”. |
| 13 | Kontrast kolorów | Tekst ≥ 4,5:1, duże nagłówki ≥ 3:1 (szara druga linia `#A3A3A3` tylko w dużych nagłówkach). |
| 14 | Wersja na telefon | Sprawdzone przy szerokości 375 px; brak przewijania w bok. |
| 15 | Własna strona 404 | W stylu strony, z linkiem do strony głównej i do pobierania. |
| 16 | Brak zepsutych linków | CI sprawdza linki wewnętrzne przy każdym PR; linki zewnętrzne raz przed publikacją. |
| 17 | Walidacja formularzy | Na razie brak formularzy. Przy newsletterze: walidacja po stronie MailerLite i w formularzu. |
| 18 | Ochrona przed spamem | Na razie nie dotyczy. Przy newsletterze: double opt-in i Cloudflare Turnstile (darmowy, bez ciasteczek śledzących). |
| 19 | Statystyki | Cloudflare Web Analytics. |
| 20 | Jedno wyraźne wezwanie do działania | „Download” — jeden główny przycisk w każdej sekcji, reszta drugorzędna. |

## Etapy

1. **Szkielet:** pusta strona Astro opublikowana na `*.pages.dev`, CI buduje stronę.
   Gotowe, gdy adres działa i podgląd PR działa.
2. **Strona Vonara:** pełny układ z makiety A, prawdziwe teksty, zrzut, linki pobierania.
3. **Dema:** pliki audio, plik danych, odtwarzacz z filtrem.
4. **Wykończenie:** strona `/legal` i cała „Lista przed publikacją” (20 punktów) odhaczona.
   Gotowe, gdy każdy punkt ma status w `docs/PROGRESS.md`.

## Co robi użytkownik

- Zakłada darmowe konto Cloudflare i podłącza repo do Cloudflare Pages (jednorazowo).
- Włącza regułę ochrony `main` w repo (jak w Vonarze: PR wymagany, 0 zatwierdzeń, CI musi przejść).
- Ogląda adresy podglądu i produkcji, odsłuchuje dema. Scalanie PR zostawia Claude (patrz „Sposób pracy”).

## Otwarte

- ~~Ile dem~~ — zdecydowane: **12 presetów wybranych przez użytkownika** (2026-11-14), lista
  w `src/data/vonar-demo-picks.json`.
- ~~Adres strony~~ — zdecydowane: `xami-sound.pages.dev`.
- ~~E-mail projektu~~ — założony: `xami.sound@gmail.com`.
- ~~Tożsamość administratora w Privacy~~ — zdecydowane: „Xami” + `xami.sound@gmail.com` + zdanie,
  że dane osoby odpowiedzialnej zostaną podane na uzasadnione żądanie. Żadnych prawdziwych danych
  osobowych autora na stronie ani w repo.
- Wniosek do SignPath Foundation po publicznym wydaniu Vonara.
- Czcionki (Etap 2): Fontsource dołącza wszystkie podzbiory (cyrylica, greka, wietnamski). Przeglądarka
  pobiera tylko potrzebne (`unicode-range`), ale można importować tylko `latin` + `latin-ext`, żeby
  zmniejszyć `dist/`. Do rozważenia: wersja zmienna `@fontsource-variable/inter` (jeden plik zamiast kilku).
- CI: gitleaks pobierany jako plik binarny z sumą SHA-256 (zamiast `gitleaks-action`, która wymaga
  licencji dla organizacji). Dependabot nie aktualizuje go sam — przy aktualizacji zmienić wersję i sumę ręcznie.
- Animacje (WCAG 2.2.2): pasek fali, przesuwane nazwy i unoszący się zrzut ruszają się dłużej niż 5 s.
  Teraz wyłącza je tylko `prefers-reduced-motion`. Do rozważenia przycisk „Pause animations” (Etap 4, audyt dostępności).
- ~~Zakładka „Presets” w galerii~~ — zrzut otwartego menu presetów od użytkownika (2026-11-14). Liczby w menu
  obejmują też presety użytkownika (razem 336), więc przy nowej wersji zrobić zrzut na czystej instalacji.
- Pasek boczny / lista pluginów (pomysł użytkownika, 2026-11-14): odłożone do drugiego produktu. Teraz linki
  do podstron w menu u góry i w stopce; przy drugim produkcie menu „Plugins” i kafelki na stronie głównej.
- Statystyki przy własnej domenie: po podpięciu domeny przez Cloudflare sprawdzić, czy Web Analytics ma opcję
  „excluding visitor data in the EU”; jeśli tak — włączyć z nią i opisać w `/legal`. CSP w `_headers` nadal
  dopuszcza `cloudflareinsights.com`, więc kod strony nie wymaga zmian.
- Newsletter (później): polityka prywatności rozszerzona o dane subskrybentów, regulamin newslettera,
  niezaznaczony checkbox zgody, double opt-in, link wypisania, ochrona przed spamem (punkty 17–18).

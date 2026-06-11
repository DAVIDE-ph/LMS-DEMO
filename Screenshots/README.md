# Screenshots — automazione Playwright

Questa cartella contiene uno script che apre Chromium, fa login a pLMS web,
naviga ogni rotta dell'app e scatta uno screenshot **per il tema chiaro e per
quello scuro**. Prima dello scatto inietta CSS+JS che:

- Sfocano i valori di tutti gli `<input>` / `<textarea>` / `<select>`.
- Sovrappongono un **rettangolo opaco** ad ogni cella di tabella che contiene
  PII (nome, cognome, codice fiscale, telefono, email), al nome utente nel
  topbar e ai valori sensibili di card/dettaglio cliente.
- Coprono via regex codici fiscali italiani, email, IBAN, P.IVA, telefoni
  e date, ovunque appaiano nella pagina.

Gli overlay sono nodi DOM extra che React non conosce: rimangono sopra il
contenuto anche se React fa re-render tra `__plmsSanitize()` e lo scatto.

I PNG finiscono in:

- `Screenshots/light/<slug>.png` — tema chiaro
- `Screenshots/dark/<slug>.png` — tema scuro

## 1. Setup (una sola volta)

```bash
cd Screenshots
npm install
npm run install:browsers
```

Il secondo comando scarica Chromium (~150 MB) usato da Playwright in headless.

## 2. Configurazione credenziali

Lo script si autentica come un normale utente della tua istanza.
Definisci le variabili d'ambiente prima di lanciarlo:

```bash
# Caso 1 — istanza unica (deploy in produzione, oppure container locale)
export PLMS_BASE_URL="http://localhost:1580"   # o https://il-tuo-dominio.it
export PLMS_USERNAME="il-tuo-username"
export PLMS_PASSWORD="la-tua-password"
```

```bash
# Caso 2 — sviluppo locale: Vite (5173) + backend separato (1580)
export PLMS_BASE_URL="http://localhost:5173"
export PLMS_API_URL="http://localhost:1580"
export PLMS_USERNAME="il-tuo-username"
export PLMS_PASSWORD="la-tua-password"
```

`PLMS_API_URL` serve solo se frontend e backend girano su host/porte diversi
(tipico in dev mode con `vite`). In produzione lascialo vuoto: lo script usa
lo stesso host di `PLMS_BASE_URL`. Nota: in dev il backend deve avere
`http://localhost:5173` tra le `CORS__AllowedOrigins`.

> **Le credenziali non vengono salvate da nessuna parte** — sono solo lette
> dall'env e usate dal browser headless per fare il login UI standard.

## 3. Lancio

```bash
npm run screenshots
```

Lo script:

1. Apre Chromium (headless di default).
2. Va su `/login`, riempie username + password, fa submit.
3. Per ogni rotta dell'app:
   - imposta `localStorage.lms_theme = 'light'`, ricarica, scatta;
   - imposta `'dark'`, ricarica, scatta.
4. Apre alcune modali rilevanti (Stampa moduli, Nuovo preventivo, Nuova
   attività) e fa lo stesso.
5. Salva tutto in `light/` e `dark/`.

Tempo stimato: ~2-3 minuti per una run completa (15 pagine × 2 temi + modali).

## 4. Opzioni utili

| Variabile d'ambiente | Effetto |
|----------------------|---------|
| `PLMS_HEADED=1` | Mostra Chromium a schermo (utile per debug). |
| `PLMS_VIEWPORT=375x812` | Cambia il viewport (default desktop `1440x900`). |
| `PLMS_NO_BLUR=1` | Disattiva il blur (**solo se sei sicuro di girare contro un DB demo/anonimo**). |
| `PLMS_ROUTES=homepage,calendario,moduli-editor` | Cattura solo alcune rotte (gli `slug` sotto). |

## 5. Slug → pagina

| Slug | Path | Descrizione |
|------|------|-------------|
| `login` | `/login` | Form di accesso |
| `homepage` | `/homepage` | Dashboard |
| `contatti` | `/contatti` | Lista contatti / clienti |
| `calendario` | `/calendario` | Calendario attività |
| `todo` | `/todo` | TODO personale |
| `scan-inbox` | `/scan-inbox` | Inbox scansioni |
| `ads` | `/ads` | Administrative dashboard |
| `ads-movimenti` | `/ads-movimenti` | Movimenti contabili |
| `disponibilita` | `/disponibilita` | Disponibilità slot |
| `prenota-app` | `/prenota-app` | Prenotazione appuntamenti |
| `lavoro` | `/lavoro` | Lista clienti per lavoro |
| `impostazioni` | `/impostazioni` | Impostazioni utente |
| `moduli-list` | `/impostazioni/moduli` | Libreria template moduli |
| `moduli-editor` | `/impostazioni/moduli/nuovo` | Editor a blocchi (drag-and-drop) |
| `privacy-policy` | `/privacy-policy` | Privacy & policy |
| `modal-stampa-moduli` | `/lavoro/<id>` → modale | "Stampa moduli" (4 fissi + custom) |
| `modal-nuovo-preventivo` | `/lavoro/<id>` → modale | "Nuovo preventivo" |
| `modal-attivita` | `/lavoro/<id>` → modale | "Nuova attività" |

Le modali aprono il primo cliente disponibile in `/contatti` (a colpo
d'occhio per `<a href="/lavoro/<id>">`). Se la tua istanza non ha clienti, le
modali vengono saltate e nel log vedi `skip: bottone … non trovato`.

## 6. Aggiornare gli screenshot del README

Quando vuoi rimpiazzare i marketing-screenshot in `Images/` (referenziati da
`README.md` e `README.it.md`), basta:

```bash
PLMS_ROUTES=homepage,lavoro,calendario,scan-inbox,moduli-editor,modal-stampa-moduli npm run screenshots
cp Screenshots/light/*.png ../Images/   # o quelli dark, a tuo gusto
```

## 7. Nota sulla sicurezza dei dati

Lo script applica overlay opachi sulla **pagina renderizzata** prima dello
screenshot. **Il DOM contiene comunque i dati reali** durante l'esecuzione —
quindi:

- Esegui sempre lo script su una macchina di tua proprietà.
- Non condividere i `.png` di `Screenshots/light/` e `Screenshots/dark/`
  prima di averli aperti uno a uno e verificato che gli overlay coprano
  tutti i campi sensibili.
- Se aggiungi una nuova pagina con classi/struttura diversa, controlla
  che il sanitize la copra: in caso contrario aggiungi i selettori in
  `take-screenshots.mjs` (`__plmsSanitize` → blocco "Card / valori
  sensibili noti").
- Per il massimo della tranquillità, gira su un DB demo con clienti finti
  ("Mario Rossi", "Anna Bianchi", …) e usa `PLMS_NO_BLUR=1`.

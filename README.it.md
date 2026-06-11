[English 🇺🇸](./README.md) | Italiano 🇮🇹

<p align="center">
  <img src="Frontend/public/logo.png" alt="Logo pLMS" width="160">
</p>

<h1 align="center">pLMS — Il gestionale moderno per studi legali</h1>

<p align="center">
  <strong>Il gestionale per avvocati che mette al primo posto la riservatezza del cliente e la semplicità d'uso.</strong><br>
  Web, iOS e Android — 100% on-premise, GDPR by design, pronto in pochi minuti.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/GDPR-by%20design-16a34a?style=for-the-badge&logo=shieldsdotio&logoColor=white" alt="GDPR by design">
  <img src="https://img.shields.io/badge/dati-On--Premise-0f766e?style=for-the-badge&logo=lock&logoColor=white" alt="On-Premise">
  <img src="https://img.shields.io/badge/piattaforme-Web%20%7C%20iOS%20%7C%20Android-2563eb?style=for-the-badge" alt="Piattaforme">
  <img src="https://img.shields.io/badge/deploy-Docker%20self--hosted-1f6feb?style=for-the-badge&logo=docker&logoColor=white" alt="Self-hosted">
  <img src="https://img.shields.io/badge/licenza-Apache%202.0-blue?style=for-the-badge" alt="Licenza">
</p>

<p align="center">
  <a href="https://demolms.dph.ovh/">
    <img src="https://img.shields.io/badge/▶_Prova_la_demo_live-demolms.dph.ovh-4f46e5?style=for-the-badge" alt="Demo live">
  </a>
</p>

> **🚀 Demo live** — provala prima di installare nulla: <https://demolms.dph.ovh/>
> Username `demo` · Password `demo`. La demo gira su un database pulito con
> clienti fittizi; sentiti libero di creare, modificare e stampare a piacere.

---

## 🛡️ I dati dei tuoi clienti restano nei tuoi server. Punto.

Il segreto professionale e il GDPR non sono un'opzione: sono la **base** su cui pLMS è stato progettato.

- 🇪🇺 **Self-hosted al 100%** — installi pLMS sul tuo server di studio, sul tuo VPS in Europa o sul tuo cloud sovrano. **I dati dei clienti non transitano mai su server di terzi sconosciuti**, a differenza dei gestionali SaaS dove il fornitore è di fatto contitolare del trattamento.
- 🔐 **Dati cifrati in transito** (HTTPS/TLS via reverse-proxy a tua scelta: Nginx, Traefik, Caddy) e a riposo (cifratura nativa di PostgreSQL/disco).
- 👥 **Isolamento rigoroso per-utente**: ogni avvocato vede solo i propri TODO, le proprie scansioni, il proprio calendario e i propri token OAuth. Nessuna fuga accidentale tra colleghi.
- 🔑 **Niente segreti nel codice**: credenziali, password DB, token Google e Microsoft vivono solo in variabili d'ambiente, mai committate in git.
- 📜 **Pieno diritto all'oblio**: i dati sono in **un singolo PostgreSQL** che controlli tu — backup, export, cancellazione e portabilità sono operazioni dirette in SQL, non ticket aperti a un fornitore.
- 🔍 **Auditabile**: log strutturati Serilog e telemetria OpenTelemetry pronti per Loki/ELK/Datadog, così puoi dimostrare conformità in caso di ispezione.
- 🆓 **Codice aperto** (Apache 2.0): puoi farlo verificare dal tuo DPO o da un consulente di fiducia — niente black-box.

> 💡 **Nessun lock-in**, nessun "trust us": se domani cambi idea, prendi il tuo PostgreSQL e te ne vai. I dati sono **i tuoi**, in un formato standard.

---

## ✨ Pensato per chi non vuole un altro gestionale "anni 2000"

I gestionali per studi legali tradizionali sono noti per le interfacce datate, i menu a 5 livelli e i flussi che richiedono settimane di formazione. **pLMS parte dall'idea opposta**: deve essere così semplice che il primo giorno lo usi, il secondo lo ami.

| | **pLMS** | Gestionali tradizionali |
|---|---|---|
| Interfaccia | Moderna, dark mode nativa, responsive | Spesso ferma agli anni 2000, solo desktop |
| Mobile | App **native** iOS e Android, sincronizzate in tempo reale | Spesso assenti o web-app pesanti |
| Apprendimento | Pochi minuti, navigazione intuitiva | Giorni di formazione, manuali da centinaia di pagine |
| Sicurezza dati | **Self-hosted**, dati nei tuoi server | Cloud del fornitore, server fuori UE |
| Aggiornamenti | `docker compose pull` (1 minuto) | Tecnico in studio, fermo lavoro |
| Costo | Open source (Apache 2.0) | Licenze annue per postazione |
| Flusso scansione | **Scan-to-Email + OCR italiano automatico** | Scansione → cartella → rinomina manuale |
| Moduli legali | **Editor drag-and-drop dei template** con placeholder e firma | PDF/Word fissi, niente personalizzazione |
| Integrazioni | Google Calendar e OneDrive bidirezionali, native | Spesso assenti o macchinose |

---

## 🚀 Perché lo studio ti ringrazierà

- 🏛️ **Pensato da avvocati per avvocati**: ogni schermata rispecchia il flusso di lavoro reale di uno studio.
- ⚡ **Velocissimo**: SPA web + app native iOS/Android, niente plugin, niente ricaricamenti lenti.
- 🌍 **Multipiattaforma**: web da qualunque browser, app native iOS e Android, perfettamente sincronizzate.
- 🤖 **Automazioni "AI-grade" incluse**: rename automatico in italiano via OCR, rimozione pagine bianche, sync bidirezionale Google Calendar e OneDrive.
- 🇮🇹 **Italian-first** con UX bilingue, costruita attorno al diritto italiano (procura, gratuito patrocinio, codice fiscale, IBAN, fasi del preventivo, …).
- 💸 **Zero canone per-utente**: aggiungi avvocati, segretarie, praticanti senza pagare un centesimo in più.

---

## 💼 Cosa fa pLMS — in sintesi

### 👥 Anagrafica clienti & contatti
Schede cliente complete: dati civili, fiscali e di contatto, cartelle documentali, allegati, attività correlate, pagamenti e preventivi — **tutti collegati**. Ricerca rapida, filtri intelligenti, anagrafica completa con codice fiscale, indirizzo, recapiti, IBAN e note libere.

### 📑 Preventivi & template
Crea proposte con **fasi multiple**, importi, descrizioni e template riutilizzabili. Genera PDF professionali pronti per la stampa con un click e converte ogni preventivo in attività tracciate, senza copia-incolla.

### 💶 Pagamenti & cash flow
Registra movimenti, segna pagamenti totali o parziali, vedi le **statistiche mensili** a colpo d'occhio, ottieni totali per cliente, periodo e fase. Le dashboard evidenziano subito ciò che è scaduto e ciò che è incassato.

### 🗓️ Attività, calendario & scadenze
Pianifica udienze, scadenze, appuntamenti e task per ogni cliente. La **sincronizzazione bidirezionale con Google Calendar** mantiene tutti i dispositivi allineati: gli eventi creati su Google appaiono in pLMS e viceversa, con deduplicazione e backfill automatico.

- 🔔 Notifiche push su iOS e Android (sync delle scadenze in background).
- 📅 Filtri per cliente, utente, intervallo temporale.
- 🧑‍⚖️ Calendari personali: ogni avvocato vede solo il proprio lavoro, lo studio vede l'aggregato.

### 📂 Documenti con mirror OneDrive
Carica e organizza ogni file (PDF, DOCX, immagini …) in una struttura a cartelle per cliente. Il **sync bidirezionale OneDrive** replica ogni documento in cartelle aziendali `LMS/Cognome Nome (#id)/`: tutto lo studio ha una vista familiare in Esplora Risorse / Finder, accessibile da ovunque.

- 📤 Drag-and-drop dal web.
- 📷 Camera e file picker da mobile.
- 🔁 Le modifiche fatte su OneDrive ritornano in pLMS.
- 🧠 **UX di rinomina intelligente**: l'estensione del file è bloccata e il nome base viene auto-selezionato — impossibile rompere un `.pdf` trasformandolo in `.txt`.

### 📠 Scan-to-Email (Gmail multi-utente)
Una vera **pipeline di scansione di livello legale**, che funziona da qualunque rete del mondo:

1. La stampante Ricoh / Konica / HP scansiona via SMTP (sempre permesso da ogni ISP) verso una casella Gmail dedicata.
2. pLMS fa polling IMAP ogni 30 secondi, legge il tag `+username` di Gmail e instrada l'allegato all'avvocato corretto.
3. **Le pagine bianche vengono eliminate automaticamente**.
4. La nuova `ScanInbox` compare in tempo reale su web, iOS e Android.
5. Ogni utente vede **solo le proprie scansioni**: isolamento per-utente rigoroso.

### 🤖 Auto-rename italiano con OCR on-prem
Novità della v5.4: ogni scansione viene **rinominata automaticamente in italiano** in modo descrittivo, usando:

- 🇮🇹 **Tesseract OCR italiano** (totalmente on-premise, gratuito).
- 📄 Rasterizzazione **`pdftoppm` di Poppler**, che gestisce qualunque PDF (CCITT, JBIG2, JPEG2000, immagini full-page).
- 🧠 Un motore di **apprendimento**: quando rinomini manualmente una scansione, pLMS apprende lo schema tramite fingerprint del contenuto e lo applica a documenti simili futuri.

Esempi prodotti dal sistema in produzione:
> `email-50-…pdf` → **`Notifica SAYED AHMED MOHAMED IBRAHIM MOHAMED 2026-05-07.pdf`**
> `email-45-…pdf` → **`Procura MOHAMED IBRAHIM MOHAMED SAYED AHMED 1991-07-27.pdf`**

### 📝 Moduli legali — **fissi e personalizzabili** (5.5+)
I quattro moduli classici di ogni studio italiano sono **sempre presenti, pronti da stampare**, con lo stesso layout testato in udienza da anni:

- **Fascicolo personale** del cliente.
- **Informativa privacy**.
- **Procura alle liti** (con flag opzionali `eletto domicilio` e `autentica firma`).
- **Gratuito patrocinio** con le quattro sezioni intercambiabili (istanza, autocertificazione reddito, stato di famiglia, redditi all'estero) e la firma PNG dell'avvocato già incorporata.

E adesso pLMS va molto oltre: **ogni studio può disegnare i propri moduli** con un editor visuale:

- 🎨 **Editor a blocchi drag-and-drop** (basato su `@dnd-kit`) sotto `Impostazioni → Moduli`. Trascini blocchi di ogni tipo — paragrafi, intestazioni, campi variabili, checkbox, separatori, salti pagina, immagini incorporate, firma dell'avvocato — e li riordini con un solo gesto.
- 🧩 **Placeholder intelligenti** che si auto-compilano in fase di stampa leggendo il DB: `{{Cliente.NomeCompleto}}`, `{{Cliente.CodiceFiscale}}`, `{{Cliente.LuogoDataNascita}}`, `{{Utente.NomeCompleto}}`, `{{Utente.Foro}}`, `{{Studio.Intestazione}}`, `{{Oggi}}` … con filtri pipe per la formattazione (`|data:dd/MM/yyyy`, `|upper`, `|cap`, `|title`).
- ✍️ **Campi variabili con valore di default**: in fase di stampa l'avvocato vede un piccolo form pre-compilato (textarea, input, checkbox) e può ritoccare ogni valore prima di generare il PDF — basta correzioni a penna sulla stampa.
- 🗂️ **Template personali vs studio**: tieni i tuoi privati o condividili con tutto lo studio; sui condivisi solo l'admin scrive, sui personali libertà totale.
- 🖋️ **Firma dell'avvocato** incorporata automaticamente come PNG dove il template lo richiede (valore legale preservato).
- 📱 **Disponibile su ogni dispositivo**: lo stesso form dinamico compare su web, iOS e Android — dal tablet in udienza, dalla scrivania, dall'iPhone in tribunale.
- 🔁 **Retrocompatibile**: i quattro moduli classici continuano a usare il loro renderer originale pixel-perfect; solo i tuoi template custom passano dal nuovo motore DSL. Nessun rischio di regressione.

Tutti i PDF sono generati con **QuestPDF**: vettoriali, perfetti, senza passare da Word/LibreOffice.

### 🗒️ TODO personale & promemoria
Lista TODO per-utente (no, i colleghi non la vedono!) con priorità, scadenze e conversione in un tap di un TODO in attività di calendario.

### 📅 Disponibilità & PrenotaApp
Pubblica gli slot di disponibilità dello studio, lascia che i clienti prenotino online e fai confluire le nuove prenotazioni direttamente nel calendario.

### 📊 Dashboard real-time
La home è una **plancia di comando** compatta: clienti del mese, preventivi del mese, scadenze imminenti, contatore scansioni, TODO, ultimi pagamenti — scegli tu i pannelli da mostrare.

### ⚙️ Multi-utente, multi-ruolo
Autorizzazione basata sui ruoli con un pannello admin pulito: invita utenti, imposta ruoli, gestisci firme e impostazioni individuali. Ogni utente ha **i propri** TODO, scansioni, token calendario e identità OneDrive.

### 🌗 UX moderna
- **Dark mode** + light mode (segue automaticamente il tema di sistema su web, iOS e Android).
- Material 3 su Android, look nativo SwiftUI su iOS, UI React rifinita sul web.
- UI bilingue italiano/inglese.

---

## 📱 Disponibile su ogni dispositivo

<table>
<tr>
<td align="center" width="33%">
<h3>🌐 Web</h3>
SPA React 19 + Vite<br>
Servita dallo stesso unico container Docker.<br>
Funziona su Chrome, Safari, Firefox, Edge — desktop e tablet.
</td>
<td align="center" width="33%">
<h3>📱 iOS</h3>
App nativa SwiftUI<br>
Notifiche push, refresh scadenze in background, file picker File / iCloud, dark mode nativa.
</td>
<td align="center" width="33%">
<h3>🤖 Android</h3>
App nativa Kotlin + Jetpack Compose (Material 3)<br>
Sync scadenze WorkManager, notifiche di sistema, tema adattivo, deep-link routing.
</td>
</tr>
</table>

Tutti i client parlano con lo **stesso backend** via API REST HTTPS e restano perfettamente sincronizzati.

---

## 📸 Screenshots

> Tutti gli screenshot sono catturati automaticamente dallo script Playwright
> [`Screenshots/take-screenshots.mjs`](Screenshots/) e hanno i dati personali
> coperti da overlay opachi prima del salvataggio.



### Web app — Tema chiaro

<p align="center">
  <img src="Screenshots/light/login.png"               width="30%" alt="Login">
  <img src="Screenshots/light/homepage.png"            width="30%" alt="Homepage / dashboard">
  <img src="Screenshots/light/contatti.png"            width="30%" alt="Lista contatti">
  <br>
  <img src="Screenshots/light/calendario.png"          width="30%" alt="Calendario">
  <img src="Screenshots/light/todo.png"                width="30%" alt="TODO personale">
  <img src="Screenshots/light/scan-inbox.png"          width="30%" alt="Scan inbox">
  <br>
  <img src="Screenshots/light/ads.png"                 width="30%" alt="Dashboard ADS">
  <img src="Screenshots/light/ads-movimenti.png"       width="30%" alt="ADS — movimenti contabili">
  <img src="Screenshots/light/disponibilita.png"       width="30%" alt="Disponibilità slot">
  <br>
  <img src="Screenshots/light/prenota-app.png"         width="30%" alt="Pagina pubblica di prenotazione">
  <img src="Screenshots/light/lavoro.png"              width="30%" alt="Fascicolo cliente">
  <img src="Screenshots/light/modal-stampa-moduli.png" width="30%" alt="Modale “Stampa moduli”">
  <br>
  <img src="Screenshots/light/impostazioni.png"        width="30%" alt="Impostazioni">
  <img src="Screenshots/light/moduli-list.png"         width="30%" alt="Libreria template moduli">
  <img src="Screenshots/light/moduli-editor.png"       width="30%" alt="Editor a blocchi (drag-and-drop)">
  <br>
  <img src="Screenshots/light/privacy-policy.png"      width="30%" alt="Privacy & policy">
</p>

### Web app — Tema scuro

<p align="center">
  <img src="Screenshots/dark/login.png"               width="30%" alt="Login (dark)">
  <img src="Screenshots/dark/homepage.png"            width="30%" alt="Homepage / dashboard (dark)">
  <img src="Screenshots/dark/contatti.png"            width="30%" alt="Lista contatti (dark)">
  <br>
  <img src="Screenshots/dark/calendario.png"          width="30%" alt="Calendario (dark)">
  <img src="Screenshots/dark/todo.png"                width="30%" alt="TODO personale (dark)">
  <img src="Screenshots/dark/scan-inbox.png"          width="30%" alt="Scan inbox (dark)">
  <br>
  <img src="Screenshots/dark/ads.png"                 width="30%" alt="Dashboard ADS (dark)">
  <img src="Screenshots/dark/ads-movimenti.png"       width="30%" alt="ADS — movimenti contabili (dark)">
  <img src="Screenshots/dark/disponibilita.png"       width="30%" alt="Disponibilità slot (dark)">
  <br>
  <img src="Screenshots/dark/prenota-app.png"         width="30%" alt="Pagina pubblica di prenotazione (dark)">
  <img src="Screenshots/dark/lavoro.png"              width="30%" alt="Fascicolo cliente (dark)">
  <img src="Screenshots/dark/modal-stampa-moduli.png" width="30%" alt="Modale “Stampa moduli” (dark)">
  <br>
  <img src="Screenshots/dark/impostazioni.png"        width="30%" alt="Impostazioni (dark)">
  <img src="Screenshots/dark/moduli-list.png"         width="30%" alt="Libreria template moduli (dark)">
  <img src="Screenshots/dark/moduli-editor.png"       width="30%" alt="Editor a blocchi (dark)">
  <br>
  <img src="Screenshots/dark/privacy-policy.png"      width="30%" alt="Privacy & policy (dark)">
</p>

---

## 🧱 Stack tecnologico

| Layer | Tecnologia |
|---|---|
| Backend | **ASP.NET Core 10** (Minimal APIs), Serilog, OpenTelemetry, FluentValidation, DbUp |
| Database | **PostgreSQL** (migrazioni versionate) |
| Data access | Dapper + Npgsql |
| PDF & moduli | **QuestPDF** |
| Pipeline scansioni | MailKit (IMAP), PdfPig, SkiaSharp, **poppler-utils**, **Tesseract OCR italiano** |
| Calendario / Drive | Integrazioni HTTP native con Google Calendar e Microsoft Graph (OneDrive) |
| Frontend | **React 19** + Vite + React Router + Tiptap |
| iOS | **Swift / SwiftUI** |
| Android | **Kotlin / Jetpack Compose / Material 3** |
| Container | Singola immagine Docker multi-arch (linux/amd64 + linux/arm64) |

---

## ⚡ Quick start (Docker)

```bash
# 1) Configura le variabili d'ambiente
cp .env.example .env
# modifica CONNECTION_STRING, GoogleCalendar__*, OneDrive__*, ecc.

# 2) Avvio
docker compose up -d

# 3) Apri l'app
open http://localhost:1580
```

L'intero stack — backend + frontend + ingestione scansioni + auto-rename + sync calendario + mirror OneDrive — gira in **un singolo container**. Niente Node, niente .NET, niente nginx da installare sull'host.

📖 Guida deploy completa: [DOCKER.md](DOCKER.md) · Manuale utente: [Manuale.md](Manuale.md) · Setup Scan-to-Email: [scripts/SCANNER.md](scripts/SCANNER.md)

---

## 📦 Cosa contiene questo repository

```
pLMS/
├─ Backend/        API .NET 10 + servizi background
├─ Frontend/       SPA React + Vite
├─ android/        App mobile Kotlin / Jetpack Compose
├─ ios/            App mobile Swift / SwiftUI
├─ Docker Compose/ Stack compose pronto per la produzione
├─ scripts/        Script operativi (deploy, setup scanner, …)
├─ docs/           Note di architettura e per sviluppatori
└─ Images/         Screenshot per il marketing
```

---

## 🛠️ Requisiti

- **Docker** e **Docker Compose**.
- Un'istanza esterna di **PostgreSQL** (versione 13+).
- (Opzionale) **Google Cloud project** per OAuth Calendar.
- (Opzionale) **App Azure AD** per OAuth OneDrive.

---

## ⚠️ Avvertenza di sicurezza

> Non committare mai `.env`, token OAuth o password del database nel codice sorgente.
> In produzione usa sempre variabili d'ambiente e ruota le credenziali con regolarità.

---

## 📄 Licenza

Distribuito con [licenza Apache 2.0](https://github.com/DAVIDE-ph/pLMS/blob/main/LICENSE).

<p align="center">
  <em>pLMS — Gestisci lo studio. Possiedi i tuoi dati. Riprenditi il tuo tempo.</em>
</p>

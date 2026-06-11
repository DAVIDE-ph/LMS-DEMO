[Italiano 🇮🇹](./README.it.md) | English 🇺🇸

<p align="center">
  <img src="Frontend/public/logo.png" alt="pLMS Logo" width="160">
</p>

<h1 align="center">pLMS — The Modern Lawyer Management System</h1>

<p align="center">
  <strong>The law firm management system that puts client confidentiality and ease of use first.</strong><br>
  Web, iOS and Android — 100% on-premise, GDPR by design, ready in minutes.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/GDPR-by%20design-16a34a?style=for-the-badge&logo=shieldsdotio&logoColor=white" alt="GDPR by design">
  <img src="https://img.shields.io/badge/data-On--Premise-0f766e?style=for-the-badge&logo=lock&logoColor=white" alt="On-Premise">
  <img src="https://img.shields.io/badge/platform-Web%20%7C%20iOS%20%7C%20Android-2563eb?style=for-the-badge" alt="Platforms">
  <img src="https://img.shields.io/badge/deploy-Self--hosted%20Docker-1f6feb?style=for-the-badge&logo=docker&logoColor=white" alt="Self-hosted">
  <img src="https://img.shields.io/badge/license-Apache%202.0-blue?style=for-the-badge" alt="License">
</p>

---

## 🛡️ Your clients' data stays on your servers. Period.

Attorney–client privilege and the GDPR are not a checkbox: they are the **foundation** pLMS was designed on.

- 🇪🇺 **100% self-hosted** — install pLMS on your office server, on your European VPS, or on a sovereign cloud of your choice. **Client data never transits unknown third-party servers**, unlike SaaS suites where the vendor effectively becomes a co-controller of the processing.
- 🔐 **Encrypted in transit** (HTTPS/TLS via the reverse-proxy you prefer: Nginx, Traefik, Caddy) and at rest (native PostgreSQL/disk encryption).
- 👥 **Strict per-user isolation**: each lawyer sees only their own todos, scans, calendar and OAuth tokens. No accidental leaks between colleagues.
- 🔑 **No secrets in code**: credentials, DB passwords, Google and Microsoft tokens live only in environment variables, never committed to git.
- 📜 **Real right to erasure**: data lives in **a single PostgreSQL** that you control — backups, exports, deletion and portability are direct SQL operations, not vendor support tickets.
- 🔍 **Auditable**: structured Serilog logs and OpenTelemetry telemetry ready for Loki / ELK / Datadog, so you can prove compliance during an inspection.
- 🆓 **Open source** (Apache 2.0): your DPO or trusted consultant can review every line — no black box.

> 💡 **No lock-in, no "trust us"**: if you change your mind tomorrow, take your PostgreSQL and walk away. The data is **yours**, in a standard format.

---

## ✨ Built for lawyers who don't want another "year-2000s" management suite

Traditional legal software is famous for dated interfaces, five-level menus and workflows that take weeks to learn. **pLMS starts from the opposite premise**: it must be so simple you use it on day one and love it on day two.

| | **pLMS** | Traditional management suites |
|---|---|---|
| Interface | Modern, native dark mode, responsive | Often stuck in the early 2000s, desktop-only |
| Mobile | **Native** iOS and Android apps, real-time sync | Often missing or heavy web-apps |
| Learning curve | Minutes, intuitive navigation | Days of training, hundred-page manuals |
| Data security | **Self-hosted**, data on your servers | Vendor cloud, often non-EU servers |
| Updates | `docker compose pull` (1 minute) | On-site technician, downtime |
| Cost | Open source (Apache 2.0) | Annual per-seat licenses |
| Scan workflow | **Scan-to-Email + automatic Italian OCR** | Scan → folder → manual rename |
| Legal forms | **Drag-and-drop template editor** with placeholders & e-signature | Hard-coded Word/PDF, no customisation |
| Integrations | Native bidirectional Google Calendar & OneDrive | Often missing or clunky |

---

## 🚀 Why your firm will thank you

- 🏛️ **Designed by lawyers, for lawyers**: every screen reflects how a real firm actually works.
- ⚡ **Lightning-fast** SPA + native mobile apps; no plug-ins, no slow page reloads.
- 🌍 **Cross-platform**: web on any browser, native iOS, native Android — fully synced.
- 🤖 **AI-grade automations** out of the box: OCR rename in Italian, blank-page removal, two-way Google Calendar and OneDrive sync.
- 🇮🇹 **Italian-first** UX with full English bilingual support, built around the Italian legal workflow (procura, gratuito patrocinio, codice fiscale, IBAN, fasi del preventivo, …).
- 💸 **Zero per-seat fees**: add lawyers, secretaries, trainees without paying a single euro more.

---

## 💼 What pLMS does — at a glance

### 👥 Client & Contacts management
Complete client records with civil, fiscal and contact data, document folders, attachments, related activities, payments and quotes — all linked together. One-click search, smart filtering, full anagrafica with **codice fiscale**, indirizzo, recapiti, IBAN and notes.

### 📑 Quotes (preventivi) & Templates
Build proposals with **multiple phases**, amounts, descriptions and reusable templates. Generate professional, print-ready PDFs in one click and convert quotes into tracked work without copy-paste.

### 💶 Payments & Cash flow
Register cash movements, mark partial or full payments, see **monthly statistics** at a glance, get totals per client, per period, per phase. Built-in dashboards highlight what is overdue and what is paid.

### 🗓️ Activities, Calendar & Deadlines
Plan udienze, scadenze, appointments and tasks per client. **Bidirectional Google Calendar sync** keeps every device in lock-step — events created in Google appear in pLMS and vice-versa, with deduplication and automatic backfill.

- 🔔 Push reminders on iOS and Android (background sync of upcoming deadlines).
- 📅 Filter by client, by user, by date range.
- 🧑‍⚖️ Per-user calendars: each lawyer sees their own work, the firm sees the aggregate.

### 📂 Documents with OneDrive mirror
Upload and organise every file (PDF, DOCX, images …) inside a per-client folder tree. **Bidirectional OneDrive sync** mirrors every document to a corporate `LMS/Surname Name (#id)/` folder so the whole firm has a familiar Explorer/Finder view of all dossiers, accessible from any device.

- 📤 Drag-and-drop uploads from the web.
- 📷 Camera and file picker from mobile.
- 🔁 Edits on OneDrive are reflected back in pLMS.
- 🧠 Smart **rename UX**: file extensions are locked and the basename is auto-selected so you can't accidentally break a `.pdf` into `.txt`.

### 📠 Scan-to-Email ingestion (Gmail + multi-user)
A real **legal-grade scanner pipeline** that works from any network on the planet:

1. The Ricoh / Konica / HP MFP scans to a dedicated Gmail account using SMTP (always allowed by ISPs).
2. pLMS polls IMAP every 30 seconds, parses the `+username` Gmail tag and routes the attachment to the correct lawyer.
3. **Blank pages are automatically removed**.
4. The new `ScanInbox` is shown in real time on web, iOS and Android.
5. Each user only sees **their own scans** — strict per-user isolation.

### 🤖 Italian Auto-Rename with on-prem OCR
Brand-new in v5.4: every scan is **automatically renamed in clean, descriptive Italian** using:

- 🇮🇹 **Tesseract OCR italiano** (fully on-prem, free).
- 📄 **Poppler `pdftoppm`** rasterisation that handles every PDF (CCITT, JBIG2, JPEG2000, image-only).
- 🧠 A **learning engine**: when you rename a scan manually, pLMS learns the pattern through content fingerprinting and applies it to similar future documents.

Examples produced live by the system:
> `email-50-…pdf` → **`Notifica SAYED AHMED MOHAMED IBRAHIM MOHAMED 2026-05-07.pdf`**
> `email-45-…pdf` → **`Procura MOHAMED IBRAHIM MOHAMED SAYED AHMED 1991-07-27.pdf`**

### 📝 Legal forms — built-in **and** fully customisable (5.5+)
The four classic legal forms every Italian firm needs are **always there, ready to print**, with the same battle-tested layout that has been used in court for years:

- **Fascicolo personale** del cliente.
- **Informativa privacy**.
- **Procura alle liti** (with optional `eletto domicilio` and `autentica firma` flags).
- **Gratuito patrocinio** with the four interchangeable sub-modules (istanza, autocertificazione reddito, stato di famiglia, redditi all'estero) and the lawyer's PNG signature embedded automatically.

But pLMS now goes much further — **every firm can design its own forms** with a visual editor:

- 🎨 **Drag-and-drop template builder** (powered by `@dnd-kit`) inside `Settings → Forms`. Drop blocks of every kind — paragraphs, headings, variable fields, checkboxes, dividers, page breaks, embedded images, the lawyer's signature — and reorder them with a single drag.
- 🧩 **Smart placeholders** that auto-fill at print time from the database: `{{Cliente.NomeCompleto}}`, `{{Cliente.CodiceFiscale}}`, `{{Cliente.LuogoDataNascita}}`, `{{Utente.NomeCompleto}}`, `{{Utente.Foro}}`, `{{Studio.Intestazione}}`, `{{Oggi}}` … and pipe filters for formatting (`|data:dd/MM/yyyy`, `|upper`, `|cap`, `|title`).
- ✍️ **Variable fields with defaults**: at print time the lawyer sees a tiny pre-filled form (textarea, input, checkbox) and can tweak any value before generating the PDF — no more manual text editing on the printed page.
- 🗂️ **Personal vs studio templates**: keep templates private or share them across the firm; admin-only writes on the shared ones, full freedom on the personal ones.
- 🖋️ **Lawyer signature** auto-embedded as PNG wherever the template asks for it (legal value preserved).
- 📱 **Works everywhere**: the same dynamic form appears on web, iOS and Android — your scanner-bag tablet, the desk in the office, your iPhone in court.
- 🔁 **Backwards-compatible**: the four classic forms keep using their original pixel-perfect renderer; only your custom templates go through the new DSL engine. Zero regression risk.

Every PDF is generated with **QuestPDF**: pixel-perfect, vector-quality, no Word/LibreOffice round-trip.

### 🗒️ Personal TODO & reminders
Per-user todo list (no, your colleagues won't see it!) with priorities, deadlines and a single tap to convert any todo into a calendar activity.

### 📅 Availability & Booking (Disponibilità & PrenotaApp)
Publish your firm's availability slots, let clients book appointments online, and have new bookings flow straight into your calendar.

### 📊 Real-time dashboard
The home page is a compact **command-centre**: monthly clients, monthly quotes, upcoming deadlines, scan inbox count, todos, recent payments — pick the cards you care about.

### ⚙️ Multi-user, multi-role
Role-based authorisation with a clean admin panel: invite users, set roles, manage signatures and individual settings. Each user has **their own** todos, scans, calendar tokens and OneDrive identity.

### 🌗 Modern UX
- **Dark mode** + light mode (auto-follows system theme on web, iOS and Android).
- Material 3 on Android, native SwiftUI feel on iOS, polished React UI on the web.
- Italian and English UI strings.

---

## 📱 Available on every device

<table>
<tr>
<td align="center" width="33%">
<h3>🌐 Web</h3>
React 19 + Vite SPA<br>
Served by the same single Docker container.<br>
Works on Chrome, Safari, Firefox, Edge — desktop and tablet.
</td>
<td align="center" width="33%">
<h3>📱 iOS</h3>
Native SwiftUI app<br>
Push notifications, background scadenze refresh, Files / iCloud attachment picker, native dark mode.
</td>
<td align="center" width="33%">
<h3>🤖 Android</h3>
Native Kotlin + Jetpack Compose (Material 3)<br>
WorkManager scadenze sync, system notifications, modern adaptive theme, deep-link routing.
</td>
</tr>
</table>

All clients talk to the **same backend** through HTTPS REST APIs and stay perfectly in sync.

---

## 📸 Screenshots

> All screenshots are captured automatically by the
> [`Screenshots/take-screenshots.mjs`](Screenshots/) Playwright script and have
> personal data redacted with opaque overlays before saving.

### Mobile & desktop highlights

<p align="center">
  <img src="Images/Screenshot From 2026-03-03 18-19-57.png" width="30%">
  <img src="Images/Screenshot From 2026-03-03 18-20-26.png" width="30%">
  <img src="Images/Screenshot From 2026-03-03 18-20-42.png" width="30%">
  <br>
  <img src="Images/Screenshot From 2026-03-03 18-20-53.png" width="30%">
  <img src="Images/Screenshot From 2026-03-03 18-21-14.png" width="30%">
  <img src="Images/Screenshot From 2026-03-03 18-21-27.png" width="30%">
  <br>
  <img src="Images/Screenshot From 2026-03-03 18-21-40.png" width="30%">
  <img src="Images/Screenshot From 2026-03-03 18-22-07.png" width="30%">
  <img src="Images/Screenshot From 2026-03-03 18-22-19.png" width="30%">
</p>

### Web app — Light theme

<p align="center">
  <img src="Screenshots/light/login.png"               width="30%" alt="Login">
  <img src="Screenshots/light/homepage.png"            width="30%" alt="Homepage / dashboard">
  <img src="Screenshots/light/contatti.png"            width="30%" alt="Contacts list">
  <br>
  <img src="Screenshots/light/calendario.png"          width="30%" alt="Calendar">
  <img src="Screenshots/light/todo.png"                width="30%" alt="Personal TODO">
  <img src="Screenshots/light/scan-inbox.png"          width="30%" alt="Scan inbox">
  <br>
  <img src="Screenshots/light/ads.png"                 width="30%" alt="ADS dashboard">
  <img src="Screenshots/light/ads-movimenti.png"       width="30%" alt="ADS — accounting movements">
  <img src="Screenshots/light/disponibilita.png"       width="30%" alt="Availability slots">
  <br>
  <img src="Screenshots/light/prenota-app.png"         width="30%" alt="Public booking page">
  <img src="Screenshots/light/lavoro.png"              width="30%" alt="Client file (fascicolo)">
  <img src="Screenshots/light/modal-stampa-moduli.png" width="30%" alt="“Stampa moduli” modal">
  <br>
  <img src="Screenshots/light/impostazioni.png"        width="30%" alt="Settings">
  <img src="Screenshots/light/moduli-list.png"         width="30%" alt="Form templates library">
  <img src="Screenshots/light/moduli-editor.png"       width="30%" alt="Drag-and-drop template editor">
  <br>
  <img src="Screenshots/light/privacy-policy.png"      width="30%" alt="Privacy & policy">
</p>

### Web app — Dark theme

<p align="center">
  <img src="Screenshots/dark/login.png"               width="30%" alt="Login (dark)">
  <img src="Screenshots/dark/homepage.png"            width="30%" alt="Homepage / dashboard (dark)">
  <img src="Screenshots/dark/contatti.png"            width="30%" alt="Contacts list (dark)">
  <br>
  <img src="Screenshots/dark/calendario.png"          width="30%" alt="Calendar (dark)">
  <img src="Screenshots/dark/todo.png"                width="30%" alt="Personal TODO (dark)">
  <img src="Screenshots/dark/scan-inbox.png"          width="30%" alt="Scan inbox (dark)">
  <br>
  <img src="Screenshots/dark/ads.png"                 width="30%" alt="ADS dashboard (dark)">
  <img src="Screenshots/dark/ads-movimenti.png"       width="30%" alt="ADS — accounting movements (dark)">
  <img src="Screenshots/dark/disponibilita.png"       width="30%" alt="Availability slots (dark)">
  <br>
  <img src="Screenshots/dark/prenota-app.png"         width="30%" alt="Public booking page (dark)">
  <img src="Screenshots/dark/lavoro.png"              width="30%" alt="Client file (dark)">
  <img src="Screenshots/dark/modal-stampa-moduli.png" width="30%" alt="“Stampa moduli” modal (dark)">
  <br>
  <img src="Screenshots/dark/impostazioni.png"        width="30%" alt="Settings (dark)">
  <img src="Screenshots/dark/moduli-list.png"         width="30%" alt="Form templates library (dark)">
  <img src="Screenshots/dark/moduli-editor.png"       width="30%" alt="Drag-and-drop template editor (dark)">
  <br>
  <img src="Screenshots/dark/privacy-policy.png"      width="30%" alt="Privacy & policy (dark)">
</p>

---

## 🧱 Technology stack

| Layer | Tech |
|---|---|
| Backend | **ASP.NET Core 10** (Minimal APIs), Serilog, OpenTelemetry, FluentValidation, DbUp |
| Database | **PostgreSQL** (versioned migrations) |
| Data access | Dapper + Npgsql |
| PDF & forms | **QuestPDF** |
| Scan pipeline | MailKit (IMAP), PdfPig, SkiaSharp, **poppler-utils**, **Tesseract OCR ITA** |
| Calendar / Drive | Native HTTP integrations with Google Calendar & Microsoft Graph (OneDrive) |
| Frontend | **React 19** + Vite + React Router + Tiptap |
| iOS | **Swift / SwiftUI** |
| Android | **Kotlin / Jetpack Compose / Material 3** |
| Container | Single multi-arch Docker image (linux/amd64 + linux/arm64) |

---

## ⚡ Quick start (Docker)

```bash
# 1) Set your environment
cp .env.example .env
# edit CONNECTION_STRING, GoogleCalendar__*, OneDrive__*, etc.

# 2) Launch
docker compose up -d

# 3) Open the app
open http://localhost:1580
```

The whole stack — backend + frontend + scan ingestion + auto-rename + calendar sync + OneDrive mirror — runs inside a single container. No Node, no .NET, no nginx to install on the host.

📖 Full deployment guide: [DOCKER.md](DOCKER.md) · End-user manual: [Manuale.md](Manuale.md) · Scan-to-Email setup: [scripts/SCANNER.md](scripts/SCANNER.md)

---

## 📦 What's in this repository

```
pLMS/
├─ Backend/        ASP.NET Core 10 API + background services
├─ Frontend/       React + Vite SPA
├─ android/        Kotlin / Jetpack Compose mobile app
├─ ios/            Swift / SwiftUI mobile app
├─ Docker Compose/ Production-ready compose stack
├─ scripts/        Operational scripts (deploy, scanner setup, …)
├─ docs/           Architecture & developer notes
└─ Images/         Marketing screenshots
```

---

## 🛠️ Requirements

- **Docker** & **Docker Compose**.
- An external **PostgreSQL** instance (any 13+ version works).
- (Optional) **Google Cloud project** for Calendar OAuth.
- (Optional) **Azure AD app registration** for OneDrive OAuth.

---

## ⚠️ Security note

> Never commit `.env`, OAuth tokens or database passwords to source control.
> Use environment variables in production and rotate credentials periodically.

---

## 📄 License

Released under the [Apache 2.0 License](https://github.com/DAVIDE-ph/pLMS/blob/main/LICENSE).

<p align="center">
  <em>pLMS — Run your firm. Own your data. Win your time back.</em>
</p>

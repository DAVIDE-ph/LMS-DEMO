[Italiano 🇮🇹](./README.it.md) | English 🇺🇸
<p align="center">
  <img src="Frontend/public/logo.png" alt="Logo del Progetto" width="150">
</p>

# pLMS - Lawyer Management System


## 🇺🇸 English Version

Management system for law firms featuring client management, quotes, payments, activities, and calendar integration.

### Features
- **Client Management**: Full records with legal and fiscal information.
- **Quotes**: Creation and management of quotes with phases and amounts.
- **Payments**: Payment tracking and summaries.
- **Activities**: Activity calendar with Google Calendar integration.
- **Documents**: Document management with OneDrive integration.
- **Todo**: Reminder and deadline system.

### Technologies
- **Backend**: ASP.NET Core 8.0 (Minimal APIs)
- **Frontend**: React + Vite
- **Database**: PostgreSQL
- **Container**: Docker

### Quick Start
1. Create a `.env` file with your `CONNECTION_STRING` and Google/OneDrive credentials.
2. Run `docker compose up -d`.
3. Open `http://localhost:1580`.

---

## 📸 Screenshots
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


---

## 🛠️ Requirements & Security
- **Requirements**: Docker & Docker Compose, External PostgreSQL.
- **Security**: ⚠️ **IMPORTANT**: Never commit sensitive credentials (`.env`, secrets, tokens) to the source code.
- **Variables & Manual**: See [Manuale.md](Manuale.md) for full documentation.

## 📄 License
https://github.com/DAVIDE-ph/pLMS/blob/main/LICENSE

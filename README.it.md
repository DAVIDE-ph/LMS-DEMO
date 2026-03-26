[English 🇺🇸](./README.md) | Italiano 🇮🇹
<p align="center">
  <img src="Frontend/public/logo.png" alt="Logo del Progetto" width="150">
</p>

# pLMS - Lawyer Management System
## 🇮🇹 Versione Italiano 
Sistema di gestione per studi legali con funzionalità per clienti, preventivi, pagamenti, attività e calendario.


## Caratteristiche

- **Gestione Clienti**: Anagrafica completa con informazioni legali e fiscali
- **Preventivi**: Creazione e gestione preventivi con fasi e importi
- **Pagamenti**: Tracciamento pagamenti e riepiloghi
- **Attività**: Calendario attività con integrazione Google Calendar
- **Documenti**: Gestione documenti con integrazione OneDrive
- **Todo**: Sistema di promemoria e scadenze

## 📸 Screenshots

<p align="center">
<img src="Images/Screenshot From 2026-03-03 18-19-57.png" width="30%">
<img src="Images/Screenshot From 2026-03-03 18-20-26.png" width="30%">
<img src="Images/Screenshot From 2026-03-03 18-20-42.png" width="30%">
<img src="Images/Screenshot From 2026-03-03 18-20-53.png" width="30%">
<img src="Images/Screenshot From 2026-03-03 18-21-14.png" width="30%">
<img src="Images/Screenshot From 2026-03-03 18-21-27.png" width="30%">
<img src="Images/Screenshot From 2026-03-03 18-21-40.png" width="30%">
<img src="Images/Screenshot From 2026-03-03 18-22-07.png" width="30%">
<img src="Images/Screenshot From 2026-03-03 18-22-19.png" width="30%">
</p>

## Tecnologie

- **Backend**: ASP.NET Core 8.0 (Minimal APIs)
- **Frontend**: React + Vite
- **Database**: PostgreSQL
- **Container**: Docker

## Requisiti

- Docker e Docker Compose
- PostgreSQL (database esterno)

## Quick Start

### Con Docker Compose

1. Crea un file `.env` nella root del progetto:

```env
CONNECTION_STRING=Host=TUO_HOST;Port=5432;Database=LMS;Username=xxx;Password=xxx
GoogleCalendar__ClientId=TUO_CLIENT_ID
GoogleCalendar__ClientSecret=TUO_CLIENT_SECRET
GoogleCalendar__RedirectUri=https://miodominio.it/api/google-calendar/callback
```

2. Avvia l'applicazione:

```bash
docker compose up -d
```

3. Apri il browser su `http://localhost:1580`

### Con Docker Run

```bash
docker run -d --name plms-app -p 1580:1580 \
  -e ConnectionStrings__LMS="Host=TUO_HOST;Port=5432;Database=LMS;Username=xxx;Password=xxx" \
  -e CORS__AllowedOrigins="http://localhost,http://localhost:1580" \
  -e GoogleCalendar__ClientId="TUO_CLIENT_ID" \
  -e GoogleCalendar__ClientSecret="TUO_CLIENT_SECRET" \
  -e GoogleCalendar__RedirectUri="https://miodominio.it/api/google-calendar/callback" \
  TUO_USERNAME/plms-app:latest
```

## Pubblicazione su Docker Hub

Vedi [Manuale.md](Manuale.md) per le istruzioni complete su come pubblicare l'applicazione su Docker Hub.

## Variabili d'Ambiente

Vedi [Manuale.md](Manuale.md#manuale-di-tutte-le-variabili-dambiente-env) per la lista completa delle variabili d'ambiente supportate.

## Sicurezza

⚠️ **IMPORTANTE**: Non committare mai credenziali sensibili nel codice sorgente:
- Password del database
- Client Secret di Google Calendar
- Token di autenticazione

Usa sempre variabili d'ambiente in produzione.

## Licenza

https://github.com/DAVIDE-ph/pLMS/blob/main/LICENSE

// =============================================================================
// pLMS — Screenshot automation (Playwright + Chromium)
//
// Cosa fa:
//   1. Apre Chromium (headless di default).
//   2. Si autentica su pLMS via la pagina /login.
//   3. Naviga ogni rotta dell'app (mappata in `ROUTES` qui sotto).
//   4. Scatta DUE screenshot per pagina: tema chiaro + tema scuro.
//   5. Apre alcune modali rilevanti (Stampa moduli, Nuovo preventivo, ...) e
//      ne scatta lo screenshot in entrambi i temi.
//   6. Inietta CSS+JS per blurrare i dati sensibili (CF, email, telefono,
//      IBAN, e i nomi/cognomi nelle tabelle) prima di scattare.
//
// Output:
//   - Screenshots/light/<rotta>.png
//   - Screenshots/dark/<rotta>.png
//
// Uso:
//   1. (una sola volta)   npm install && npm run install:browsers
//   2. Esporta le variabili (oppure crea un .env e usa dotenv):
//        export PLMS_BASE_URL="http://localhost:1580"
//        export PLMS_USERNAME="il-tuo-username"
//        export PLMS_PASSWORD="la-tua-password"
//   3.                    npm run screenshots
//
// Variabili opzionali:
//   PLMS_HEADED=1         apre Chromium visibile (utile per debug)
//   PLMS_VIEWPORT=1440x900 default desktop, es. 375x812 per iPhone
//   PLMS_NO_BLUR=1        disattiva il blur (ATTENZIONE: solo su DB anonimo)
//   PLMS_ROUTES=homepage,calendario,...  filtra solo alcune rotte
// =============================================================================

import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const BASE_URL = (process.env.PLMS_BASE_URL || 'http://localhost:1580').replace(/\/$/, '')
// Default: stesso host (deployment unificato). In dev (vite su 5173 + backend
// su 1580) puoi separare le due con PLMS_API_URL=http://localhost:1580.
const API_URL  = (process.env.PLMS_API_URL  || BASE_URL).replace(/\/$/, '')
const USERNAME = process.env.PLMS_USERNAME
const PASSWORD = process.env.PLMS_PASSWORD
const HEADED = !!process.env.PLMS_HEADED
const NO_BLUR = !!process.env.PLMS_NO_BLUR
const VIEWPORT = parseViewport(process.env.PLMS_VIEWPORT || '1440x900')
const ROUTES_FILTER = (process.env.PLMS_ROUTES || '')
  .split(',').map(s => s.trim()).filter(Boolean)

if (!USERNAME || !PASSWORD) {
  console.error('Errore: definisci PLMS_USERNAME e PLMS_PASSWORD prima di lanciare.')
  console.error('Esempio:')
  console.error('  export PLMS_USERNAME=admin')
  console.error('  export PLMS_PASSWORD=...')
  console.error('  npm run screenshots')
  process.exit(1)
}

function parseViewport(s) {
  const [w, h] = s.split('x').map(Number)
  if (!Number.isFinite(w) || !Number.isFinite(h)) return { width: 1440, height: 900 }
  return { width: w, height: h }
}

// Mappa <slug> → { path, label }. Lo slug e' il nome del file PNG.
// Le rotte sono le stesse definite in Frontend/src/App.jsx.
//
// Le rotte segnate con `needsClient: true` accettano un placeholder `:id`
// nell'url che viene sostituito a runtime con l'id del primo cliente
// disponibile (vedi findFirstClientId).
//
// Le rotte con `via` sono "deep": Playwright apre prima `via`, clicca un
// elemento e poi scatta. Si usa quando la pagina target legge i dati da
// `location.state` (es. ADSMovimentiPage) e quindi non e' raggiungibile
// con un goto diretto.
const ROUTES = [
  { slug: 'login',           url: '/login',                            label: 'Login' },
  { slug: 'homepage',        url: '/homepage',                         label: 'Homepage / dashboard' },
  { slug: 'contatti',        url: '/contatti',                         label: 'Contatti / clienti' },
  { slug: 'calendario',      url: '/calendario',                       label: 'Calendario' },
  { slug: 'todo',            url: '/todo',                             label: 'TODO personale' },
  { slug: 'scan-inbox',      url: '/scan-inbox',                       label: 'Scan inbox' },
  { slug: 'ads',             url: '/ads',                              label: 'ADS — administrative dashboard' },
  // ADSMovimenti richiede location.state.client → vai su /ads, clicca la
  // prima riga cliente (ogni <tr> di .ads-table ha onClick verso movimenti).
  { slug: 'ads-movimenti',   via: '/ads', clickSelector: '.ads-table tbody tr, table tbody tr',
                                                                       label: 'ADS movimenti (cliente reale)' },
  { slug: 'disponibilita',   url: '/disponibilita',                    label: 'Disponibilità' },
  { slug: 'prenota-app',     url: '/prenota-app',                      label: 'Prenota app' },
  // Fascicolo cliente: /lavoro/:id, l'id viene sostituito con il primo
  // cliente trovato. Questa rotta sostituisce la versione "vuota" /lavoro
  // (che mostrava solo il messaggio "Seleziona un cliente").
  { slug: 'lavoro',          url: '/lavoro/:id', needsClient: true,    label: 'Fascicolo cliente' },
  { slug: 'impostazioni',    url: '/impostazioni',                     label: 'Impostazioni' },
  { slug: 'moduli-list',     url: '/impostazioni/moduli',              label: 'Moduli — libreria template' },
  { slug: 'moduli-editor',   url: '/impostazioni/moduli/nuovo',        label: 'Moduli — editor a blocchi' },
  { slug: 'privacy-policy',  url: '/privacy-policy',                   label: 'Privacy & policy' },
]

// Modali da aprire dopo aver caricato la rotta `setupRoute`.
// Lo script clicca il bottone identificato da `openButton` e attende che la
// modale sia visibile (selettore `dialog`). Se qualcosa va storto, salta.
const MODALS = [
  {
    slug: 'modal-stampa-moduli',
    label: 'Modale "Stampa moduli" (4 fissi + custom)',
    setupRoute: '/lavoro',
    needsClient: true,
    openButton: 'Stampa moduli',
  },
  {
    slug: 'modal-nuovo-preventivo',
    label: 'Modale "Nuovo preventivo"',
    setupRoute: '/lavoro',
    needsClient: true,
    openButton: 'Nuovo preventivo',
  },
  {
    slug: 'modal-attivita',
    label: 'Modale "Nuova attività"',
    setupRoute: '/lavoro',
    needsClient: true,
    openButton: 'Nuova attività',
  },
]

const OUT_LIGHT = path.join(__dirname, 'light')
const OUT_DARK = path.join(__dirname, 'dark')
fs.mkdirSync(OUT_LIGHT, { recursive: true })
fs.mkdirSync(OUT_DARK, { recursive: true })

// ─────────────────────────────────────────────────────────────────────────────
// Sanitizzazione dati sensibili. Strategia:
//   1) Sostituiamo *fisicamente* ogni token sensibile (CF, email, telefono,
//      IBAN, P.IVA, date di nascita) con bullet '•' della stessa lunghezza.
//   2) Sulle tabelle pLMS note (Contatti, Lavoro, ADS, ...) sostituiamo
//      l'intero testo delle prime N colonne (nome/cognome/CF/...) con bullet.
//   3) Bluriamo input/textarea/select per quelli che mantengono il valore
//      visibile come placeholder (es. campi di ricerca).
// La sanitizzazione viene riapplicata esplicitamente PRIMA di ogni screenshot
// (vedi sanitize()), non solo via MutationObserver: piu' robusto sui dati che
// arrivano async da React.
const BLUR_CSS = `
input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]),
textarea, select {
  filter: blur(6px) !important;
  user-select: none !important;
}
.__plms_redacted {
  letter-spacing: 0.05em;
  user-select: none !important;
}
`

// Eseguito *dentro* la pagina. Sostituisce fisicamente i testi sensibili.
// IMPORTANTE: questo runtime viene serializzato e iniettato sia come
// addInitScript sia richiamato esplicitamente via page.evaluate prima di
// ogni screenshot.
const SANITIZE_RUNTIME = `
// Strategia: sovrappongo un <div> opaco (overlay) sopra ogni elemento che
// contiene PII. L'overlay e' un nodo che React NON conosce, quindi un
// re-render del componente non lo rimuove. Cosi' anche se React rimette il
// textContent originale tra sanitize() e screenshot, il valore resta coperto.
window.__plmsSanitize = function() {
  // Flag per evitare il feedback-loop con il MutationObserver: le mutazioni
  // che facciamo noi (creazione/rimozione overlay) non devono retriggerare
  // sanitize. Vedi blocco MutationObserver in fondo a questo runtime.
  window.__plmsBusy = true;
  const RE = [
    // Codice fiscale italiano (16 caratteri)
    /\\b[A-Z]{6}[0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]\\b/g,
    // Email
    /[A-Z0-9._%+\\-]+@[A-Z0-9.\\-]+\\.[A-Z]{2,}/gi,
    // IBAN italiano
    /\\bIT\\d{2}[A-Z]\\d{10}[A-Z0-9]{12}\\b/gi,
    // P.IVA italiana
    /\\b(?:IT)?\\d{11}\\b/g,
    // Numeri di telefono (almeno 8 cifre, anche con spazi/+/-)
    /(?:\\+\\d{1,3}[\\s.\\-]?)?\\d{3}[\\s.\\-]?\\d{3,4}[\\s.\\-]?\\d{3,4}/g,
    // Date dd/mm/yyyy
    /\\b\\d{2}[\\/\\.\\-]\\d{2}[\\/\\.\\-]\\d{4}\\b/g,
  ];

  // Crea un overlay che copre il bbox dell'elemento.
  function overlayElement(el, label) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 4 || rect.height < 4) return;
    const overlay = document.createElement('div');
    overlay.className = '__plms_redactbox';
    overlay.setAttribute('data-redact', label || '1');
    // position:absolute riferito al document. getBoundingClientRect e' relativo
    // al viewport, sommo gli scroll offset cosi' funziona anche con fullPage.
    const sx = window.scrollX || window.pageXOffset || 0;
    const sy = window.scrollY || window.pageYOffset || 0;
    Object.assign(overlay.style, {
      position: 'absolute',
      left: (rect.left + sx) + 'px',
      top: (rect.top + sy) + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
      opacity: '1',
      borderRadius: '4px',
      zIndex: '2147483646',
      pointerEvents: 'none',
    });
    // Eredita il colore del testo del nodo coperto, cosi' il box "scompare"
    // visivamente come se fosse parte del rendering.
    overlay.style.color = getComputedStyle(el).color || '#888';
    overlay.style.background = overlay.style.color;
    document.body.appendChild(overlay);
  }

  // Rimuovi gli overlay vecchi (chiamate ripetute).
  document.querySelectorAll('.__plms_redactbox').forEach((n) => n.remove());

  // 1. Tabelle: copri colonne 1..5 di ogni riga, su qualunque <table> dell'app.
  try {
    const tables = document.querySelectorAll('table');
    for (const tbl of tables) {
      const rows = tbl.querySelectorAll('tbody tr');
      for (const r of rows) {
        const cells = r.querySelectorAll('td');
        for (let i = 0; i < Math.min(5, cells.length); i++) {
          const cell = cells[i];
          const txt = (cell.textContent || '').trim();
          if (!txt || txt.length < 2 || txt === '—') continue;
          // Salta solo se la cella e' interamente un input/select/checkbox
          // (le icone/button decorativi non devono escludere la copertura).
          const onlyControl = cell.children.length === 1 &&
            ['INPUT','SELECT','TEXTAREA'].includes(cell.children[0].tagName);
          if (onlyControl) continue;
          overlayElement(cell, 'col');
        }
      }
    }
  } catch {}

  // 2. Card / valori sensibili noti (homepage, dettaglio contatto, ...).
  try {
    const sels = [
      // Topbar / utente loggato
      '.main-navbar-user-name', '.user-profile-value',
      // Card / row componenti generici
      '.client-row__name', '.client-row__surname', '.client-row__email',
      '.client-row__telephone', '.client-row__cf',
      // Vista contatto
      '.contatti-view-value',
      // Homepage
      '.dashboard-panel__avvocato-value',
      '.homepage-email', '.homepage-welcome strong',
      // Pagina fascicolo (LavoroPage)
      '.lavoro-page-title', '.lavoro-card__value',
      // ADS movimenti header (es. "PEHALJIT SINGH (ID 329)")
      '.ads-movimenti-client',
      // Generic
      '[data-blur]',
    ];
    document.querySelectorAll(sels.join(',')).forEach((el) => {
      const txt = (el.textContent || '').trim();
      if (txt) overlayElement(el, 'class');
    });
  } catch {}

  // 3. Regex su tutto il body: per ogni nodo <span>/<td>/<p>/... che
  //    contiene SOLO un token sensibile, copri l'elemento intero.
  try {
    const tags = ['SPAN','TD','TH','P','LI','DD','STRONG','EM','B','I','SMALL','CODE','PRE','DIV','A'];
    const all = document.body.querySelectorAll(tags.join(','));
    for (const el of all) {
      // Salta wrapper grandi: cerchiamo solo le foglie di testo.
      if (el.children.length > 0) continue;
      // Salta i nostri stessi overlay.
      if (el.classList && el.classList.contains('__plms_redactbox')) continue;
      const t = (el.textContent || '').trim();
      if (!t || t.length < 5) continue;
      let hit = false;
      for (const re of RE) { re.lastIndex = 0; if (re.test(t)) { hit = true; break; } }
      if (hit) overlayElement(el, 'regex');
    }
  } catch {}

  // Lasciamo passare un microtask cosi' il MutationObserver "vede" le
  // nostre mutazioni con il flag __plmsBusy ancora a true, e le ignora.
  Promise.resolve().then(() => { window.__plmsBusy = false; });
};

// Mantieni gli overlay sincronizzati con il layout (scroll, resize, re-render).
// Il MutationObserver evita il feedback loop ignorando:
//   - mutazioni triggerate da noi (flag window.__plmsBusy === true)
//   - mutazioni che riguardano SOLO i nostri overlay (.__plms_redactbox)
(function(){
  let scheduled = false;
  function reapply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      try { window.__plmsSanitize?.(); } catch {}
    });
  }
  function isOurMutation(records) {
    if (window.__plmsBusy) return true;
    for (const r of records) {
      const target = r.target;
      const owned = (n) => n && n.classList && n.classList.contains('__plms_redactbox');
      if (owned(target)) return true;
      if (target && target.id === '__plms_overlays') return true;
      const added = Array.from(r.addedNodes || []);
      const removed = Array.from(r.removedNodes || []);
      const allOurs = (added.length || removed.length) &&
        [...added, ...removed].every(owned);
      if (allOurs) return true;
    }
    return false;
  }
  function attach() {
    if (!document.documentElement) return false;
    new MutationObserver((records) => {
      if (isOurMutation(records)) return;
      reapply();
    }).observe(document.documentElement, {
      subtree: true, childList: true, characterData: true,
    });
    return true;
  }
  if (!attach()) {
    const iv = setInterval(() => { if (attach()) clearInterval(iv); }, 25);
    document.addEventListener('DOMContentLoaded', attach, { once: true });
  }
  window.addEventListener('scroll', reapply, true);
  window.addEventListener('resize', reapply);
})();
`

// ─────────────────────────────────────────────────────────────────────────────
// Login robusto: NON ci affidiamo al click del form (race con state React +
// .catch silente). Carichiamo /login per avere l'origin giusto, poi chiamiamo
// /api/auth/login via fetch e scriviamo direttamente in sessionStorage la
// chiave `lms_user` (esattamente quello che fa il `setUser` di AuthContext).
async function ensureLogin(page) {
  await page.goto(BASE_URL + '/login', { waitUntil: 'domcontentloaded' })
  const ok = await page.evaluate(async ({ api, u, p }) => {
    const res = await fetch(api + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: u, password: p }),
    })
    if (!res.ok) return { ok: false, status: res.status }
    const userData = await res.json()
    sessionStorage.setItem('lms_user', JSON.stringify(userData))
    return { ok: true, status: 200, name: userData?.name }
  }, { api: API_URL, u: USERNAME, p: PASSWORD })

  if (!ok?.ok) {
    throw new Error(`Login fallito (HTTP ${ok?.status ?? '?'}). Verifica PLMS_USERNAME e PLMS_PASSWORD.`)
  }
  console.log(`  login OK come "${ok.name}"`)
  // Vai sulla home con un hard navigate; sessionStorage sopravvive nello stesso
  // BrowserContext e AuthContext si idrata da li' al mount.
  await page.goto(BASE_URL + '/homepage', { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
  // Sanity check: se siamo ancora su /login significa che l'idratazione e'
  // fallita (es. nome chiave cambiato). Falliamo in modo rumoroso.
  const stillOnLogin = await page.evaluate(() => location.pathname.startsWith('/login'))
  if (stillOnLogin) {
    throw new Error('Dopo il login, l\'app mi rimanda comunque su /login. Controlla AuthContext (chiave sessionStorage).')
  }
}

async function setTheme(page, theme /* 'light' | 'dark' */) {
  await page.evaluate((t) => {
    try { localStorage.setItem('lms_theme', t) } catch {}
    document.documentElement.setAttribute('data-theme', t)
  }, theme)
}

async function applySanitize(page) {
  if (NO_BLUR) return
  // Doppia chiamata: i dati spesso arrivano async, una seconda passata
  // dopo un piccolo delay copre i nodi appena renderizzati.
  await page.evaluate(() => { try { window.__plmsSanitize?.() } catch {} })
  await page.waitForTimeout(150)
  await page.evaluate(() => { try { window.__plmsSanitize?.() } catch {} })
}

async function visitAndShoot(page, route, theme, outDir, ctx) {
  // Risolvi un eventuale placeholder ":id" con l'id del cliente trovato.
  let url = route.url
  if (route.needsClient) {
    if (!ctx.clientId) {
      console.log(`   [${theme}] ${route.label}: SKIP (nessun cliente trovato)`)
      return
    }
    url = url.replace(':id', String(ctx.clientId))
  }

  // Rotte "deep" (ads-movimenti): vai a `via`, clicca un selector per
  // navigare con la state corretta, poi screenshot.
  if (route.via) {
    console.log(`   [${theme}] ${route.label}  →  ${route.via} → click '${route.clickSelector}'`)
    await page.goto(BASE_URL + route.via, { waitUntil: 'domcontentloaded' })
    await setTheme(page, theme)
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
    await page.waitForTimeout(1000)
    try {
      const target = page.locator(route.clickSelector).first()
      await target.waitFor({ state: 'visible', timeout: 5000 })
      await target.click()
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {})
      await page.waitForTimeout(900)
    } catch (e) {
      console.log(`   ! ${route.slug}: click fallito (${e.message?.split('\n')[0]})`)
      return
    }
    await applySanitize(page)
    await page.screenshot({ path: path.join(outDir, `${route.slug}.png`), fullPage: true })
    return
  }

  console.log(`   [${theme}] ${route.label}  →  ${url}`)
  await page.goto(BASE_URL + url, { waitUntil: 'domcontentloaded' })
  await setTheme(page, theme)
  // Diamo tempo all'app di idratare e fetchare i dati
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
  await page.waitForTimeout(1200)
  await applySanitize(page)
  const file = path.join(outDir, `${route.slug}.png`)
  await page.screenshot({ path: file, fullPage: true })
}

async function findFirstClientId(page) {
  // Strategia 1: API. Endpoint reale del backend pLMS: /api/clients?userId=...
  // L'id utente loggato e' nel sessionStorage (vedi AuthContext).
  const viaApi = await page.evaluate(async (api) => {
    const me = JSON.parse(sessionStorage.getItem('lms_user') || 'null')
    if (!me?.id) return null
    try {
      const r = await fetch(api + '/api/clients?userId=' + encodeURIComponent(me.id))
      if (!r.ok) return null
      const data = await r.json()
      const arr = Array.isArray(data) ? data : (data?.items || data?.data || data?.rows || [])
      if (arr.length > 0 && arr[0].id != null) return Number(arr[0].id)
    } catch {}
    return null
  }, API_URL)
  if (viaApi) return viaApi

  // Strategia 2: DOM. Va sulla lista contatti, prende il primo link/riga.
  await page.goto(BASE_URL + '/contatti', { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {})
  await page.waitForTimeout(1000)
  const id = await page.evaluate(() => {
    const a = document.querySelector('a[href*="/lavoro/"]')
    if (a) {
      const m = a.getAttribute('href').match(/\/lavoro\/(\d+)/)
      if (m) return Number(m[1])
    }
    const row = document.querySelector('[data-client-id], [data-id]')
    if (row) {
      const v = row.getAttribute('data-client-id') || row.getAttribute('data-id')
      const n = Number(v)
      return Number.isFinite(n) ? n : null
    }
    return null
  })
  return id
}

async function shootModal(page, modal, theme, outDir, clientId) {
  const target = modal.needsClient && clientId
    ? `/lavoro/${clientId}`
    : modal.setupRoute
  console.log(`   [${theme}] ${modal.label}  →  ${target} → "${modal.openButton}"`)
  await page.goto(BASE_URL + target, { waitUntil: 'domcontentloaded' })
  await setTheme(page, theme)
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
  await page.waitForTimeout(800)
  // Cerca il bottone per testo (case-insensitive). Se non c'e', salta.
  try {
    const btn = page.getByRole('button', { name: new RegExp(modal.openButton, 'i') }).first()
    await btn.click({ timeout: 5000 })
    await page.waitForTimeout(500)
  } catch (e) {
    console.log(`      (skip: bottone "${modal.openButton}" non trovato)`)
    return
  }
  await applySanitize(page)
  const file = path.join(outDir, `${modal.slug}.png`)
  await page.screenshot({ path: file, fullPage: true })
  // Prova a chiudere la modale (Esc)
  await page.keyboard.press('Escape').catch(() => {})
}

async function main() {
  console.log(`pLMS — screenshot automation`)
  console.log(`  base url : ${BASE_URL}`)
  if (API_URL !== BASE_URL) console.log(`  api url  : ${API_URL}`)
  console.log(`  user     : ${USERNAME}`)
  console.log(`  viewport : ${VIEWPORT.width}x${VIEWPORT.height}`)
  console.log(`  blur     : ${NO_BLUR ? 'OFF (DB anonimo!)' : 'ON (CF/email/telefono/IBAN nascosti)'}`)
  console.log()

  const browser = await chromium.launch({ headless: !HEADED })
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 })

  if (!NO_BLUR) {
    await context.addInitScript({
      content:
        // Iniettiamo il CSS in modo robusto: addInitScript parte prima che il
        // DOM sia parsato, quindi document.head / document.body possono essere
        // null. Ritentiamo finche' c'e' almeno l'<html>.
        `(function(){
           var css = ${JSON.stringify(BLUR_CSS)};
           function inject(){
             var root = document.head || document.documentElement;
             if (!root) return false;
             var s = document.createElement('style');
             s.setAttribute('data-plms-sanitize', '1');
             s.textContent = css;
             root.appendChild(s);
             return true;
           }
           if (!inject()) {
             var iv = setInterval(function(){ if (inject()) clearInterval(iv); }, 25);
             document.addEventListener('DOMContentLoaded', inject, { once: true });
           }
         })();
         ${SANITIZE_RUNTIME}`,
    })
  }

  const page = await context.newPage()
  await ensureLogin(page)

  // Risolviamo subito l'id del primo cliente: serve sia per le rotte
  // dinamiche (`/lavoro/:id`) sia per le modali.
  const clientId = await findFirstClientId(page)
  if (clientId) console.log(`  cliente per rotte dinamiche: id=${clientId}`)
  else console.log(`  ! nessun cliente trovato: skip rotte dinamiche e modali`)
  const ctx = { clientId }

  const filter = (r) => ROUTES_FILTER.length === 0 || ROUTES_FILTER.includes(r.slug)
  const routes = ROUTES.filter(filter)

  for (const theme of ['light', 'dark']) {
    const outDir = theme === 'light' ? OUT_LIGHT : OUT_DARK
    console.log(`\n=== Tema: ${theme} ===`)
    for (const r of routes) {
      try {
        await visitAndShoot(page, r, theme, outDir, ctx)
      } catch (e) {
        console.log(`   ! ${r.slug}: ${e.message}`)
      }
    }
  }

  // Modali
  console.log(`\n=== Modali ===`)
  if (!clientId) {
    console.log('   (skip modali: nessun cliente trovato in /contatti)')
  } else {
    for (const theme of ['light', 'dark']) {
      const outDir = theme === 'light' ? OUT_LIGHT : OUT_DARK
      console.log(`\n--- Modali, tema: ${theme} ---`)
      for (const m of MODALS) {
        try {
          await shootModal(page, m, theme, outDir, clientId)
        } catch (e) {
          console.log(`   ! ${m.slug}: ${e.message}`)
        }
      }
    }
  }

  await browser.close()
  console.log(`\n✓ Fatto. Screenshot in ${OUT_LIGHT} e ${OUT_DARK}.`)
}

main().catch((e) => {
  console.error('Errore fatale:', e)
  process.exit(1)
})

# PlotReply — full system documentation (for adversarial review)

Use this document to roast architecture, product, security, legal, and go-to-market leaks. Treat every “claimed” feature as **implemented only if this file says where**. Marketing copy on `/` is not a backend.

**Repo:** https://github.com/Yuubbie/PlotReply  
**Local path:** `C:\Users\HP\MonkeyCode\plotreply` (own `.git`; **not** Hopayola)  
**Hopayola:** https://github.com/Yuubbie/hopayola — fashion app; `plotreply/` is gitignored there. Two products, one machine folder layout.

**Last documented commit intent:** clean share links `/d/{slug}?w=host`, full service intents, browser voice, logo in localStorage, trial copy without billing.

---

## 1. What it is (truth vs claim)

**Claim:** WhatsApp desk for Nigerian real-estate operators. Answers as the agency brand. Qualifies intent/city/budget. Matches listings. Holds inspections/dates. Never collects money in chat. 7-day trial then ₦10k / ₦25k. Pro weekly report. Voice assistant.

**Truth today:** A **stateless regex bot** + **seed listings** + **browser localStorage**. Demo UI. Landing and pricing are **copy**. No auth, no payments, no CRM, no email/SMS report, no multi-tenant DB, no WhatsApp session memory, no phone IVR.

---

## 2. Stack

| Layer | Choice | Notes |
|---|---|---|
| Runtime | Next.js **14.2.x** App Router | `next.config.mjs`: `reactStrictMode` only |
| UI | React 18, Tailwind 3, Fraunces + Outfit (Google fonts) | `app/globals.css`, `tailwind.config.ts` |
| Language | TypeScript 5.5 | No tests, no ESLint config file in tree |
| Hosting target | Vercel (`vercel.json`: `{ "framework": "nextjs" }`) | Separate Vercel project required; root = this folder |
| Data | **None** in production | Listings/logo/name/site = `localStorage` |
| Auth | **None** | Anyone hits every page and `/api/chat` |
| Payments | **None** | No Paystack/Stripe; trial not enforced |
| WhatsApp | Meta Cloud API **stub** | `app/api/whatsapp/route.ts` |
| Voice | **Browser only** | Web Speech API + `speechSynthesis` on `/demo` |
| LLM | **None** | `lib/bot.ts` is deterministic regex |
| Email | **None** | Weekly report is a **static mock** on `/dashboard` |
| Analytics | **None** | |
| Env | `.env.example` | `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_TOKEN`; commented Supabase |

**Scripts:** `dev` / `start` bind `127.0.0.1:3200`. Production on Vercel uses Vercel’s host/port, not 3200.

**Dependencies:** `next`, `react`, `react-dom` only. No `@supabase`, no Meta SDK, no rate-limit package.

---

## 3. Routes and files

### Pages (App Router)

| Path | File | Server/client | Role |
|---|---|---|---|
| `/` | `app/page.tsx` | RSC | Marketing: pain, how, world-class claims, pricing CTAs |
| `/how` | `app/how/page.tsx` | RSC | 6-step walkthrough |
| `/demo` | `app/demo/page.tsx` | Client | Inbox + brand kit + Speak + share link |
| `/d/[slug]` | `app/d/[slug]/page.tsx` | Re-exports demo | Clean share URL |
| `/onboard` | `app/onboard/page.tsx` | Client | Trial copy if `?trial=1`; save listing + logo |
| `/dashboard` | `app/dashboard/page.tsx` | Client | Seed + extra listings; fake weekly report numbers |

### APIs

| Method | Path | File |
|---|---|---|
| POST | `/api/chat` | `app/api/chat/route.ts` |
| GET | `/api/whatsapp` | Meta webhook verify |
| POST | `/api/whatsapp` | Incoming message → `reply()` → Graph send |

### Lib

| File | Role |
|---|---|
| `lib/bot.ts` | Intent/city/budget/beds/slot detection; match; copy |
| `lib/seed.ts` | Hardcoded Lagos/Abuja/PH catalogue |
| `lib/types.ts` | `Intent`, `Listing`, `Session`, `INTENT_LABELS` |
| `lib/website.ts` | URL sanitize, slugify, share host |
| `lib/listings-store.ts` | `localStorage["pr_listings"]` |
| `lib/brand.ts` | Logo file → data URL `localStorage["pr_logo"]` |

### Client storage keys

- `pr_listings` — JSON `Listing[]`
- `pr_logo` — data URL (PNG/JPG/WebP, **≤ 600KB**)
- `pr_site` — listings website
- `pr_name` — agency name

---

## 4. Domain model

```ts
Intent = "land" | "sale" | "rent" | "lease" | "shortlet" | "hall" | "build" | "consult"

Listing = { id, title, city, area, intent, beds, priceNgn, notes }

Session = {
  intent?, city?, budget?, beds?, nights?, inspectionHeld?,
  websiteUrl?, agencyName?, extraListings?
}
```

`nights` is on the type; **bot never sets nights**.

No User, Agency, Subscription, Inspection, Payment, or Message tables.

---

## 5. Flows (as implemented)

### 5.1 Marketing → trial

1. `/` CTA → `/onboard?trial=1`
2. Copy says 7 days free, no charge until day 8
3. **No clock, no account, no card.** Form save is local only
4. Success: “live on this device”

### 5.2 Onboard listing

1. Optional logo upload (`LogoUpload` → `saveLogo`)
2. Required: agency, website, title, city, area, intent, beds (≥0), price
3. `saveListing({ id: live-${Date.now()}, ... notes: "Added by the agent..." })`
4. `pr_name` / `pr_site` set
5. Website field is `type=url` but **not** passed through `sanitizeWebsite` before `pr_site` except `sanitizeWebsite(String(fd.get("website")))` — yes onboard does sanitize site

### 5.3 Demo / share inbox

1. Load name from `/d/{slug}` (`unslug`) or `?name=` or `pr_name`
2. Site from `?w=` (hostname) or `?site=` or `pr_site`
3. Extra listings from `pr_listings` sent **with every chat POST**
4. User text or SpeechRecognition → `POST /api/chat` `{ text, session, listings }`
5. Bot reply shown; optional `speechSynthesis` (`lang: en-NG`)
6. Share: `{origin}/d/{slugify(name)}?w={hostname}` — **no nested https://**

Logo is **not** in the share URL. Recipients see PlotReply mark unless they have `pr_logo` in **their** browser.

### 5.4 Chat bot (`reply`)

Order of handling:

1. Merge intent/city/budget/beds from message ∪ session
2. If user asks website and `websiteUrl` set → dump URL
3. If message contains `http` and not pay words → “got the listing link” (**does not fetch the URL**)
4. If pay/transfer/POS/account/send money → refuse payment
5. If looks like a day/time and intent+city already set → set `inspectionHeld` (string only; **no calendar, no SMS**)
6. Short greeting → branded hello (full service menu)
7. Else if no intent → ask service type
8. Else if no city → ask Lagos/Abuja/PH or estate name (**estate names do not map to cities** unless they match the regex)
9. Filter catalogue: extra listings then seed; max **3**; city **exact** case-insensitive; beds only if listing.beds > 0; budget: drop if price > budget × 1.15 except shortlet and hall
10. Return cards + book CTA

**WhatsApp path:** `reply(text, {})` — **empty session every message**. No per-phone memory. Brand name/listings/website **never** applied on WhatsApp.

### 5.5 Dashboard

- Merge extra + seed
- Weekly report UI: **hardcoded 42 / 11 / 6** — not computed

---

## 6. Intent detection (order matters)

Regex on lowercased text:

1. shortlet — short-let, airbnb, weekend, per night, nights
2. hall — hall, event centre/center, reception, wedding venue, banquet
3. consult — consult, advice, valuation, “what should i”, realtor advice
4. build — build, completed house, finishing, carcass, contractor, boq
5. land — plot, land, acre, hectare(s), gazette
6. lease — lease, commercial space, office floor
7. sale (specific) — buy house, duplex for sale, outright, selling house
8. sale (broad) — buy, sale, selling, title, c of o  **← “buy land” can become sale if land regex missed**
9. rent — rent, yearly, per annum, tenant

**Leaks:** “weekend” ⇒ shortlet even for hall; “land title” may hit sale; “let” is **not** in rent regex anymore (good for “short-let”); PH as city uses `\bph\b`; budget: first number, if `n <= 500` treated as millions (so “2 bed” can poison budget if it matches `(\d+)(m)?` — **beds “2” with optional million: `2` ≤ 500 ⇒ ₦2,000,000 budget** unless `m` group — the regex is `(\d+(?:\.\d+)?)\s*(m|million)?` which **always** matches the first number, including beds. **Budget detection is a known leak.**)

Cities: Lagos (lekki, ajah, ikeja, vi, victoria island, ikoyi, yaba), Abuja (gwarinpa, wuse, maitama, kubwa, jabi), Port Harcourt (port harcourt, ph, trans amadi, rumuokoro, gra ph). **No Ibadan, Enugu, Kano, etc.**

---

## 7. Seed catalogue (`lib/seed.ts`)

Rent: Lekki 2-bed 4.5m, Gwarinpa 3-bed 3.2m, PH mini 900k  
Shortlet: VI 85k/night, Wuse2 70k/night  
Sale: Ikeja GRA 4-bed 180m  
Land: Ibeju 600sqm 25m, Kubwa 500sqm 12m  
Lease: VI office 18m/year  
Hall: Ikeja 300 pax 1.5m/day, Maitama 150 pax 900k  
Build: Ajah duplex completion 45m  
Consult: Lagos 50k  

---

## 8. Pricing (copy only)

- 7-day free trial (unenforced)
- Starter ₦10,000/mo — 1 line, 15 listings, holds, never-pay, voice **on demo**
- Pro ₦25,000/mo — 40 listings, all services, weekly report **claimed**

No metering of listings (15/40). No plan flag.

---

## 9. WhatsApp webhook contract

**GET** verify: `hub.mode === subscribe` && `hub.verify_token === process.env.WHATSAPP_VERIFY_TOKEN` → echo `hub.challenge`. Else 403.

**POST:** parse `entry[0].changes[0].value.messages[0]`. If `from`, text body, `phone_number_id`, and `WHATSAPP_TOKEN`:

- `reply(text, {})`
- `POST https://graph.facebook.com/v21.0/{phoneId}/messages` Bearer token, body slice 4000
- Errors swallowed (`.catch(() => undefined)`)
- Always `{ ok: true }`

**Leaks:**

- **No Meta signature check** (`X-Hub-Signature-256`). Anyone who can POST the URL can trigger outbound WhatsApp if env token is set (spam/cost).
- No session store keyed by `from`
- No per-tenant phone_number_id mapping
- Media, location, interactive messages ignored (`text.body` only)
- Voice notes not transcribed
- Token in env is **full Graph access**; leaked Vercel env = account takeover of WABA send

---

## 10. `/api/chat` contract

```json
POST { "text": "string max 2000", "session": Session, "listings": Listing[0..40] }
→ { "text": string, "session": Session without extraListings }
```

**Leaks:**

- No auth, no CSRF origin check, no rate limit → **public matcher + listing injection**
- Client-supplied `listings` are trusted (price/title/notes). Attacker can make the bot quote fake prices
- `session.agencyName` echoed in hello (XSS: React text nodes OK; WhatsApp not used here). If later concatenated into HTML unsafely, risk
- No CAPTCHA

---

## 11. Security / privacy / legal leak list (roast this)

1. **No multi-tenancy.** All “agencies” share one demo + public seed.
2. **localStorage is not an agency account.** Clear cookies = listings gone. Two devices = two worlds. Share link does not carry listings or logo.
3. **Trial/pricing fraud.** Anyone uses forever for ₦0.
4. **Never-pay is copy + regex.** Easy bypass: “send 200k to hold”, “opay”, “naira”, bank name without those words.
5. **Inspection “held” is a string on session.** No conflict detection, no agent notify, no reminder 2h before (copy lies).
6. **Legal:** bot says not legal advice; still discusses title/gazette. Consult listing exists. Risk if users treat as counsel.
7. **Brand impersonation:** any visitor types “GTBank Homes”, uploads a logo, shares `/d/gtbank-homes?w=gtbank.com`.
8. **Logo data URLs** in localStorage; large strings; XSS if ever `dangerouslySetInnerHTML`.
9. **`sanitizeWebsite` allows http and localhost.** Open redirect / mixed content if rendered as link later. Currently mostly shown as text.
10. **Share `w=` hostname** rebuilt with `https://` via sanitize — OK. Path on original URL dropped in share (only hostname) — **catalogue deep links lost**.
11. **Voice:** Chrome/Edge; `en-NG` may fall back; mic permission; no server audio = no phone bot. **Claiming “automated voice assistant” without Twilio/Meta calling is a sales leak.**
12. **PII:** WhatsApp `from` numbers hit Vercel logs if logging enabled; no retention policy.
13. **No NDPR/GDPR** notices, no terms on PlotReply (Hopayola has terms; this app does not).
14. **Secrets:** `.env*.local` gitignored; `.env.example` is safe. Confirm no tokens in git history.
15. **Supply chain:** Next 14 not 15; no Dependabot mentioned.
16. **Hopayola mix:** production Hopayola must not set Root Directory to `plotreply`. PlotReply must not use Hopayola Supabase keys.
17. **Dashboard report** is fake — selling Pro on that is a leak if a buyer audits.
18. **City lock-in** + budget parser will mis-qualify real Nigerian chats (Pidgin, “2m”, “2 million naira”, “bedsitter”).
19. **No i18n** despite “English nationwide” — Pidgin/Yoruba/Hausa/Igbo fail.
20. **Accessibility:** voice-only Speak button, contrast not audited.

---

## 12. What is explicitly NOT built

- User signup / magic link / OTP
- Paystack subscription + trial clock
- Supabase (commented in env only)
- Listing photos, maps, C of O upload
- Agent calendar / Google Calendar
- Notifications (WhatsApp template, SMS, email Monday report)
- Admin console
- Usage limits 15 vs 40
- Fetching/scraping agency websites
- Anti-phishing domain verification (anyone can put `w=their-agency.com`)
- Phone/IVR voice
- Tests / CI
- Rate limiting / WAF
- Webhook signature
- Session Redis

---

## 13. How to sell vs how it works (alignment)

| Sales sentence | Implementation |
|---|---|
| Answers as your brand | Demo header + hello string; WhatsApp = “the agency” |
| Your logo | localStorage image on that browser |
| 24/7 WhatsApp | Only if Meta webhook + token; still no memory |
| Never collect payment | Regex refuse; no payment APIs |
| Weekly report | Dummy numbers |
| 7-day trial | Query param copy |
| Voice desk | Browser mic/TTS on `/demo` |

---

## 14. Suggested roast angles for the other model

- Threat model: unauthenticated `/api/chat` + listing injection + WhatsApp unsigned webhook
- Product ethics: fake Pro metrics, unenforced trial, brand impersonation
- NLP: budget/intent collisions, 3 cities, English-only
- Ops: no persistence, no observability, Next 14 on Vercel Hobby
- Compliance: NDPR, WhatsApp Commerce Policy (no payments in chat is aligned; impersonation is not)
- Gap to “world-class”: need tenant DB, signed webhooks, billing, real reports, verified domains, session per `wa_id`

---

## 15. Local run

```bash
cd plotreply
npm install
npm run dev
# http://127.0.0.1:3200
```

No required env for demo. WhatsApp send requires `WHATSAPP_TOKEN` + `WHATSAPP_VERIFY_TOKEN`.

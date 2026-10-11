# PlotReply

WhatsApp inbox for Nigerian agents and short-let hosts: qualify, match listings, book inspections or dates. Never collect payment in chat.

## Run locally

```bash
cd plotreply
npm install
npm run dev
```

Open **http://127.0.0.1:3200**. `npm run dev` now starts Next in development mode on that host/port.

Onboarded listings persist in the browser and are matched in `/demo`. Cloud persistence still needs Supabase.

- `/` landing
- `/demo` talk to the bot (seed Lagos / Abuja / PH listings)
- `/onboard` self-serve listing form
- `/dashboard` listing list
- `POST /api/chat` bot
- `GET|POST /api/whatsapp` Meta Cloud API webhook

## WhatsApp (when you have a Cloud API number)

1. Meta app → WhatsApp → webhook `https://YOUR_DOMAIN/api/whatsapp`
2. Verify token = `WHATSAPP_VERIFY_TOKEN`
3. Set `WHATSAPP_TOKEN` on Vercel

Until Meta is connected, ship the **demo inbox** — same bot logic.

## Stack

Own GitHub repo + Vercel project (root = this folder). Not part of Hopayola.

## Pricing (agents)

7-day free trial, then **Starter ₦10,000 / month** or **Pro ₦25,000 / month**.

## Deploy

1. Create empty GitHub repo (e.g. `Yuubbie/plotreply`)
2. `git remote add origin https://github.com/Yuubbie/plotreply.git && git push -u origin main`
3. Vercel → Add New Project → that repo → Root Directory empty (this is the app root)

Hobby Vercel is free. You are not billed for Hopayola by running PlotReply.

Until Meta WhatsApp is connected you pay **₦0** to run the demo site.

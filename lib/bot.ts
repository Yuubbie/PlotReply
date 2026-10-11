import { SEED_LISTINGS } from "./seed";
import type { Intent, Listing, Session } from "./types";
import { INTENT_LABELS } from "./types";
import { websiteLine } from "./website";

const naira = (n: number) => "₦" + n.toLocaleString("en-NG");

function detectIntent(text: string): Intent | undefined {
  const t = text.toLowerCase();
  if (/(short.?let|airbnb|weekend|per night|nights?)/.test(t)) return "shortlet";
  if (/(hall|event centre|event center|reception|wedding venue|banquet)/.test(t)) return "hall";
  if (/(consult|advice|valuation|what should i|realtor advice)/.test(t)) return "consult";
  if (/(build|complete(d)? house|finishing|carcass|contractor|boq)/.test(t)) return "build";
  if (/(plot|land|acre|hectares?|gazette)/.test(t)) return "land";
  if (/(lease|commercial space|office floor)/.test(t)) return "lease";
  if (/(buy house|buy a house|duplex for sale|outright|selling house)/.test(t)) return "sale";
  if (/(buy|sale|selling|title|c of o)/.test(t)) return "sale";
  if (/(rent|yearly|per annum|tenant)/.test(t)) return "rent";
  return undefined;
}

function detectCity(text: string): string | undefined {
  const t = text.toLowerCase();
  if (/(lagos|lekki|ajah|ikeja|vi\b|victoria island|ikoyi|yaba)/.test(t)) return "Lagos";
  if (/(abuja|gwarinpa|wuse|maitama|kubwa|jabi)/.test(t)) return "Abuja";
  if (/(port harcourt|\bph\b|trans amadi|rumuokoro|gra ph)/.test(t)) return "Port Harcourt";
  return undefined;
}

function detectBudget(text: string): number | undefined {
  const t = text.replace(/,/g, "").toLowerCase();
  const m = t.match(/(\d+(?:\.\d+)?)\s*(m|million)?/);
  if (!m) return undefined;
  const n = parseFloat(m[1]);
  if (m[2] || n <= 500) return Math.round(n * 1_000_000);
  return Math.round(n);
}

function detectBeds(text: string): number | undefined {
  const m = text.toLowerCase().match(/(\d+)\s*-?\s*bed/);
  if (!m) return undefined;
  return parseInt(m[1], 10);
}

function detectSlot(text: string): string | undefined {
  const t = text.trim();
  if (
    /(monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|today|\d{1,2}\s*(am|pm))/i.test(
      t,
    ) &&
    t.length < 80
  ) {
    return t;
  }
  return undefined;
}

function catalogue(session: Session): Listing[] {
  const extra = session.extraListings || [];
  const seen = new Set(extra.map((l) => l.id));
  return [...extra, ...SEED_LISTINGS.filter((l) => !seen.has(l.id))];
}

function matchListings(s: Session): Listing[] {
  return catalogue(s)
    .filter((l) => {
      if (s.intent && l.intent !== s.intent) return false;
      if (s.city && l.city.toLowerCase() !== s.city.toLowerCase()) return false;
      if (s.beds && l.beds > 0 && l.beds !== s.beds) return false;
      if (s.budget && l.intent !== "shortlet" && l.intent !== "hall" && l.priceNgn > s.budget * 1.15)
        return false;
      return true;
    })
    .slice(0, 3);
}

function card(l: Listing) {
  const unit =
    l.intent === "shortlet"
      ? "/night"
      : l.intent === "rent" || l.intent === "lease"
        ? "/year"
        : l.intent === "hall"
          ? "/event day"
          : "";
  return `• ${INTENT_LABELS[l.intent]} · ${l.title} — ${l.area}, ${l.city}\n  ${naira(l.priceNgn)}${unit}\n  ${l.notes}`;
}

export function reply(userText: string, session: Session): { text: string; session: Session } {
  const intent = detectIntent(userText) ?? session.intent;
  const city = detectCity(userText) ?? session.city;
  const budget = detectBudget(userText) ?? session.budget;
  const beds = detectBeds(userText) ?? session.beds;
  const next: Session = { ...session, intent, city, budget, beds };

  const t = userText.toLowerCase();
  const site = next.websiteUrl;

  if (/(website|your site|catalogue|catalog|listings page|property site)/.test(t) && site) {
    return {
      session: next,
      text: `Open the agency website, pick what you want, then come back with area + budget (or paste the listing link).\n${site}`,
    };
  }

  if (/https?:\/\//i.test(userText) && !/(pay|transfer)/.test(t)) {
    return {
      session: next,
      text:
        "Got the listing link. Tell me what you want: land, buy a house, rent, lease, short-let, event hall, build/complete, or consultation — plus budget and when you can inspect." +
        websiteLine(site),
    };
  }

  if (/(pay|transfer|pos|account number|send money)/.test(t)) {
    return {
      session: next,
      text: "Do not pay anyone in this chat. PlotReply never collects rent, caution, or holding fees. Inspect or check in with the agent first.",
    };
  }

  const slot = detectSlot(userText);
  if (slot && next.intent && next.city) {
    next.inspectionHeld = slot;
    if (next.intent === "shortlet" || next.intent === "hall") {
      return {
        session: next,
        text: `${slot} noted. Guest/event count if you have it. No payment in this chat — they confirm the hold.`,
      };
    }
    return {
      session: next,
      text: `${slot} held for inspection or site visit. Landmark + ID reminder goes out 2 hours before. The agent only wakes for this slot. Do not pay in this chat.`,
    };
  }

  const brand = (next.agencyName || "").trim() || "the agency";

  if (/(hi|hello|hey|good morning|good evening)/.test(t) && t.length < 24) {
    return {
      session: next,
      text:
        `Hello — this is ${brand}.\nLand, buy a house, rent, lease, short-let, event hall, build/complete, or consultation?\nSend city/area and budget (e.g. “plot Ibeju 25m”, “2-bed Lekki rent 4m”, “Ikeja hall Saturday”).` +
        websiteLine(site),
    };
  }

  if (!next.intent) {
    return {
      session: next,
      text: "What do you need: buy land, buy a house, rent, lease, short-let, event hall, build/complete a house, or consultation?",
    };
  }

  if (!next.city) {
    return {
      session: next,
      text: "Which city or area? (Lagos, Abuja, Port Harcourt, or an estate name.)",
    };
  }

  const hits = matchListings(next);
  if (!hits.length) {
    return {
      session: next,
      text:
        `No live match for ${INTENT_LABELS[next.intent]} in ${next.city} yet. I can take your request and the agent will hunt. Send budget + when you can visit.` +
        websiteLine(site),
    };
  }

  const book =
    next.intent === "shortlet" || next.intent === "hall"
      ? "\n\nTo hold a date, send the day + guest count. They confirm. No payment in this chat."
      : next.intent === "consult"
        ? "\n\nTo book the consultation, send a day (e.g. Thursday 11am). No payment in this chat."
        : "\n\nTo book an inspection or site visit, send a day (e.g. Saturday 1pm). Bring ID. No payment in this chat.";

  return {
    session: next,
    text: `Here is what is live:\n\n${hits.map(card).join("\n\n")}${book}${websiteLine(site)}`,
  };
}

export const INTENTS = [
  "land",
  "sale",
  "rent",
  "lease",
  "shortlet",
  "hall",
  "build",
  "consult",
] as const;

export type Intent = (typeof INTENTS)[number];

export const INTENT_LABELS: Record<Intent, string> = {
  land: "Buy land",
  sale: "Buy a house",
  rent: "Rent a house",
  lease: "Lease",
  shortlet: "Short-let",
  hall: "Event hall",
  build: "Build / complete a house",
  consult: "Real estate consultation",
};

export type Listing = {
  id: string;
  title: string;
  city: string;
  area: string;
  intent: Intent;
  beds: number;
  priceNgn: number;
  notes: string;
};

export type ChatTurn = { role: "user" | "bot"; text: string };

export type Session = {
  intent?: Intent;
  city?: string;
  budget?: number;
  beds?: number;
  nights?: number;
  inspectionHeld?: string;
  websiteUrl?: string;
  agencyName?: string;
  extraListings?: Listing[];
};

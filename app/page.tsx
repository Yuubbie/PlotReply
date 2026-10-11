import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Mark } from "@/components/Logo";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/60 px-3 py-1 text-xs font-medium tracking-wide text-moss">
              <Mark className="h-4 w-4" /> Land · houses · halls · build · consult
            </p>
            <h1 className="font-serif text-4xl font-medium leading-[1.15] md:text-5xl">
              Agents: the house is still on your list.
              <span className="block text-moss">The paying client already left the chat.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/70">
              This is not about land vanishing. It is about <span className="font-medium text-ink">you</span> —
              the agent or host — losing the person who had budget, because another desk answered
              “how much?” at 11pm in their own brand. If you already live in WhatsApp: this is for
              the hours you sleep, drive, or inspect. The desk talks as your agency, in chat or
              voice. It never asks for transfer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/onboard?trial=1"
                className="rounded-full bg-moss px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-ink"
              >
                Start 7-day free trial
              </Link>
              <Link
                href="/how"
                className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-medium hover:border-moss"
              >
                How it works
              </Link>
            </div>
            <p className="mt-4 text-xs text-ink/45">
              One wasted inspection trip already costs more than Starter (₦10k/month).
            </p>
          </div>

          <div className="rounded-[28px] border border-ink/10 bg-ink p-3 shadow-xl">
            <div className="flex items-center gap-3 rounded-t-2xl px-3 py-2 text-sand/80">
              <Mark className="h-8 w-8" />
              <div>
                <p className="text-sm font-medium text-sand">Horizon Homes</p>
                <p className="text-[11px] text-sand/50">Your logo · your name · never asks for transfer</p>
              </div>
            </div>
            <div className="space-y-2.5 rounded-2xl bg-[#ece5dd] p-4 text-[13px] leading-snug">
              <div className="ml-8 rounded-2xl rounded-tr-sm bg-white px-3 py-2 shadow-sm">
                2 bedroom Lekki rent 4m
              </div>
              <div className="mr-6 rounded-2xl rounded-tl-sm bg-[#d9fdd3] px-3 py-2 shadow-sm">
                Live now:
                <br />
                <span className="font-medium">2-bed serviced estate — Lekki Phase 1</span>
                <br />
                ₦4,500,000 / year · prepaid · 10% agency
                <br />
                Send a day to inspect. Do not pay in this chat.
              </div>
              <div className="ml-8 rounded-2xl rounded-tr-sm bg-white px-3 py-2 shadow-sm">
                Saturday 1pm
              </div>
              <div className="mr-6 rounded-2xl rounded-tl-sm bg-[#d9fdd3] px-3 py-2 shadow-sm">
                Saturday 1pm held. Landmark + ID reminder goes out 2 hours before. The agent only
                wakes for this slot.
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/8 px-5 py-8">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-2">
            {[
              "Buy land",
              "Buy a house",
              "Rent",
              "Lease",
              "Short-let",
              "Event halls",
              "Build / complete",
              "Consultation",
            ].map((s) => (
              <span
                key={s}
                className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium text-ink/70"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="border-y border-ink/10 bg-ink text-sand">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-3">
            {[
              [
                "47 unread",
                "That is not interest. That is people who already moved on because you replied at 2pm.",
              ],
              [
                "Fuel for ghosts",
                "You leave Lekki for a viewing. They never had the budget. Your time is the product they stole.",
              ],
              [
                "Account number = scam face",
                "The second you ask for transfer in chat, a real tenant blocks you. PlotReply never collects money.",
              ],
            ].map(([t, d]) => (
              <div key={t}>
                <h2 className="font-serif text-2xl text-gold">{t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-sand/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="bg-cream">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl">How it works</h2>
                <p className="mt-2 max-w-2xl text-ink/60">
                  Upload your logo. Clients WhatsApp <span className="font-medium text-ink">you</span>.
                  You only drive when a slot is held.
                </p>
              </div>
              <Link href="/how" className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm">
                Full walkthrough
              </Link>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                [
                  "01",
                  "Make it yours",
                  "Logo, agency name, listings website. The chat header is your brand. PlotReply is invisible.",
                ],
                [
                  "02",
                  "Desk answers 24/7",
                  "Budget, area, rent / buy / short-let — from your prices. “Send money” is shut down.",
                ],
                [
                  "03",
                  "You meet money",
                  "They book Saturday 1pm. You show up. Pro: Monday report of chats, holds, hot listings.",
                ],
              ].map(([n, t, d]) => (
                <div key={n}>
                  <p className="font-serif text-gold">{n}</p>
                  <h3 className="mt-2 font-serif text-xl">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="font-serif text-3xl">What makes this world-class</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Your logo on the thread", "Not a generic green bot. Their Instagram bio can match the WhatsApp they open."],
              ["Never-pay shield", "Any “transfer / POS / account” is refused. You look like a proper agency, not a hustle."],
              ["Inspection hold + ID reminder", "Slot is locked. Landmark ping 2 hours before. You stop chasing."],
              ["Always on at 2am", "The CEO who texts after owambe gets a listing, not a blue tick."],
              ["Voice desk", "They can speak. The same bot answers out loud as your agency. Same never-pay rules."],
              ["Your catalogue, not invented prices", "They click your website, paste a link, or match live stock you approved."],
              ["Pro weekly report", "Monday: chats, inspections held, which houses got heat. Restock what sells."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-ink/8 bg-white p-5">
                <p className="font-medium">{t}</p>
                <p className="mt-1 text-sm text-ink/60">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-5 pb-16">
          <h2 className="font-serif text-3xl">Start with 7 days free</h2>
          <p className="mt-2 max-w-xl text-ink/60">
            Full product for a week. Cancel before day 8 and you pay nothing. Then Starter or Pro.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/onboard?trial=1"
              className="inline-flex rounded-full bg-moss px-8 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-ink"
            >
              Start 7-day free trial
            </Link>
            <Link
              href="/how"
              className="inline-flex rounded-full border border-ink/15 bg-white px-8 py-3.5 text-sm hover:border-moss"
            >
              How it works
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-moss">Starter</p>
              <p className="mt-3 font-serif text-4xl">₦10k</p>
              <p className="text-sm text-ink/45">per month after trial</p>
              <ul className="mt-4 space-y-2 text-sm text-ink/70">
                <li>Your logo + name on 1 WhatsApp line</li>
                <li>Full desk: land, buy, rent, lease, short-let, halls, build, consult · 15 listings</li>
                <li>Inspection holds · never-pay shield · voice on the demo desk</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-moss/30 bg-cream p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-moss">Pro</p>
              <p className="mt-3 font-serif text-4xl">₦25k</p>
              <p className="text-sm text-ink/45">per month after trial</p>
              <ul className="mt-4 space-y-2 text-sm text-ink/70">
                <li>Your logo · you stay out of the chat</li>
                <li>All services · 40 listings</li>
                <li>Inspection holds + never-pay shield</li>
                <li>
                  <span className="font-medium text-ink">Weekly report</span> — chats, inspections
                  held, listings that got interest. Every Monday.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

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
              <Mark className="h-4 w-4" /> Nigeria · rent · sale · short-let
            </p>
            <h1 className="font-serif text-4xl font-medium leading-[1.15] md:text-5xl">
              Every “how much?” answered.
              <span className="block text-moss">You only meet serious people.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">
              Clients WhatsApp your agency — not a generic bot. Your name, your site, your
              listings. PlotReply stays in the background. It never takes payment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/onboard?trial=1"
                className="rounded-full bg-moss px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-ink"
              >
                Start 7-day free trial
              </Link>
              <Link
                href="/demo"
                className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm hover:border-moss"
              >
                See it as your brand
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-ink/10 bg-ink p-3 shadow-xl">
            <div className="flex items-center gap-3 rounded-t-2xl px-3 py-2 text-sand/80">
              <Mark className="h-8 w-8" />
              <div>
                <p className="text-sm font-medium text-sand">Horizon Homes</p>
                <p className="text-[11px] text-sand/50">Your WhatsApp · never asks for transfer</p>
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

        <section id="how" className="border-y border-ink/8 bg-cream">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <h2 className="font-serif text-3xl">It sounds like your agency</h2>
            <p className="mt-2 max-w-2xl text-ink/60">
              Put your name and listings website in. Clients open WhatsApp and talk to{" "}
              <span className="font-medium text-ink">you</span>. They browse your catalogue, get
              your prices, and book with you. PlotReply is the desk — your brand is on the door.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                [
                  "01",
                  "You set the brand",
                  "Agency name + your public listings URL. That is what clients see and click.",
                ],
                [
                  "02",
                  "They chat your line",
                  "Hello is in your name. Matches come from your houses. No PlotReply pitch in the thread.",
                ],
                [
                  "03",
                  "You only meet serious people",
                  "Inspection or stay dates booked. Time-wasters stay in WhatsApp. You walk in for the slot.",
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

        <section id="pricing" className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-serif text-3xl">Start with 7 days free</h2>
          <p className="mt-2 max-w-xl text-ink/60">
            Full product for a week. Cancel before day 8 and you pay nothing. Then Starter or Pro.
          </p>
          <Link
            href="/onboard?trial=1"
            className="mt-6 inline-flex rounded-full bg-moss px-8 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-ink"
          >
            Start 7-day free trial
          </Link>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-moss">Starter</p>
              <p className="mt-3 font-serif text-4xl">₦10k</p>
              <p className="text-sm text-ink/45">per month after trial</p>
              <ul className="mt-4 space-y-2 text-sm text-ink/70">
                <li>1 WhatsApp line in your agency name</li>
                <li>Rent or short-let · 15 listings</li>
                <li>Inspection holds · no payment in chat</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-moss/30 bg-cream p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-moss">Pro</p>
              <p className="mt-3 font-serif text-4xl">₦25k</p>
              <p className="text-sm text-ink/45">per month after trial</p>
              <ul className="mt-4 space-y-2 text-sm text-ink/70">
                <li>1 WhatsApp line · you stay out of the chat</li>
                <li>Rent, sale, and short-let · 40 listings</li>
                <li>Inspection holds</li>
                <li>
                  <span className="font-medium text-ink">Weekly report</span> — chats, inspections
                  held, listings that got interest. Sent to you every Monday.
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

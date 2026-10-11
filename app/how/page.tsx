import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const steps = [
  {
    n: "1",
    t: "Start the 7-day trial",
    d: "No card today. You get a live inbox that answers as your agency.",
  },
  {
    n: "2",
    t: "Upload logo, name, website",
    d: "Clients see your mark and your listings site — not PlotReply.",
  },
  {
    n: "3",
    t: "Add houses (or paste your catalogue URL)",
    d: "Land, houses (buy / rent / lease), short-lets, halls, build/complete, consultation. Prices only from what you approve.",
  },
  {
    n: "4",
    t: "Share your WhatsApp / demo link",
    d: "Put it on Instagram, your site, and status. They can type or speak. Every “how much?” lands here.",
  },
  {
    n: "5",
    t: "You only drive for booked slots",
    d: "They send Saturday 1pm. ID reminder goes out. You show up. No payment in chat.",
  },
  {
    n: "6",
    t: "Pro: Monday report",
    d: "Chats, inspections held, which listings got interest — so you know what to restock.",
  },
];

export default function HowPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 py-14">
        <p className="text-xs uppercase tracking-wider text-moss">How it works</p>
        <h1 className="mt-2 font-serif text-4xl">From first “how much?” to a real inspection</h1>
        <p className="mt-4 text-ink/65">
          You do not learn a new CRM. You brand the desk, point people at WhatsApp, and only leave
          the office when someone is serious.
        </p>
        <ol className="mt-10 space-y-6">
          {steps.map((s) => (
            <li key={s.n} className="flex gap-4">
              <span className="font-serif text-2xl text-gold">{s.n}</span>
              <div>
                <h2 className="font-serif text-xl">{s.t}</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink/65">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link
          href="/onboard?trial=1"
          className="mt-12 inline-flex rounded-full bg-moss px-8 py-3.5 text-sm font-medium text-white hover:bg-ink"
        >
          Start 7-day free trial
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}

import Link from "next/link";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/8 bg-sand/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Logo />
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/how" className="rounded-full px-3 py-1.5 text-ink/70 hover:bg-white/70">
            How it works
          </Link>
          <Link href="/demo" className="rounded-full px-3 py-1.5 text-ink/70 hover:bg-white/70">
            Demo
          </Link>
          <Link href="/dashboard" className="rounded-full px-3 py-1.5 text-ink/70 hover:bg-white/70">
            Dashboard
          </Link>
          <Link
            href="/onboard?trial=1"
            className="ml-1 rounded-full bg-moss px-4 py-2 text-sm font-medium text-white hover:bg-ink"
          >
            Start 7-day free trial
          </Link>
        </nav>
      </div>
    </header>
  );
}

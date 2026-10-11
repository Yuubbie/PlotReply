import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PlotReply — WhatsApp desk for land, houses, halls, and more",
  description:
    "Nigeria: buy land, buy or rent or lease houses, short-lets, event halls, build/complete, consultation. Your brand. Never takes payment in chat.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="min-h-screen font-sans antialiased" style={{ fontFamily: "var(--font-sans), Outfit, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}

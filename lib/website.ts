export function sanitizeWebsite(raw: string | undefined | null): string | undefined {
  const t = (raw || "").trim();
  if (!t) return undefined;
  try {
    const withProto = /^https?:\/\//i.test(t) ? t : `https://${t}`;
    const u = new URL(withProto);
    if (u.protocol !== "http:" && u.protocol !== "https:") return undefined;
    if (u.hostname === "localhost" || u.hostname === "127.0.0.1") return withProto;
    return u.origin + (u.pathname === "/" ? "" : u.pathname.replace(/\/$/, ""));
  } catch {
    return undefined;
  }
}

export function siteHost(raw: string | undefined | null): string | undefined {
  const s = sanitizeWebsite(raw);
  if (!s) return undefined;
  try {
    return new URL(s).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

export function slugify(name: string) {
  const s = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return s || "inbox";
}

export function unslug(slug: string) {
  return slug
    .replace(/-+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function websiteLine(url?: string) {
  if (!url) return "";
  return `\n\nBrowse the full catalogue on the agency site, then send the area, budget, and the listing you want:\n${url}`;
}

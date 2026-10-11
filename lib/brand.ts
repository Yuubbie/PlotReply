export const BRAND_LOGO_KEY = "pr_logo";

export function loadLogo(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(BRAND_LOGO_KEY) || "";
}

export function saveLogo(dataUrl: string) {
  if (!dataUrl) {
    localStorage.removeItem(BRAND_LOGO_KEY);
    return;
  }
  localStorage.setItem(BRAND_LOGO_KEY, dataUrl);
}

export function readLogoFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!/^image\/(png|jpe?g|webp|svg\+xml)$/i.test(file.type)) {
      reject(new Error("Use PNG, JPG, or WebP."));
      return;
    }
    if (file.size > 600_000) {
      reject(new Error("Keep the logo under 600KB."));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

"use client";

import { useEffect, useState } from "react";
import { Mark } from "./Logo";
import { loadLogo } from "@/lib/brand";

export function BrandMark({
  className = "h-9 w-9",
  src: srcProp,
}: {
  className?: string;
  src?: string;
}) {
  const [src, setSrc] = useState(srcProp || "");

  useEffect(() => {
    setSrc(srcProp || loadLogo());
  }, [srcProp]);

  if (src) {
    return (
      <img
        src={src}
        alt=""
        className={`${className} rounded-lg object-cover bg-white`}
      />
    );
  }
  return <Mark className={className} />;
}

export function LogoUpload({
  onChange,
}: {
  onChange?: (src: string) => void;
}) {
  const [src, setSrc] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setSrc(loadLogo());
  }, []);

  return (
    <label className="block text-sm font-medium">
      Agency logo
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="mt-1 block w-full text-sm font-normal file:mr-3 file:rounded-full file:border-0 file:bg-moss file:px-3 file:py-1.5 file:text-white"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setErr("");
          try {
            const { readLogoFile, saveLogo } = await import("@/lib/brand");
            const data = await readLogoFile(file);
            saveLogo(data);
            setSrc(data);
            onChange?.(data);
          } catch (ex) {
            setErr(ex instanceof Error ? ex.message : "Upload failed");
          }
        }}
      />
      {src ? (
        <img src={src} alt="Logo preview" className="mt-3 h-14 w-14 rounded-xl object-cover border border-ink/10" />
      ) : null}
      {err ? <p className="mt-1 text-xs text-red-700">{err}</p> : null}
    </label>
  );
}

import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LANGUAGES, type LangCode, type Language } from "@/lib/lang";

export function CandyBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="floaty absolute -top-16 -left-16 size-64 rounded-full bg-blush/70" />
      <div className="floaty absolute top-24 right-10 size-24 rounded-full bg-butter" style={{ ["--r" as string]: "12deg" }} />
      <div className="floaty absolute bottom-10 left-1/3 size-40 rounded-[3rem] bg-mint/70" style={{ ["--r" as string]: "-8deg" }} />
      <div className="floaty absolute bottom-40 -right-10 size-56 rounded-full bg-sky/70" style={{ ["--r" as string]: "20deg" }} />
    </div>
  );
}

export function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="grid size-11 place-items-center rounded-2xl bg-primary shadow-pop-sm">
        <span className="font-display text-xl font-bold text-primary-foreground">अ</span>
      </div>
      <div>
        <p className="font-display text-lg leading-none font-semibold">BhashaMitra</p>
        <p className="text-[11px] font-extrabold tracking-[0.18em] text-inksoft uppercase">MTB-MLE Kit</p>
      </div>
    </Link>
  );
}

export function OfflineChip() {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-xs font-extrabold text-ink">
      <span className="size-2 rounded-full bg-leaf" /> Offline ready
    </span>
  );
}

export function LanguagePicker({
  value,
  onChange,
  size = "md",
}: {
  value: LangCode;
  onChange: (code: LangCode) => void;
  size?: "sm" | "md";
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          aria-pressed={value === l.code}
          className={[
            "pill shadow-pop-sm",
            size === "sm" ? "min-h-10 px-4 text-sm" : "text-sm",
            value === l.code ? "bg-butter text-ink shadow-pop" : "bg-card text-ink",
          ].join(" ")}
        >
          {l.name}
        </button>
      ))}
    </div>
  );
}

const TABS = [
  { to: "/workspace", label: "Home" },
  { to: "/translate", label: "Translate" },
  { to: "/voice", label: "Live voice" },
  { to: "/materials", label: "Materials" },
  { to: "/workflow", label: "Workflow" },
] as const;

export function AppShell({
  children,
  language,
  onLanguageChange,
}: {
  children: ReactNode;
  language: Language;
  onLanguageChange: (code: LangCode) => void;
}) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <CandyBackdrop />
      <header className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 pt-5 sm:px-6">
        <Brand />
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-sky px-3 py-1.5 text-xs font-extrabold text-ink">
            Hindi → {language.name}
          </span>
          <OfflineChip />
        </div>
      </header>

      <nav className="relative z-10 mx-auto mt-4 max-w-6xl px-4 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              activeProps={{ className: "bg-ink text-cream shadow-pop" }}
              inactiveProps={{ className: "bg-card text-inksoft shadow-pop-sm" }}
              className="pill min-h-10 shrink-0 px-4 text-sm"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</main>

      <footer className="relative z-10 mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-5 sm:flex-row">
          <LanguagePicker value={language.code} onChange={onLanguageChange} size="sm" />
          <p className="text-xs font-bold text-inksoft">
            Built for PALASH MTB-MLE · Offline-first · Android 9+
          </p>
        </div>
      </footer>
    </div>
  );
}

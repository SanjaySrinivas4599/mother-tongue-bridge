import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, LanguagePicker } from "@/components/AppShell";
import { useLanguage, LANGUAGES } from "@/lib/lang";

export const Route = createFileRoute("/workspace")({
  head: () => ({
    meta: [
      { title: "Teaching Workspace — BhashaMitra" },
      {
        name: "description",
        content:
          "Choose Ho, Mundari or Santhali and open curriculum translation, live voice translation, or worksheet generation.",
      },
      { property: "og:title", content: "Teaching Workspace — BhashaMitra" },
      {
        property: "og:description",
        content: "Pick a tribal language and start teaching in the child's mother tongue.",
      },
    ],
  }),
  component: Workspace,
});

const FEATURES = [
  {
    to: "/translate",
    tint: "bg-sky",
    icon: "📄",
    title: "Curriculum Translation",
    body: "Turn Hindi FLN lesson scripts, activity steps and assessment prompts into context-aware text plus audio.",
    note: "142 lessons stored on device",
  },
  {
    to: "/voice",
    tint: "bg-blush",
    icon: "🎙️",
    title: "Real-Time Voice",
    body: "Speak Hindi and the class hears their own language back — live dialogue in under three seconds.",
    note: "Sub-3 second latency",
  },
  {
    to: "/materials",
    tint: "bg-mint",
    icon: "✨",
    title: "Learning Material",
    body: "Auto-build bilingual worksheets and visual flashcards mapped to NIPUN Bharat outcomes.",
    note: "36 ready-made sets",
  },
] as const;

function Workspace() {
  const { language, select } = useLanguage();

  return (
    <AppShell language={language} onLanguageChange={select}>
      <section>
        <p className="text-xs font-extrabold tracking-[0.18em] text-inksoft uppercase">Step 1</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">Select target language</h1>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => select(l.code)}
              aria-pressed={language.code === l.code}
              className={[
                "rounded-[2rem] p-5 text-left transition-transform active:translate-y-1",
                language.code === l.code
                  ? "bg-primary text-primary-foreground shadow-pop"
                  : "bg-card text-ink shadow-card",
              ].join(" ")}
            >
              <p className="font-display text-2xl font-semibold">{l.name}</p>
              <p className="mt-1 text-sm font-bold opacity-80">{l.native}</p>
              <p className="mt-3 text-xs font-bold opacity-70">
                {l.speakers} · pack {l.pack}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <p className="text-xs font-extrabold tracking-[0.18em] text-inksoft uppercase">Step 2</p>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Select a feature</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {FEATURES.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="flex flex-col rounded-[2rem] bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
            >
              <div className={`grid size-14 place-items-center rounded-2xl text-2xl ${f.tint}`}>{f.icon}</div>
              <h3 className="mt-4 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed font-medium text-inksoft">{f.body}</p>
              <p className="mt-4 rounded-2xl bg-cream p-3 text-xs font-extrabold text-inksoft">{f.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] bg-card p-6 shadow-card">
        <p className="text-xs font-extrabold tracking-[0.18em] text-inksoft uppercase">Offline content</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {LANGUAGES.map((l, i) => (
            <div key={l.code} className="rounded-2xl bg-cream p-4">
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span>
                  {l.name} pack · {l.pack}
                </span>
                <span className={i === 2 ? "text-primary" : "text-inksoft"}>
                  {i === 2 ? "Syncing 62%" : "Downloaded"}
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-border">
                <div
                  className={`h-full rounded-full ${i === 2 ? "w-[62%] bg-butter" : "w-full bg-leaf"}`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold text-inksoft">Local storage used · 141 MB of 8 GB</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-extrabold text-inksoft">Quick switch:</span>
            <LanguagePicker value={language.code} onChange={select} size="sm" />
          </div>
        </div>
      </section>
    </AppShell>
  );
}

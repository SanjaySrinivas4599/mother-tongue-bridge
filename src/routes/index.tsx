import { createFileRoute, Link } from "@tanstack/react-router";
import { Brand, CandyBackdrop, LanguagePicker, OfflineChip } from "@/components/AppShell";
import { translateToTribal, useLanguage } from "@/lib/lang";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BhashaMitra — Teach in the Child's Mother Tongue" },
      {
        name: "description",
        content:
          "AI translation, live voice and worksheet generation that lets Hindi-trained teachers deliver FLN lessons in Ho, Mundari and Santhali — fully offline.",
      },
      { property: "og:title", content: "BhashaMitra — Teach in the Child's Mother Tongue" },
      {
        property: "og:description",
        content:
          "Hindi FLN lessons become mother-tongue text, audio and worksheets on a low-cost offline tablet.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { language, select } = useLanguage();
  const sample = "एक से दस तक गिनो।";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <CandyBackdrop />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-6 sm:px-6">
        <Brand />
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <OfflineChip />
          </div>
          <Link to="/workspace" className="pill bg-ink text-sm text-cream shadow-pop">
            Open app
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-8 sm:px-6 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-card py-1.5 pr-4 pl-2 text-xs font-extrabold shadow-pop-sm">
            <span className="rounded-full bg-blush px-2.5 py-1 text-[11px] font-extrabold">New</span>
            Hindi → Ho · Mundari · Santhali
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
            Teach in the child's{" "}
            <span className="relative inline-block">
              <span className="relative z-10">mother tongue</span>
              <span className="absolute inset-x-0 bottom-2 -z-0 h-4 -rotate-1 rounded-md bg-butter" />
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed font-medium text-inksoft">
            An AI toolkit that turns Hindi FLN lessons into accurate text, audio and interactive
            dialogue — so any teacher can deliver mother-tongue primary education, fully offline.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to="/workspace" className="pill bg-primary text-primary-foreground shadow-pop">
              Start a lesson
            </Link>
            <Link to="/workflow" className="pill bg-card text-ink shadow-pop-sm">
              See how it works
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              ["<3s", "Voice translation"],
              ["100%", "Offline on tablet"],
              ["5,000+", "Schools targeted"],
            ].map(([big, small]) => (
              <div key={small}>
                <p className="font-display text-3xl font-bold">{big}</p>
                <p className="text-xs font-extrabold tracking-wide text-inksoft uppercase">{small}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rotate-1 rounded-[2rem] bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold">Lesson 4 · Numbers 1–10</p>
              <span className="rounded-full bg-sky px-3 py-1 text-xs font-extrabold">
                Hindi → {language.name}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-cream/70 p-3.5">
                <p className="text-[11px] font-extrabold tracking-wide text-inksoft uppercase">
                  Teacher input
                </p>
                <p className="text-lg font-bold">{sample}</p>
              </div>
              <div className="flex items-center justify-center">
                <span className="grid size-8 place-items-center rounded-full bg-aqua font-extrabold text-cream">
                  ↺
                </span>
              </div>
              <div className="rounded-2xl bg-mint p-3.5">
                <p className="text-[11px] font-extrabold tracking-wide text-inksoft uppercase">
                  {language.name} output
                </p>
                <p className="text-lg font-bold">{translateToTribal(sample, language.code)}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-full bg-ink text-sm font-extrabold text-cream">
                    ▶
                  </span>
                  <div className="flex h-6 flex-1 items-end gap-0.5">
                    {[2, 4, 6, 3, 5, 2, 4, 6, 3, 5].map((h, i) => (
                      <span key={i} className="w-1.5 rounded-full bg-leaf" style={{ height: `${h * 4}px` }} />
                    ))}
                  </div>
                  <span className="text-xs font-extrabold text-inksoft">0:04</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 -rotate-3 rounded-2xl bg-card px-4 py-3 shadow-card">
            <p className="text-[11px] font-extrabold tracking-wide text-inksoft uppercase">
              NIPUN Bharat
            </p>
            <p className="text-sm font-bold">Aligned worksheet</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 pb-6 sm:px-6">
        <span className="text-sm font-extrabold text-inksoft">Pick a language:</span>
        <LanguagePicker value={language.code} onChange={select} />
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          <Link to="/translate" className="rounded-[2rem] bg-card p-6 shadow-card transition-transform hover:-translate-y-1">
            <div className="grid size-14 place-items-center rounded-2xl bg-sky text-2xl">📄</div>
            <h2 className="mt-4 font-display text-xl font-semibold">Curriculum Translation</h2>
            <p className="mt-2 text-sm leading-relaxed font-medium text-inksoft">
              Paste Hindi FLN lesson scripts and get context-aware text plus synthesised audio in the
              target tribal language.
            </p>
            <div className="mt-4 rounded-2xl bg-cream p-3 text-xs font-extrabold">
              <span className="text-inksoft">हिंदी:</span> किताब खोलो और पढ़ो। —{" "}
              <span className="text-primary">
                {language.name}: {translateToTribal("किताब खोलो और पढ़ो।", language.code)}
              </span>
            </div>
          </Link>

          <Link to="/voice" className="rounded-[2rem] bg-card p-6 shadow-card transition-transform hover:-translate-y-1 md:-mt-4">
            <div className="grid size-14 place-items-center rounded-2xl bg-blush text-2xl">🎙️</div>
            <h2 className="mt-4 font-display text-xl font-semibold">Real-Time Voice</h2>
            <p className="mt-2 text-sm leading-relaxed font-medium text-inksoft">
              Speak Hindi, and the classroom answers in the student's language in under three seconds
              — live dialogue, no prep.
            </p>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-cream p-3">
              <span className="text-xs font-extrabold text-inksoft">Latency</span>
              <span className="font-display text-lg font-bold">&lt; 3.0 s</span>
            </div>
          </Link>

          <Link to="/materials" className="rounded-[2rem] bg-card p-6 shadow-card transition-transform hover:-translate-y-1">
            <div className="grid size-14 place-items-center rounded-2xl bg-mint text-2xl">✨</div>
            <h2 className="mt-4 font-display text-xl font-semibold">Learning Material</h2>
            <p className="mt-2 text-sm leading-relaxed font-medium text-inksoft">
              Auto-generate bilingual worksheets and visual flashcard sets mapped to NIPUN Bharat
              learning outcomes.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="grid aspect-square place-items-center rounded-xl bg-butter text-lg">१</div>
              <div className="grid aspect-square place-items-center rounded-xl bg-sky text-lg">🍎</div>
              <div className="grid aspect-square place-items-center rounded-xl bg-blush text-lg">Aa</div>
            </div>
          </Link>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="rounded-[2rem] bg-card p-6 shadow-card sm:p-8">
          <p className="text-xs font-extrabold tracking-[0.18em] text-inksoft uppercase">How it flows</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {["Open app", "Pick language", "Translate / Speak / Generate", "Teach · Assess · Learn"].map(
              (s, i, arr) => (
                <span key={s} className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-extrabold ${
                      ["bg-mint", "bg-sky", "bg-butter", "bg-blush"][i]
                    }`}
                  >
                    {s}
                  </span>
                  {i < arr.length - 1 && <span className="font-extrabold text-inksoft">→</span>}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <footer className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="font-display font-semibold">
            BhashaMitra{" "}
            <span className="font-body text-sm font-medium text-inksoft">
              — mother-tongue learning for every child
            </span>
          </p>
          <p className="text-xs font-bold text-inksoft">
            Built for PALASH MTB-MLE · Offline-first · Android 9+
          </p>
        </div>
      </footer>
    </div>
  );
}

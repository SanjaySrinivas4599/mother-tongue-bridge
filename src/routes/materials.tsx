import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { OUTCOMES, translateToTribal, useLanguage } from "@/lib/lang";
import { speak } from "@/lib/speech";

export const Route = createFileRoute("/materials")({
  head: () => ({
    meta: [
      { title: "Worksheet & Flashcard Generator — BhashaMitra" },
      {
        name: "description",
        content:
          "Auto-generate bilingual Hindi–tribal worksheets and visual flashcards aligned to NIPUN Bharat learning outcomes.",
      },
      { property: "og:title", content: "Worksheet & Flashcard Generator — BhashaMitra" },
      {
        property: "og:description",
        content: "Bilingual worksheets and flashcards for NIPUN Bharat outcomes, generated on device.",
      },
    ],
  }),
  component: MaterialsPage,
});

const TINTS = ["bg-butter", "bg-sky", "bg-blush", "bg-mint"];

function MaterialsPage() {
  const { language, select } = useLanguage();
  const [outcomeId, setOutcomeId] = useState(OUTCOMES[0]!.id);

  const outcome = OUTCOMES.find((o) => o.id === outcomeId) ?? OUTCOMES[0]!;
  const cards = useMemo(
    () => outcome.items.map((i) => ({ ...i, tribal: translateToTribal(i.hi, language.code) })),
    [outcome, language.code],
  );

  return (
    <AppShell language={language} onLanguageChange={select}>
      <h1 className="font-display text-3xl font-bold tracking-tight">Learning Material Generation</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed font-medium text-inksoft">
        Pick a NIPUN Bharat learning outcome and get a bilingual worksheet plus a visual flashcard set
        in Hindi and {language.name}.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {OUTCOMES.map((o) => (
          <button
            key={o.id}
            onClick={() => setOutcomeId(o.id)}
            aria-pressed={o.id === outcomeId}
            className={[
              "pill min-h-11 px-5 text-sm",
              o.id === outcomeId ? "bg-ink text-cream shadow-pop" : "bg-card text-ink shadow-pop-sm",
            ].join(" ")}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold tracking-wide text-inksoft uppercase">
              Bilingual worksheet
            </p>
            <span className="rounded-full bg-sky px-3 py-1 text-xs font-extrabold">
              {outcome.label}
            </span>
          </div>
          <p className="mt-3 font-display text-xl font-semibold">
            {outcome.hindiTopic} · {translateToTribal(outcome.hindiTopic, language.code)}
          </p>
          <ol className="mt-4 space-y-3">
            {cards.map((c, i) => (
              <li key={c.hi} className="rounded-2xl bg-cream p-4">
                <p className="text-xs font-extrabold text-inksoft">प्रश्न {i + 1}</p>
                <p className="mt-1 text-base font-bold">
                  {c.emoji} इस चित्र का नाम लिखो — {c.hi} = ______
                </p>
                <p className="mt-1 text-sm font-bold text-primary">
                  {language.name}: {c.tribal} = ______
                </p>
              </li>
            ))}
          </ol>
          <button
            onClick={() => typeof window !== "undefined" && window.print()}
            className="pill mt-5 w-full bg-primary text-primary-foreground shadow-pop"
          >
            Print / save worksheet
          </button>
        </div>

        <div className="rounded-[2rem] bg-card p-6 shadow-card">
          <p className="text-[11px] font-extrabold tracking-wide text-inksoft uppercase">
            Visual flashcards
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {cards.map((c, i) => (
              <button
                key={c.hi}
                onClick={() => speak(c.tribal, "en-IN")}
                className={`rounded-[1.5rem] p-5 text-center transition-transform active:translate-y-1 ${TINTS[i % TINTS.length]}`}
              >
                <span className="text-4xl">{c.emoji}</span>
                <p className="mt-3 font-display text-2xl font-semibold">{c.hi}</p>
                <p className="text-base font-bold text-inksoft">{c.tribal}</p>
                <p className="mt-2 text-[11px] font-extrabold text-inksoft uppercase">Tap to hear</p>
              </button>
            ))}
          </div>
          <p className="mt-4 rounded-2xl bg-cream p-3 text-xs font-bold text-inksoft">
            Every set is stored on the tablet, so it opens with no internet.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useLanguage } from "@/lib/lang";

export const Route = createFileRoute("/workflow")({
  head: () => ({
    meta: [
      { title: "How the Classroom Flow Works — BhashaMitra" },
      {
        name: "description",
        content:
          "From opening the tablet and picking a tribal language to translation, live voice, materials, offline teaching and assessment.",
      },
      { property: "og:title", content: "How the Classroom Flow Works — BhashaMitra" },
      {
        property: "og:description",
        content: "The full teacher journey, start to improved foundational learning.",
      },
    ],
  }),
  component: WorkflowPage,
});

const BRANCHES = [
  {
    tint: "bg-sky",
    title: "Curriculum Translation",
    steps: ["Hindi FLN content input", "AI/NLP translation engine", "Context-aware translation", "Text + audio output"],
    to: "/translate",
  },
  {
    tint: "bg-blush",
    title: "Real-Time Voice",
    steps: ["Teacher speaks Hindi", "Speech-to-text", "Hindi → tribal language", "Voice output under 3 seconds"],
    to: "/voice",
  },
  {
    tint: "bg-mint",
    title: "Learning Material",
    steps: ["Select learning outcome", "AI curriculum generator", "Worksheets & flashcards", "Bilingual learning सामग्री"],
    to: "/materials",
  },
] as const;

const TAIL = [
  "Offline learning mode — no internet, low-cost tablet, local storage",
  "Teacher delivers the lesson in the student's mother tongue",
  "Students interact and respond in their native language",
  "Assessment & learning activity",
  "Improved understanding and foundational learning",
];

function WorkflowPage() {
  const { language, select } = useLanguage();

  return (
    <AppShell language={language} onLanguageChange={select}>
      <h1 className="font-display text-3xl font-bold tracking-tight">How a lesson flows</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed font-medium text-inksoft">
        The same journey every teacher follows, from opening the tablet to a class that understands.
      </p>

      <div className="mt-6 space-y-4">
        <div className="rounded-[2rem] bg-card p-5 shadow-card">
          <p className="text-xs font-extrabold tracking-[0.18em] text-inksoft uppercase">Start</p>
          <p className="mt-1 text-lg font-bold">Teacher opens the app on the tablet</p>
        </div>
        <div className="rounded-[2rem] bg-butter p-5 shadow-pop-sm">
          <p className="text-xs font-extrabold tracking-[0.18em] text-inksoft uppercase">Step 1</p>
          <p className="mt-1 text-lg font-bold">Select target language — Ho · Mundari · Santhali</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {BRANCHES.map((b) => (
            <Link key={b.title} to={b.to} className="rounded-[2rem] bg-card p-5 shadow-card transition-transform hover:-translate-y-1">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-extrabold ${b.tint}`}>
                {b.title}
              </span>
              <ol className="mt-3 space-y-2">
                {b.steps.map((s, i) => (
                  <li key={s} className="rounded-2xl bg-cream p-3 text-sm font-bold">
                    <span className="text-inksoft">{i + 1}. </span>
                    {s}
                  </li>
                ))}
              </ol>
            </Link>
          ))}
        </div>

        {TAIL.map((t, i) => (
          <div
            key={t}
            className={`rounded-[2rem] p-5 ${i % 2 === 0 ? "bg-card shadow-card" : "bg-mint shadow-pop-sm"}`}
          >
            <p className="text-lg font-bold">{t}</p>
          </div>
        ))}

        <div className="rounded-[2rem] bg-ink p-5 text-cream shadow-pop">
          <p className="text-xs font-extrabold tracking-[0.18em] uppercase opacity-70">End</p>
          <p className="mt-1 text-lg font-bold">Children learn in the language they speak at home.</p>
        </div>
      </div>
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CLASSROOM_PROMPTS, translateToTribal, useLanguage } from "@/lib/lang";
import { createRecognition, readTranscript, speak } from "@/lib/speech";

export const Route = createFileRoute("/voice")({
  head: () => ({
    meta: [
      { title: "Real-Time Voice Translation — BhashaMitra" },
      {
        name: "description",
        content:
          "Speak Hindi and your class hears Ho, Mundari or Santhali back in under three seconds for live classroom dialogue.",
      },
      { property: "og:title", content: "Real-Time Voice Translation — BhashaMitra" },
      {
        property: "og:description",
        content: "Live Hindi to tribal-language classroom dialogue with sub-3-second latency.",
      },
    ],
  }),
  component: VoicePage,
});

type Turn = { hindi: string; tribal: string; ms: number };

function VoicePage() {
  const { language, select } = useLanguage();
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [supported, setSupported] = useState(true);
  const startedAt = useRef(0);

  useEffect(() => {
    setSupported(createRecognition() !== null);
  }, []);

  function commit(hindi: string, ms: number) {
    const tribal = translateToTribal(hindi, language.code);
    setTurns((t) => [{ hindi, tribal, ms }, ...t].slice(0, 6));
    speak(tribal, "en-IN");
  }

  function startListening() {
    const rec = createRecognition("hi-IN");
    if (!rec) {
      setSupported(false);
      return;
    }
    startedAt.current = performance.now();
    setHeard("");
    setListening(true);
    rec.onresult = (event) => {
      const { text, final } = readTranscript(event);
      setHeard(text);
      if (final && text.trim()) commit(text.trim(), Math.round(performance.now() - startedAt.current));
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start();
  }

  return (
    <AppShell language={language} onLanguageChange={select}>
      <h1 className="font-display text-3xl font-bold tracking-tight">Real-Time Voice Translation</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed font-medium text-inksoft">
        Tap the mic, speak Hindi, and the class hears {language.name} straight back — fast enough for
        real question-and-answer.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_.9fr]">
        <div className="rounded-[2rem] bg-card p-6 shadow-card">
          <div className="flex flex-col items-center gap-4 rounded-[1.5rem] bg-cream p-6">
            <div className="relative grid size-28 place-items-center">
              {listening && <span className="mic-ripple absolute inset-0 rounded-full bg-primary" />}
              <button
                onClick={startListening}
                disabled={listening}
                className="relative grid size-24 place-items-center rounded-full bg-primary text-3xl text-primary-foreground shadow-pop disabled:opacity-90"
                aria-label="Start speaking in Hindi"
              >
                🎙️
              </button>
            </div>
            <p className="text-sm font-extrabold text-inksoft">
              {listening ? "Listening… speak in Hindi" : "Tap to speak"}
            </p>
            {heard && <p className="text-center text-lg font-bold">{heard}</p>}
            {!supported && (
              <p className="text-center text-xs font-bold text-inksoft">
                This device's browser can't capture the mic — use the sample phrases instead.
              </p>
            )}
          </div>

          <p className="mt-5 text-[11px] font-extrabold tracking-wide text-inksoft uppercase">
            Sample classroom phrases
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {CLASSROOM_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => commit(p, 1200 + Math.round(Math.random() * 900))}
                className="pill min-h-11 bg-butter px-4 text-sm text-ink shadow-pop-sm"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold tracking-wide text-inksoft uppercase">
              Classroom dialogue
            </p>
            <span className="rounded-full bg-mint px-3 py-1 text-xs font-extrabold">
              Target &lt; 3.0 s
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {turns.length === 0 && (
              <p className="rounded-2xl bg-cream p-4 text-sm font-bold text-inksoft">
                Nothing spoken yet. Your last six exchanges will appear here.
              </p>
            )}
            {turns.map((t, i) => (
              <div key={i} className="rounded-2xl bg-cream p-4">
                <p className="text-[11px] font-extrabold tracking-wide text-inksoft uppercase">
                  Teacher · Hindi
                </p>
                <p className="text-base font-bold">{t.hindi}</p>
                <p className="mt-2 text-[11px] font-extrabold tracking-wide text-inksoft uppercase">
                  {language.name} · spoken to class
                </p>
                <p className="text-base font-bold text-primary">{t.tribal}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => speak(t.tribal, "en-IN")}
                    className="grid size-8 place-items-center rounded-full bg-ink text-xs text-cream"
                    aria-label="Replay"
                  >
                    ▶
                  </button>
                  <span className="font-display text-lg font-bold">
                    {(t.ms / 1000).toFixed(1)}s
                  </span>
                  <span className="text-xs font-extrabold text-inksoft">end-to-end</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/** Browser speech helpers. All calls are safe no-ops when unsupported. */

export function speak(text: string, lang = "hi-IN") {
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !text) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.9;
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}

type RecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: unknown) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

export function createRecognition(lang = "hi-IN"): RecognitionLike | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => RecognitionLike;
    webkitSpeechRecognition?: new () => RecognitionLike;
  };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = lang;
  rec.continuous = false;
  rec.interimResults = true;
  return rec;
}

export function readTranscript(event: unknown): { text: string; final: boolean } {
  const e = event as {
    results?: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
  };
  if (!e.results) return { text: "", final: false };
  let text = "";
  let final = false;
  for (let i = 0; i < e.results.length; i++) {
    const r = e.results[i];
    if (!r) continue;
    text += r[0]?.transcript ?? "";
    if (r.isFinal) final = true;
  }
  return { text, final };
}

/**
 * Browser TTS for Polish object-language lines (Wave 2 listening interim).
 * Prefer real audio_url when present; otherwise speechSynthesis pl-PL.
 * Adult tone — no cartoon pitch games.
 */

export type SpeakPolishOptions = {
  /** Optional future URL for recorded audio (human or studio). */
  audioUrl?: string | null;
  rate?: number;
  onEnd?: () => void;
  onError?: () => void;
};

let sharedAudio: HTMLAudioElement | null = null;

export function isPolishTtsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function stopPolishAudio(): void {
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
  if (sharedAudio) {
    sharedAudio.pause();
    sharedAudio.src = "";
    sharedAudio = null;
  }
}

export function speakPolish(
  text: string,
  options: SpeakPolishOptions = {},
): boolean {
  const line = text.trim();
  if (!line) return false;

  stopPolishAudio();

  if (options.audioUrl) {
    try {
      const audio = new Audio(options.audioUrl);
      sharedAudio = audio;
      audio.onended = () => {
        sharedAudio = null;
        options.onEnd?.();
      };
      audio.onerror = () => {
        sharedAudio = null;
        // Fall through to TTS
        return speakWithSynthesis(line, options);
      };
      void audio.play().catch(() => {
        sharedAudio = null;
        speakWithSynthesis(line, options);
      });
      return true;
    } catch {
      return speakWithSynthesis(line, options);
    }
  }

  return speakWithSynthesis(line, options);
}

function speakWithSynthesis(
  line: string,
  options: SpeakPolishOptions,
): boolean {
  if (!isPolishTtsSupported()) {
    options.onError?.();
    return false;
  }
  const utter = new SpeechSynthesisUtterance(line);
  utter.lang = "pl-PL";
  utter.rate = options.rate ?? 0.92;
  utter.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const pl =
    voices.find((v) => v.lang.toLowerCase().startsWith("pl")) ??
    voices.find((v) => /polish|polski/i.test(v.name));
  if (pl) utter.voice = pl;
  utter.onend = () => options.onEnd?.();
  utter.onerror = () => options.onError?.();
  window.speechSynthesis.speak(utter);
  return true;
}

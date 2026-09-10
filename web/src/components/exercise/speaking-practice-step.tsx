"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { PolishLineAudio } from "@/components/exercise/polish-line-audio";
import { normalizeAnswer } from "@/lib/audio/normalize-pl";

type Props = {
  title: string;
  prompt?: string;
  lines: string[];
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getRecognitionCtor():
  | (new () => SpeechRecognitionLike)
  | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/**
 * Constrained speaking practice — not exam scoring.
 * Chrome Web Speech when available; otherwise say-aloud + self-check reveal.
 * Archive adult chrome: compact controls, no gamified streak language.
 */
export function SpeakingPracticeStep({ title, prompt, lines }: Props) {
  const t = useTranslations("learn");
  const [lineIndex, setLineIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);
  const [supported, setSupported] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const line = lines[lineIndex] ?? lines[0] ?? "";

  useEffect(() => {
    setSupported(Boolean(getRecognitionCtor()));
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {
        /* ignore */
      }
    };
  }, []);

  useEffect(() => {
    setHeard(null);
    setRevealed(false);
    setListening(false);
  }, [lineIndex]);

  function startListen() {
    const Ctor = getRecognitionCtor();
    if (!Ctor || !line) return;
    try {
      recognitionRef.current?.stop();
    } catch {
      /* ignore */
    }
    const rec = new Ctor();
    recognitionRef.current = rec;
    rec.lang = "pl-PL";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.continuous = false;
    rec.onresult = (ev) => {
      const transcript = ev.results?.[0]?.[0]?.transcript ?? "";
      setHeard(transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    setHeard(null);
    setListening(true);
    try {
      rec.start();
    } catch {
      setListening(false);
    }
  }

  function stopListen() {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* ignore */
    }
    setListening(false);
  }

  const matchHint =
    heard && line
      ? normalizeAnswer(heard) === normalizeAnswer(line)
        ? "close"
        : "diff"
      : null;

  return (
    <section data-testid="lesson-speaking-step">
      <p className="m-0 text-sm text-[var(--color-graphite)]">{t("speaking")}</p>
      <h1 className="mt-1 font-display text-[clamp(1.5rem,4vw,1.875rem)] text-[var(--color-ink)] sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-[var(--color-graphite-muted)]">
        {prompt ?? t("speakingHint")}
      </p>
      <p className="mt-1 text-xs text-[var(--color-graphite-muted)]">
        {t("speakingHonesty")}
      </p>

      <div className="mt-5 border border-[var(--color-line)] px-4 py-4 rounded-[var(--radius-md)]">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="m-0 font-display text-2xl text-[var(--color-ink)]">
            {line}
          </p>
          <PolishLineAudio text={line} />
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {supported ? (
            <Button
              type="button"
              variant="secondary"
              onClick={listening ? stopListen : startListen}
              data-testid="speaking-record"
            >
              {listening ? t("speakingStop") : t("speakingRecord")}
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setRevealed(true);
              }}
              data-testid="speaking-self-check"
            >
              {t("speakingSelfCheck")}
            </Button>
          )}
          {!revealed && supported ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setRevealed(true)}
            >
              {t("speakingReveal")}
            </Button>
          ) : null}
          {lines.length > 1 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setLineIndex((i) => (i + 1) % lines.length)
              }
            >
              {t("speakingNextLine")}
            </Button>
          ) : null}
        </div>

        {heard ? (
          <p className="mt-3 text-sm text-[var(--color-ink-soft)]" data-testid="speaking-heard">
            {t("speakingHeard")}: {heard}
            {matchHint === "close" ? ` — ${t("speakingCloseMatch")}` : null}
            {matchHint === "diff" ? ` — ${t("speakingBestEffort")}` : null}
          </p>
        ) : null}
        {!supported ? (
          <p className="mt-3 text-sm text-[var(--color-graphite-muted)]">
            {t("speakingUnsupported")}
          </p>
        ) : null}
      </div>
    </section>
  );
}

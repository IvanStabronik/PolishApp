"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  isPolishTtsSupported,
  speakPolish,
  stopPolishAudio,
} from "@/lib/audio/polish-tts";

type Props = {
  text: string;
  audioUrl?: string | null;
  className?: string;
};

/**
 * Play / replay control for a Polish line (TTS or optional audio URL).
 * Adult chrome — compact secondary control next to the line.
 */
export function PolishLineAudio({ text, audioUrl, className }: Props) {
  const t = useTranslations("learn");
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setSupported(Boolean(audioUrl) || isPolishTtsSupported());
    return () => stopPolishAudio();
  }, [audioUrl]);

  if (!supported || !text.trim()) return null;

  function onPlay() {
    if (playing) {
      stopPolishAudio();
      setPlaying(false);
      return;
    }
    const ok = speakPolish(text, {
      audioUrl,
      onEnd: () => setPlaying(false),
      onError: () => setPlaying(false),
    });
    setPlaying(ok);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={className}
      onClick={onPlay}
      data-testid="polish-line-audio"
      aria-label={playing ? t("stopAudio") : t("playLine")}
    >
      {playing ? t("stopAudio") : t("playLine")}
    </Button>
  );
}

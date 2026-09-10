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
  moduleId: string;
  exerciseId: string;
  /** Optional studio URL already known (no text leak). */
  audioUrl?: string | null;
  className?: string;
  /** Fired once a play attempt successfully starts (play-gate for submit). */
  onPlayed?: () => void;
  /** Fired when this browser cannot play (gate must not soft-lock submit). */
  onUnavailable?: () => void;
};

/**
 * Listening play control — fetches TTS text on click, never renders it.
 * Interim: network tab can still see stimulus; DOM / lesson DTO do not.
 */
export function ListeningAudioControl({
  moduleId,
  exerciseId,
  audioUrl,
  className,
  onPlayed,
  onUnavailable,
}: Props) {
  const t = useTranslations("learn");
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const ok = Boolean(audioUrl) || isPolishTtsSupported();
    setSupported(ok);
    if (!ok) onUnavailable?.();
    return () => stopPolishAudio();
    // Gate unlock once per stimulus identity; avoid re-firing on parent re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onUnavailable is a notify-only callback
  }, [audioUrl]);

  if (!supported) return null;

  async function onPlay() {
    if (playing) {
      stopPolishAudio();
      setPlaying(false);
      return;
    }
    setBusy(true);
    try {
      if (audioUrl) {
        const ok = speakPolish("", {
          audioUrl,
          onEnd: () => setPlaying(false),
          onError: () => setPlaying(false),
        });
        setPlaying(ok);
        if (ok) onPlayed?.();
        return;
      }
      const res = await fetch("/api/learning/listening-stimulus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ moduleId, exerciseId }),
      });
      if (!res.ok) {
        setPlaying(false);
        return;
      }
      const data = (await res.json()) as {
        textPl?: string;
        audioUrl?: string;
      };
      const line = data.textPl?.trim() ?? "";
      if (!line && !data.audioUrl) return;
      const ok = speakPolish(line || " ", {
        audioUrl: data.audioUrl,
        onEnd: () => setPlaying(false),
        onError: () => setPlaying(false),
      });
      setPlaying(ok);
      if (ok) onPlayed?.();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={className}
      onClick={() => void onPlay()}
      disabled={busy}
      data-testid="listening-audio-control"
      aria-label={playing ? t("stopAudio") : t("playLine")}
    >
      {playing ? t("stopAudio") : t("playLine")}
    </Button>
  );
}

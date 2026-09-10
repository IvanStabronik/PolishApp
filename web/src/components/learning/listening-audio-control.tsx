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
  /** Fired with server playToken once play starts (or unlock). */
  onPlayed?: (playToken: string) => void;
  /** Fired when this browser cannot play (server unlock token still required). */
  onUnavailable?: (playToken: string) => void;
};

/**
 * Listening play control — fetches TTS text on click, never renders it.
 * Interim: network tab can still see stimulus; DOM / lesson DTO do not.
 * Always obtains a server playToken (stimulus or tts_unavailable unlock).
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
    if (!ok) {
      void requestUnlock().then((token) => {
        if (token) onUnavailable?.(token);
      });
    }
    return () => stopPolishAudio();
    // Gate unlock once per stimulus identity; avoid re-firing on parent re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- notify-only callbacks
  }, [audioUrl, moduleId, exerciseId]);

  async function requestUnlock(): Promise<string | null> {
    try {
      const res = await fetch("/api/learning/listening-play-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          moduleId,
          exerciseId,
          reason: "tts_unavailable",
        }),
      });
      if (!res.ok) return null;
      const data = (await res.json()) as { playToken?: string };
      return data.playToken?.trim() || null;
    } catch {
      return null;
    }
  }

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
        // Still mint play evidence via stimulus (returns audioUrl + playToken).
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
          audioUrl?: string;
          playToken?: string;
        };
        const url = data.audioUrl?.trim() || audioUrl;
        const token = data.playToken?.trim();
        const ok = speakPolish("", {
          audioUrl: url,
          onEnd: () => setPlaying(false),
          onError: () => setPlaying(false),
        });
        setPlaying(ok);
        if (ok && token) onPlayed?.(token);
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
        playToken?: string;
      };
      const line = data.textPl?.trim() ?? "";
      const token = data.playToken?.trim();
      if (!line && !data.audioUrl) return;
      const ok = speakPolish(line || " ", {
        audioUrl: data.audioUrl,
        onEnd: () => setPlaying(false),
        onError: () => setPlaying(false),
      });
      setPlaying(ok);
      if (ok && token) onPlayed?.(token);
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

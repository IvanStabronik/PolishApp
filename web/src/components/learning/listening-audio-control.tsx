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
  const [playedOnce, setPlayedOnce] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [errorKey, setErrorKey] = useState<
    null | "listeningPlayFailed" | "listeningUnlockFailed"
  >(null);

  useEffect(() => {
    const ok = Boolean(audioUrl) || isPolishTtsSupported();
    setSupported(ok);
    setErrorKey(null);
    setPlayedOnce(false);
    setPlaying(false);
    if (!ok) {
      setUnlocking(true);
      void requestUnlock().then((token) => {
        setUnlocking(false);
        if (token) {
          onUnavailable?.(token);
          setPlayedOnce(true);
          setErrorKey(null);
        } else {
          setErrorKey("listeningUnlockFailed");
        }
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

  async function unlockAndNotify(): Promise<boolean> {
    const token = await requestUnlock();
    if (token) {
      onUnavailable?.(token);
      setPlayedOnce(true);
      setErrorKey(null);
      return true;
    }
    setErrorKey("listeningUnlockFailed");
    return false;
  }

  async function onPlay() {
    if (playing) {
      stopPolishAudio();
      setPlaying(false);
      return;
    }
    setBusy(true);
    setErrorKey(null);
    try {
      const res = await fetch("/api/learning/listening-stimulus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ moduleId, exerciseId }),
      });
      if (!res.ok) {
        setPlaying(false);
        setErrorKey("listeningPlayFailed");
        await unlockAndNotify();
        return;
      }
      const data = (await res.json()) as {
        textPl?: string;
        audioUrl?: string;
        playToken?: string;
      };
      const url = data.audioUrl?.trim() || audioUrl || undefined;
      const line = data.textPl?.trim() ?? "";
      const token = data.playToken?.trim();
      if (!url && !line) {
        setErrorKey("listeningPlayFailed");
        await unlockAndNotify();
        return;
      }
      const ok = speakPolish(line || " ", {
        audioUrl: url,
        onEnd: () => setPlaying(false),
        onError: () => {
          setPlaying(false);
          setErrorKey("listeningPlayFailed");
          void unlockAndNotify();
        },
      });
      setPlaying(ok);
      if (ok && token) {
        onPlayed?.(token);
        setPlayedOnce(true);
        setErrorKey(null);
      } else if (!ok) {
        setErrorKey("listeningPlayFailed");
        await unlockAndNotify();
      }
    } finally {
      setBusy(false);
    }
  }

  if (!supported) {
    return (
      <div
        className="flex flex-col gap-2"
        data-testid="listening-audio-unavailable"
      >
        {unlocking ? (
          <p
            className="m-0 text-sm text-[var(--color-graphite-muted)]"
            role="status"
            data-testid="listening-unlocking"
          >
            {t("listeningUnavailable")}
          </p>
        ) : null}
        {errorKey ? (
          <p
            className="m-0 text-sm text-[var(--color-warning)]"
            data-testid="listening-audio-error"
            role="status"
          >
            {t(errorKey)}
          </p>
        ) : playedOnce ? (
          <p
            className="m-0 text-sm text-[var(--color-graphite-muted)]"
            role="status"
          >
            {t("listeningUnavailable")}
          </p>
        ) : null}
        {errorKey === "listeningUnlockFailed" ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className={className}
            onClick={() => {
              setUnlocking(true);
              setErrorKey(null);
              void requestUnlock().then((token) => {
                setUnlocking(false);
                if (token) {
                  onUnavailable?.(token);
                  setPlayedOnce(true);
                  setErrorKey(null);
                } else {
                  setErrorKey("listeningUnlockFailed");
                }
              });
            }}
            data-testid="listening-audio-retry"
          >
            {t("listeningRetry")}
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="secondary"
          size="md"
          className={className}
          onClick={() => void onPlay()}
          disabled={busy}
          data-testid="listening-audio-control"
          aria-label={playing ? t("stopAudio") : t("playLine")}
          aria-pressed={playing}
        >
          {playing ? t("stopAudio") : t("playLine")}
        </Button>
        {errorKey ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => void onPlay()}
            disabled={busy}
            data-testid="listening-audio-retry"
          >
            {t("listeningRetry")}
          </Button>
        ) : null}
      </div>
      {!playedOnce && !errorKey && !busy ? (
        <p
          className="m-0 text-sm text-[var(--color-graphite-muted)]"
          data-testid="listening-idle-hint"
          role="status"
        >
          {t("listeningIdleHint")}
        </p>
      ) : null}
      {errorKey ? (
        <p
          className="m-0 text-sm text-[var(--color-warning)]"
          data-testid="listening-audio-error"
          role="status"
        >
          {t(errorKey)}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { PolishLineAudio } from "@/components/exercise/polish-line-audio";

type Props = {
  text: string;
  audioUrl?: string | null;
};

/** Client audio control for server-rendered module hub dialogue / key lines. */
export function HubLineAudio({ text, audioUrl }: Props) {
  return (
    <PolishLineAudio
      text={text}
      audioUrl={audioUrl}
      className="shrink-0 text-sm"
    />
  );
}

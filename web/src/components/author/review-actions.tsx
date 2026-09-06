"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  moduleId: string;
  canSubmit: boolean;
  canReview: boolean;
};

export function ReviewActions({ moduleId, canSubmit, canReview }: Props) {
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  async function post(action: string, verdict?: string) {
    setMsg(null);
    const res = await fetch("/api/author/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId, action, verdict, comment: "" }),
    });
    const data = (await res.json()) as {
      ok?: boolean;
      error?: string;
      to?: string;
    };
    if (!res.ok || !data.ok) {
      setMsg(data.error ?? "error");
      return;
    }
    setMsg(`→ ${data.to ?? "ok"}`);
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3" data-testid="review-actions">
      {canSubmit ? (
        <Button
          disabled={pending}
          data-testid="submit-for-review"
          onClick={() =>
            startTransition(() => void post("submit_for_review"))
          }
        >
          Submit for review
        </Button>
      ) : null}
      {canReview ? (
        <>
          <Button
            disabled={pending}
            data-testid="request-changes"
            variant="secondary"
            onClick={() =>
              startTransition(() => void post("verdict", "request_changes"))
            }
          >
            Request changes
          </Button>
          <Button
            disabled={pending}
            data-testid="approve-version"
            onClick={() =>
              startTransition(() => void post("verdict", "approve"))
            }
          >
            Approve
          </Button>
        </>
      ) : null}
      {msg ? (
        <p className="w-full text-sm text-[var(--color-graphite)]" role="status">
          {msg}
        </p>
      ) : null}
    </div>
  );
}

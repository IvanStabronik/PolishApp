"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  moduleId: string;
  status: string;
  canSubmit: boolean;
  canReview: boolean;
};

export function ReviewActions({
  moduleId,
  status,
  canSubmit,
  canReview,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  async function post(action: string, verdict?: string) {
    setMsg(null);
    if (action === "verdict" && verdict === "request_changes" && !comment.trim()) {
      setMsg("comment_required");
      return;
    }
    const res = await fetch("/api/author/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        moduleId,
        action,
        verdict,
        comment: comment.trim(),
      }),
    });
    const data = (await res.json()) as {
      ok?: boolean;
      error?: string;
      to?: string;
      status?: string;
    };
    if (!res.ok || !data.ok) {
      setMsg(data.error ?? "error");
      return;
    }
    setMsg(`→ ${data.status ?? data.to ?? "ok"}`);
    setComment("");
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3" data-testid="review-actions">
      <p
        className="w-full text-sm text-[var(--color-graphite)]"
        data-testid="review-actions-status"
      >
        DB status: {status}
      </p>
      {canReview ? (
        <label className="w-full text-sm text-[var(--color-graphite)]">
          Reviewer comment
          <textarea
            className="mt-1 w-full rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-2 text-sm text-[var(--color-ink)]"
            data-testid="review-comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Required when requesting changes"
          />
        </label>
      ) : null}
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
            disabled={pending || !comment.trim()}
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

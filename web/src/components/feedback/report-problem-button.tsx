"use client";

import { useId, useState, useTransition } from "react";
import { usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { FEEDBACK_CATEGORIES } from "@/modules/feedback/validation";

export function ReportProblemButton({
  moduleId,
  lessonId,
  exerciseId,
}: {
  moduleId?: string;
  lessonId?: string;
  exerciseId?: string;
}) {
  const t = useTranslations("feedback");
  const locale = useLocale();
  const pathname = usePathname();
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<(typeof FEEDBACK_CATEGORIES)[number]>("bug");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  async function submit() {
    setError(null);
    const idempotencyKey = crypto.randomUUID();
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      credentials: "include",
      body: JSON.stringify({
        category,
        rating: rating ? Number(rating) : undefined,
        comment: comment || undefined,
        idempotencyKey,
        context: {
          route: pathname,
          moduleId,
          lessonId,
          exerciseId,
          locale,
          appVersion: process.env.NEXT_PUBLIC_APP_VERSION ?? "0.1.0",
        },
      }),
    });
    if (!res.ok) {
      setError(t("error"));
      return;
    }
    setDone(true);
  }

  return (
    <div className="mt-4">
      <Button
        type="button"
        variant="ghost"
        data-testid="report-problem"
        onClick={() => {
          setOpen(true);
          setDone(false);
          setError(null);
        }}
      >
        {t("cta")}
      </Button>
      {open ? (
        <div
          role="dialog"
          aria-labelledby={dialogId}
          data-testid="feedback-dialog"
          className="mt-3 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-4"
        >
          <h2 id={dialogId} className="m-0 font-display text-xl">
            {t("title")}
          </h2>
          {done ? (
            <p data-testid="feedback-thanks" className="mt-2 text-[var(--color-success)]">
              {t("thanks")}
            </p>
          ) : (
            <div className="mt-3 flex flex-col gap-3">
              <label className="field">
                <span>{t("category")}</span>
                <select
                  data-testid="feedback-category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as (typeof FEEDBACK_CATEGORIES)[number])
                  }
                >
                  {FEEDBACK_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {t(`cat_${c}` as "cat_bug")}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>{t("rating")}</span>
                <select
                  data-testid="feedback-rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">{t("ratingNone")}</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>{t("comment")}</span>
                <textarea
                  data-testid="feedback-comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </label>
              {error ? (
                <p role="alert" className="m-0 text-sm text-[var(--color-error)]">
                  {error}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  data-testid="feedback-submit"
                  disabled={pending}
                  onClick={() => startTransition(() => void submit())}
                >
                  {t("submit")}
                </Button>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                  {t("cancel")}
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

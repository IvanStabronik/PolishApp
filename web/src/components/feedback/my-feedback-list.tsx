"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type Row = {
  id: string;
  category: string;
  status: string;
  comment: string | null;
  createdAt: string;
};

export function MyFeedbackList() {
  const t = useTranslations("myFeedback");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const res = await fetch("/api/feedback/mine", { credentials: "include" });
      if (!res.ok) {
        if (!cancelled) setError(true);
        return;
      }
      const data = (await res.json()) as { feedback: Row[] };
      if (!cancelled) setRows(data.feedback);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function statusLabel(status: string): string {
    if (status === "new") return t("status_new");
    if (status === "triaged") return t("status_triaged");
    if (status === "resolved") return t("status_resolved");
    if (status === "wont_fix") return t("status_wont_fix");
    return status;
  }

  return (
    <section
      className="surface-panel mt-8 p-4 sm:mt-10 sm:p-6"
      data-testid="my-feedback-list"
      aria-labelledby="my-feedback-heading"
    >
      <h2
        id="my-feedback-heading"
        className="m-0 font-display text-xl text-[var(--color-ink)] sm:text-2xl"
      >
        {t("title")}
      </h2>
      <p className="mt-2 text-sm text-[var(--color-graphite)]">{t("lead")}</p>
      {error ? (
        <p className="mt-3 text-sm text-[var(--color-error)]" role="alert">
          —
        </p>
      ) : null}
      {rows === null ? (
        <p className="mt-3 text-sm text-[var(--color-graphite)]">…</p>
      ) : rows.length === 0 ? (
        <p className="mt-3 text-sm text-[var(--color-graphite)]" data-testid="my-feedback-empty">
          {t("empty")}
        </p>
      ) : (
        <ul className="mt-4 list-none p-0">
          {rows.map((r) => (
            <li
              key={r.id}
              className="border-b border-[var(--color-line)] py-3 last:border-b-0"
              data-testid={`my-feedback-row-${r.id}`}
            >
              <p className="m-0 text-sm text-[var(--color-ink-soft)]">
                {t("category")}: {r.category} · {statusLabel(r.status)}
              </p>
              {r.comment ? (
                <p className="m-0 mt-1 text-sm text-[var(--color-ink)]">{r.comment}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

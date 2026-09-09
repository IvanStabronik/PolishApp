"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

type Overview = {
  inviteCounts: Record<string, number>;
  feedbackCount: number;
  reviewDueCount: number;
  learners: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
    onboardingComplete: boolean;
    lastActivityAt: string | null;
    betaAccessRevoked: boolean;
    attempts: number;
  }>;
  analytics: {
    aggregates: Array<{ metricKey: string; valueNum: number; bucketDate: string }>;
    recentEvents: Array<{ eventKey: string; count: number }>;
  };
};

type InviteRow = {
  id: string;
  status: string;
  useLimit: number;
  useCount: number;
  expiresAt: string;
  label: string | null;
};

type FeedbackRow = {
  id: string;
  category: string;
  status: string;
  rating: number | null;
  comment: string | null;
  reporterUserId: string;
  createdAt: string;
};

function inviteAbsoluteUrl(locale: string, token: string): string {
  if (typeof window === "undefined") return `/${locale}/invite/${token}`;
  return `${window.location.origin}/${locale}/invite/${token}`;
}

export function AdminBetaConsole() {
  const t = useTranslations("adminBeta");
  const locale = useLocale();
  const [overview, setOverview] = useState<Overview | null>(null);
  const [invites, setInvites] = useState<InviteRow[]>([]);
  const [feedback, setFeedback] = useState<FeedbackRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [forbidden, setForbidden] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [createdToken, setCreatedToken] = useState<string | null>(null);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [copyHint, setCopyHint] = useState(false);
  const [pending, startTransition] = useTransition();

  async function load() {
    setLoading(true);
    setError(null);
    const [ov, inv, fb] = await Promise.all([
      fetch("/api/admin/beta/overview", { credentials: "include" }),
      fetch("/api/admin/beta/invites", { credentials: "include" }),
      fetch("/api/admin/feedback", { credentials: "include" }),
    ]);
    if (ov.status === 403 || inv.status === 403) {
      setForbidden(true);
      setLoading(false);
      return;
    }
    if (!ov.ok || !inv.ok || !fb.ok) {
      setError("load_failed");
      setLoading(false);
      return;
    }
    setOverview((await ov.json()) as Overview);
    const invJson = (await inv.json()) as { invites: InviteRow[] };
    setInvites(invJson.invites);
    const fbJson = (await fb.json()) as { feedback: FeedbackRow[] };
    setFeedback(fbJson.feedback);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  const filteredLearners = useMemo(() => {
    if (!overview) return [];
    const q = search.trim().toLowerCase();
    if (!q) return overview.learners;
    return overview.learners.filter(
      (l) =>
        l.email.toLowerCase().includes(q) ||
        l.name.toLowerCase().includes(q) ||
        l.id.includes(q),
    );
  }, [overview, search]);

  const inviteUrl = createdToken
    ? inviteAbsoluteUrl(locale, createdToken)
    : null;
  const emailBody = inviteUrl
    ? t("emailBody", { url: inviteUrl })
    : null;

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyHint(true);
      window.setTimeout(() => setCopyHint(false), 2000);
    } catch {
      /* ignore */
    }
  }

  if (forbidden) {
    return (
      <p data-testid="admin-beta-forbidden" role="alert">
        {t("forbidden")}
      </p>
    );
  }

  if (loading) {
    return (
      <div
        className="admin-loading surface-panel p-5"
        data-testid="admin-beta-loading"
        aria-busy="true"
        aria-live="polite"
      >
        <p className="m-0 text-sm text-[var(--color-graphite)]">{t("loading")}</p>
        <div className="admin-loading__bar w-2/3" />
        <div className="admin-loading__bar w-full" />
        <div className="admin-loading__bar w-5/6" />
        <div className="admin-loading__bar w-1/2" />
      </div>
    );
  }

  if (error || !overview) {
    return (
      <p data-testid="admin-beta-error" role="alert">
        {t("loadFailed")}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-10" data-testid="admin-beta-console">
      <section className="surface-panel p-4 sm:p-6">
        <h2 className="m-0 font-display text-xl text-[var(--color-ink)] sm:text-2xl">
          {t("inviteInventory")}
        </h2>
        <p className="mt-1 text-sm text-[var(--color-graphite)]">{t("inviteLead")}</p>
        <ul
          className="mt-4 flex list-none flex-wrap gap-2 p-0 sm:gap-3"
          data-testid="invite-counts"
        >
          {Object.entries(overview.inviteCounts).map(([k, v]) => (
            <li key={k} className="admin-metric">
              <span className="admin-metric__value">{v}</span>
              <span className="admin-metric__label">{k}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
          <Button
            type="button"
            data-testid="admin-create-invite"
            disabled={pending}
            className="w-full sm:w-auto"
            onClick={() =>
              startTransition(async () => {
                setCreatedToken(null);
                setTempPassword(null);
                const res = await fetch("/api/admin/beta/invites", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ expiresInDays: 14 }),
                });
                if (!res.ok) {
                  setError("create_failed");
                  return;
                }
                const data = (await res.json()) as { token: string };
                setCreatedToken(data.token);
                await load();
              })
            }
          >
            {t("createInvite")}
          </Button>
        </div>
        {createdToken && inviteUrl ? (
          <div
            className="mt-3 space-y-3 rounded-[var(--radius-md)] border border-[var(--color-amber-soft)] bg-[var(--color-warning-bg)] p-3"
            data-testid="admin-invite-token-once"
          >
            <p className="m-0 break-all text-sm text-[var(--color-ink)]">
              {t("tokenOnce")}: {createdToken}
            </p>
            <p className="m-0 break-all text-sm text-[var(--color-ink)]">
              <span className="font-medium">{t("inviteUrl")}:</span>{" "}
              <a
                href={inviteUrl}
                className="text-[var(--color-amber-deep)] underline"
                data-testid="admin-invite-url"
              >
                {inviteUrl}
              </a>
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                data-testid="admin-copy-invite-url"
                onClick={() => void copyText(inviteUrl)}
              >
                {copyHint ? t("copied") : t("copyUrl")}
              </Button>
            </div>
            <div data-testid="admin-invite-email-template">
              <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[var(--color-graphite)]">
                {t("emailTemplate")}
              </p>
              <p className="m-0 mt-1 text-sm font-medium text-[var(--color-ink)]">
                {t("emailSubject")}
              </p>
              <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-3 text-xs text-[var(--color-ink-soft)]">
                {emailBody}
              </pre>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="mt-2"
                data-testid="admin-copy-invite-email"
                onClick={() =>
                  void copyText(`${t("emailSubject")}\n\n${emailBody ?? ""}`)
                }
              >
                {copyHint ? t("copied") : t("copyUrl")}
              </Button>
            </div>
          </div>
        ) : null}
        <ul className="mt-3 list-none p-0 sm:mt-4" data-testid="invite-list">
          {invites.length === 0 ? (
            <li data-testid="invite-empty" className="admin-empty">
              {t("noInvites")}
            </li>
          ) : (
            invites.map((inv) => (
              <li
                key={inv.id}
                className="admin-row"
                data-testid={`invite-row-${inv.id}`}
              >
                <span className="min-w-0 text-sm text-[var(--color-ink-soft)]">
                  <span className="font-medium text-[var(--color-ink)]">
                    {inv.status}
                  </span>
                  {" · "}
                  {t("oneTimeUsed", { count: inv.useCount })} ·{" "}
                  {inv.label ?? inv.id.slice(0, 8)}
                </span>
                {inv.status === "pending" ? (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    data-testid={`admin-revoke-${inv.id}`}
                    onClick={() =>
                      startTransition(async () => {
                        await fetch("/api/admin/beta/invites", {
                          method: "DELETE",
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ inviteId: inv.id }),
                        });
                        await load();
                      })
                    }
                  >
                    {t("revoke")}
                  </Button>
                ) : null}
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="surface-panel p-4 sm:p-6">
        <h2 className="m-0 font-display text-xl text-[var(--color-ink)] sm:text-2xl">
          {t("learners")}
        </h2>
        <input
          data-testid="admin-learner-search"
          className="mt-3 w-full max-w-md min-h-11 rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-paper-raised)] px-3 text-[var(--color-ink)]"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p className="mt-3 text-sm text-[var(--color-graphite)]">
          {t("feedbackReviewSummary", {
            feedback: overview.feedbackCount,
            review: overview.reviewDueCount,
          })}
        </p>
        {tempPassword ? (
          <p
            data-testid="admin-temp-password-once"
            className="mt-3 break-all rounded-[var(--radius-md)] border border-[var(--color-amber-soft)] bg-[var(--color-warning-bg)] p-3 text-sm text-[var(--color-ink)]"
          >
            {t("tempPasswordOnce")}: {tempPassword}
          </p>
        ) : null}
        <ul className="mt-3 list-none p-0 sm:mt-4" data-testid="learner-list">
          {filteredLearners.length === 0 ? (
            <li data-testid="learner-empty" className="admin-empty">
              {t("noLearners")}
            </li>
          ) : (
            filteredLearners.map((l) => (
              <li
                key={l.id}
                className="admin-row items-start"
                data-testid={`learner-row-${l.id}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="m-0 font-medium text-[var(--color-ink)]">{l.name}</p>
                  <p className="m-0 truncate text-sm text-[var(--color-graphite)]">
                    {l.email}
                  </p>
                  <p className="m-0 mt-1 text-sm text-[var(--color-ink-soft)]">
                    {t("onboarding")}:{" "}
                    {l.onboardingComplete ? t("yes") : t("no")} · {t("attempts")}
                    : {l.attempts} · {t("status")}:{" "}
                    <span
                      data-testid={
                        l.betaAccessRevoked
                          ? `learner-deactivated-${l.id}`
                          : `learner-active-${l.id}`
                      }
                    >
                      {l.betaAccessRevoked ? t("deactivated") : t("active")}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    data-testid={`admin-reset-password-${l.id}`}
                    disabled={pending}
                    onClick={() =>
                      startTransition(async () => {
                        setTempPassword(null);
                        const res = await fetch("/api/admin/beta/reset-password", {
                          method: "POST",
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ userId: l.id }),
                        });
                        if (!res.ok) return;
                        const data = (await res.json()) as {
                          temporaryPassword: string;
                        };
                        setTempPassword(data.temporaryPassword);
                      })
                    }
                  >
                    {t("resetPassword")}
                  </Button>
                  {!l.betaAccessRevoked ? (
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      data-testid={`admin-deactivate-${l.id}`}
                      onClick={() =>
                        startTransition(async () => {
                          await fetch("/api/admin/beta/overview", {
                            method: "POST",
                            credentials: "include",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ userId: l.id }),
                          });
                          await load();
                        })
                      }
                    >
                      {t("deactivate")}
                    </Button>
                  ) : null}
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="surface-panel p-4 sm:p-6">
        <h2 className="m-0 font-display text-xl text-[var(--color-ink)] sm:text-2xl">
          {t("feedbackInbox")}
        </h2>
        <ul className="mt-3 list-none p-0 sm:mt-4" data-testid="feedback-inbox">
          {feedback.length === 0 ? (
            <li data-testid="feedback-empty" className="admin-empty">
              {t("inboxEmpty")}
            </li>
          ) : (
            feedback.map((f) => (
              <li
                key={f.id}
                className="border-b border-[var(--color-line)] py-3 last:border-b-0"
                data-testid={`feedback-row-${f.id}`}
              >
                <p className="m-0 text-sm text-[var(--color-ink-soft)]">
                  {f.category} · {f.status}
                  {f.rating != null ? ` · ★${f.rating}` : ""}
                </p>
                <p className="m-0 mt-1 text-sm text-[var(--color-ink)]">
                  {f.comment}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(["triaged", "resolved", "wont_fix"] as const).map((status) => (
                    <Button
                      key={status}
                      type="button"
                      size="sm"
                      variant="secondary"
                      data-testid={`feedback-set-${status}-${f.id}`}
                      onClick={() =>
                        startTransition(async () => {
                          await fetch("/api/admin/feedback", {
                            method: "PATCH",
                            credentials: "include",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              feedbackId: f.id,
                              toStatus: status,
                            }),
                          });
                          await load();
                        })
                      }
                    >
                      {status === "triaged"
                        ? t("triage")
                        : status === "resolved"
                          ? t("resolve")
                          : status}
                    </Button>
                  ))}
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="surface-panel p-4 sm:p-6">
        <h2 className="m-0 font-display text-xl text-[var(--color-ink)] sm:text-2xl">
          {t("analytics")}
        </h2>
        <ul
          className="mt-3 list-none p-0 text-sm text-[var(--color-ink-soft)]"
          data-testid="analytics-aggregates"
        >
          {overview.analytics.aggregates.slice(0, 12).map((a) => (
            <li key={`${a.metricKey}-${a.bucketDate}`} className="admin-row">
              <span className="min-w-0 font-medium text-[var(--color-ink)]">
                {a.metricKey}
              </span>
              <span className="tabular-nums">
                {a.valueNum} · {a.bucketDate}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

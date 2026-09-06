"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PrivacyActions() {
  const t = useTranslations("privacy");
  const [pending, setPending] = useState(false);
  const [exportMsg, setExportMsg] = useState<string | null>(null);
  const [exportError, setExportError] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState<string | null>(null);
  const [confirm, setConfirm] = useState("");
  const [confirming, setConfirming] = useState(false);

  function onExport() {
    setPending(true);
    setExportMsg(null);
    setExportError(false);
    void (async () => {
      try {
        const res = await fetch("/api/privacy/export", { method: "POST" });
        if (!res.ok) {
          setExportError(true);
          setExportMsg(t("exportFailed"));
          return;
        }
        const blob = await res.blob();
        if (!blob || blob.size === 0) {
          setExportError(true);
          setExportMsg(t("exportFailed"));
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "slowarium-export.json";
        a.click();
        URL.revokeObjectURL(url);
        setExportError(false);
        setExportMsg(t("exportDone"));
      } catch {
        setExportError(true);
        setExportMsg(t("exportFailed"));
      } finally {
        setPending(false);
      }
    })();
  }

  function onDeleteSubmit(e: FormEvent) {
    e.preventDefault();
    const word = t("deleteConfirmWord");
    if (confirm.trim() !== word) return;
    setPending(true);
    void (async () => {
      try {
        const res = await fetch("/api/privacy/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ confirm: word }),
        });
        if (!res.ok && res.status !== 202) return;
        setDeleteMsg(t("deleteDone"));
        setConfirming(false);
        try {
          await fetch("/api/auth/sign-out", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: "{}",
          });
        } catch {
          /* ignore */
        }
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("slowarium.uiLocale");
        }
        // Defer hard navigation so Playwright can observe the API response first.
        window.setTimeout(() => {
          window.location.replace("/ru/login");
        }, 50);
      } finally {
        setPending(false);
      }
    })();
  }

  return (
    <div className="flex flex-col gap-6" data-testid="privacy-actions">
      <Card>
        <h2 className="m-0 font-display text-xl">{t("exportTitle")}</h2>
        <p className="mt-2 text-[var(--color-graphite)]">{t("exportLead")}</p>
        <Button
          className="mt-4"
          disabled={pending}
          onClick={onExport}
          data-testid="privacy-export"
        >
          {t("exportAction")}
        </Button>
        {exportMsg ? (
          <p
            className={
              exportError
                ? "mt-3 text-sm text-[var(--color-error)]"
                : "mt-3 text-sm text-[var(--color-forest)]"
            }
            role={exportError ? "alert" : "status"}
            data-testid={
              exportError ? "privacy-export-error" : "privacy-export-status"
            }
          >
            {exportMsg}
          </p>
        ) : null}
      </Card>

      <Card>
        <h2 className="m-0 font-display text-xl">{t("deleteTitle")}</h2>
        <p className="mt-2 text-[var(--color-graphite)]">{t("deleteLead")}</p>
        {!confirming ? (
          <Button
            className="mt-4"
            variant="danger"
            disabled={pending}
            onClick={() => setConfirming(true)}
            data-testid="privacy-delete"
          >
            {t("deleteAction")}
          </Button>
        ) : (
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={onDeleteSubmit}
            data-testid="privacy-delete-form"
          >
            <div className="field">
              <label htmlFor="delete-confirm">{t("deleteConfirmPrompt")}</label>
              <input
                id="delete-confirm"
                name="delete-confirm"
                data-testid="privacy-delete-confirm-input"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                type="submit"
                variant="danger"
                disabled={pending || confirm.trim() !== t("deleteConfirmWord")}
                data-testid="privacy-delete-confirm"
              >
                {t("deleteAction")}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setConfirming(false);
                  setConfirm("");
                }}
              >
                {t("deleteCancel")}
              </Button>
            </div>
          </form>
        )}
        {deleteMsg ? (
          <p
            className="mt-3 text-sm text-[var(--color-burgundy)]"
            role="status"
            data-testid="privacy-delete-status"
          >
            {deleteMsg}
          </p>
        ) : null}
      </Card>
    </div>
  );
}

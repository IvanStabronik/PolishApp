/**
 * Privacy export UI: success only after HTTP 2xx + download formed.
 * @vitest-environment jsdom
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { PrivacyActions } from "@/components/brand/privacy-actions";

const messages = {
  privacy: {
    exportTitle: "Export",
    exportLead: "Lead",
    exportAction: "Export now",
    exportDone: "Export ready",
    exportFailed: "Export failed",
    deleteTitle: "Delete",
    deleteLead: "Lead delete",
    deleteAction: "Delete account",
    deleteConfirmPrompt: "Type DELETE",
    deleteConfirmWord: "DELETE",
    deleteCancel: "Cancel",
    deleteDone: "Deleted",
  },
};

function renderPrivacy() {
  return render(
    <NextIntlClientProvider locale="ru" messages={messages}>
      <PrivacyActions />
    </NextIntlClientProvider>,
  );
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("PrivacyActions export", () => {
  it("shows success only after 2xx and non-empty download", async () => {
    const click = vi.fn();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        status: 200,
        blob: async () =>
          new Blob(['{"ok":true}'], { type: "application/json" }),
      })),
    );
    vi.stubGlobal("URL", {
      createObjectURL: () => "blob:mock",
      revokeObjectURL: vi.fn(),
    });
    const createElement = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      const el = createElement(tag);
      if (tag === "a") {
        el.click = click;
      }
      return el;
    });

    renderPrivacy();
    fireEvent.click(screen.getByTestId("privacy-export"));

    await waitFor(() => {
      expect(screen.getByTestId("privacy-export-status").textContent).toContain(
        "Export ready",
      );
    });
    expect(screen.queryByTestId("privacy-export-error")).toBeNull();
    expect(click).toHaveBeenCalled();
  });

  it("shows localized error on non-2xx and does not download", async () => {
    const click = vi.fn();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: false,
        status: 500,
        blob: async () => new Blob([""]),
      })),
    );
    const createElement = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      const el = createElement(tag);
      if (tag === "a") el.click = click;
      return el;
    });

    renderPrivacy();
    fireEvent.click(screen.getByTestId("privacy-export"));

    await waitFor(() => {
      expect(screen.getByTestId("privacy-export-error").textContent).toContain(
        "Export failed",
      );
    });
    expect(screen.queryByTestId("privacy-export-status")).toBeNull();
    expect(click).not.toHaveBeenCalled();
  });

  it("shows error on network failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network");
      }),
    );

    renderPrivacy();
    fireEvent.click(screen.getByTestId("privacy-export"));

    await waitFor(() => {
      expect(screen.getByTestId("privacy-export-error").textContent).toContain(
        "Export failed",
      );
    });
  });
});

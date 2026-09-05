"use server";

import { getRequestSession } from "@/modules/auth/session";
import { exportLearnerData } from "./export";
import { deleteLearnerAccount } from "./delete-account";
import {
  createPrivacyDeleteStore,
  createPrivacyExportStore,
} from "./db-store";

export async function requestDataExport() {
  const session = await getRequestSession();
  if (!session) {
    return { ok: false as const, error: "unauthorized" };
  }
  const body = await exportLearnerData(
    createPrivacyExportStore(),
    session.user.id,
  );
  if (!body) {
    return { ok: false as const, error: "not_found" };
  }
  return { ok: true as const, status: "ready" as const, body };
}

export async function requestAccountDeletion(confirmation: string) {
  if (confirmation !== "DELETE") {
    return { ok: false as const, error: "confirmation_mismatch" };
  }
  const session = await getRequestSession();
  if (!session) {
    return { ok: false as const, error: "unauthorized" };
  }
  const result = await deleteLearnerAccount(
    createPrivacyDeleteStore(),
    session.user.id,
  );
  return { ok: true as const, status: "deleted" as const, result };
}

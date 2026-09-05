/**
 * FUN-211 — account deletion / anonymization (server-side).
 * Removes or anonymizes PII and learning artifacts; login must fail afterwards.
 */

export type DeleteAccountResult = {
  userId: string;
  status: "deleted";
  anonymizedAt: string;
  retained: {
    /** Payment/legal facts only — no PII learning content. */
    paymentFactsKept: boolean;
  };
};

export type DeleteAccountStore = {
  /** Soft-delete / anonymize user row; invalidate sessions. */
  anonymizeUser(userId: string, at: string): Promise<void>;
  deleteLearnerArtifacts(userId: string): Promise<void>;
  revokeSessions(userId: string): Promise<void>;
  writeAudit(event: {
    userId: string;
    action: "delete_requested" | "delete_completed";
    at: string;
  }): Promise<void>;
};

/**
 * Server entry: revoke sessions, wipe learner artifacts, anonymize account.
 * Caller must verify the authenticated user owns `userId`.
 */
export async function deleteLearnerAccount(
  store: DeleteAccountStore,
  userId: string,
  options: { keepPaymentFacts?: boolean } = {},
  now = new Date(),
): Promise<DeleteAccountResult> {
  const at = now.toISOString();
  await store.writeAudit({ userId, action: "delete_requested", at });
  await store.revokeSessions(userId);
  await store.deleteLearnerArtifacts(userId);
  await store.anonymizeUser(userId, at);
  await store.writeAudit({ userId, action: "delete_completed", at });

  return {
    userId,
    status: "deleted",
    anonymizedAt: at,
    retained: {
      paymentFactsKept: options.keepPaymentFacts ?? false,
    },
  };
}

/**
 * FUN-211 — account deletion (server-side).
 * Prefer hard-delete: sessions + accounts + learner cascade + user.
 * Audit events must not store PII (email, name, tokens).
 */

export type DeleteAccountResult = {
  userId: string;
  status: "deleted";
  deletedAt: string;
  retained: {
    /** Payment/legal facts only — no PII learning content. */
    paymentFactsKept: boolean;
  };
};

export type DeleteAccountStore = {
  /**
   * Single transactional wipe:
   * sessions, OAuth/credential accounts, learner profile (cascade), user row.
   * Then write a minimal non-PII audit record.
   */
  deleteAccountTransactional(userId: string, at: string): Promise<void>;
};

/**
 * Server entry: wipe identity + learner artifacts in one store transaction.
 * Caller must verify the authenticated user owns `userId`.
 */
export async function deleteLearnerAccount(
  store: DeleteAccountStore,
  userId: string,
  options: { keepPaymentFacts?: boolean } = {},
  now = new Date(),
): Promise<DeleteAccountResult> {
  const at = now.toISOString();
  await store.deleteAccountTransactional(userId, at);

  return {
    userId,
    status: "deleted",
    deletedAt: at,
    retained: {
      paymentFactsKept: options.keepPaymentFacts ?? false,
    },
  };
}

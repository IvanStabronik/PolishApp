import { createBetaInvite } from "./service";
export {
  createBetaInvite,
  revokeBetaInvite,
  lookupInviteByRawToken,
  consumeInviteForUser,
  registerWithInviteToken,
  deactivateBetaAccess,
  listBetaInvites,
} from "./service";
export {
  generateInviteToken,
  hashInviteToken,
  inviteTokensEqual,
  redactTokenForLogs,
} from "./token";
export {
  deriveInviteStatus,
  inspectInvite,
  canTransitionInvite,
} from "./invite-state";
export type { InviteStatus, InviteRecord, InviteInspection } from "./invite-state";

/** Seed helper: create N invite slots; plaintext tokens discarded. */
export async function seedBetaInviteSlots(input: {
  actorUserId: string | null;
  count: number;
  expiresAt: Date;
}): Promise<{ created: number }> {
  let created = 0;
  for (let i = 0; i < input.count; i += 1) {
    const result = await createBetaInvite({
      actorUserId: input.actorUserId,
      expiresAt: input.expiresAt,
      label: `seed-slot-${i + 1}`,
    });
    // Intentionally discard plaintext — never log or return from seed.
    void result.rawToken;
    created += 1;
  }
  return { created };
}

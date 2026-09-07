export type InviteStatus = "pending" | "accepted" | "expired" | "revoked";

export type InviteRecord = {
  status: InviteStatus;
  expiresAt: Date;
  revokedAt: Date | null;
  acceptedAt: Date | null;
  useLimit: number;
  useCount: number;
};

export type InviteInspection =
  | { ok: true; status: "pending" }
  | {
      ok: false;
      reason: "invalid" | "expired" | "used" | "revoked";
      status: InviteStatus;
    };

export function deriveInviteStatus(
  invite: InviteRecord,
  now = new Date(),
): InviteStatus {
  if (invite.status === "revoked" || invite.revokedAt) return "revoked";
  if (invite.status === "accepted" || invite.acceptedAt) return "accepted";
  if (invite.useCount >= invite.useLimit) return "accepted";
  if (invite.expiresAt.getTime() <= now.getTime()) return "expired";
  if (invite.status === "expired") return "expired";
  return "pending";
}

export function inspectInvite(
  invite: InviteRecord | null | undefined,
  now = new Date(),
): InviteInspection {
  if (!invite) {
    return { ok: false, reason: "invalid", status: "pending" };
  }
  const status = deriveInviteStatus(invite, now);
  if (status === "revoked") {
    return { ok: false, reason: "revoked", status };
  }
  if (status === "expired") {
    return { ok: false, reason: "expired", status };
  }
  if (status === "accepted" || invite.useCount >= invite.useLimit) {
    return { ok: false, reason: "used", status: "accepted" };
  }
  return { ok: true, status: "pending" };
}

export function canTransitionInvite(
  from: InviteStatus,
  to: InviteStatus,
): boolean {
  if (from === to) return false;
  if (from === "pending" && (to === "accepted" || to === "revoked" || to === "expired")) {
    return true;
  }
  return false;
}

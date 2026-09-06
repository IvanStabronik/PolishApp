import { NextResponse } from "next/server";
import { getRequestSession } from "@/modules/auth/session";
import { deleteLearnerAccount } from "@/modules/privacy/delete-account";
import { createPrivacyDeleteStore } from "@/modules/privacy/db-store";

/**
 * FUN-211 — delete / anonymize the authenticated user's account + learning data.
 */
export async function POST(request: Request) {
  let confirm = "";
  try {
    const json = (await request.json()) as { confirm?: string };
    confirm = json.confirm ?? "";
  } catch {
    confirm = "";
  }

  if (confirm !== "DELETE") {
    return NextResponse.json(
      { ok: false, error: "confirmation_required" },
      { status: 400 },
    );
  }

  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const result = await deleteLearnerAccount(
      createPrivacyDeleteStore(),
      session.user.id,
    );
    return NextResponse.json({ ok: true, ...result }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false, error: "delete_failed" }, { status: 500 });
  }
}

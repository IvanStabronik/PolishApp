import { NextResponse } from "next/server";
import { getRequestSession } from "@/modules/auth/session";
import { assertBetaAccessActive } from "@/modules/auth/beta-access";
import { listFeedbackForUser } from "@/modules/feedback/service";

export const runtime = "nodejs";

export async function GET() {
  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  const denied = assertBetaAccessActive(session);
  if (denied) return denied;

  const rows = await listFeedbackForUser(session.user.id);
  return NextResponse.json({
    feedback: rows.map((r) => ({
      id: r.id,
      category: r.category,
      status: r.status,
      comment: r.comment,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    })),
  });
}

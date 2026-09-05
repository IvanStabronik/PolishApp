import { NextResponse } from "next/server";
import { getRequestSession } from "@/modules/auth/session";
import {
  exportLearnerData,
} from "@/modules/privacy/export";
import { createPrivacyExportStore } from "@/modules/privacy/db-store";

/**
 * FUN-210 — export learner data for the authenticated user only.
 */
export async function POST() {
  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = await exportLearnerData(
      createPrivacyExportStore(),
      session.user.id,
    );
    if (!body) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": 'attachment; filename="slowarium-export.json"',
      },
    });
  } catch {
    return NextResponse.json({ error: "export_failed" }, { status: 500 });
  }
}

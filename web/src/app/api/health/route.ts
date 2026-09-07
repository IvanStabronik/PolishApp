import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Liveness — process is up. Never touches Postgres.
 * Orchestrators should restart only when this fails.
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    check: "liveness",
    service: "slowarium",
    database: "not_checked",
    time: new Date().toISOString(),
  });
}

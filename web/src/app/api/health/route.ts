import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Liveness — process is up (no DB dependency).
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "slowarium",
    time: new Date().toISOString(),
  });
}

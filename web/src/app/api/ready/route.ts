import { NextResponse } from "next/server";
import { getSql } from "@/db/client";

export const runtime = "nodejs";

/**
 * Readiness — app + Postgres reachable.
 */
export async function GET() {
  try {
    const sql = getSql();
    await sql`select 1 as ok`;
    return NextResponse.json({
      status: "ready",
      app: true,
      database: true,
      time: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        status: "not_ready",
        app: true,
        database: false,
        time: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}

import { NextResponse } from "next/server";
import { getSql } from "@/db/client";

export const runtime = "nodejs";

/**
 * Readiness — process + Postgres. Distinct from /api/health (liveness).
 * Return 503 when DB is unreachable so load balancers drain traffic.
 */
export async function GET() {
  try {
    const sql = getSql();
    const rows = await sql`select 1 as ok`;
    if (!rows?.[0]) {
      throw new Error("empty_ready_probe");
    }
    return NextResponse.json({
      status: "ready",
      check: "readiness",
      app: true,
      database: true,
      time: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        status: "not_ready",
        check: "readiness",
        app: true,
        database: false,
        time: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
